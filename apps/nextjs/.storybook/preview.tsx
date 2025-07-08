import type { Preview } from "@storybook/nextjs";
import { themes } from "storybook/theming";
import { TamaguiProvider, Theme } from "tamagui";

import "../../../packages/ui/src/styles/globals.css";

// import "../public/tamagui.css";

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
      dark: { ...themes.dark, appBg: "#0a0a0a" },
      light: { ...themes.light, appBg: "#ffffff" },
      current: "light",
      stylePreview: true,
      darkClass: ["dark", "t_dark"],
      lightClass: ["light", "t_light"],
      classTarget: "html",
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

    docs: {
      codePanel: true,
    },
  },
};

export default preview;
