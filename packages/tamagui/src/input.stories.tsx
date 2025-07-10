import type { Meta, StoryObj } from "@storybook/react";
import { Input, TextArea } from "./input";
import { Label } from "./label";
import { YStack } from "tamagui";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url", "search", "file"],
      description: "The input type",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "file"],
      description: "The input variant",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default input
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    type: "text",
  },
};

// Email input
export const Email: Story = {
  args: {
    placeholder: "Enter your email",
    type: "email",
  },
};

// Password input
export const Password: Story = {
  args: {
    placeholder: "Enter your password",
    type: "password",
  },
};

// Disabled input
export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

// With Label
export const WithLabel: Story = {
  render: () => (
    <YStack gap="$2" width={300}>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </YStack>
  ),
};

// File input
export const File: Story = {
  args: {
    type: "file",
    variant: "file",
  },
};

// Form example
export const FormExample: Story = {
  render: () => (
    <YStack gap="$4" width={300}>
      <YStack gap="$2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Doe" />
      </YStack>
      
      <YStack gap="$2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </YStack>
      
      <YStack gap="$2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
      </YStack>
      
      <YStack gap="$2">
        <Label htmlFor="website">Website</Label>
        <Input id="website" type="url" placeholder="https://example.com" />
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "A complete form example with various input types and labels.",
      },
    },
  },
};

// All input types
export const InputTypes: Story = {
  render: () => (
    <YStack gap="$3" width={300}>
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
      <Input type="search" placeholder="Search input" />
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different HTML input types demonstrating various input behaviors.",
      },
    },
  },
};

// States
export const States: Story = {
  render: () => (
    <YStack gap="$3" width={300}>
      <YStack gap="$2">
        <Label>Default</Label>
        <Input placeholder="Default state" />
      </YStack>
      
      <YStack gap="$2">
        <Label>Disabled</Label>
        <Input placeholder="Disabled state" disabled />
      </YStack>
      
      <YStack gap="$2">
        <Label>With Value</Label>
        <Input defaultValue="Input with value" />
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different input states including default, disabled, and filled.",
      },
    },
  },
};

// TextArea Stories
const textAreaMeta: Meta<typeof TextArea> = {
  title: "UI/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the textarea is disabled",
    },
    resize: {
      control: { type: "select" },
      options: ["none", "vertical", "horizontal", "both"],
      description: "Resize behavior",
    },
  },
};

type TextAreaStory = StoryObj<typeof textAreaMeta>;

// Default TextArea
export const TextAreaDefault: TextAreaStory = {
  args: {
    placeholder: "Enter your message...",
  },
  parameters: {
    docs: {
      description: {
        story: "A basic textarea for multi-line text input.",
      },
    },
  },
};

// TextArea with Label
export const TextAreaWithLabel: TextAreaStory = {
  render: () => (
    <YStack gap="$2" width={400}>
      <Label htmlFor="message">Message</Label>
      <TextArea 
        id="message" 
        placeholder="Enter your message here..."
        minHeight={100}
      />
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "TextArea with a label for better accessibility.",
      },
    },
  },
};

// TextArea Disabled
export const TextAreaDisabled: TextAreaStory = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "A disabled textarea that cannot be edited.",
      },
    },
  },
};

// TextArea with different sizes
export const TextAreaSizes: TextAreaStory = {
  render: () => (
    <YStack gap="$4" width={400}>
      <YStack gap="$2">
        <Label>Small (min-height: 80px)</Label>
        <TextArea placeholder="Small textarea" minHeight={80} />
      </YStack>
      
      <YStack gap="$2">
        <Label>Medium (default)</Label>
        <TextArea placeholder="Medium textarea" />
      </YStack>
      
      <YStack gap="$2">
        <Label>Large (min-height: 150px)</Label>
        <TextArea placeholder="Large textarea" minHeight={150} />
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "TextAreas with different minimum heights.",
      },
    },
  },
};

// Contact form example
export const ContactForm: TextAreaStory = {
  render: () => (
    <YStack gap="$4" width={400}>
      <YStack gap="$2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="What's this about?" />
      </YStack>
      
      <YStack gap="$2">
        <Label htmlFor="description">Description</Label>
        <TextArea 
          id="description" 
          placeholder="Please provide details..."
          minHeight={120}
        />
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: "A typical contact form with input and textarea.",
      },
    },
  },
};