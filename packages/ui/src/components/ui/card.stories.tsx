import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Text } from "./text";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>
          This is the card content area where you can put any content.
        </Text>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Text>Cancel</Text>
        </Button>
        <Button>
          <Text>Save</Text>
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="p-6">
        <Text>Simple card with just content</Text>
      </CardContent>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>
          Monitor your project statistics and performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-sm">
          Your project is performing well with 95% uptime this month.
        </Text>
      </CardContent>
    </Card>
  ),
};
