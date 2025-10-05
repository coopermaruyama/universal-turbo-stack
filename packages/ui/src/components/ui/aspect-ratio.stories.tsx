import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "UI/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <AspectRatio {...args}>
      <View className="w-80 bg-muted rounded-md flex items-center justify-center">
        <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-md" />
      </View>
    </AspectRatio>
  ),
};

export const Square: Story = {
  args: {
    ratio: 1,
  },
  render: (args) => (
    <AspectRatio {...args}>
      <View className="w-60 bg-muted rounded-md flex items-center justify-center">
        <View className="w-full h-full bg-gradient-to-br from-green-400 to-blue-600 rounded-md" />
      </View>
    </AspectRatio>
  ),
};

export const Portrait: Story = {
  args: {
    ratio: 3 / 4,
  },
  render: (args) => (
    <AspectRatio {...args}>
      <View className="w-60 bg-muted rounded-md flex items-center justify-center">
        <View className="w-full h-full bg-gradient-to-br from-pink-400 to-red-600 rounded-md" />
      </View>
    </AspectRatio>
  ),
};

export const Landscape: Story = {
  args: {
    ratio: 21 / 9,
  },
  render: (args) => (
    <AspectRatio {...args}>
      <View className="w-80 bg-muted rounded-md flex items-center justify-center">
        <View className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-600 rounded-md" />
      </View>
    </AspectRatio>
  ),
};
