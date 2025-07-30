import { Button } from "@acme/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@acme/ui/collapsible";
import { Icon } from "@acme/ui/icon";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react-native";
import * as React from "react";
import { Platform, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";

export default function CollapsibleScreen() {
  const [open, setOpen] = React.useState(false);
  return (
    <View className="flex-1 items-center justify-center p-6">
      <Collapsible asChild open={open} onOpenChange={setOpen}>
        <Animated.View
          layout={Platform.OS !== "web" ? LinearTransition : undefined}
        >
          <View className="w-full max-w-[350px] gap-2">
            <View className="flex flex-row items-center justify-between space-x-4 px-4">
              <Text className="native:text-lg text-sm font-semibold text-foreground">
                @peduarte starred 3 repositories
              </Text>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon">
                  {open ? (
                    <Icon
                      as={ChevronsDownUp}
                      className="text-foreground"
                      size={16}
                    />
                  ) : (
                    <Icon
                      as={ChevronsUpDown}
                      className="text-foreground"
                      size={16}
                    />
                  )}
                  <Text className="sr-only">Toggle</Text>
                </Button>
              </CollapsibleTrigger>
            </View>
            <View className="rounded-md border border-border px-4 py-3">
              <Text className="native:text-lg text-sm text-foreground">
                @radix-ui/primitives
              </Text>
            </View>
            <CollapsibleContent className="gap-2">
              <CollapsibleItem delay={100}>@radix-ui/react</CollapsibleItem>
              <CollapsibleItem delay={200}>@stitches/core</CollapsibleItem>
            </CollapsibleContent>
          </View>
        </Animated.View>
      </Collapsible>
    </View>
  );
}

function CollapsibleItem({
  children,
  delay,
}: {
  children: string;
  delay: number;
}) {
  if (Platform.OS === "web") {
    return (
      <View className="rounded-md border border-border px-4 py-3">
        <Text className="text-sm text-foreground">{children}</Text>
      </View>
    );
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(200).delay(delay)}
      className="rounded-md border border-border px-4 py-3"
    >
      <Text className="text-lg text-foreground">{children}</Text>
    </Animated.View>
  );
}
