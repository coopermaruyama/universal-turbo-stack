import * as pg from "./clients/pg";
import * as serverless from "./clients/serverless";

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not set");
}

const isNeon = process.env.POSTGRES_URL.includes("neon.tech");

type Client = ReturnType<typeof pg.getClient>;
// @ts-expect-error - Don't let neon types propagate to the client
export const db: Client = isNeon ? serverless.getClient() : pg.getClient();

export const migrate = isNeon ? serverless.migrate : pg.migrate;
