"use client";

import React from "react";
import { GetProps, styled } from "@tamagui/core";
import { Text, YStack } from "tamagui";

// Define variant types
type AlertVariant = "default" | "destructive";

// Base Alert container
export const Alert = styled(YStack, {
  name: "ShadcnAlert",

  // Base styling matching shadcn exactly
  position: "relative",
  width: "100%",
  borderRadius: "$4", // rounded-lg
  borderWidth: 1,
  padding: "$4", // p-4

  // Layout
  flexDirection: "column",
  gap: "$2",

  // Accessibility
  role: "alert",

  variants: {
    variant: {
      default: {
        backgroundColor: "$background",
        borderColor: "$border",
        color: "$foreground",
      },
      destructive: {
        backgroundColor: "$background",
        borderColor: "$destructive",
        borderOpacity: 0.5,
        color: "$destructive",
        // In dark mode, use full destructive color for border
        '$platform-web': {
          '@media (prefers-color-scheme: dark)': {
            borderColor: "$destructive",
            borderOpacity: 1,
          },
        },
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
  },
});

// Alert Title component
export const AlertTitle = styled(Text, {
  name: "AlertTitle",

  // Typography matching shadcn: font-medium leading-none tracking-tight
  fontWeight: "500", // font-medium
  lineHeight: 1, // leading-none
  letterSpacing: -0.025, // tracking-tight
  fontSize: "$4", // Base size, roughly h5 equivalent
  marginBottom: "$1", // mb-1

  // Inherit color from parent Alert
  color: "inherit",
});

// Alert Description component  
export const AlertDescription = styled(Text, {
  name: "AlertDescription",

  // Typography matching shadcn: text-sm with relaxed leading
  fontSize: "$3", // text-sm
  lineHeight: 1.6, // relaxed leading for readability

  // Inherit color from parent Alert
  color: "inherit",
});

// Main Alert component with proper types
interface ShadcnAlertProps extends GetProps<typeof Alert> {
  variant?: AlertVariant;
  children?: React.ReactNode;
}

export const ShadcnAlert = React.forwardRef<
  any,
  ShadcnAlertProps
>(({ variant = "default", children, ...props }, ref) => {
  return (
    <Alert ref={ref} variant={variant} {...props}>
      {children}
    </Alert>
  );
});

// Title component with proper types
interface ShadcnAlertTitleProps extends GetProps<typeof AlertTitle> {
  children?: React.ReactNode;
}

export const ShadcnAlertTitle = React.forwardRef<
  any,
  ShadcnAlertTitleProps
>((props, ref) => {
  return <AlertTitle ref={ref} {...props} />;
});

// Description component with proper types
interface ShadcnAlertDescriptionProps extends GetProps<typeof AlertDescription> {
  children?: React.ReactNode;
}

export const ShadcnAlertDescription = React.forwardRef<
  any,
  ShadcnAlertDescriptionProps
>((props, ref) => {
  return <AlertDescription ref={ref} {...props} />;
});

// Set display names
ShadcnAlert.displayName = "Alert";
ShadcnAlertTitle.displayName = "AlertTitle";
ShadcnAlertDescription.displayName = "AlertDescription";

// Export types
export type AlertProps = ShadcnAlertProps;
export type AlertTitleProps = ShadcnAlertTitleProps;
export type AlertDescriptionProps = ShadcnAlertDescriptionProps;