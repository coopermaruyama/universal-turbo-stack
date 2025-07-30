import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Text } from "./text";

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Text>Edit Profile</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <Text>Edit profile</Text>
          </DialogTitle>
          <DialogDescription>
            <Text>
              Make changes to your profile here. Click save when you're done.
            </Text>
          </DialogDescription>
        </DialogHeader>
        <View className="grid gap-4 py-4">
          <View className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              <Text>Name</Text>
            </Label>
            <Input
              id="name"
              value="Pedro Duarte"
              onChangeText={() => {}}
              className="col-span-3"
            />
          </View>
          <View className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              <Text>Username</Text>
            </Label>
            <Input
              id="username"
              value="@peduarte"
              onChangeText={() => {}}
              className="col-span-3"
            />
          </View>
        </View>
        <DialogFooter>
          <Button>
            <Text>Save changes</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Simple: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Text>Show Dialog</Text>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Text>Are you sure?</Text>
          </DialogTitle>
          <DialogDescription>
            <Text>This action cannot be undone.</Text>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">
            <Text>Cancel</Text>
          </Button>
          <Button>
            <Text>Continue</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Text>Add User</Text>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Text>Add New User</Text>
          </DialogTitle>
          <DialogDescription>
            <Text>Enter the user details below to add them to your team.</Text>
          </DialogDescription>
        </DialogHeader>
        <View className="space-y-4">
          <View className="space-y-2">
            <Label htmlFor="email">
              <Text>Email</Text>
            </Label>
            <Input id="email" placeholder="Enter email address" />
          </View>
          <View className="space-y-2">
            <Label htmlFor="role">
              <Text>Role</Text>
            </Label>
            <Input id="role" placeholder="Enter role" />
          </View>
        </View>
        <DialogFooter>
          <Button variant="outline">
            <Text>Cancel</Text>
          </Button>
          <Button>
            <Text>Add User</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
