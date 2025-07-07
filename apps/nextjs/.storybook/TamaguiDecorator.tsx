import type { StoryFn } from "@storybook/react";
import { useEffect, useState } from "react";
import { addons } from "@storybook/preview-api";
import { TamaguiProvider } from "@tamagui/core";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";

import { config } from "../tamagui.config";

export const TamaguiDecorator = (Story: StoryFn, context: any) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const channel = addons.getChannel();

    const handleDarkModeChange = (isDarkMode: boolean) => {
      setIsDark(isDarkMode);
      // Also apply to HTML element for Tamagui CSS classes
      const htmlElement = window.document.documentElement;
      if (isDarkMode) {
        htmlElement.classList.remove("t_light");
        htmlElement.classList.add("t_dark");
      } else {
        htmlElement.classList.remove("t_dark");
        htmlElement.classList.add("t_light");
      }
    };

    channel.on(DARK_MODE_EVENT_NAME, handleDarkModeChange);

    // Set initial theme
    const initialDark = context.globals?.theme === "dark";
    handleDarkModeChange(initialDark);

    return () => {
      channel.off(DARK_MODE_EVENT_NAME, handleDarkModeChange);
    };
  }, [context.globals?.theme]);

  return (
    <TamaguiProvider config={config as any} themeClassNameOnRoot>
      <div className={isDark ? "t_dark" : "t_light"}>
        <Story />
      </div>
    </TamaguiProvider>
  );
};
