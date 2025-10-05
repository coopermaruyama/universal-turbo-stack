import type { LucideIcon } from "lucide-react-native";
import { styled } from "nativewind";

export function iconWithClassName(icon: LucideIcon) {
  return styled(icon, {
    className: {
      target: "style",
      nativeProps: {
        color: true,
        opacity: true,
      },
    },
  });
}
