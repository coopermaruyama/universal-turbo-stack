import type { Preview } from "@storybook/react";

import { TamaguiDecorator } from "./TamaguiDecorator";

import "../../../packages/ui/src/styles/globals.css";

const preview: Preview = {
  decorators: [TamaguiDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      dark: {
        appBg: "#0f0f0f",
        appContentBg: "#0f0f0f",
        barBg: "#0f0f0f",
      },
      light: {
        appBg: "#ffffff",
        appContentBg: "#ffffff",
        barBg: "#ffffff",
      },
      current: "light",
      stylePreview: true,
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#0f0f0f",
        },
      ],
    },
  },
  tags: ["autodocs"],
};

export default preview;
