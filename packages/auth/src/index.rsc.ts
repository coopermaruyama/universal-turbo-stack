import { cache } from "react";
import { headers } from "next/headers";

import { auth } from "./auth";

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

export * from "./auth";