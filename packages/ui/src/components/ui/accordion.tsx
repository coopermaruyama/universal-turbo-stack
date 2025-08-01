"use client";

import { cn } from "@acme/ui/lib/utils";
import { TextClassContext } from "@acme/ui/text";
import * as AccordionPrimitive from "@rn-primitives/accordion";
import type * as React from "react";
import { Platform, Pressable, View } from "react-native";
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOutUp,
  interpolate,
  LayoutAnimationConfig,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import { ChevronDown } from "../../lib/icons/ChevronDown";

function Accordion({
  children,
  ...props
}: Omit<AccordionPrimitive.RootProps, "asChild"> & {
  ref?: React.RefObject<AccordionPrimitive.RootRef>;
}) {
  return (
    <LayoutAnimationConfig skipEntering>
      <AccordionPrimitive.Root
        {...(props as AccordionPrimitive.RootProps)}
        asChild={Platform.OS !== "web"}
      >
        <Animated.View layout={LinearTransition.duration(200)}>
          {children}
        </Animated.View>
      </AccordionPrimitive.Root>
    </LayoutAnimationConfig>
  );
}

function AccordionItem({
  className,
  value,
  ...props
}: AccordionPrimitive.ItemProps & {
  ref?: React.RefObject<AccordionPrimitive.ItemRef>;
}) {
  return (
    <Animated.View
      className={"overflow-hidden"}
      layout={LinearTransition.duration(200)}
    >
      <AccordionPrimitive.Item
        className={cn("border-b border-border", className)}
        value={value}
        {...props}
      />
    </Animated.View>
  );
}

const Trigger = Platform.OS === "web" ? View : Pressable;

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.TriggerProps & {
  children?: React.ReactNode;
  ref?: React.RefObject<AccordionPrimitive.TriggerRef>;
}) {
  const { isExpanded } = AccordionPrimitive.useItemContext();

  const progress = useDerivedValue(
    () =>
      isExpanded
        ? withTiming(1, { duration: 250 })
        : withTiming(0, { duration: 200 }),
    [isExpanded],
  );
  const chevronStyle = useAnimatedStyle(
    () => ({
      transform: [{ rotate: `${progress.value * 180}deg` }],
      opacity: interpolate(
        progress.value,
        [0, 1],
        [1, 0.8],
        Extrapolation.CLAMP,
      ),
    }),
    [progress],
  );

  return (
    <TextClassContext.Provider value="native:text-lg font-medium web:group-hover:underline">
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger {...props} asChild>
          <Trigger
            className={cn(
              "web:flex-1 web:transition-all web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-muted-foreground group flex flex-row items-center justify-between py-4",
              className,
            )}
          >
            {children}
            <Animated.View style={chevronStyle}>
              <ChevronDown
                size={18}
                style={{ flexShrink: 0 }}
                className={"text-foreground"}
              />
            </Animated.View>
          </Trigger>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextClassContext.Provider>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.ContentProps & {
  ref?: React.RefObject<AccordionPrimitive.ContentRef>;
}) {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  return (
    <TextClassContext.Provider value="native:text-lg">
      <AccordionPrimitive.Content
        className={cn(
          "web:transition-all overflow-hidden text-sm",
          isExpanded
            ? "web:animate-accordion-down"
            : "web:animate-accordion-up",
        )}
        {...props}
      >
        <InnerContent className={cn("pb-4", className)}>
          {children}
        </InnerContent>
      </AccordionPrimitive.Content>
    </TextClassContext.Provider>
  );
}

function InnerContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  if (Platform.OS === "web") {
    return <View className={cn("pb-4", className)}>{children}</View>;
  }
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOutUp.duration(200)}
      className={cn("pb-4", className)}
    >
      {children}
    </Animated.View>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
