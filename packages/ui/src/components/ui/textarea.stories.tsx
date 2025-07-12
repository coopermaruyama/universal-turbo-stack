import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import { Text } from "./text";
import { Label } from "./label";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: { type: "text" },
    },
    numberOfLines: {
      control: { type: "number" },
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
    placeholder: "Type your message here.",
  },
};

export const WithText: Story = {
  args: {
    value: "This is some sample text in the textarea.",
    placeholder: "Type your message here.",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    editable: false,
  },
};

export const WithLabel: Story = {
  render: () => (
    <View className="grid w-full gap-1.5">
      <Label htmlFor="message">
        <Text>Your message</Text>
      </Label>
      <Textarea placeholder="Type your message here." id="message" />
    </View>
  ),
};

export const WithLabelAndDescription: Story = {
  render: () => (
    <View className="grid w-full gap-1.5">
      <Label htmlFor="message-2">
        <Text>Your message</Text>
      </Label>
      <Textarea 
        placeholder="Type your message here." 
        id="message-2"
        numberOfLines={6}
      />
      <Text className="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </Text>
    </View>
  ),
};

export const Large: Story = {
  args: {
    placeholder: "Tell us about yourself...",
    numberOfLines: 8,
    className: "w-96",
  },
};