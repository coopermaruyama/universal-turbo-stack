import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate as migrateFn } from "drizzle-orm/neon-http/migrator";

import * as schema from "../../src/schema";
import { basePath } from "./get-path";

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not set");
}

export const getClient = () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL environment variable is not set");
  }
  return drizzle({
    client: neon(process.env.POSTGRES_URL),
    schema,
    casing: "snake_case",
  });
};

export const migrate = () =>
  migrateFn(getClient(), {
    migrationsFolder: `${basePath}/drizzle`,
  });

export const driver = "neon-serverless";
