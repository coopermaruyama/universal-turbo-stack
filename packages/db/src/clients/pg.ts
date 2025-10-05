import { drizzle } from "drizzle-orm/node-postgres";
import { migrate as migrateFn } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "../../src/schema";
import { basePath } from "./get-path";

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not set");
}

export const getClient = () =>
  drizzle({
    client: new Pool({
      connectionString: process.env.POSTGRES_URL,
    }),
    schema,
    casing: "snake_case",
  });

export const migrate = () =>
  migrateFn(getClient(), {
    migrationsFolder: `${basePath}/drizzle`,
  });

export const driver = "node-postgres";
