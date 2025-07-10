"use client";

import React from "react";
import { GetProps, styled, Input as TamaguiInput, TextArea as TamaguiTextArea } from "tamagui";

// Base Input styled component matching shadcn exactly
const InputBase = styled(TamaguiInput, {
  name: "ShadcnInput",

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
  placeholderTextColor: "$mutedForeground",

  // Transition for smooth interactions
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",

  // Focus ring matching shadcn's focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
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

  // File input styling
  variants: {
    variant: {
      default: {},
      file: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        paddingLeft: 0,
        height: "auto",
        fontSize: "$3",
        cursor: "pointer",
        focusStyle: {
          borderColor: "transparent",
          shadowOpacity: 0,
        },
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
  },
});

// Base TextArea styled component
const TextAreaBase = styled(TamaguiTextArea, {
  name: "ShadcnTextArea",

  // Base styling to match shadcn exactly
  backgroundColor: "$background",
  borderColor: "$input",
  borderWidth: 1,
  borderRadius: "$2", // rounded-md

  paddingHorizontal: "$3", // px-3
  paddingVertical: "$2", // py-2
  minHeight: "$20", // min-h-20
  width: "100%", // w-full

  fontSize: "$4", // text-sm
  color: "$foreground",
  placeholderTextColor: "$mutedForeground",

  // Transition for smooth interactions
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",

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

  // resize: "vertical", // Not supported in React Native
});

// Input component types
interface ShadcnInputProps extends GetProps<typeof InputBase> {
  type?: string;
  variant?: 'default' | 'file';
}

// TextArea component types
interface ShadcnTextAreaProps extends GetProps<typeof TextAreaBase> {
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

// Input component
export const Input = React.forwardRef<
  React.ElementRef<typeof InputBase>,
  ShadcnInputProps
>(({ variant = "default", ...props }, ref) => {
  return <InputBase ref={ref} variant={variant} {...props} />;
});

Input.displayName = "Input";

// TextArea component
export const TextArea = React.forwardRef<
  React.ElementRef<typeof TextAreaBase>,
  ShadcnTextAreaProps
>((props, ref) => {
  return <TextAreaBase ref={ref} {...props} />;
});

TextArea.displayName = "TextArea";

export type InputProps = ShadcnInputProps;
export type TextAreaProps = ShadcnTextAreaProps;
