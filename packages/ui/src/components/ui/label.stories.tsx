import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { View } from "react-native";

import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";
import { Text } from "./text";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Your email address",
  },
};

export const WithInput: Story = {
  render: () => (
    <View className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="Email" />
    </View>
  ),
};

export const WithCheckbox: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <View className="flex items-center space-x-2">
        <Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </View>
    );
  },
};

export const Required: Story = {
  render: () => (
    <View className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">
        Email <Text className="text-destructive">*</Text>
      </Label>
      <Input id="email" placeholder="Email" />
    </View>
  ),
};

export const Disabled: Story = {
  render: () => (
    <View className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled" className="opacity-50">
        Disabled Field
      </Label>
      <Input id="disabled" placeholder="Disabled" />
    </View>
  ),
};
