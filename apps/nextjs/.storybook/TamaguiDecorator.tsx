import type { Decorator } from "@storybook/nextjs";
import { useEffect, useState } from "react";
import {
  DARK_MODE_EVENT_NAME,
  useDarkMode,
} from "@vueless/storybook-dark-mode";
import { TamaguiProvider, Theme } from "tamagui";

import { config } from "../tamagui.config";

export const TamaguiDecorator: Decorator = (Story, context) => {
  return (
    <TamaguiProvider defaultTheme="dark" config={config as any}>
      <div className={useDarkMode() ? "t_dark" : "t_light"}>
        <Theme name={useDarkMode() ? "dark" : "light"}>
          {/* <style
            dangerouslySetInnerHTML={{
              __html: config.getCSS({
                // if you are using "outputCSS" option, you should use this "exclude"
                // if not, then you can leave the option out
                // exclude:
                // process.env.NODE_ENV === "production" ? "design-system" : null,
              }),
            }}
          /> */}
          <Story />
        </Theme>
      </div>
    </TamaguiProvider>
  );
};
