"use client";

import React from "react";
import { 
  styled, 
  Tabs as TamaguiTabs,
  Text,
  YStack,
  XStack,
  GetProps,
} from "tamagui";

// Base Tabs components
const TabsListBase = styled(TamaguiTabs.List, {
  name: "ShadcnTabsList",

  backgroundColor: "$muted",
  borderRadius: "$2", // rounded-md
  padding: "$1",
  
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "$1",
  
  width: "auto",
  height: "$10", // h-10
});

const TabsTriggerBase = styled(TamaguiTabs.Trigger, {
  name: "ShadcnTabsTrigger",

  backgroundColor: "transparent",
  borderRadius: "$1", // rounded-sm
  paddingHorizontal: "$3", // px-3
  paddingVertical: "$2", // py-1.5
  
  cursor: "pointer",
  
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  gap: "$2",
  
  minHeight: "$8",
  // whiteSpace: "nowrap", // Not supported in React Native
  // transition: "all 0.2s ease", // Use animations instead

  // Hover state
  hoverStyle: {
  },

  // Focus state
  focusStyle: {
    outlineWidth: 0,
    shadowColor: "$ring",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  // Active/Selected state
  pressStyle: {
    backgroundColor: "$background",
    shadowColor: "$shadowColor",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  // Data state styling (for selected state)
  variants: {
    selected: {
      true: {
        backgroundColor: "$background",
        color: "$foreground",
        shadowColor: "$shadowColor",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
    },
  } as const,

  disabledStyle: {
    pointerEvents: "none",
    opacity: 0.5,
  },
});

const TabsContentBase = styled(TamaguiTabs.Content, {
  name: "ShadcnTabsContent",
  
  marginTop: "$2",
  
  // Focus state
  focusStyle: {
    outlineWidth: 0,
    shadowColor: "$ring",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: "$1",
  },

  // Animation
  enterStyle: {
    opacity: 0,
    y: 10,
  },
  exitStyle: {
    opacity: 0,
    y: -10,
  },
  
  // animation: "$quick", // Temporarily removed
});

// Tabs component types
interface TabsProps extends GetProps<typeof TamaguiTabs> {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
}

interface TabsListProps extends GetProps<typeof TabsListBase> {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps extends GetProps<typeof TabsTriggerBase> {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

interface TabsContentProps extends GetProps<typeof TabsContentBase> {
  children: React.ReactNode;
  value: string;
  className?: string;
}

// Main Tabs component
export const Tabs = React.forwardRef<
  React.ElementRef<typeof TamaguiTabs>,
  TabsProps
>(({ children, orientation = "horizontal", ...props }, ref) => {
  return (
    <TamaguiTabs ref={ref} orientation={orientation} {...props}>
      {children}
    </TamaguiTabs>
  );
});

Tabs.displayName = "Tabs";

// TabsList component
export const TabsListComponent = React.forwardRef<
  React.ElementRef<typeof TabsListBase>,
  TabsListProps
>(({ children, ...props }, ref) => {
  return (
    <TabsListBase ref={ref} {...props}>
      {children}
    </TabsListBase>
  );
});

TabsListComponent.displayName = "TabsList";

// TabsTrigger component
export const TabsTriggerComponent = React.forwardRef<
  React.ElementRef<typeof TabsTriggerBase>,
  TabsTriggerProps
>(({ children, value, ...props }, ref) => {
  return (
    <TabsTriggerBase ref={ref} value={value} {...props}>
      {typeof children === "string" ? (
        <Text>{children}</Text>
      ) : (
        children
      )}
    </TabsTriggerBase>
  );
});

TabsTriggerComponent.displayName = "TabsTrigger";

// TabsContent component
export const TabsContentComponent = React.forwardRef<
  React.ElementRef<typeof TabsContentBase>,
  TabsContentProps
>(({ children, value, ...props }, ref) => {
  return (
    <TabsContentBase ref={ref} value={value} {...props}>
      {children}
    </TabsContentBase>
  );
});

TabsContentComponent.displayName = "TabsContent";

// Export with cleaner names
export { TabsListComponent as TabsList };
export { TabsTriggerComponent as TabsTrigger };
export { TabsContentComponent as TabsContent };

// Compound component for easier usage
interface SimpleTabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  tabs: Array<{
    value: string;
    label: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
  }>;
  orientation?: "horizontal" | "vertical";
}

export const SimpleTabs = React.forwardRef<
  React.ElementRef<typeof Tabs>,
  SimpleTabsProps
>(({ tabs, orientation = "horizontal", ...tabsProps }, ref) => {
  return (
    <Tabs ref={ref} orientation={orientation} {...tabsProps}>
      <TabsListComponent>
        {tabs.map((tab) => (
          <TabsTriggerComponent
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
          >
            {tab.label}
          </TabsTriggerComponent>
        ))}
      </TabsListComponent>
      
      {tabs.map((tab) => (
        <TabsContentComponent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContentComponent>
      ))}
    </Tabs>
  );
});

SimpleTabs.displayName = "SimpleTabs";

export type { 
  TabsProps, 
  TabsListProps, 
  TabsTriggerProps, 
  TabsContentProps,
  SimpleTabsProps
};