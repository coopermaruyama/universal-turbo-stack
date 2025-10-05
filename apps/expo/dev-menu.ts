import { navigate } from "expo-router/build/global-state/routing";
import { Appearance, DevSettings } from "react-native";

/**
 * Launch  Storybook
 */
const launchStorybook = () => {
  navigate("/storybook");
};

/**
 * Toggle Dark Mode
 */
const toggleDarkMode = () => {
  const curr = Appearance.getColorScheme();
  Appearance.setColorScheme(curr === "dark" ? "light" : "dark");
};

// =====================================================================================
// Bind
// -------------------------------------------------------------------------------------
DevSettings.addMenuItem("Launch Storybook", launchStorybook);
DevSettings.addMenuItem("Toggle Dark Mode", toggleDarkMode);
