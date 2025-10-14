import { fileURLToPath } from "node:url";
import { dirname } from "pathe";

/**
 * Static checks for environment variables
 */

export type Target = {
  // Glob(s) for a single decrypted environment *source*
  // You can list multiple files if you merge secrets across layers.
  sources: string[]; // e.g. ["secrets/dev/env.sops.env", "secrets/shared/env.sops.yaml"]

  // Path(s) to TS modules that export a `validate()` function
  validators: string[]; // e.g. ["packages/auth/src/env.ts", "apps/web/src/env.ts"]

  // Optional: extra environment mutations (e.g., force NODE_ENV)
  env?: Record<string, string>;
};

export interface Config {
  targets: Target[];
}

export async function fetchSchema(path: string) {
  const module = await import(path);
  return module.schema;
}

// Export the directory containing this config file
// so validator paths can be resolved relative to it
export const configDir = dirname(fileURLToPath(import.meta.url));

/**
 * All paths are relative to repo root
 */
export const config: Config = {
  targets: [
    {
      sources: ["secrets/dev/nextjs.yaml"],
      validators: ["@acme/env/nextjs", "@acme/env/auth"],
      env: { NODE_ENV: "development" },
    },
    {
      sources: ["secrets/prod/nextjs.yaml"],
      validators: ["@acme/env/nextjs", "@acme/env/auth"],
      env: { NODE_ENV: "production" },
    },
  ],
};

export default config;
