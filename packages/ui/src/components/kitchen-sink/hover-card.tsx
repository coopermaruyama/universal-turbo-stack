import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@acme/ui/hover-card";
import { Icon } from "@acme/ui/icon";
import { Text } from "@acme/ui/text";
import { CalendarDays } from "lucide-react-native";
import * as React from "react";
import { Pressable, View } from "react-native";

export default function HoverCardScreen() {
  const triggerRef =
    React.useRef<React.ElementRef<typeof HoverCardTrigger>>(null);
  const contentInsets = {
    top: 0,
    bottom: 0,
    left: 12,
    right: 12,
  };
  return (
    <View className="flex-1 items-center justify-center gap-12 p-6">
      <Pressable
        className="absolute right-0 top-0 h-16 w-16 active:bg-primary/5"
        onPress={() => {
          // open programmatically
          triggerRef.current?.open();
        }}
      />
      <HoverCard>
        <HoverCardTrigger ref={triggerRef} asChild>
          <Button variant="link" size="lg">
            <Text>@nextjs</Text>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent insets={contentInsets} className="native:w-96 w-80">
          <View className="flex flex-row justify-between gap-4">
            <Avatar alt="Vercel avatar">
              <AvatarImage source={{ uri: "https://github.com/vercel.png" }} />
              <AvatarFallback>
                <Text>VA</Text>
              </AvatarFallback>
            </Avatar>
            <View className="flex-1 gap-1">
              <Text className="native:text-base text-sm font-semibold">
                @nextjs
              </Text>
              <Text className="native:text-base text-sm">
                The React Framework – created and maintained by @vercel.
              </Text>
              <View className="flex flex-row items-center gap-2 pt-2">
                <Icon
                  as={CalendarDays}
                  size={14}
                  className="text-foreground opacity-70"
                />

                <Text className="native:text-sm text-xs text-muted-foreground">
                  Joined December 2021
                </Text>
              </View>
            </View>
          </View>
        </HoverCardContent>
      </HoverCard>
    </View>
  );
}
