import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: { type: "text" },
    },
    value: {
      control: { type: "text" },
    },
    editable: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  args: {
    value: "Hello World",
    placeholder: "Enter text...",
  },
};

export const Disabled: Story = {
  args: {
    value: "Disabled input",
    editable: false,
  },
};

export const Email: Story = {
  args: {
    placeholder: "Enter your email",
    keyboardType: "email-address",
    autoComplete: "email",
  },
};

export const Password: Story = {
  args: {
    placeholder: "Enter your password",
    secureTextEntry: true,
  },
};
