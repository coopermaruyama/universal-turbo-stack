import type { StorybookConfig } from "@storybook/react-native";

const main: StorybookConfig = {
  stories: [
    "../src/**/*.stories.?(ts|tsx|js|jsx)",
    "../../../packages/ui/src/**/*.stories.?(ts|tsx|js|jsx)",
  ],

  addons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
    "@storybook/addon-react-native-web",
    "@storybook/addon-ondevice-backgrounds",
  ],

  // docs: {
  //   autodocs: true
  // }
};

export default main;
