import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Text } from "./text";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Text>Open popover</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <View className="grid gap-4">
          <View className="space-y-2">
            <Text className="font-medium leading-none">Dimensions</Text>
            <Text className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </Text>
          </View>
          <View className="grid gap-2">
            <View className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">
                <Text>Width</Text>
              </Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </View>
            <View className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">
                <Text>Max. width</Text>
              </Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </View>
            <View className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">
                <Text>Height</Text>
              </Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </View>
            <View className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">
                <Text>Max. height</Text>
              </Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </View>
          </View>
        </View>
      </PopoverContent>
    </Popover>
  ),
};

export const Simple: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Text>Click me</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Text className="text-sm">
          This is a simple popover with some content.
        </Text>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Text>Settings</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <View className="space-y-4">
          <View className="space-y-2">
            <Text className="font-medium">Account Settings</Text>
            <Text className="text-sm text-muted-foreground">
              Update your account preferences here.
            </Text>
          </View>
          <View className="space-y-2">
            <Label htmlFor="email">
              <Text>Email</Text>
            </Label>
            <Input id="email" placeholder="Enter your email" />
          </View>
          <View className="space-y-2">
            <Label htmlFor="name">
              <Text>Display Name</Text>
            </Label>
            <Input id="name" placeholder="Enter your name" />
          </View>
          <Button className="w-full">
            <Text>Save Changes</Text>
          </Button>
        </View>
      </PopoverContent>
    </Popover>
  ),
};