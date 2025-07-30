"use client";

import { NAV_THEME } from "@acme/ui/lib/constants";
import { cn } from "@acme/ui/lib/utils";
import { Text } from "@acme/ui/text";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { LucideIcon } from "lucide-react-native";
import type * as React from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";

const alertVariants = cva(
  "relative w-full rounded-lg border border-border bg-background p-4 shadow shadow-foreground/10",
  {
    variants: {
      variant: {
        default: "",
        destructive: "border-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  children,
  icon: Icon,
  iconSize = 16,
  iconClassName,
  ...props
}: ViewProps &
  VariantProps<typeof alertVariants> & {
    ref?: React.RefObject<View>;
    icon: LucideIcon;
    iconSize?: number;
    iconClassName?: string;
  }) {
  const colors = NAV_THEME.dark;
  return (
    <View
      role="alert"
      className={alertVariants({ variant, className })}
      {...props}
    >
      <View className="absolute left-3.5 top-4 -translate-y-0.5">
        <Icon
          size={iconSize}
          color={variant === "destructive" ? colors.notification : colors.text}
          className={iconClassName}
        />
      </View>
      {children}
    </View>
  );
}

function AlertTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn(
        "mb-1 pl-7 text-base font-medium leading-none tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn("pl-7 text-sm leading-relaxed text-foreground", className)}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
