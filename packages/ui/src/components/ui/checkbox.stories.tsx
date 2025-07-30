import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { View } from "react-native";
import { Checkbox } from "./checkbox";
import { Text } from "./text";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return <Checkbox checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(true);
    return <Checkbox checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Disabled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return <Checkbox checked={checked} onCheckedChange={setChecked} disabled />;
  },
};

export const CheckedDisabled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(true);
    return <Checkbox checked={checked} onCheckedChange={setChecked} disabled />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <View className="flex flex-row items-center space-x-2">
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <Text className="text-sm font-medium">Accept terms and conditions</Text>
      </View>
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <View className="space-y-2">
        <View className="flex flex-row items-center space-x-2">
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <Text className="text-sm font-medium">Marketing emails</Text>
        </View>
        <Text className="text-sm text-muted-foreground ml-6">
          Receive emails about new products, features, and more.
        </Text>
      </View>
    );
  },
};
