import type { Meta, StoryObj } from "@storybook/react";
import { Plus } from "lucide-react-native";
import { View } from "react-native";

import { Button } from "./button";
import { Text } from "./text";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <Text>Hover me</Text>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <Text>Add to library</Text>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <Text>Add new item</Text>
      </TooltipContent>
    </Tooltip>
  ),
};

export const LongText: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>
          <Text>Info</Text>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <Text>
          This is a longer tooltip message that provides additional context and 
          information about the button or action.
        </Text>
      </TooltipContent>
    </Tooltip>
  ),
};

export const DifferentSides: Story = {
  render: () => (
    <View className="flex space-x-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Text>Top</Text>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <Text>Tooltip on top</Text>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Text>Right</Text>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <Text>Tooltip on right</Text>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Text>Bottom</Text>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <Text>Tooltip on bottom</Text>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Text>Left</Text>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <Text>Tooltip on left</Text>
        </TooltipContent>
      </Tooltip>
    </View>
  ),
};