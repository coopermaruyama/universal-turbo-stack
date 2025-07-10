import { withTamagui } from "@tamagui/next-plugin";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
await jiti.import("./src/env");

/** @type {(n: string, o: any) => import("next").NextConfig} */
const config = function (name, { defaultConfig }) {
  let config = {
    ...defaultConfig,
    reactStrictMode: true,
    turbopack: {
      resolveAlias: {
        "react-native": "react-native-web",
        "react-native-svg": "react-native-svg-web",
      },
      resolveExtensions: [
        ".web.js",
        ".web.jsx",
        ".web.ts",
        ".web.tsx",
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
    },
    /** Enables hot reloading for local packages without a build step */
    transpilePackages: [
      "react-native",
      "react-native-web",
      "react-native-safe-area-context",
      "nativewind",
      "react-native-css-interop",
      "@rn-primitives/slot",
      "expo",
      "@acme/api",
      "@acme/auth",
      "@acme/db",
      "@acme/ui",
      "@acme/validators",
      "@acme/tamagui",
      "tamagui",
    ],

    /** We already do linting and typechecking as separate tasks in CI */
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },

    allowedDevOrigins: ["100.95.205.8"],

    experimental: {
      // forceSwcTransforms: true,
    },
  };
  const tamaguiPlugin = withTamagui({
    config: "./tamagui.config.ts",
    components: ["tamagui"],
    appDir: true,
    outputCSS:
      process.env.NODE_ENV === "production" ? "./public/tamagui.css" : null,
    disableExtraction: process.env.NODE_ENV === "development",
  });

  return {
    ...config,
    ...tamaguiPlugin(config),
  };
};

export default config;
