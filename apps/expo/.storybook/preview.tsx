import type { Preview } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";

import { NAV_THEME } from "../src/lib/constants";

import "@acme/ui/globals.css"; // Import global styles

const preview: Preview = {
  decorators: [
    withBackgrounds,
    (Story, ctx) => {
      const { backgrounds } = ctx.globals;
      return (
        <View style={{ flex: 1, padding: 16, backgroundColor: backgrounds }}>
          <Story />
        </View>
      );
    },
  ],
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "light", value: NAV_THEME.light },
        { name: "dark", value: NAV_THEME.dark },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
