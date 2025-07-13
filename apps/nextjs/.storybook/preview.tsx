import type { Preview } from "@storybook/nextjs";
import { themes, ThemeVars } from "storybook/theming";

import "../../../packages/ui/src/styles/globals.css";

// import React from "react";
// import { DARK_MODE_EVENT_NAME } from "@vueless/storybook-dark-mode";
// import { DocsContextProps } from "storybook/internal/types";

// import "../public/tamagui.css";

import { AppDecorator } from "./Decorator";

const preview: Preview = {
  decorators: [AppDecorator],
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
      current: "dark",
      stylePreview: true,
      darkClass: ["dark", "t_dark"],
      lightClass: ["light", "t_light"],
      classTarget: "html",
    },

    backgrounds: {
      default: "dark",
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
      theme: themes.dark,
    },
  },
};

export default preview;

// const MyDocsContainer = (props: {
//         children: React.ReactNode;
//         context: DocsContextProps;
//         theme?: ThemeVars;
//       }) => {
//         const [isDark, setDark] = React.useState(true);

//         React.useEffect(() => {
//           props.context.channel.on(DARK_MODE_EVENT_NAME, setDark);

//           return () =>
//             props.context.channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
//         }, [props.context.channel]);

//         return (
//           <DocsContainer
//             {...props}
//             theme={isDark ? themes.dark : themes.light}
//           />
//         );
//       }
