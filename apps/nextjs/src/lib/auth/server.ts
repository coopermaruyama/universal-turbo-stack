import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { env } from "@/lib/env";
import { nextCookies } from "better-auth/next-js";

import { auth } from "@acme/auth";

export {
  auth
}

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);
export const signOut = async () => {
  return auth.api.signOut({
    headers: await headers(),
  });
};
