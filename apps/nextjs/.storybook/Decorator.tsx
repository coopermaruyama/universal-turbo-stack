import type { Decorator } from "@storybook/nextjs";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import {
  DARK_MODE_EVENT_NAME,
  useDarkMode,
} from "@vueless/storybook-dark-mode";

export const AppDecorator: Decorator = (Story, context) => {
  return (
    <ThemeProvider>
      <div className={useDarkMode() ? "dark" : "light"}>
        <Story />
      </div>
    </ThemeProvider>
  );
};
