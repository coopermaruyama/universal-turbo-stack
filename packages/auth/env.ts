import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod/v4";

export function authEnv() {
  return createEnv({
    server: {
      NODE_ENV: z.enum(["development", "production"]).optional(),
      AUTH_DISCORD_ID: z.string().optional(),
      AUTH_DISCORD_SECRET: z.string().optional(),
      AUTH_SECRET:
        process.env.NODE_ENV === "production"
          ? z.string().min(1)
          : z.string().min(1).optional(),
      AUTH_GOOGLE_ID: z.string().optional(),
      AUTH_GOOGLE_SECRET: z.string().optional(),
      AUTH_GITHUB_ID: z.string().optional(),
      AUTH_GITHUB_SECRET: z.string().optional(),
      BETTER_AUTH_URL: z.string().url().optional(),
      SENDGRID_API_KEY: z.string().optional(),
      EMAIL_FROM: z.string().email().optional(),
      PORT: z.coerce.number().optional(),
    },
    client: {
      NEXT_PUBLIC_API_URL: z.string().url().optional(),
      NEXT_PUBLIC_WEB_URL: z.string().url().optional(),
    },
    experimental__runtimeEnv: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    },
    skipValidation:
      !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  });
}

// @check
//
// export const env = createEnv({
//   server: {
//     NODE_ENV: z.enum(["development", "production"]).optional(),
//     AUTH_DISCORD_ID: z.string().optional(),
//     AUTH_DISCORD_SECRET: z.string().optional(),
//     AUTH_SECRET:
//       process.env.NODE_ENV === "production"
//         ? z.string().min(1)
//         : z.string().min(1).optional(),
//     AUTH_GOOGLE_ID: z.string().optional(),
//     AUTH_GOOGLE_SECRET: z.string().optional(),
//     BETTER_AUTH_URL: z.string().url().optional(),
//     SENDGRID_API_KEY: z.string().min(1),
//     EMAIL_FROM: z.string().email(),
//     PORT: z.coerce.number().optional(),
//   },
//   client: {
//     NEXT_PUBLIC_API_URL: z.string().url().optional(),
//     NEXT_PUBLIC_WEB_URL: z.string().url().optional(),
//   },
//   experimental__runtimeEnv: {
//     NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
//     NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
//   },
//   skipValidation:
//     !!process.env.CI || process.env.npm_lifecycle_event === "lint",
// });
