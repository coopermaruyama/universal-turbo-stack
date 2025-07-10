"use client";

import React from "react";
import { styled, Switch } from "tamagui";

// Define size types using Tamagui size tokens
type SwitchSize = "sm" | "default" | "lg";

// Map custom sizes to Tamagui size tokens
const sizeMap: Record<SwitchSize, { w: number; h: number }> = {
  sm: { w: 24, h: 14 },
  default: { w: 32, h: 18 },
  lg: { w: 48, h: 30 },
};

// Styled Switch component to match shadcn/ui design
export const StyledSwitch = styled(Switch, {
  name: "ShadcnSwitch",
  minHeight: 0, // Prevents height issues in flex containers

  // Base styling matching shadcn exactly
  borderWidth: 0,
  justifyContent: "center",
  // px: 1,

  // Focus states for accessibility
  // focusStyle: {
  //   outlineColor: "$ring",
  //   outlineWidth: 2,
  //   outlineStyle: "solid",
  //   outlineOffset: 2,
  // },

  // Disabled states
  disabledStyle: {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  // Checked state styling
  variants: {
    checked: {
      true: {
        backgroundColor: "$primary",
        outlineWidth: 1,
        outlineColor: "$primary",
        outlineStyle: "solid",
      },
      false: {
        backgroundColor: "$input",
      },
    },
  } as const,
});

// Main Switch component with proper types
interface ShadcnSwitchProps {
  size?: SwitchSize;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export const ShadcnSwitch = React.forwardRef<any, ShadcnSwitchProps>(
  (
    {
      size = "default",
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledSwitch
        ref={ref}
        width={sizeMap[size].w}
        height={sizeMap[size].h}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        id={id}
        {...props}
      >
        <Switch.Thumb
          width={sizeMap[size].h}
          height={sizeMap[size].h}
          backgroundColor={checked ? "$background" : "$primary"}
          animation={"quicker" as any}
        />
      </StyledSwitch>
    );
  },
);

// Set display name
ShadcnSwitch.displayName = "Switch";

// Export types
export type SwitchProps = ShadcnSwitchProps;
