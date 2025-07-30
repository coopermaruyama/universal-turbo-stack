import "server-only";

import { initAuth } from "@acme/auth";
import { headers } from "next/headers";
import { cache } from "react";

import { env } from "~/env";

const baseUrl =
  env.VERCEL_ENV === "production"
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_ENV === "preview"
      ? `https://${env.VERCEL_URL}`
      : "http://localhost:3000";

export const auth = initAuth({
  baseUrl: baseUrl,
  productionUrl: "http://localhost:8080",
  secret: env.AUTH_SECRET,
  googleClientId: env.AUTH_GOOGLE_ID,
  googleClientSecret: env.AUTH_GOOGLE_SECRET,
  discordClientId: env.AUTH_DISCORD_ID,
  discordClientSecret: env.AUTH_DISCORD_SECRET,
  githubClientId: env.AUTH_GITHUB_ID,
  githubClientSecret: env.AUTH_GITHUB_SECRET,
  sendgridApiKey: env.SENDGRID_API_KEY,
  emailFrom: env.EMAIL_FROM,
});

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);
export const signOut = async () => {
  return auth.api.signOut({
    headers: await headers(),
  });
};
