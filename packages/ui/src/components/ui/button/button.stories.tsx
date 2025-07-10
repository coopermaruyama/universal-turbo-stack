import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "../text";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
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
  args: {
    children: <Text>Button</Text>,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: <Text>Secondary</Text>,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: <Text>Destructive</Text>,
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: <Text>Outline</Text>,
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: <Text>Ghost</Text>,
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: <Text>Link</Text>,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: <Text>Small</Text>,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: <Text>Large</Text>,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <Text>Disabled</Text>,
  },
};
