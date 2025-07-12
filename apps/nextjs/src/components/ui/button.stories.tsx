import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "app/Button",
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
    children: <span>Button</span>,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: <span>Secondary</span>,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: <span>Destructive</span>,
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: <span>Outline</span>,
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: <span>Ghost</span>,
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: <span>Link</span>,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: <span>Small</span>,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: <span>Large</span>,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <span>Disabled</span>,
  },
};
