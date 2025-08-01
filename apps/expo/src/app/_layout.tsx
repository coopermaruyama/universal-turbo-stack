import "@acme/ui/globals.css";

import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import type { Theme } from "@react-navigation/native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";

import { ThemeToggle } from "~/components/theme-toggle";
import { queryClient } from "~/lib/api";
import { NAV_THEME } from "~/lib/constants";
import { useIsomorphicLayoutEffect } from "~/lib/hooks/useIsomorphicLayoutEffect";
import { useColorScheme } from "~/lib/useColorScheme";

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
  const _fontsLoaded = useFonts({
    Montserrat_400Regular,
    Montserrat_300Light,
    Montserrat_700Bold,
  });

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
      </QueryClientProvider>
    </React.StrictMode>
  );
}
