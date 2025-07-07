// Learn more: https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require("expo/metro-config");
const { FileStore } = require("metro-cache");
const { withNativeWind } = require("nativewind/metro");
const withStorybook = require("@storybook/react-native/metro/withStorybook");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");
const path = require("node:path");

let config = getDefaultConfig(__dirname, {
  isCSSEnabled: true, // Enable CSS support
});

// First apply NativeWind
config = withNativeWind(config, {
  input: "../../packages/ui/src/styles/globals.css",
  configPath: "./tailwind.config.ts",
});

// Then apply Storybook
/** @type {Parameters<typeof withStorybook>} */
config = withStorybook(config, {
  // Set to false to remove storybook specific options
  // you can also use a env variable to set this
  enabled: true,
  // Path to your storybook config
  configPath: path.resolve(__dirname, "./.storybook"),
  // Optional websockets configuration
  // Starts a websocket server on the specified port and host on metro start
  // websockets: {
  //   port: 7007,
  //   host: 'localhost',
  // },
});

config = withTurborepoManagedCache(config);
/**
 * @see https://www.better-auth.com/docs/integrations/expo#configure-metro-bundler
 */
config.resolver.unstable_enablePackageExports = true;

/**
 * @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation#metro-config
 */
config = wrapWithReanimatedMetroConfig(config);

module.exports = config;

/**
 * Move the Metro cache to the `.cache/metro` folder.
 * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
 *
 * @see https://turborepo.com/docs/reference/configuration#env
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withTurborepoManagedCache(config) {
  config.cacheStores = [
    new FileStore({ root: path.join(__dirname, ".cache/metro") }),
  ];
  return config;
}
