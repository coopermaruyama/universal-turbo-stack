import Constants from "expo-constants";

// MMKV is native -- avoid crashing JS thread if not linked/configured
let safeGetBoolean: ((key: string) => boolean | undefined) | undefined = undefined;
try {
  // Delay MMKV import, so we only use if available.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { MMKV } = require("react-native-mmkv");
  const storage = new MMKV({ id: "storybook" });
  safeGetBoolean = (key: string) => {
    try {
      return storage.getBoolean(key);
    } catch {
      return undefined;
    }
  };
} catch {
  // MMKV unavailable or throws, just use config
  safeGetBoolean = undefined;
}

/**
 * Returns true if storybook is explicitly enabled by
 * - MMKV key "storybookEnabled" 
 * - config.extra.storybookEnabled: true
 * 
 * Fails safe: disables if MMKV not available or errors.
 */
export function checkStorybookEnabled(): boolean {
  try {
    if (safeGetBoolean) {
      const storageVal = safeGetBoolean("storybookEnabled");
      if (storageVal !== undefined) return storageVal;
    }
  } catch {
    // ignore and fall through to config check
  }
  try {
    const isEnabledViaConfig = Boolean(
      Constants.expoConfig?.extra?.storybookEnabled
    );
    if (isEnabledViaConfig) return true;
  } catch {
    // ignore
  }
  // Fails safe: do NOT enable by default if no signal
  return false;
}

export function setStorybookEnabled(enabled: boolean): void {
  // Use safe MMKV access (if available), but fail silently if not
  if (typeof safeGetBoolean === "function") {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { MMKV } = require("react-native-mmkv");
      const storage = new MMKV({ id: "storybook" });
      storage.set("storybookEnabled", enabled);
    } catch {
      // ignore failure
    }
  }
}
