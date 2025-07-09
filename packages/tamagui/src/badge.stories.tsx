import type { Meta, StoryObj } from "@storybook/react";
import { XStack, YStack } from "tamagui";

import { ShadcnBadge as Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline"],
    },
    onPress: {
      action: "pressed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic default badge
export const Default: Story = {
  render: () => <Badge>Badge</Badge>,
};

// Secondary variant
export const Secondary: Story = {
  render: () => <Badge variant="secondary">Secondary</Badge>,
};

// Destructive variant
export const Destructive: Story = {
  render: () => <Badge variant="destructive">Destructive</Badge>,
};

// Outline variant
export const Outline: Story = {
  render: () => <Badge variant="outline">Outline</Badge>,
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <XStack space="$2" flexWrap="wrap">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </XStack>
  ),
};

// Different content examples
export const ContentExamples: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start">
      {/* Status badges */}
      <XStack space="$2" flexWrap="wrap">
        <Badge variant="secondary">Active</Badge>
        <Badge variant="outline">Inactive</Badge>
        <Badge variant="destructive">Error</Badge>
        <Badge>Success</Badge>
      </XStack>

      {/* Numeric badges */}
      <XStack space="$2" flexWrap="wrap">
        <Badge variant="outline">1</Badge>
        <Badge variant="secondary">12</Badge>
        <Badge>99+</Badge>
        <Badge variant="destructive">!</Badge>
      </XStack>

      {/* Category badges */}
      <XStack space="$2" flexWrap="wrap">
        <Badge variant="outline">React</Badge>
        <Badge variant="secondary">TypeScript</Badge>
        <Badge>Frontend</Badge>
        <Badge variant="outline">Mobile</Badge>
      </XStack>

      {/* Priority badges */}
      <XStack space="$2" flexWrap="wrap">
        <Badge variant="destructive">High Priority</Badge>
        <Badge variant="outline">Medium Priority</Badge>
        <Badge variant="secondary">Low Priority</Badge>
      </XStack>
    </YStack>
  ),
};

// Interactive badges (with onPress)
export const Interactive: Story = {
  render: () => (
    <XStack space="$2" flexWrap="wrap">
      <Badge onPress={() => console.log("Default badge pressed")}>
        Clickable Default
      </Badge>
      <Badge
        variant="secondary"
        onPress={() => console.log("Secondary badge pressed")}
      >
        Clickable Secondary
      </Badge>
      <Badge
        variant="outline"
        onPress={() => console.log("Outline badge pressed")}
      >
        Clickable Outline
      </Badge>
    </XStack>
  ),
};

// Long text example
export const LongText: Story = {
  render: () => (
    <YStack space="$2" alignItems="flex-start">
      <Badge>Very Long Badge Text That Might Wrap</Badge>
      <Badge variant="secondary">Another Long Badge Example</Badge>
      <Badge variant="outline">Outline With Long Content</Badge>
    </YStack>
  ),
};

// Playground story for interactive testing
export const Playground: Story = {
  args: {
    variant: "default",
    children: "Playground Badge",
  },
  render: (args) => <Badge {...args} />,
};
