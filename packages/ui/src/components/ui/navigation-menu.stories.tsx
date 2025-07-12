import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import { Text } from "./text";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

const meta: Meta<typeof NavigationMenu> = {
  title: "UI/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Text>Getting started</Text>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <View className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <View className="row-span-3">
                <NavigationMenuLink asChild>
                  <View className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                    <Text className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </Text>
                    <Text className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </Text>
                  </View>
                </NavigationMenuLink>
              </View>
              <View className="grid gap-1">
                <Text className="text-sm font-medium leading-none">
                  Installation
                </Text>
                <Text className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  How to install dependencies and structure your app.
                </Text>
              </View>
              <View className="grid gap-1">
                <Text className="text-sm font-medium leading-none">
                  Typography
                </Text>
                <Text className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Styles for headings, paragraphs, lists...etc
                </Text>
              </View>
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Text>Components</Text>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <View className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <View key={component.title} className="grid gap-1">
                  <Text className="text-sm font-medium leading-none">
                    {component.title}
                  </Text>
                  <Text className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {component.description}
                  </Text>
                </View>
              ))}
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Text>Documentation</Text>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const Simple: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Text>Products</Text>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <View className="grid gap-3 p-4 w-[400px]">
              <View className="grid gap-1">
                <Text className="text-sm font-medium">Analytics</Text>
                <Text className="text-sm text-muted-foreground">
                  Track your website performance.
                </Text>
              </View>
              <View className="grid gap-1">
                <Text className="text-sm font-medium">Security</Text>
                <Text className="text-sm text-muted-foreground">
                  Protect your application.
                </Text>
              </View>
              <View className="grid gap-1">
                <Text className="text-sm font-medium">Monitoring</Text>
                <Text className="text-sm text-muted-foreground">
                  Monitor your application health.
                </Text>
              </View>
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Text>Pricing</Text>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Text>About</Text>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};