import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import { ChevronDown } from "lucide-react-native";

import { Button } from "./button";
import { Text } from "./text";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-80 space-y-2"
      >
        <View className="flex flex-row items-center justify-between space-x-4 px-4">
          <Text className="text-sm font-semibold">
            @peduarte starred 3 repositories
          </Text>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </View>
        <View className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/primitives
        </View>
        <CollapsibleContent className="space-y-2">
          <View className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/colors
          </View>
          <View className="rounded-md border px-4 py-3 font-mono text-sm">
            @stitches/react
          </View>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const WithContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-80 space-y-2"
      >
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <Text>Can I use this in my project?</Text>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="rounded-md border px-4 py-3">
          <Text className="text-sm">
            Yes. Free to use for personal and commercial projects. No attribution
            required.
          </Text>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};