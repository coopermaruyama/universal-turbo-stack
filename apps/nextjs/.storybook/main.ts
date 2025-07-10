import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/nextjs-vite";
import react from "@vitejs/plugin-react";
import { transformWithEsbuild } from "vite";

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
    "../../../packages/tamagui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // "../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // "@acme/tamagui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@vueless/storybook-dark-mode"),
    getAbsolutePath("@storybook/addon-docs"),
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  viteFinal: async (config, { configType }) => {
    const { tamaguiPlugin } = await import("@tamagui/vite-plugin");
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "react-native$": "react-native-web",
        "react-native-svg$": "react-native-svg-web",
      };
    }
    config.plugins = [
      ...(config.plugins || []),
      {
        name: "treat-js-files-as-jsx",
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/)) return null;

          // Use the exposed transform from vite, instead of directly
          // transforming with esbuild
          return transformWithEsbuild(code, id, {
            loader: "jsx",
            jsx: "automatic",
          });
        },
      },
      react(),
      tamaguiPlugin({
        config: "./tamagui.config.ts",
        components: ["tamagui", "../../packages/tamagui/src"],
      }),
    ];

    config.resolve = config.resolve || {};
    config.resolve.extensions = [
      ...(config.resolve.extensions || []),
      ".web.js",
      ".web.jsx",
      ".web.mjs",
      ".web.ts",
      ".web.tsx",
      ".js",
      ".jsx",
      ".mjs",
      ".ts",
      ".tsx",
    ];
    config.esbuild = config.esbuild || {};
    config.optimizeDeps = {
      force: true,
      esbuildOptions: {
        loader: {
          ".js": "jsx",
          ".mjs": "jsx",
        },
      },
    } as any;
    return config;
  },
  env: (config) => ({
    ...config,
    TAMAGUI_TARGET: "web",
    EMAIL_FROM: "<your-email@example.com>",
    SENDGRID_API_KEY: "<your-sendgrid-api-key>",
  }),
};

export default config;
