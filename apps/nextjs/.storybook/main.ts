import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/nextjs";

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
    // "../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)" // Excluded for now due to React Native dependencies
  ],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@chromatic-com/storybook"),
    {
      name: getAbsolutePath("@storybook/addon-storysource"),
      options: {
        rule: {
          test: [/\.stories\.(tsx?|jsx?)$/],
          include: [
            join(__dirname, "../src"),
            join(__dirname, "../../../packages/ui/src"),
          ],
        },
        loaderOptions: {
          prettierConfig: {
            printWidth: 80,
            singleQuote: false,
            semi: true,
            trailingComma: "es5",
            tabWidth: 2,
          },
        },
      },
    },
    getAbsolutePath("storybook-dark-mode"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    const tamaguiLoaderPath = getAbsolutePath("tamagui-loader");
    const { TamaguiPlugin } = require(tamaguiLoaderPath);
    // Alias react-native to react-native-web
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-native": "react-native-web",
    };
    config.plugins = config.plugins || [];
    config.plugins.push(
      new TamaguiPlugin({
        config: "./tamagui.config.ts", // Adjust the path to your Tamagui config
        components: ["tamagui"], // Specify the components you want to use
      }),
    );

    // Add react-native-web extensions
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ...(config.resolve.extensions || []),
    ];

    // Handle .mjs files with babel-loader
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Add rule for .mjs files
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false, // disable the behaviour
      },
    });

    // Update existing JS/TS rules to handle .mjs
    const jsRule = config.module.rules.find(
      (rule) =>
        rule &&
        typeof rule === "object" &&
        "test" in rule &&
        rule.test &&
        rule.test.toString().includes(".js"),
    );

    if (jsRule && typeof jsRule === "object" && "test" in jsRule) {
      jsRule.test = /\.(js|jsx|ts|tsx|mjs)$/;
    }

    return config;
  },
};
export default config;
