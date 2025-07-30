import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDays } from "lucide-react-native";
import { View } from "react-native";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Text } from "./text";

const meta: Meta<typeof HoverCard> = {
  title: "UI/HoverCard",
  component: HoverCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <Text>@nextjs</Text>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <View className="flex justify-between space-x-4">
          <Avatar alt="Next.js Avatar">
            <AvatarImage source={{ uri: "https://github.com/vercel.png" }} />
            <AvatarFallback>
              <Text>VC</Text>
            </AvatarFallback>
          </Avatar>
          <View className="space-y-1">
            <Text className="text-sm font-semibold">@nextjs</Text>
            <Text className="text-sm">
              The React Framework – created and maintained by @vercel.
            </Text>
            <View className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <Text className="text-xs text-muted-foreground">
                Joined December 2021
              </Text>
            </View>
          </View>
        </View>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const Simple: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">
          <Text>Hover me</Text>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <Text className="text-sm">
          This is additional information that appears on hover.
        </Text>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithProfile: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <Text>@shadcn</Text>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <View className="space-y-2">
          <Text className="text-sm font-semibold">shadcn</Text>
          <Text className="text-sm text-muted-foreground">
            Building UI components and design systems.
          </Text>
          <View className="flex items-center pt-2">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
            <Text className="text-xs text-muted-foreground">
              Joined March 2023
            </Text>
          </View>
        </View>
      </HoverCardContent>
    </HoverCard>
  ),
};
