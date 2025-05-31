import { expoClient } from "@better-auth/expo/client";
import { passkeyClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { getItem, setItem } from "./storage";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    passkeyClient(),
    expoClient({
      scheme: "expo",
      storagePrefix: "expo",
      storage: {
        getItem: getItem,
        setItem: setItem,
      },
    }),
  ],
  override: {},
});

export const { signIn, signOut } = authClient;
