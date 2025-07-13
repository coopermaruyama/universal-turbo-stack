"use client";

import * as React from "react";
import { Text as RNText } from "react-native";
import * as Slot from "@rn-primitives/slot";

import { cn } from "@acme/ui/lib/utils";

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  asChild?: boolean;
}) {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn(
        "web:select-text text-base text-foreground",
        textClass,
        className,
      )}
      {...props}
    />
  );
}

export { Text, TextClassContext };
