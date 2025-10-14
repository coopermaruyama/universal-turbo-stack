import type { createEnv } from "@t3-oss/env-nextjs";

export type Config = Parameters<typeof createEnv>[0];

export const IS_CHECKING = !!process.env.__IS_ENVCHECK;
