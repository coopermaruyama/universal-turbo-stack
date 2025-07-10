import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { 
  Tooltip, 
  TooltipProvider,
  SimpleTooltip,
} from "./tooltip";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { YStack, XStack, Text } from "tamagui";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  argTypes: {
    side: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
      description: "The side of the tooltip",
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
      description: "The alignment of the tooltip",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the tooltip is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default tooltip
export const Default: Story = {
  render: (args) => (
    <Tooltip {...args} content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

// Simple tooltip
export const Simple: Story = {
  render: () => (
    <SimpleTooltip content="Add to library">
      <Button variant="outline">Add</Button>
    </SimpleTooltip>
  ),
};

// Different sides
export const Sides: Story = {
  render: () => (
    <YStack gap="$6" alignItems="center" padding="$8">
      <Tooltip content="Top tooltip" side="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      
      <XStack gap="$8" alignItems="center">
        <Tooltip content="Left tooltip" side="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        
        <Tooltip content="Right tooltip" side="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </XStack>
      
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
    </YStack>
  ),
};

// Different alignments
export const Alignments: Story = {
  render: () => (
    <YStack gap="$4" alignItems="center" padding="$8">
      <Tooltip content="Start aligned tooltip" side="bottom" align="start">
        <Button variant="outline">Start</Button>
      </Tooltip>
      
      <Tooltip content="Center aligned tooltip" side="bottom" align="center">
        <Button variant="outline">Center</Button>
      </Tooltip>
      
      <Tooltip content="End aligned tooltip" side="bottom" align="end">
        <Button variant="outline">End</Button>
      </Tooltip>
    </YStack>
  ),
};

// With different content
export const WithContent: Story = {
  render: () => (
    <XStack gap="$4" alignItems="center">
      <Tooltip content="Simple text tooltip">
        <Button variant="outline">Text</Button>
      </Tooltip>
      
      <Tooltip 
        content={
          <YStack gap="$1">
            <Text fontWeight="600">Rich Content</Text>
            <Text fontSize="$2">This tooltip has multiple lines and rich content.</Text>
          </YStack>
        }
      >
        <Button variant="outline">Rich</Button>
      </Tooltip>
      
      <Tooltip content="This is a longer tooltip that demonstrates how the tooltip handles longer text content that might wrap.">
        <Button variant="outline">Long</Button>
      </Tooltip>
    </XStack>
  ),
};

// Disabled tooltip
export const Disabled: Story = {
  render: () => (
    <XStack gap="$4" alignItems="center">
      <Tooltip content="This tooltip is enabled">
        <Button variant="outline">Enabled</Button>
      </Tooltip>
      
      <Tooltip content="This tooltip is disabled" disabled>
        <Button variant="outline">Disabled</Button>
      </Tooltip>
    </XStack>
  ),
};

// Form with tooltips
export const FormExample: Story = {
  render: () => (
    <YStack gap="$4" width={300}>
      <YStack gap="$2">
        <XStack gap="$2" alignItems="center">
          <Label htmlFor="username">Username</Label>
          <Tooltip content="Your username must be unique and between 3-20 characters">
            <Text fontSize="$3" color="$mutedForeground" cursor="help">
              ℹ️
            </Text>
          </Tooltip>
        </XStack>
        <Input id="username" placeholder="Enter username" />
      </YStack>
      
      <YStack gap="$2">
        <XStack gap="$2" alignItems="center">
          <Label htmlFor="email">Email</Label>
          <Tooltip content="We'll use this email for account recovery and notifications">
            <Text fontSize="$3" color="$mutedForeground" cursor="help">
              ℹ️
            </Text>
          </Tooltip>
        </XStack>
        <Input id="email" type="email" placeholder="Enter email" />
      </YStack>
      
      <YStack gap="$2">
        <XStack gap="$2" alignItems="center">
          <Label htmlFor="password">Password</Label>
          <Tooltip 
            content={
              <YStack gap="$1">
                <Text fontWeight="600">Password Requirements:</Text>
                <Text fontSize="$2">• At least 8 characters</Text>
                <Text fontSize="$2">• Include uppercase and lowercase</Text>
                <Text fontSize="$2">• Include at least one number</Text>
                <Text fontSize="$2">• Include special characters</Text>
              </YStack>
            }
          >
            <Text fontSize="$3" color="$mutedForeground" cursor="help">
              ℹ️
            </Text>
          </Tooltip>
        </XStack>
        <Input id="password" type="password" placeholder="Enter password" />
      </YStack>
    </YStack>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    
    return (
      <YStack gap="$4" alignItems="center">
        <Tooltip content={`You've clicked ${count} times`}>
          <Button onPress={() => setCount(c => c + 1)}>
            Click me ({count})
          </Button>
        </Tooltip>
        
        <Tooltip content="Reset the counter">
          <Button variant="outline" onPress={() => setCount(0)}>
            Reset
          </Button>
        </Tooltip>
      </YStack>
    );
  },
};

// Delay examples
export const DelayDuration: Story = {
  render: () => (
    <XStack gap="$4" alignItems="center">
      <Tooltip content="No delay" delayDuration={0}>
        <Button variant="outline">No Delay</Button>
      </Tooltip>
      
      <Tooltip content="Short delay" delayDuration={300}>
        <Button variant="outline">Short Delay</Button>
      </Tooltip>
      
      <Tooltip content="Normal delay" delayDuration={700}>
        <Button variant="outline">Normal Delay</Button>
      </Tooltip>
      
      <Tooltip content="Long delay" delayDuration={1500}>
        <Button variant="outline">Long Delay</Button>
      </Tooltip>
    </XStack>
  ),
};

// Complex layout
export const ComplexLayout: Story = {
  render: () => (
    <YStack gap="$6" padding="$4" alignItems="center">
      <XStack gap="$4" flexWrap="wrap" justifyContent="center">
        <Tooltip content="Save your work">
          <Button variant="outline">Save</Button>
        </Tooltip>
        
        <Tooltip content="Open existing file">
          <Button variant="outline">Open</Button>
        </Tooltip>
        
        <Tooltip content="Create new document">
          <Button variant="outline">New</Button>
        </Tooltip>
        
        <Tooltip content="Export to PDF">
          <Button variant="outline">Export</Button>
        </Tooltip>
      </XStack>
      
      <XStack gap="$4" flexWrap="wrap" justifyContent="center">
        <Tooltip content="Cut selection" side="bottom">
          <Button variant="ghost">Cut</Button>
        </Tooltip>
        
        <Tooltip content="Copy selection" side="bottom">
          <Button variant="ghost">Copy</Button>
        </Tooltip>
        
        <Tooltip content="Paste from clipboard" side="bottom">
          <Button variant="ghost">Paste</Button>
        </Tooltip>
        
        <Tooltip content="Undo last action" side="bottom">
          <Button variant="ghost">Undo</Button>
        </Tooltip>
        
        <Tooltip content="Redo last undone action" side="bottom">
          <Button variant="ghost">Redo</Button>
        </Tooltip>
      </XStack>
    </YStack>
  ),
};