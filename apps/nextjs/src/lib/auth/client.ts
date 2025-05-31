import { passkeyClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "@acme/auth/env";

export const authClient = createAuthClient({
  plugins: [passkeyClient()],
  baseUrl: env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

export const { signIn, signUp, signOut, useSession } = authClient;
