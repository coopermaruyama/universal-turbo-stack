import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Text } from "./text";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup value="option-one" onValueChange={() => {}}>
      <View className="flex flex-row items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">
          <Text>Option One</Text>
        </Label>
      </View>
      <View className="flex flex-row items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">
          <Text>Option Two</Text>
        </Label>
      </View>
      <View className="flex flex-row items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">
          <Text>Option Three</Text>
        </Label>
      </View>
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <View className="space-y-4">
      <View>
        <Text className="text-base font-medium">
          Choose your notification preference
        </Text>
        <Text className="text-sm text-muted-foreground">
          Select how you would like to be notified about updates.
        </Text>
      </View>
      <RadioGroup value="email" onValueChange={() => {}}>
        <View className="space-y-2">
          <View className="flex flex-row items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">
              <Text>No notifications</Text>
            </Label>
          </View>
          <View className="flex flex-row items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email">
              <Text>Email notifications</Text>
            </Label>
          </View>
          <View className="flex flex-row items-center space-x-2">
            <RadioGroupItem value="push" id="push" />
            <Label htmlFor="push">
              <Text>Push notifications</Text>
            </Label>
          </View>
        </View>
      </RadioGroup>
    </View>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup value="option-one" onValueChange={() => {}}>
      <View className="flex flex-row items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">
          <Text>Available Option</Text>
        </Label>
      </View>
      <View className="flex flex-row items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" disabled />
        <Label htmlFor="option-two" className="opacity-50">
          <Text>Disabled Option</Text>
        </Label>
      </View>
    </RadioGroup>
  ),
};
