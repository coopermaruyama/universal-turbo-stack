import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";

import { getBaseUrl } from "./base-url";
import { getItem, setItem } from "./storage";

console.log("getBaseUrl", getBaseUrl());

export const authClient = createAuthClient({
  // baseURL: getBaseUrl(),
  baseURL: "http://localhost:3000", // For Expo, you might need to set this to your local dev server URL
  plugins: [
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
