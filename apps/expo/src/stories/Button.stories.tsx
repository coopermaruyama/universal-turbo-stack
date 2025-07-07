import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import { Button } from "@acme/ui/button";
import { Text } from "@acme/ui/text";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Button {...args}>
      <Text>Press me</Text>
    </Button>
  ),
  args: {
    variant: "default",
    size: "default",
    disabled: false,
  },
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button>
        <Text>Default</Text>
      </Button>
      <Button variant="secondary">
        <Text>Secondary</Text>
      </Button>
      <Button variant="destructive">
        <Text>Destructive</Text>
      </Button>
      <Button variant="outline">
        <Text>Outline</Text>
      </Button>
      <Button variant="ghost">
        <Text>Ghost</Text>
      </Button>
      <Button variant="link">
        <Text>Link</Text>
      </Button>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button size="sm">
        <Text>Small</Text>
      </Button>
      <Button size="default">
        <Text>Default</Text>
      </Button>
      <Button size="lg">
        <Text>Large</Text>
      </Button>
    </View>
  ),
};
