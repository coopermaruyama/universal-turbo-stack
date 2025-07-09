import type { Meta, StoryObj } from "@storybook/react";
import { YStack } from "tamagui";

import {
  ShadcnAlert as Alert,
  ShadcnAlertDescription as AlertDescription,
  ShadcnAlertTitle as AlertTitle,
} from "./alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic default alert
export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

// Destructive variant
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

// Alert with just title
export const TitleOnly: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Success!</AlertTitle>
    </Alert>
  ),
};

// Alert with just description
export const DescriptionOnly: Story = {
  render: () => (
    <Alert>
      <AlertDescription>
        This is a simple alert with only a description.
      </AlertDescription>
    </Alert>
  ),
};

// Multiple alerts showcase
export const AllVariants: Story = {
  render: () => (
    <YStack space="$4" maxWidth={400}>
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert with both title and description.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This is a destructive alert indicating an error or warning.
        </AlertDescription>
      </Alert>

      <Alert>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Here's some important information you should know about.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>Critical Error</AlertTitle>
        <AlertDescription>
          Something went wrong and requires immediate attention. Please check
          your input and try again.
        </AlertDescription>
      </Alert>
    </YStack>
  ),
};

// Long content example
export const LongContent: Story = {
  render: () => (
    <Alert style={{ maxWidth: 500 }}>
      <AlertTitle>Important Update Available</AlertTitle>
      <AlertDescription>
        A new version of the application is available with important security
        updates and bug fixes. We recommend updating as soon as possible to
        ensure optimal performance and security. The update includes
        improvements to the user interface, enhanced data protection, and
        several performance optimizations that will improve your overall
        experience.
      </AlertDescription>
    </Alert>
  ),
};

// Playground story for interactive testing
export const Playground: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Playground Alert</AlertTitle>
      <AlertDescription>
        Use the controls below to test different variants and properties.
      </AlertDescription>
    </Alert>
  ),
};
