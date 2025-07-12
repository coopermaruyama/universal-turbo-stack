import * as React from "react";
import { Pressable, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Cloud } from '~/lib/icons/Cloud';
// import { Github } from '~/lib/icons/Github';
// import { LifeBuoy } from '~/lib/icons/LifeBuoy';
// import { LogOut } from '~/lib/icons/LogOut';
// import { Mail } from '~/lib/icons/Mail';
// import { MessageSquare } from '~/lib/icons/MessageSquare';
// import { Plus } from '~/lib/icons/Plus';
// import { PlusCircle } from '~/lib/icons/PlusCircle';
// import { UserPlus } from '~/lib/icons/UserPlus';
// import { Users } from '~/lib/icons/Users';
import {
  Cloud,
  Github,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  UserPlus,
  Users,
} from "lucide-react-native";

import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import { Icon } from "@acme/ui/icon";
import { Text } from "@acme/ui/text";

export default function DropdownMenuScreen() {
  const triggerRef =
    React.useRef<React.ElementRef<typeof DropdownMenuTrigger>>(null);
  //   const insets = useSafeAreaInsets();
  const contentInsets = {
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
                <Animated.View entering={FadeIn.duration(200)}>
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
}
