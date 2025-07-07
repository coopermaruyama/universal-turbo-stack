import { useState } from "react";
import { useRootTheme, useThemeSetting } from "@tamagui/next-theme";
import { Button, useIsomorphicLayoutEffect } from "tamagui";

export const SwitchThemeButton = () => {
  const themeSetting = useThemeSetting();
  const [theme] = useRootTheme();

  const [clientTheme, setClientTheme] = useState<string | undefined>("light");

  useIsomorphicLayoutEffect(() => {
    setClientTheme(themeSetting.forcedTheme || themeSetting.current || theme);
  }, [themeSetting.current, themeSetting.resolvedTheme]);

  return (
    <Button onPress={themeSetting.toggle}>Change theme: {clientTheme}</Button>
  );
};
