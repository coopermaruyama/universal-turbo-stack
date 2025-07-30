"use client";

// mockServerContext.ts
import type { ReactNode } from "react";
import type { TextProps } from "react-native";

export interface MockContext<T> {
  Provider: (props: { value: T; children: ReactNode }) => ReactNode;
  use: () => T;
}

export function createMockContext<T>(defaultValue: T): MockContext<T> {
  let currentValue = defaultValue;

  return {
    Provider: ({ value, children }) => {
      currentValue = value;
      return children;
    },
    use: () => currentValue,
  };
}

const TextClassContext = createMockContext<string | undefined>(undefined);

const Text = (props: TextProps) => props.children;

export { Text, TextClassContext };
