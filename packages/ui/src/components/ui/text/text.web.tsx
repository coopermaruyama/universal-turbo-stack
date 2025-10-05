// mockServerContext.ts

import type { ReactNode } from "react";

import type { TextProps } from "react-native";
// import { Text as RNText } from "react-native";

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

// const Text = (props: TextProps) => <div {...props}>{props.children}</div>;

function Text({ children, style, ...props }: TextProps) {
  return (
    <div {...props} style={(style as any) || undefined}>
      {children}
    </div>
  );
}

export { Text, TextClassContext };
