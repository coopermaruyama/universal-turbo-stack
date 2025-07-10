"use client";

import React from "react";
import { ChevronDown } from "@tamagui/lucide-icons";
import {
  AnimatePresence,
  Button,
  GetProps,
  styled,
  Text,
  XStack,
  YStack,
} from "tamagui";

// Base Accordion components
const AccordionRoot = styled(YStack, {
  name: "ShadcnAccordionRoot",
  width: "100%",
});

const AccordionItem = styled(YStack, {
  name: "ShadcnAccordionItem",
  borderBottomWidth: 1,
  borderBottomColor: "$border",
});

const AccordionTrigger = styled(Button, {
  name: "ShadcnAccordionTrigger",

  backgroundColor: "transparent",
  borderWidth: 0,
  borderRadius: 0,
  paddingVertical: "$4",
  paddingHorizontal: 0,
  height: "auto",
  minHeight: "$12",

  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",

  fontWeight: "500",
  fontSize: "$4",
  color: "$foreground",
  textAlign: "left",
  cursor: "pointer",

  hoverStyle: {
    backgroundColor: "transparent",
  },

  focusStyle: {
    backgroundColor: "transparent",
    outlineWidth: 0,
    shadowColor: "$ring",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: "$1",
  },

  pressStyle: {
    backgroundColor: "transparent",
  },

  variants: {
    state: {
      open: {},
      closed: {},
    },
  } as const,
});

const AccordionContent = styled(YStack, {
  name: "ShadcnAccordionContent",

  overflow: "hidden",
  paddingBottom: "$4",

  // Remove problematic size variant for now
  paddingHorizontal: "$4",

  // Animation for smooth open/close
  enterStyle: {
    height: 0,
    opacity: 0,
  },
  exitStyle: {
    height: 0,
    opacity: 0,
  },

  // animation: "$bouncy", // Temporarily removed due to type issues
});

const AccordionChevron = styled(ChevronDown, {
  name: "ShadcnAccordionChevron",
  size: 16, // 16px to match shadcn/ui
  color: "$mutedForeground",
  transition: "transform 0.2s ease",

  variants: {
    state: {
      open: {
        transform: "rotate(180deg)",
      },
      closed: {
        transform: "rotate(0deg)",
      },
    },
  } as const,
});

// Accordion component types
interface AccordionProps extends GetProps<typeof AccordionRoot> {
  children: React.ReactNode;
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
}

interface AccordionItemProps extends GetProps<typeof AccordionItem> {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
}

interface AccordionTriggerProps extends GetProps<typeof AccordionTrigger> {
  children: React.ReactNode;
}

interface AccordionContentProps extends GetProps<typeof AccordionContent> {
  children: React.ReactNode;
}

// Context for accordion state
interface AccordionContextValue {
  type: "single" | "multiple";
  value: string | string[] | undefined;
  onValueChange: (value: string | string[] | undefined) => void;
  collapsible: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null,
);

// Context for accordion item
interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  onToggle: () => void;
  disabled: boolean;
}

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

// Custom hooks
const useAccordion = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an Accordion");
  }
  return context;
};

const useAccordionItem = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error("useAccordionItem must be used within an AccordionItem");
  }
  return context;
};

// Main Accordion component
export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionRoot>,
  AccordionProps
>(
  (
    {
      children,
      type = "single",
      collapsible = false,
      defaultValue,
      value: controlledValue,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = React.useCallback(
      (newValue: string | string[] | undefined) => {
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [controlledValue, onValueChange],
    );

    const contextValue: AccordionContextValue = React.useMemo(
      () => ({
        type,
        value,
        onValueChange: handleValueChange,
        collapsible,
      }),
      [type, value, handleValueChange, collapsible],
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <AccordionRoot ref={ref} {...props}>
          {children}
        </AccordionRoot>
      </AccordionContext.Provider>
    );
  },
);

Accordion.displayName = "Accordion";

// AccordionItem component
export const AccordionItemComponent = React.forwardRef<
  React.ElementRef<typeof AccordionItem>,
  AccordionItemProps
>(({ children, value, disabled = false, ...props }, ref) => {
  const {
    type,
    value: accordionValue,
    onValueChange,
    collapsible,
  } = useAccordion();

  const isOpen = React.useMemo(() => {
    if (type === "single") {
      return accordionValue === value;
    } else {
      return Array.isArray(accordionValue) && accordionValue.includes(value);
    }
  }, [type, accordionValue, value]);

  const onToggle = React.useCallback(() => {
    if (disabled) return;

    if (type === "single") {
      const newValue = isOpen && collapsible ? undefined : value;
      onValueChange(newValue);
    } else {
      const currentArray = Array.isArray(accordionValue) ? accordionValue : [];
      const newValue = isOpen
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];
      onValueChange(newValue);
    }
  }, [
    type,
    accordionValue,
    value,
    isOpen,
    collapsible,
    disabled,
    onValueChange,
  ]);

  const contextValue: AccordionItemContextValue = React.useMemo(
    () => ({
      value,
      isOpen,
      onToggle,
      disabled,
    }),
    [value, isOpen, onToggle, disabled],
  );

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <AccordionItem ref={ref} {...props}>
        {children}
      </AccordionItem>
    </AccordionItemContext.Provider>
  );
});

AccordionItemComponent.displayName = "AccordionItem";

// AccordionTrigger component
export const AccordionTriggerComponent = React.forwardRef<
  React.ElementRef<typeof AccordionTrigger>,
  AccordionTriggerProps
>(({ children, ...props }, ref) => {
  const { isOpen, onToggle, disabled } = useAccordionItem();

  return (
    <AccordionTrigger
      ref={ref}
      state={isOpen ? "open" : "closed"}
      disabled={disabled}
      onPress={onToggle}
      {...props}
    >
      <Text flex={1} textAlign="left">
        {children}
      </Text>
      <AccordionChevron state={isOpen ? "open" : "closed"} />
    </AccordionTrigger>
  );
});

AccordionTriggerComponent.displayName = "AccordionTrigger";

// AccordionContent component
export const AccordionContentComponent = React.forwardRef<
  React.ElementRef<typeof AccordionContent>,
  AccordionContentProps
>(({ children, ...props }, ref) => {
  const { isOpen } = useAccordionItem();

  return (
    <AnimatePresence>
      {isOpen && (
        <AccordionContent ref={ref} {...props}>
          <Text fontSize="$4" color="$mutedForeground" lineHeight="$5">
            {children}
          </Text>
        </AccordionContent>
      )}
    </AnimatePresence>
  );
});

AccordionContentComponent.displayName = "AccordionContent";

// Export with cleaner names
export { AccordionItemComponent as AccordionItem };
export { AccordionTriggerComponent as AccordionTrigger };
export { AccordionContentComponent as AccordionContent };

// Simple Accordion for common use cases
interface SimpleAccordionProps {
  items: Array<{
    value: string;
    title: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
  }>;
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
}

export const SimpleAccordion = React.forwardRef<
  React.ElementRef<typeof Accordion>,
  SimpleAccordionProps
>(({ items, ...accordionProps }, ref) => {
  return (
    <Accordion ref={ref} {...accordionProps}>
      {items.map((item) => (
        <AccordionItemComponent
          key={item.value}
          value={item.value}
          disabled={item.disabled}
        >
          <AccordionTriggerComponent>{item.title}</AccordionTriggerComponent>
          <AccordionContentComponent>{item.content}</AccordionContentComponent>
        </AccordionItemComponent>
      ))}
    </Accordion>
  );
});

SimpleAccordion.displayName = "SimpleAccordion";

export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  SimpleAccordionProps,
};
