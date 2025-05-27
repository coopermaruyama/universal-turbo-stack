import { MMKV } from "react-native-mmkv";
import Constants from "expo-constants";

const storage = new MMKV({
  id: "storybook",
});

export function checkStorybookEnabled(): boolean {
  if (storage.getBoolean("storybookEnabled") !== undefined) {
    return storage.getBoolean("storybookEnabled") ?? false;
  }
  const isEnabledViaConfig = Boolean(
    Constants.expoConfig?.extra?.storybookEnabled,
  );
  if (isEnabledViaConfig) {
    return true;
  }
  return true;
}

export function setStorybookEnabled(enabled: boolean): void {
  storage.set("storybookEnabled", enabled);
}
