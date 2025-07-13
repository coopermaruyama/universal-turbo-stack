import { createRequire } from "module";
import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-native-web-vite";
import react from "@vitejs/plugin-react";
import { mergeConfig, optimizeDeps, transformWithEsbuild } from "vite";
import reactNativeWeb from "vite-plugin-react-native-web";

const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@vueless/storybook-dark-mode"),
    // getAbsolutePath("@storybook/addon-docs"),
  ],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {
      pluginReactOptions: {
        jsxImportSource: "nativewind",
        jsxRuntime: "automatic",
        babel: {
          plugins: [
            "@babel/plugin-proposal-export-namespace-from",
            "@babel/plugin-proposal-class-properties",
            "react-native-reanimated/plugin",
          ],
        },
        // include: [/packages\/ui\/src/, /@rn-primitives/],
      },
      pluginBabelOptions: {
        include: [
          /node_modules\/(react-native|@react-native|expo|@expo|react-native-reanimated)/,
          // /packages\/ui\/src/,
        ],
        exclude: [/@rn-primitives.*/],
        presetReact: {
          runtime: "automatic",
          importSource: "nativewind",
        },
      },
    },
  },
  staticDirs: ["../public"],
  viteFinal: async (config, { configType }) => {
    // const { tamaguiPlugin } = await import("@tamagui/vite-plugin");
    return mergeConfig(config, {
      resolve: {
        alias: {
          "react-native$": "react-native-web",
          "react-native-svg$": "react-native-svg-web",
        },
        extensions: [
          ".web.mjs", // must go first to make @rn-primitives work
          ".web.js",
          ".web.jsx",
          ".web.ts",
          ".web.tsx",
          ".mjs",
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ],
      },
      build: {
        commonJsOptions: {
          transformMixedEsModules: true,
          // exclude: [/@rn-primitives\/.*/],
        },
      },
      plugins: [
        {
          name: "treat-js-files-as-jsx",
          enforce: "pre", // Add this to run before vite:import-analysis
          async transform(code: string, id: string) {
            if (!id.match(/src\/.*\.js$/) && !id.match(/@rn-primitives/)) {
              return null;
            }

            // Use the exposed transform from vite, instead of directly
            // transforming with esbuild
            return transformWithEsbuild(code, id, {
              loader: "jsx",
              jsx: "automatic",
            });
          },
        },
        // tamaguiPlugin({
        //   config: "./tamagui.config.ts",
        //   components: ["tamagui", "../../packages/tamagui/src"],
        // }),
      ],
      optimizeDeps: {
        include: [
          "react-native-reanimated",
          "nativewind",
          "react-native-css-interop",
          "react-native-gesture-handler",
          "storybook/theming",
          "@vueless/storybook-dark-mode",
        ],
        exclude: [
          "sb-original/default-loader",
          "sb-original/image-context",
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
        ],
        needsInterop: [
          "react-native-reanimated",
          "react-native-safe-area-context",
          "react-native-gesture-handler",
        ],
        force: true,
        esbuildOptions: {
          jsx: "transform",
          loader: {
            ".js": "jsx",
            ".mjs": "jsx",
            ".ts": "tsx",
            ".tsx": "tsx",
          },
        },
      },
    });
  },
  env: (config) => ({
    ...config,
    TAMAGUI_TARGET: "web",
    IS_STORYBOOK: "true",
    EMAIL_FROM: "<your-email@example.com>",
    SENDGRID_API_KEY: "<your-sendgrid-api-key>",
  }),
};

export default config;
