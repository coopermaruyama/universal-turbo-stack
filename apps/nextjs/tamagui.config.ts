import { createTamagui } from "tamagui";

import { createTamaguiOptions } from "@acme/tamagui/config";

export const config = createTamagui({
  ...createTamaguiOptions,
});

type OurConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends OurConfig {}
}
