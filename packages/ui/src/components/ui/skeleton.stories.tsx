import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-80 h-4",
  },
};

export const Card: Story = {
  render: () => (
    <View className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <View className="space-y-2">
        <Skeleton className="h-4 w-60" />
        <Skeleton className="h-4 w-48" />
      </View>
    </View>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <View className="space-y-2">
      <Skeleton className="h-4 w-80" />
      <Skeleton className="h-4 w-72" />
      <Skeleton className="h-4 w-60" />
    </View>
  ),
};

export const ArticleCard: Story = {
  render: () => (
    <View className="w-80 space-y-3">
      <Skeleton className="h-48 w-full rounded-lg" />
      <View className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </View>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View className="space-y-4">
      <Skeleton className="h-2 w-80" />
      <Skeleton className="h-4 w-80" />
      <Skeleton className="h-6 w-80" />
      <Skeleton className="h-8 w-80" />
    </View>
  ),
};
