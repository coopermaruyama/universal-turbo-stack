import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";

import "../../../packages/ui/src/styles/globals.css";
import "../public/tamagui.css";

import { TamaguiDecorator } from "./TamaguiDecorator";

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
      dark: { ...themes.dark },
      light: { ...themes.light },
      current: "light",
      stylePreview: true,
      darkClass: "dark",
      lightClass: "light",
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
          value: "#0a0a0a",
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "812px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1024px",
            height: "768px",
          },
        },
      },
    },
  },
};

export default preview;
