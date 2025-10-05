import { cn } from "../../lib/utils";
import * as Slot from "@rn-primitives/slot";
import type * as React from "react";
import { Platform, Text as RNText } from "react-native";

type TypographyProps = React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  asChild?: boolean;
};

function H1({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      role="heading"
      aria-level="1"
      className={cn(
        "web:scroll-m-20 web:select-text text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
}

function H2({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      role="heading"
      aria-level="2"
      className={cn(
        "web:scroll-m-20 web:select-text border-b border-border pb-2 text-3xl font-semibold tracking-tight text-foreground first:mt-0",
        className,
      )}
      {...props}
    />
  );
}

function H3({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      role="heading"
      aria-level="3"
      className={cn(
        "web:scroll-m-20 web:select-text text-2xl font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function H4({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      role="heading"
      aria-level="4"
      className={cn(
        "web:scroll-m-20 web:select-text text-xl font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function P({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn("web:select-text text-base text-foreground", className)}
      {...props}
    />
  );
}

function BlockQuote({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      // @ts-ignore - role of blockquote renders blockquote element on the web
      role={Platform.OS === "web" ? "blockquote" : undefined}
      className={cn(
        "native:mt-4 native:pl-3 web:select-text mt-6 border-l-2 border-border pl-6 text-base italic text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function Code({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      // @ts-ignore - role of code renders code element on the web
      role={Platform.OS === "web" ? "code" : undefined}
      className={cn(
        "web:select-text relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] text-sm font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function Lead({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn("web:select-text text-xl text-muted-foreground", className)}
      {...props}
    />
  );
}

function Large({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn(
        "web:select-text text-xl font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function Small({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn(
        "web:select-text text-sm font-medium leading-none text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function Muted({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn("web:select-text text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small };
