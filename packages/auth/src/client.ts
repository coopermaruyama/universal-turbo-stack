import { createAuthClient as createBetterAuthClient } from "better-auth/react";

export interface AuthClientOptions {
  apiBaseUrl: string;
}

export const authClient = createBetterAuthClient();
