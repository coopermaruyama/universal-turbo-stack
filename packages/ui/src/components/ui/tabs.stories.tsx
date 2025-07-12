import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { View } from "react-native";

import { Text } from "./text";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("account");
    return (
      <Tabs value={value} onValueChange={setValue} className="w-96">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">
          <Text>Account</Text>
        </TabsTrigger>
        <TabsTrigger value="password">
          <Text>Password</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-4">
        <View className="space-y-2">
          <Label htmlFor="name">
            <Text>Name</Text>
          </Label>
          <Input id="name" value="Pedro Duarte" onChangeText={() => {}} />
        </View>
        <View className="space-y-2">
          <Label htmlFor="username">
            <Text>Username</Text>
          </Label>
          <Input id="username" value="@peduarte" onChangeText={() => {}} />
        </View>
        <Button>
          <Text>Save changes</Text>
        </Button>
      </TabsContent>
      <TabsContent value="password" className="space-y-4">
        <View className="space-y-2">
          <Label htmlFor="current">
            <Text>Current password</Text>
          </Label>
          <Input id="current" value="" onChangeText={() => {}} />
        </View>
        <View className="space-y-2">
          <Label htmlFor="new">
            <Text>New password</Text>
          </Label>
          <Input id="new" value="" onChangeText={() => {}} />
        </View>
        <Button>
          <Text>Change password</Text>
        </Button>
      </TabsContent>
    </Tabs>
    );
  },
};

export const ThreeTabs: Story = {
  render: () => {
    const [value, setValue] = React.useState("overview");
    return (
      <Tabs value={value} onValueChange={setValue} className="w-96">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">
          <Text>Overview</Text>
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <Text>Analytics</Text>
        </TabsTrigger>
        <TabsTrigger value="reports">
          <Text>Reports</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <Text className="text-lg font-semibold">Overview</Text>
        <Text>
          Monitor your application's performance and view key metrics.
        </Text>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <Text className="text-lg font-semibold">Analytics</Text>
        <Text>
          Dive deep into your analytics data and user behavior patterns.
        </Text>
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
        <Text className="text-lg font-semibold">Reports</Text>
        <Text>
          Generate and download comprehensive reports for your data.
        </Text>
      </TabsContent>
    </Tabs>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [value, setValue] = React.useState("general");
    return (
      <Tabs value={value} onValueChange={setValue} className="flex w-96">
      <TabsList className="flex flex-col h-fit">
        <TabsTrigger value="general" className="w-full">
          <Text>General</Text>
        </TabsTrigger>
        <TabsTrigger value="security" className="w-full">
          <Text>Security</Text>
        </TabsTrigger>
        <TabsTrigger value="advanced" className="w-full">
          <Text>Advanced</Text>
        </TabsTrigger>
      </TabsList>
      <View className="flex-1 ml-4">
        <TabsContent value="general">
          <Text className="text-lg font-semibold">General Settings</Text>
          <Text className="text-sm text-muted-foreground mt-2">
            Configure your general application preferences.
          </Text>
        </TabsContent>
        <TabsContent value="security">
          <Text className="text-lg font-semibold">Security Settings</Text>
          <Text className="text-sm text-muted-foreground mt-2">
            Manage your security and privacy settings.
          </Text>
        </TabsContent>
        <TabsContent value="advanced">
          <Text className="text-lg font-semibold">Advanced Settings</Text>
          <Text className="text-sm text-muted-foreground mt-2">
            Configure advanced options and features.
          </Text>
        </TabsContent>
      </View>
    </Tabs>
    );
  },
};