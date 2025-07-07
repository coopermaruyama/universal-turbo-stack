import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import { Text } from "@acme/ui/text";

const meta: Meta<typeof Card> = {
  title: "Example/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: "100%", maxWidth: 400 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to our app</CardTitle>
        <CardDescription>
          This is a sample card component for React Native
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Text>
          This card demonstrates how our UI components work across both web and
          mobile platforms using Tamagui and NativeWind.
        </Text>
      </CardContent>
      <CardFooter>
        <Button variant="outline" style={{ marginRight: 8 }}>
          <Text>Cancel</Text>
        </Button>
        <Button>
          <Text>Continue</Text>
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card>
      <CardContent>
        <Text>A simple card with just content</Text>
      </CardContent>
    </Card>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Software Developer</CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-sm text-muted-foreground">
          Passionate about creating amazing user experiences with React Native
          and modern web technologies.
        </Text>
      </CardContent>
      <CardFooter>
        <Button>
          <Text>View Profile</Text>
        </Button>
      </CardFooter>
    </Card>
  ),
};
