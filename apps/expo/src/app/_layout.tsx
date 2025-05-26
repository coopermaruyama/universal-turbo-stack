import "../styles.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";
import { Provider } from "react-redux";

import { ENABLE_STORYBOOK, NAV_THEME } from "~/lib/constants";
import { queryClient } from "~/lib/utils/api";

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
  const theme = NAV_THEME[colorScheme ?? "dark"];
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
