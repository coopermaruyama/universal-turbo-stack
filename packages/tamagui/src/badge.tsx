"use client";

import React from "react";
import { GetProps, styled } from "@tamagui/core";
import { Text } from "tamagui";

// Define variant types
type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

// Base Badge component using Text for inline behavior
export const Badge = styled(Text, {
  name: "ShadcnBadge",

  // Base styling matching shadcn exactly
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "$true", // rounded-full (using true for maximum rounding)
  borderWidth: 1,
  paddingHorizontal: "$2.5", // px-2.5 (10px)
  paddingVertical: "$0.5", // py-0.5 (2px)
  
  // Typography matching shadcn: text-xs font-semibold
  fontSize: "$2", // text-xs (12px)
  fontWeight: "600", // font-semibold
  lineHeight: 1,
  
  // Transitions and interactions
  cursor: "default",
  userSelect: "none",

  // Focus states for accessibility
  focusStyle: {
    shadowColor: "$ring",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    borderColor: "$ring",
    borderWidth: 2,
  },

  variants: {
    variant: {
      default: {
        backgroundColor: "$primary",
        borderColor: "transparent",
        color: "$primaryForeground",
        // Hover effect: 80% opacity (primary/80)
        hoverStyle: {
          opacity: 0.8,
        },
        pressStyle: {
          opacity: 0.8,
        },
      },
      secondary: {
        backgroundColor: "$secondary",
        borderColor: "transparent", 
        color: "$secondaryForeground",
        // Hover effect: 80% opacity (secondary/80)
        hoverStyle: {
          opacity: 0.8,
        },
        pressStyle: {
          opacity: 0.8,
        },
      },
      destructive: {
        backgroundColor: "$destructive",
        borderColor: "transparent",
        color: "$destructiveForeground", 
        // Hover effect: 80% opacity (destructive/80)
        hoverStyle: {
          opacity: 0.8,
        },
        pressStyle: {
          opacity: 0.8,
        },
      },
      outline: {
        backgroundColor: "transparent",
        borderColor: "$border",
        color: "$foreground",
        // No hover effect for outline variant
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
  },
});

// Main Badge component with proper types
interface ShadcnBadgeProps extends GetProps<typeof Badge> {
  variant?: BadgeVariant;
  children?: React.ReactNode;
  onPress?: () => void;
}

export const ShadcnBadge = React.forwardRef<
  any,
  ShadcnBadgeProps
>(({ variant = "default", children, onPress, ...props }, ref) => {
  return (
    <Badge 
      ref={ref} 
      variant={variant} 
      onPress={onPress}
      {...props}
    >
      {children}
    </Badge>
  );
});

// Set display name
ShadcnBadge.displayName = "Badge";

// Export types
export type BadgeProps = ShadcnBadgeProps;