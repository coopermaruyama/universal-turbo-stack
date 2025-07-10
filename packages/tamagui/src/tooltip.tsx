"use client";

import React from "react";
import { 
  styled, 
  Tooltip as TamaguiTooltip,
  Text,
  GetProps,
} from "tamagui";

// Base Tooltip components
const TooltipContent = styled(TamaguiTooltip.Content, {
  name: "ShadcnTooltipContent",

  backgroundColor: "$popover",
  borderColor: "$border",
  borderWidth: 1,
  borderRadius: "$2", // rounded-md
  paddingHorizontal: "$3",
  paddingVertical: "$2",
  
  shadowColor: "$shadowColor",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  
  maxWidth: 300,
  zIndex: 1000,

  // Animation
  enterStyle: {
    scale: 0.95,
    opacity: 0,
  },
  exitStyle: {
    scale: 0.95,
    opacity: 0,
  },
  
  // animation: "$quick", // Temporarily removed
});

const TooltipArrow = styled(TamaguiTooltip.Arrow, {
  name: "ShadcnTooltipArrow",
  borderColor: "$border",
  backgroundColor: "$popover",
  size: "$4",
});

// Tooltip component types
interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  delayDuration?: number;
  disabled?: boolean;
}

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
}

// Tooltip Provider (simplified for Tamagui compatibility)
export const TooltipProvider = React.forwardRef<
  any,
  TooltipProviderProps
>(({ children, delayDuration = 700, skipDelayDuration = 300, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});

TooltipProvider.displayName = "TooltipProvider";

// Main Tooltip component
export const Tooltip = React.forwardRef<
  React.ElementRef<typeof TamaguiTooltip>,
  TooltipProps
>(({ 
  children, 
  content, 
  side = "top", 
  align = "center",
  sideOffset = 4,
  delayDuration = 700,
  disabled = false,
  ...props 
}, ref) => {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <TamaguiTooltip ref={ref} {...props}>
      <TamaguiTooltip.Trigger asChild>
        {children}
      </TamaguiTooltip.Trigger>
      
      <TooltipContent>
        <TooltipArrow />
        {typeof content === "string" ? (
          <Text>{content}</Text>
        ) : (
          content
        )}
      </TooltipContent>
    </TamaguiTooltip>
  );
});

Tooltip.displayName = "Tooltip";

// Simple tooltip for common use cases
interface SimpleTooltipProps {
  children: React.ReactNode;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  disabled?: boolean;
}

export const SimpleTooltip = React.forwardRef<
  React.ElementRef<typeof Tooltip>,
  SimpleTooltipProps
>(({ children, content, side = "top", disabled = false }, ref) => {
  return (
    <Tooltip
      ref={ref}
      content={content}
      side={side}
      disabled={disabled}
    >
      {children}
    </Tooltip>
  );
});

SimpleTooltip.displayName = "SimpleTooltip";

// Export sub-components for advanced usage
export const TooltipTrigger = TamaguiTooltip.Trigger;
export const TooltipContentComponent = TooltipContent;
export const TooltipArrowComponent = TooltipArrow;

export type { TooltipProps, TooltipProviderProps, SimpleTooltipProps };