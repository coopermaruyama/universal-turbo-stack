import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import { Text } from "./text";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    decorative: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <View className="w-80">
      <View className="space-y-1">
        <Text className="text-sm font-medium leading-none">Radix Primitives</Text>
        <Text className="text-sm text-muted-foreground">
          An open-source UI component library.
        </Text>
      </View>
      <Separator className="my-4" />
      <View className="flex h-5 items-center space-x-4 text-sm">
        <Text>Blog</Text>
        <Separator orientation="vertical" />
        <Text>Docs</Text>
        <Separator orientation="vertical" />
        <Text>Source</Text>
      </View>
    </View>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    className: "w-80",
  },
};

export const Vertical: Story = {
  render: () => (
    <View className="flex h-20 items-center justify-center space-x-4">
      <Text>Left</Text>
      <Separator orientation="vertical" />
      <Text>Right</Text>
    </View>
  ),
};

export const InList: Story = {
  render: () => (
    <View className="w-80 space-y-4">
      <Text className="font-semibold">Navigation Menu</Text>
      <View className="space-y-2">
        <Text>Home</Text>
        <Separator />
        <Text>About</Text>
        <Separator />
        <Text>Services</Text>
        <Separator />
        <Text>Contact</Text>
      </View>
    </View>
  ),
};