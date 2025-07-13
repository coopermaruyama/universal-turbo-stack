"use client";

import type { TextProps } from "react-native";
import * as React from "react";
// mockServerContext.ts
import { ReactNode } from "react";
import * as Slot from "@rn-primitives/slot";

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
