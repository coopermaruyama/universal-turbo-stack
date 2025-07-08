import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/nextjs-vite";

// import { tamaguiPlugin } from "@tamagui/vite-plugin";

// import { TamaguiPlugin } from "tamagui-loader";

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
    // getAbsolutePath("@storybook/addon-onboarding"),
    // getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@vueless/storybook-dark-mode"),
    getAbsolutePath("@storybook/addon-docs"),
  ],
  // core: {
  //   builder: getAbsolutePath("@storybook/builder-vite"),
  // },
  framework: "@storybook/nextjs-vite",
  // framework: {
  //   name: getAbsolutePath("@storybook/nextjs"),
  //   options: {},
  // },
  staticDirs: ["../public"],
  viteFinal: async (config, { configType }) => {
    const { tamaguiPlugin } = await import("@tamagui/vite-plugin");
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "react-native$": "react-native-web",
      };
    }
    config.plugins = config.plugins || [];
    config.plugins.push(
      tamaguiPlugin({
        config: "./tamagui.config.ts",
        components: ["tamagui", "../../packages/tamagui/src"],
      }),
    );

    config.resolve = config.resolve || {};
    config.esbuild = config.esbuild || {};
    config.esbuild.include = [
      // Include .mjs files in the build process
      /\.m?js$/,
      // Include .ts and .tsx files for TypeScript support
      /\.ts$/,
      /\.tsx$/,
    ];
    config.optimizeDeps = {
      esbuildOptions: {
        loader: {
          ".js": "jsx",
        },
      },
    } as any;
    return config;
  },
  // webpackFinal: async (config) => {
  //   // const tamaguiLoaderPath = getAbsolutePath("tamagui-loader");
  //   // const { TamaguiPlugin } = require(tamaguiLoaderPath);
  //   // Alias react-native to react-native-web
  //   config.resolve = config.resolve || {};
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     "react-native$": "react-native-web",
  //   };
  //   config.plugins = config.plugins || [];
  //   config.plugins.push(
  //     new TamaguiPlugin({
  //       config: "./tamagui.config.ts", // Adjust the path to your Tamagui config
  //       // components: ["tamagui"],
  //       components: ["tamagui", "../../packages/tamagui/src"], // Specify the components you want to use
  //     }),
  //   );

  //   // Add react-native-web extensions
  //   config.resolve.extensions = [
  //     ".web.js",
  //     ".web.jsx",
  //     ".web.ts",
  //     ".web.tsx",
  //     ".ts",
  //     ".tsx",
  //     ".js",
  //     ".jsx",
  //     ".json",
  //     ...(config.resolve.extensions || []),
  //   ];

  //   // Handle .mjs files with babel-loader
  //   config.module = config.module || {};
  //   config.module.rules = config.module.rules || [];

  //   // Add rule for .mjs files
  //   config.module.rules.push({
  //     test: /\.m?js$/,
  //     resolve: {
  //       fullySpecified: false, // disable the behaviour
  //     },
  //   });

  //   // Update existing JS/TS rules to handle .mjs
  //   const jsRule = config.module.rules.find(
  //     (rule) =>
  //       rule &&
  //       typeof rule === "object" &&
  //       "test" in rule &&
  //       rule.test &&
  //       rule.test.toString().includes(".js"),
  //   );

  //   if (jsRule && typeof jsRule === "object" && "test" in jsRule) {
  //     jsRule.test = /\.(js|jsx|ts|tsx|mjs)$/;
  //   }

  //   return config;
  // },
  env: (config) => ({
    ...config,
    TAMAGUI_TARGET: "web",
    EMAIL_FROM: "<your-email@example.com>",
    SENDGRID_API_KEY: "<your-sendgrid-api-key>",
  }),
};
export default config;
