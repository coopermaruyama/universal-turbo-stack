export const name = "tamagui";

// Export themes and config
export { themes } from "./themes";
export { createTamaguiOptions } from "./config";

// Export shadcn components
export * from "./accordion";
export * from "./alert";
export * from "./badge";
export * from "./button";
export * from "./card";
export * from "./checkbox";
export * from "./dialog";
export * from "./input";
export * from "./label";
export * from "./select";
export * from "./switch";
export * from "./tabs";
export * from "./tooltip";

// Export test components (for development/demo purposes)
export * from "./test-components";
export * from "./test-config";
export * from "./kitchen-sink";

// Re-export select Tamagui core exports to avoid conflicts
export {
  TamaguiProvider,
  Theme,
  styled,
  createTamagui,
  Text,
  View,
  XStack,
  YStack,
  ZStack,
  Stack,
  Spacer,
  Square,
  H2,
  Circle,
  Image,
  ScrollView,
} from "tamagui";
