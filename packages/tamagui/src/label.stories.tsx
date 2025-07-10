import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "./input";
import { YStack, XStack } from "tamagui";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: {
      control: { type: "text" },
      description: "The ID of the form element this label is associated with",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the label appears disabled",
    },
    children: {
      control: { type: "text" },
      description: "The label text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default label
export const Default: Story = {
  args: {
    children: "Label",
  },
};

// With Input
export const WithInput: Story = {
  render: () => (
    <YStack gap="$2" width={300}>
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "A label properly associated with an input field using htmlFor.",
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <YStack gap="$2" width={300}>
      <Label htmlFor="disabled-input" disabled>
        Disabled Field
      </Label>
      <Input id="disabled-input" placeholder="This field is disabled" disabled />
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "A disabled label with a disabled input field.",
      },
    },
  },
};

// Form example with multiple labels
export const FormLabels: Story = {
  render: () => (
    <YStack gap="$4" width={300}>
      <YStack gap="$2">
        <Label htmlFor="first-name">First Name</Label>
        <Input id="first-name" placeholder="John" />
      </YStack>
      
      <YStack gap="$2">
        <Label htmlFor="last-name">Last Name</Label>
        <Input id="last-name" placeholder="Doe" />
      </YStack>
      
      <YStack gap="$2">
        <Label htmlFor="email-form">Email Address</Label>
        <Input id="email-form" type="email" placeholder="john@example.com" />
      </YStack>
      
      <YStack gap="$2">
        <Label htmlFor="phone-form">Phone Number (Optional)</Label>
        <Input id="phone-form" type="tel" placeholder="+1 (555) 123-4567" />
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple labels in a form layout showing proper spacing and association.",
      },
    },
  },
};

// Required field example
export const RequiredField: Story = {
  render: () => (
    <YStack gap="$2" width={300}>
      <XStack gap="$1" alignItems="center">
        <Label htmlFor="required-field">Password</Label>
        <Label style={{ color: 'red' }}>*</Label>
      </XStack>
      <Input id="required-field" type="password" placeholder="Enter your password" />
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "A label with a required field indicator using a red asterisk.",
      },
    },
  },
};

// Different label styles
export const LabelStyles: Story = {
  render: () => (
    <YStack gap="$4" width={300}>
      <YStack gap="$2">
        <Label>Default Label</Label>
        <Input placeholder="Default styling" />
      </YStack>
      
      <YStack gap="$2">
        <Label fontWeight="400">Light Label</Label>
        <Input placeholder="Light font weight" />
      </YStack>
      
      <YStack gap="$2">
        <Label fontWeight="600">Bold Label</Label>
        <Input placeholder="Bold font weight" />
      </YStack>
      
      <YStack gap="$2">
        <Label fontSize="$2">Small Label</Label>
        <Input placeholder="Small label size" />
      </YStack>
      
      <YStack gap="$2">
        <Label fontSize="$4">Large Label</Label>
        <Input placeholder="Large label size" />
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Labels with different font weights and sizes for various use cases.",
      },
    },
  },
};

// Inline label example
export const InlineLabel: Story = {
  render: () => (
    <XStack gap="$3" alignItems="center" width={300}>
      <Label htmlFor="inline-input" minWidth={80}>
        Username:
      </Label>
      <Input id="inline-input" placeholder="Enter username" flex={1} />
    </XStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "An inline label layout where the label appears beside the input.",
      },
    },
  },
};

// Help text with label
export const WithHelpText: Story = {
  render: () => (
    <YStack gap="$2" width={300}>
      <Label htmlFor="help-input">Display Name</Label>
      <Input id="help-input" placeholder="Enter your display name" />
      <Label fontSize="$2" color="$mutedForeground" fontWeight="400">
        This will be shown publicly on your profile.
      </Label>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "A label with help text providing additional context for the user.",
      },
    },
  },
};