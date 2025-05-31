import type { SocialProviders } from "better-auth/social-providers";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { passkey } from "better-auth/plugins/passkey";

import { env } from "@acme/auth/env";
import { db } from "@acme/db/client";

import { emailProvider, sendEmail } from "./email";

export type AuthInstance = ReturnType<typeof betterAuth>;

const getBaseUrl = () => {
  if (env.BETTER_AUTH_URL) {
    return new URL(env.BETTER_AUTH_URL).origin;
  }

  return `http://localhost:${env.PORT ?? 3000}`;
};

export const auth = betterAuth({
  appName: "create-expo-turbo-next",
  baseURL: getBaseUrl(),
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: env.AUTH_SECRET,
  plugins: [
    passkey({}),
    emailProvider,
    // oAuthProxy(),
    nextCookies(), // "supposed" to be last
    expo(),
  ],
  socialProviders: buildSocialProviders(),
  trustedOrigins: [getBaseUrl(), "expo://"],
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },
  emailVerification: {
    sendVerificationEmail(data, request) {
      return sendEmail({
        type: "link",
        data: {
          email: data.user.email,
          link: data.url,
        },
        request,
      });
    },
  },
  // advanced: {
  //   disableCSRFCheck: true, // Disable CSRF check for better compatibility with Expo
  // }
});

function buildSocialProviders(): SocialProviders {
  // Buid oAuth social providers
  const socialProviders: SocialProviders = {};
  // Google
  if (env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET) {
    socialProviders.google = {
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      redirectURI: `${getBaseUrl()}/api/auth/callback/google`,
    };
  }
  // Discord
  if (env.AUTH_DISCORD_ID && env.AUTH_DISCORD_SECRET) {
    socialProviders.discord = {
      clientId: env.AUTH_DISCORD_ID,
      clientSecret: env.AUTH_DISCORD_SECRET,
      redirectURI: `${getBaseUrl()}/api/auth/callback/discord`,
    };
  }
  // Apple
  // if (env.AUTH_APPLE_ID && env.AUTH_APPLE_SECRET) {
  //   socialProviders.apple = {
  //     clientId: env.AUTH_APPLE_ID,
  //     clientSecret: env.AUTH_APPLE_SECRET,
  //     redirectURI: `${getBaseUrl()}/api/auth/callback/apple`,
  //   };
  // }
  return socialProviders;
}

export type Session = typeof auth.$Infer.Session;
