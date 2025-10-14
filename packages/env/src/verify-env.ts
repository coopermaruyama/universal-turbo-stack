#!/usr/bin/env -S node --enable-source-maps
import fs from "node:fs/promises";
import chokidar from "chokidar";
import * as pc from "colorette";
import dotenv from "dotenv";
import { execa } from "execa";
import { globby } from "globby";
import { createJiti } from "jiti";
import { dirname, extname, join } from "pathe";
import * as yaml from "yaml";
import type { AnyZodObject } from "zod/v3";
import { ZodError, z } from "zod/v4";
import { config } from "../envcheck.config.ts";

type EnvMap = Record<string, string>;

const jiti = createJiti(import.meta.url);

// Paths are relative to repo root
const repoRoot = await getRepoRoot();
debug("Repository root:", repoRoot);
// Used by problem matcher for parsing
const MARKER_BEGIN = "[envcheck] Starting environment validation watcher";
const MARKER_END = "[envcheck] Ready";

function debug(...args: any[]) {
  if (process.env.DEBUG) {
    console.log(...args);
  }
}

async function getRepoRoot() {
  while (true) {
    const files = await fs.readdir(process.cwd());
    if (files.includes(".git")) {
      return process.cwd();
    }
    const parent = dirname(process.cwd());
    process.chdir(parent);
  }
}

function isObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function flatten(obj: Record<string, any>, prefix = ""): EnvMap {
  const out: EnvMap = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}_${k}` : k;
    if (isObject(v)) {
      Object.assign(out, flatten(v as Record<string, any>, key));
    } else if (v != null) {
      out[String(key).toUpperCase()] = String(v);
    }
  }
  return out;
}

async function decryptToString(filePath: string) {
  // uses local sops. Requires your age/AWS KMS config already set in env.
  const { stdout } = await execa("sops", ["-d", filePath], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  return stdout;
}

function parseByExt(content: string, filePath: string): EnvMap {
  const ext = extname(filePath).toLowerCase();
  if (ext === ".env") {
    const parsed = dotenv.parse(content);
    const out: EnvMap = {};
    for (const [k, v] of Object.entries(parsed)) out[k] = String(v);
    return out;
  }
  if (ext === ".json") {
    const obj = JSON.parse(content);
    if (!isObject(obj)) throw new Error("JSON secret must be an object");
    return flatten(obj);
  }
  if (ext === ".yml" || ext === ".yaml") {
    const obj = yaml.parse(content);
    if (!isObject(obj)) throw new Error("YAML secret must be an object");
    return flatten(obj);
  }
  throw new Error(`Unsupported secret file extension: ${ext}`);
}

async function loadEnvFromSources(globs: string[]): Promise<EnvMap> {
  const files = await globby(globs, { cwd: repoRoot, absolute: true });
  if (!files.length) {
    throw new Error(`No secret files matched: ${globs.join(", ")}`);
  }
  const merged: EnvMap = {};
  for (const f of files) {
    const plaintext = await decryptToString(f);
    const parsed = parseByExt(plaintext, f);
    Object.assign(merged, parsed);
  }
  return merged;
}

function toProblemMatcherLines(prefix: string, error: string) {
  // Minimal "file:line:col: message" so VS Code Problem Matcher picks it up.
  // We don’t have file/line from zod easily, but we can attribute to the validator file.
  return `${prefix}:1:1: ${error.replace(/\n/g, " ")}`;
}

type Problem = {
  filePath: string;
  line: number;
  column: number;
  error: string;
};

async function main() {
  let failures = 0;
  debug("Starting env check using config:", JSON.stringify(config, null, 2));
  let i = 1;

  for (const target of config.targets) {
    debug("--------------------------------");
    debug(`Target #${i}`);
    debug("--------------------------------");
    debug("Sources:", target.sources);
    debug("Validators:", target.validators);
    debug("Additional Env:", target.env);

    try {
      const envMap = await loadEnvFromSources(target.sources);
      const effectiveEnv = { ...envMap, ...(target.env || {}) };
      debug("Effective env:", JSON.stringify(effectiveEnv, null, 2));

      let j = 1;
      for (const validatorPath of target.validators) {
        debug(`Checking validator #${j}`);
        const firstSource = target.sources[0]
          ?.replace(repoRoot, "")
          .replace(/^\//, "");
        const validator = (await jiti.import(validatorPath)) as {
          schema: { server: AnyZodObject; client: AnyZodObject };
        };
        if (!("schema" in validator)) {
          throw new Error("Validator must export a validate function");
        }
        if (!("server" in validator.schema)) {
          throw new Error("Validator must export a server schema");
        }
        const server = validator.schema.server;
        const client = validator.schema.client;
        const schema = client
          ? z.object({ ...server, ...client })
          : z.object(server);
        try {
          const parsed = schema.safeParse(effectiveEnv);
          if (!parsed) {
            throw new Error("Invalid environment variables");
          }
          debug("Validator result:", parsed);
          if (!parsed.success) {
            throw parsed.error;
          }
          process.stdout.write(
            pc.green(
              `✔ ${validatorPath} with [${target.sources.join(", ")}]\n`,
            ),
          );
          debug("Validator passed");
        } catch (err: unknown) {
          failures++;
          const errors: Problem[] = [];
          debug("Validator errors:", err);
          if (err instanceof ZodError) {
            debug("ZodError:", err);
            for (const issue of err.issues) {
              let error = `${issue.path.join(".")}: ${issue.message}`;
              const missing = issue.path.map((k) => !(k in effectiveEnv));
              if (issue.code === "invalid_type" && missing.length > 0) {
                error = `Missing required environment variable: ${issue.path.join(".")}`;
              }
              errors.push({
                filePath: firstSource || "secrets",
                line: issue.path.length,
                column: issue.path.length,
                error,
              });
            }
          } else {
            errors.push({
              filePath: firstSource || "secrets",
              line: 1,
              column: 1,
              error: err instanceof Error ? err.message : String(err),
            });
          }
          for (const error of errors) {
            // process.stderr.write(
            //   pc.red(
            //     `✖ ${error.filePath}:${error.line}:${error.column}: ${error.error}\n`,
            //   ),
            // );
            console.error(toProblemMatcherLines(error.filePath, error.error));
          }
        }
        j++;
      }
    } catch (err: unknown) {
      failures++;
      const msg = err instanceof Error ? err.message : String(err);
      debug("Target failed");
      process.stderr.write(
        pc.red(`✖ Target ${target.sources.join(", ")}: ${msg}\n`),
      );
      console.error(toProblemMatcherLines(target.sources[0] || "", msg));
      debug("Target failed");
    }
    i++;
  }

  const isWatching = args.includes("--watch");
  if (!isWatching) {
    process.exit(failures ? 1 : 0);
  }
}

function parseWatchPaths() {
  const args = process.argv.slice(2);
  // IMPORTANT: DONT REMOVE
  console.log(MARKER_BEGIN);
  // Check for custom watch paths
  const watchPathsIndex = args.indexOf("--watch-paths");
  let watchPaths: string[];

  if (watchPathsIndex !== -1 && args[watchPathsIndex + 1]) {
    // Custom watch paths provided
    watchPaths = args
      .slice(watchPathsIndex + 1)
      .filter((arg) => !arg.startsWith("--"));
  } else {
    // defaults
    watchPaths = [join(repoRoot, "secrets"), join(repoRoot, "packages/env")];
  }
  return watchPaths;
}

const args = process.argv.slice(2);
if (args.includes("--watch")) {
  const watchPaths = parseWatchPaths();
  console.log(`[envcheck] Watching paths:`, watchPaths);
  // Run initial check
  try {
    await main();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  console.log("[envcheck] Initial check complete. Watching for changes...");

  // Watch for changes
  chokidar
    .watch(watchPaths, {
      cwd: repoRoot,
      ignoreInitial: true,
    })
    .on("change", (path) => {
      console.log(`[envcheck] Change detected in ${path}, re-validating...`);
      main();
    })
    .on("ready", () => {
      console.log(MARKER_END);
    });
} else {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
