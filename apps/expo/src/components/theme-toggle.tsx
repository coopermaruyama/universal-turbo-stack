import { Button } from "@acme/ui/button";
import { Appearance } from "react-native";

import { Moon } from "~/lib/icons/Moon";
import { Sun } from "~/lib/icons/Sun";
import { useColorScheme } from "~/lib/useColorScheme";

export function ThemeToggle() {
  const colorScheme = useColorScheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onPress={() =>
        Appearance.setColorScheme(colorScheme === "light" ? "dark" : "light")
      }
      className="right-safe-or-5 bottom-safe-or-2 absolute z-50"
    >
      {/* <Sun className="h-4 w-4 rotate-0 scale-100 text-primary transition-all dark:-rotate-90 dark:scale-0" /> */}
      {/* <Moon className="size-4 rotate-90 scale-0 text-primary transition-all dark:size-4 dark:rotate-0 dark:scale-100 dark:text-primary" /> */}
      <Sun className="flex size-4 rotate-0 scale-100 text-primary dark:hidden dark:scale-0" />
      <Moon className="hidden size-0 rotate-0 scale-0 text-primary dark:flex dark:scale-100 dark:text-primary" />
    </Button>
  );
}
