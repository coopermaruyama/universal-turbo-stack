"use client";

import React from "react";
import {
  styled,
  Stack,
  XStack,
  YStack,
  Text,
  Checkbox as TamaguiCheckbox,
  RadioGroup as TamaguiRadioGroup,
  GetProps,
} from "tamagui";
import { Check } from "@tamagui/lucide-icons";

// Base Checkbox styled component
const CheckboxBase = styled(TamaguiCheckbox, {
  name: "ShadcnCheckbox",

  // Base styling to match shadcn exactly
  size: "$4", // h-4 w-4
  backgroundColor: "$background",
  borderColor: "$primary",
  borderWidth: 1,
  borderRadius: "$1", // rounded-sm

  // Focus ring matching shadcn
  focusStyle: {
    borderColor: "$ring",
    borderWidth: 2,
    outlineWidth: 0,
    shadowColor: "$ring",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },


  disabledStyle: {
    cursor: "not-allowed",
    opacity: 0.5,
  },

  hoverStyle: {
    borderColor: "$primary",
  },
});

const CheckboxIndicator = styled(TamaguiCheckbox.Indicator, {
  name: "ShadcnCheckboxIndicator",
  width: "$3",
  height: "$3",
});

// Base RadioGroup components
const RadioGroupBase = styled(TamaguiRadioGroup, {
  name: "ShadcnRadioGroup",
  gap: "$3",
});

const RadioGroupItemBase = styled(TamaguiRadioGroup.Item, {
  name: "ShadcnRadioGroupItem",
  size: "$4", // h-4 w-4
  backgroundColor: "$background",
  borderColor: "$primary",
  borderWidth: 1,
  borderRadius: 999, // rounded-full

  // Focus ring matching shadcn
  focusStyle: {
    borderColor: "$ring",
    borderWidth: 2,
    outlineWidth: 0,
    shadowColor: "$ring",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  disabledStyle: {
    cursor: "not-allowed",
    opacity: 0.5,
  },

  hoverStyle: {
    borderColor: "$primary",
  },
});

const RadioGroupIndicator = styled(TamaguiRadioGroup.Indicator, {
  name: "ShadcnRadioGroupIndicator",
  backgroundColor: "$primary",
  borderRadius: 999,
  width: "$2",
  height: "$2",
});

// Checkbox component types
interface CheckboxProps extends GetProps<typeof CheckboxBase> {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

// RadioGroup component types
interface RadioGroupProps extends GetProps<typeof RadioGroupBase> {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
}

interface RadioGroupItemProps extends GetProps<typeof RadioGroupItemBase> {
  value: string;
  id?: string;
  disabled?: boolean;
}

// Checkbox component
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxBase>,
  CheckboxProps
>((props, ref) => {
  return (
    <CheckboxBase ref={ref} {...props}>
      <CheckboxIndicator>
        <Check />
      </CheckboxIndicator>
    </CheckboxBase>
  );
});

Checkbox.displayName = "Checkbox";

// RadioGroup component
export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupBase>,
  RadioGroupProps
>(({ orientation = "vertical", ...props }, ref) => {
  const Container = orientation === "horizontal" ? XStack : YStack;

  return (
    <Container gap="$3">
      <RadioGroupBase ref={ref} {...props} />
    </Container>
  );
});

RadioGroup.displayName = "RadioGroup";

// RadioGroupItem component
export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupItemBase>,
  RadioGroupItemProps
>((props, ref) => {
  return (
    <RadioGroupItemBase ref={ref} {...props}>
      <RadioGroupIndicator />
    </RadioGroupItemBase>
  );
});

RadioGroupItem.displayName = "RadioGroupItem";

// Compound components for better ergonomics
interface CheckboxWithLabelProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
  description?: string;
}

export const CheckboxWithLabel = React.forwardRef<
  React.ElementRef<typeof CheckboxBase>,
  CheckboxWithLabelProps
>(({ id, label, description, ...checkboxProps }, ref) => {
  return (
    <XStack gap="$2" alignItems="flex-start">
      <Checkbox ref={ref} id={id} {...checkboxProps} />
      <YStack gap="$1" flex={1}>
        <Text
          fontSize="$4"
          fontWeight="500"
          color="$foreground"
          htmlFor={id}
          cursor="pointer"
          userSelect="none"
        >
          {label}
        </Text>
        {description && (
          <Text fontSize="$3" color="$mutedForeground" lineHeight="$1">
            {description}
          </Text>
        )}
      </YStack>
    </XStack>
  );
});

CheckboxWithLabel.displayName = "CheckboxWithLabel";

interface RadioGroupWithLabelProps {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
}

export const RadioGroupWithLabels = React.forwardRef<
  React.ElementRef<typeof RadioGroupBase>,
  RadioGroupWithLabelProps
>(({ options, orientation = "vertical", ...radioGroupProps }, ref) => {
  const Container = orientation === "horizontal" ? XStack : YStack;

  return (
    <RadioGroupBase ref={ref} {...radioGroupProps}>
      <Container gap="$3">
        {options.map((option) => (
          <XStack key={option.value} gap="$2" alignItems="flex-start">
            <RadioGroupItem
              value={option.value}
              id={option.value}
              disabled={option.disabled || radioGroupProps.disabled}
            />
            <YStack gap="$1" flex={1}>
              <Text
                fontSize="$4"
                fontWeight="500"
                color="$foreground"
                htmlFor={option.value}
                cursor="pointer"
                userSelect="none"
                opacity={option.disabled ? 0.5 : 1}
              >
                {option.label}
              </Text>
              {option.description && (
                <Text
                  fontSize="$3"
                  color="$mutedForeground"
                  lineHeight="$1"
                  opacity={option.disabled ? 0.5 : 1}
                >
                  {option.description}
                </Text>
              )}
            </YStack>
          </XStack>
        ))}
      </Container>
    </RadioGroupBase>
  );
});

RadioGroupWithLabels.displayName = "RadioGroupWithLabels";

export type {
  CheckboxProps,
  RadioGroupProps,
  RadioGroupItemProps,
  CheckboxWithLabelProps,
  RadioGroupWithLabelProps as RadioGroupWithLabelProps,
};
