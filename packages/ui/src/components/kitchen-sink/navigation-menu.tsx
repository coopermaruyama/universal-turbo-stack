// import { useNavigation } from 'expo-router';

import { Icon } from "@acme/ui/icon";
import { cn } from "../../lib/utils";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@acme/ui/navigation-menu";
import { Text } from "@acme/ui/text";
import { Sparkles } from "lucide-react-native";
import * as React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";

export default function NavigationMenuScreen() {
  //   const insets = useSafeAreaInsets();
  const contentInsets = {
    top: 12,
    bottom: 12,
    left: 12,
    right: 12,
  };
  const [value, setValue] = React.useState<string>();
  //   const navigation = useNavigation();

  function closeAll() {
    setValue("");
  }

  //   React.useEffect(() => {
  //     const sub = navigation.addListener('blur', () => {
  //       closeAll();
  //     });

  //     return sub;
  //   }, []);

  return (
    <View className="flex-1 items-center gap-12 px-6 py-3">
      {Platform.OS !== "web" && !!value && (
        <Pressable
          onPress={() => {
            setValue("");
          }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <NavigationMenu value={value} onValueChange={setValue}>
        <NavigationMenuList>
          <NavigationMenuItem value="getting-started">
            <NavigationMenuTrigger>
              <Text>Getting started</Text>
            </NavigationMenuTrigger>
            <NavigationMenuContent insets={contentInsets}>
              <View
                role="list"
                className="web:grid web:lg:grid-cols-[.75fr_1fr] gap-3 p-6 md:w-[400px] lg:w-[500px]"
              >
                <View role="listitem" className="web:row-span-3">
                  <NavigationMenuLink asChild>
                    <View className="web:select-none web:bg-gradient-to-b web:from-muted/50 web:to-muted native:border native:border-border web:no-underline web:outline-none web:focus:shadow-md web:focus:shadow-foreground/5 flex flex-col justify-end rounded-md p-6">
                      <Icon
                        as={Sparkles}
                        size={16}
                        className="text-foreground"
                      />
                      <Text className="native:text-2xl mb-2 mt-4 text-lg font-medium">
                        react-native-reusables
                      </Text>
                      <Text className="native:text-base text-sm leading-tight text-muted-foreground">
                        Universal components that you can copy and paste into
                        your apps. Accessible. Customizable. Open Source.
                      </Text>
                    </View>
                  </NavigationMenuLink>
                </View>
                <ListItem href="/docs" title="Introduction">
                  <Text>
                    Re-usable components built using Radix UI on the web and
                    Tailwind CSS.
                  </Text>
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  <Text>
                    How to install dependencies and structure your app.
                  </Text>
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  <Text>Styles for headings, paragraphs, lists...etc</Text>
                </ListItem>
              </View>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="components">
            <NavigationMenuTrigger>
              <Text className="text-foreground">Components</Text>
            </NavigationMenuTrigger>
            <NavigationMenuContent insets={contentInsets}>
              <View
                role="list"
                className="web:grid web:md:grid-cols-2 w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]"
              >
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </View>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="documentation">
            <NavigationMenuLink
              onPress={closeAll}
              className={navigationMenuTriggerStyle()}
            >
              <Text>Documentation</Text>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </View>
  );
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/alert-dialog/alert-dialog-universal",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/hover-card/hover-card-universal",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/progress/progress-universal",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/scroll-area/scroll-area-universal",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/tabs/tabs-universal",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/tooltip/tooltip-universal",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

type ListItemProps = Omit<
  React.ComponentProps<typeof NavigationMenuLink>,
  "children"
> & {
  children: React.ReactNode;
  title: string;
  href: string;
};

function ListItem({ className, title, children, ...props }: ListItemProps) {
  return (
    <View role="listitem">
      <NavigationMenuLink
        className={cn(
          "web:block web:select-none web:outline-none web:transition-colors web:hover:bg-accent web:hover:text-accent-foreground web:focus:bg-accent web:focus:text-accent-foreground gap-1 rounded-md p-3 leading-none text-foreground no-underline active:bg-accent",
          className,
        )}
        {...props}
      >
        <Text className="native:text-base text-sm font-medium leading-none text-foreground">
          {title}
        </Text>
        <Text className="native:text-base line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </Text>
      </NavigationMenuLink>
    </View>
  );
}
