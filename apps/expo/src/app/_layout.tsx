import "@acme/ui/globals.css";

import type { Theme } from "@react-navigation/native";
import * as React from "react";
import { Platform } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClientProvider } from "@tanstack/react-query";

import { TamaguiProvider } from "@acme/tamagui";

import { ThemeToggle } from "~/components/theme-toggle";
import { queryClient } from "~/lib/api";
import { NAV_THEME } from "~/lib/constants";
import { useIsomorphicLayoutEffect } from "~/lib/hooks/useIsomorphicLayoutEffect";
import { useColorScheme } from "~/lib/useColorScheme";
import { config } from "../../tamagui.config";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme } = useColorScheme();
  const isDarkColorScheme = colorScheme !== "light";
  const theme = NAV_THEME[colorScheme ?? "dark"];
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document?.documentElement.classList.add("bg-background");
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider
          config={config}
          defaultTheme={isDarkColorScheme ? "dark" : "light"}
        >
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            {/*
              The Stack component displays the current page.
              It also allows you to configure your screens
            */}
            <Stack
              screenOptions={{
                headerShown: false,
                statusBarBackgroundColor: theme.background,
                animation: "none",
                contentStyle: {
                  backgroundColor: isDarkColorScheme
                    ? "hsl(240, 10%, 3.9%)" // dark background
                    : "hsl(240, 0%, 98%)", // light
                },
              }}
            />
            {/* Default Portal Host (one per app) */}
            <PortalHost />
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            <ThemeToggle />
          </ThemeProvider>
        </TamaguiProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
