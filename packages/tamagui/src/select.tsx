"use client";

import React from "react";
import { 
  styled, 
  Select as TamaguiSelect,
  Adapt,
  Sheet,
  YStack,
  XStack,
  Text
} from "tamagui";
import { ChevronDown, ChevronUp, Check } from "@tamagui/lucide-icons";

// Base Select styled components
const SelectTrigger = styled(TamaguiSelect.Trigger, {
  name: "ShadcnSelectTrigger",

  // Base styling to match shadcn exactly
  backgroundColor: "$background",
  borderColor: "$input",
  borderWidth: 1,
  borderRadius: "$2", // rounded-md

  paddingHorizontal: "$3", // px-3
  paddingVertical: "$2", // py-2
  height: "$10", // h-10
  width: "100%", // w-full

  fontSize: "$4", // text-sm
  color: "$foreground",
  cursor: "pointer",

  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  gap: "$2",

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

  // Hover style
  hoverStyle: {
    borderColor: "$input",
  },

  disabledStyle: {
    cursor: "not-allowed",
    opacity: 0.5,
  },

  // Placeholder styling
  variants: {
    hasValue: {
      true: {
        color: "$foreground",
      },
      false: {
        color: "$mutedForeground",
      },
    },
  } as const,
});

const SelectValue = styled(TamaguiSelect.Value, {
  name: "ShadcnSelectValue",
  placeholder: "Select...",
  flex: 1,
  textAlign: "left",
});

const SelectIcon = styled(TamaguiSelect.Icon, {
  name: "ShadcnSelectIcon",
  width: "$4",
  height: "$4",
});

const SelectContent = styled(TamaguiSelect.Content, {
  name: "ShadcnSelectContent",
  backgroundColor: "$popover",
  borderColor: "$border",
  borderWidth: 1,
  borderRadius: "$2",
  padding: "$1",
  shadowColor: "$shadowColor",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  zIndex: 1000,
  maxHeight: 300,
  overflow: "hidden",
});

const SelectViewport = styled(TamaguiSelect.Viewport, {
  name: "ShadcnSelectViewport",
  padding: 0,
});

const SelectItem = styled(TamaguiSelect.Item, {
  name: "ShadcnSelectItem",
  backgroundColor: "transparent",
  borderRadius: "$1",
  padding: "$2",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  minHeight: "$8",

  hoverStyle: {
    backgroundColor: "$accent",
  },

  focusStyle: {
    backgroundColor: "$accent",
    outlineWidth: 0,
  },

  pressStyle: {
    backgroundColor: "$accent",
  },
});

const SelectItemText = styled(TamaguiSelect.ItemText, {
  name: "ShadcnSelectItemText",
  flex: 1,
});

const SelectItemIndicator = styled(TamaguiSelect.ItemIndicator, {
  name: "ShadcnSelectItemIndicator",
  width: "$4",
  height: "$4",
});

const SelectSeparator = styled(YStack, {
  name: "ShadcnSelectSeparator",
  height: 1,
  backgroundColor: "$border",
  marginVertical: "$1",
});

const SelectLabel = styled(TamaguiSelect.Label, {
  name: "ShadcnSelectLabel",
  fontSize: "$3",
  fontWeight: "600",
  color: "$foreground",
  paddingHorizontal: "$2",
  paddingVertical: "$1",
  marginTop: "$1",
});

const SelectGroup = styled(TamaguiSelect.Group, {
  name: "ShadcnSelectGroup",
});

const SelectScrollUpButton = styled(TamaguiSelect.ScrollUpButton, {
  name: "ShadcnSelectScrollUpButton",
  alignItems: "center",
  justifyContent: "center",
  height: "$6",
  backgroundColor: "$popover",
  cursor: "default",
});

const SelectScrollDownButton = styled(TamaguiSelect.ScrollDownButton, {
  name: "ShadcnSelectScrollDownButton",
  alignItems: "center",
  justifyContent: "center",
  height: "$6",
  backgroundColor: "$popover",
  cursor: "default",
});

// Main Select component
interface SelectProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

export const Select = React.forwardRef<
  React.ElementRef<typeof TamaguiSelect>,
  SelectProps
>(({ children, placeholder = "Select...", size = "default", ...props }, ref) => {
  return (
    <TamaguiSelect {...props}>
      <SelectTrigger hasValue={!!props.value || !!props.defaultValue}>
        <SelectValue placeholder={placeholder} />
        <SelectIcon>
          <ChevronDown />
        </SelectIcon>
      </SelectTrigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={false}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            // animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <SelectContent>
        <SelectScrollUpButton>
          <ChevronUp />
        </SelectScrollUpButton>
        <SelectViewport>
          {children}
        </SelectViewport>
        <SelectScrollDownButton>
          <ChevronDown />
        </SelectScrollDownButton>
      </SelectContent>
    </TamaguiSelect>
  );
});

Select.displayName = "Select";

// Export all sub-components
export {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectSeparator,
  SelectLabel,
  SelectGroup,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

export type { SelectProps };