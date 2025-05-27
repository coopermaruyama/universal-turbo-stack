import "../global.css";

import type { Theme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";

import { queryClient } from "~/lib/api";
import { NAV_THEME } from "~/lib/constants";

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
  const { colorScheme } = useColorScheme();
  const isDarkColorScheme = colorScheme !== "light";
  const theme = NAV_THEME[colorScheme ?? "dark"];

  return (
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
          }}
        />
        {/* Default Portal Host (one per app) */}
        <PortalHost />
        <StatusBar />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
