import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import { Text } from "./text";

const meta: Meta<typeof Text> = {
  title: "UI/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    asChild: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
  },
};

export const Small: Story = {
  args: {
    children: "Small text example",
    className: "text-sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large text example",
    className: "text-lg",
  },
};

export const Bold: Story = {
  args: {
    children: "Bold text example",
    className: "font-bold",
  },
};

export const Muted: Story = {
  args: {
    children: "Muted text example",
    className: "text-muted-foreground",
  },
};

export const Destructive: Story = {
  args: {
    children: "Error message",
    className: "text-destructive",
  },
};

export const Paragraph: Story = {
  render: () => (
    <View className="w-80 space-y-2">
      <Text className="text-lg font-semibold">Lorem Ipsum</Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris.
      </Text>
      <Text className="text-sm text-muted-foreground">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </Text>
    </View>
  ),
};
