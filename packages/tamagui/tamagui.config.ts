import { createTamagui, createTokens } from "tamagui";

import { createTamaguiOptions } from "./src/config";

export const config = createTamagui(createTamaguiOptions);

export type AppConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}
