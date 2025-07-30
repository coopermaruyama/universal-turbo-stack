import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
await jiti.import("./src/env");

/** @type {(n: string, o: any) => import("next").NextConfig} */
const config = (_name, { defaultConfig }) => {
  const config = {
    ...defaultConfig,
    reactStrictMode: true,
    turbopack: {
      resolveAlias: {
        "react-native": "react-native-web",
        "react-native-svg": "react-native-svg-web",
        // "lucide-react-native": "lucide-react",
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
      "react-native-reanimated",
      "@rn-primitives/accordion",
      "@rn-primitives/alert-dialog",
      "@rn-primitives/aspect-ratio",
      "@rn-primitives/avatar",
      "@rn-primitives/checkbox",
      "@rn-primitives/collapsible",
      "@rn-primitives/context-menu",
      "@rn-primitives/dialog",
      "@rn-primitives/dropdown-menu",
      "@rn-primitives/hover-card",
      "@rn-primitives/label",
      "@rn-primitives/menubar",
      "@rn-primitives/navigation-menu",
      "@rn-primitives/portal",
      "@rn-primitives/popover",
      "@rn-primitives/progress",
      "@rn-primitives/radio-group",
      "@rn-primitives/select",
      "@rn-primitives/separator",
      "@rn-primitives/slot",
      "@rn-primitives/switch",
      "@rn-primitives/table",
      "@rn-primitives/tabs",
      "@rn-primitives/toggle",
      "@rn-primitives/toggle-group",
      "@rn-primitives/tooltip",
      "lucide-react-native",
      "nativewind",
      "react-native-css-interop",
      "@rn-primitives/slot",
      "expo",
      "@acme/api",
      "@acme/auth",
      "@acme/db",
      "@acme/ui",
      "@acme/validators",
    ],

    /** We already do linting and typechecking as separate tasks in CI */
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },

    allowedDevOrigins: ["100.95.205.8" /* Add your IP here */],

    experimental: {
      // forceSwcTransforms: true,
    },
    compiler: {
      define: {
        __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
      },
    },
  };

  return {
    ...config,
  };
};

export default config;
