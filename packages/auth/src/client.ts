import { createAuthClient as createBetterAuthClient } from 'better-auth/react';
import { env } from '@acme/auth/env';

export interface AuthClientOptions {
  apiBaseUrl: string;
}

export const authClient = createBetterAuthClient();