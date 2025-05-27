import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@acme/tailwind-config/native";

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/*.{ts,tsx}"],
  presets: [baseConfig, nativewind],
} satisfies Config;
