import NextAuth from "next-auth";

import { authConfig } from "./config";

export type { Session } from "next-auth";

const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export { handlers, auth, signIn, signOut };

export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
  providerMap,
} from "./config";

export { AUTH_EMAIL_COOKIE_NAME } from "./email";
