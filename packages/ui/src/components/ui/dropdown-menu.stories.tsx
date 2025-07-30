import { Icon } from "@acme/ui/icon";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Cloud,
  Github,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Plus,
  PlusCircle,
  UserPlus,
  Users,
} from "lucide-react-native";
import React from "react";
import { Platform, Pressable, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Text } from "./text";

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (_args) => {
    const triggerRef =
      React.useRef<React.ElementRef<typeof DropdownMenuTrigger>>(null);
    //   const insets = useSafeAreaInsets();
    const _contentInsets = {
      // top: insets.top,
      // bottom: insets.bottom,
      top: 12,
      bottom: 12,
      left: 12,
      right: 12,
    };

    return (
      <View className="flex-1 items-center justify-center gap-12 p-6">
        <Pressable
          className="absolute right-0 top-0 h-16 w-16 active:bg-primary/5"
          onPress={() => {
            // open menu programmatically
            triggerRef.current?.open();
          }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger ref={triggerRef} asChild>
            <Button variant="outline">
              <Text>Open</Text>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            //   insets={contentInsets}
            className="native:w-72 w-64"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Icon as={Users} className="text-foreground" size={14} />
                <Text>Team</Text>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Icon as={UserPlus} className="text-foreground" size={14} />
                  <Text>Invite users</Text>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <Animated.View
                    entering={
                      Platform.OS === "web" ? undefined : FadeIn.duration(200)
                    }
                  >
                    <DropdownMenuItem>
                      <Icon as={Mail} className="text-foreground" size={14} />
                      <Text>Email</Text>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon
                        as={MessageSquare}
                        className="text-foreground"
                        size={14}
                      />
                      <Text>Message</Text>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Icon
                        as={PlusCircle}
                        className="text-foreground"
                        size={14}
                      />
                      <Text>More...</Text>
                    </DropdownMenuItem>
                  </Animated.View>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Icon as={Plus} className="text-foreground" size={14} />
                <Text>New Team</Text>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon as={Github} className="text-foreground" size={14} />
              <Text>GitHub</Text>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon as={LifeBuoy} className="text-foreground" size={14} />
              <Text>Support</Text>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Icon as={Cloud} className="text-foreground" size={14} />
              <Text>API</Text>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon as={LogOut} className="text-foreground" size={14} />
              <Text>Log out</Text>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>
    );
  },
};

export const WithCheckboxes: Story = {
  render: (_args) => {
    const [checked, setChecked] = React.useState(true);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(true);
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Text>Preferences</Text>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <Text>Appearance</Text>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={checked}
            onCheckedChange={setChecked}
          >
            <Text>Status Bar</Text>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked2}
            onCheckedChange={setChecked2}
          >
            <Text>Activity Bar</Text>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked3}
            onCheckedChange={setChecked3}
          >
            <Text>Panel</Text>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithRadioGroup: Story = {
  render: (_args) => {
    const [value, setValue] = React.useState("bottom");
    const handleValueChange = (newValue: string) => {
      setValue(newValue);
    };
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Text>View</Text>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <Text>Panel Position</Text>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={handleValueChange}
          >
            <DropdownMenuRadioItem value="top">
              <Text>Top</Text>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              <Text>Bottom</Text>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">
              <Text>Right</Text>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const Simple: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Text>Edit</Text>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Text>Duplicate</Text>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <Text>Delete</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
