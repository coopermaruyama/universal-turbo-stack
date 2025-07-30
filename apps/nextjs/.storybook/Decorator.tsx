import type { Decorator } from "@storybook/nextjs";
import { useDarkMode } from "@vueless/storybook-dark-mode";
import { ThemeProvider } from "@/components/theme-provider";

export const AppDecorator: Decorator = (Story, _context) => {
  return (
    <ThemeProvider>
      <div className={useDarkMode() ? "dark" : "light"}>
        <Story />
      </div>
    </ThemeProvider>
  );
};
