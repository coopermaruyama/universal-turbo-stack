import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { View } from "react-native";

import { Text } from "./text";
import { Label } from "./label";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
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
    return <Switch checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(true);
    return <Switch checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Disabled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return <Switch checked={checked} onCheckedChange={setChecked} disabled />;
  },
};

export const CheckedDisabled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(true);
    return <Switch checked={checked} onCheckedChange={setChecked} disabled />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <View className="flex flex-row items-center space-x-2">
        <Switch id="airplane-mode" checked={checked} onCheckedChange={setChecked} />
        <Label htmlFor="airplane-mode">
          <Text>Airplane Mode</Text>
        </Label>
      </View>
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <View className="space-y-2">
        <View className="flex flex-row items-center justify-between">
          <Label htmlFor="notifications">
            <Text className="font-medium">Push Notifications</Text>
          </Label>
          <Switch id="notifications" checked={checked} onCheckedChange={setChecked} />
        </View>
        <Text className="text-sm text-muted-foreground">
          Receive notifications about new messages and updates.
        </Text>
      </View>
    );
  },
};