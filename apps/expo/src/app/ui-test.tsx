import React from "react";
import { Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AlertTriangle } from "lucide-react-native";

import { TestShadcnComponents, validateThemes, YStack } from "@acme/tamagui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@acme/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@acme/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@acme/ui/alert-dialog";
import { AspectRatio } from "@acme/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";
import { Checkbox } from "@acme/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@acme/ui/collapsible";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@acme/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@acme/ui/hover-card";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@acme/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@acme/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";
import { Progress } from "@acme/ui/progress";
import { RadioGroup, RadioGroupItem } from "@acme/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { Separator } from "@acme/ui/separator";
import { Skeleton } from "@acme/ui/skeleton";
import { Switch } from "@acme/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@acme/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui/tabs";
import { Text } from "@acme/ui/text";
import { Textarea } from "@acme/ui/textarea";
import { Toggle } from "@acme/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@acme/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@acme/ui/tooltip";
import { H1, H2, P } from "@acme/ui/typography";

export default function UITestScreen() {
  const insets = useSafeAreaInsets();
  React.useEffect(() => {
    // Run validation on component mount
    validateThemes();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
      }}
    >
      <YStack padding="$4" space="$4">
        <Text className="text-center text-2xl font-bold">
          NativeWind UI Kitchen Sink
        </Text>
        <Text className="font-mono">
          This screen showcases all the components available in the UI library.
          Each section contains a brief description and an example of the
          component in use.
        </Text>
        {/* accordion */}
        <Section title="Accordion">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <Text>Is it accessible?</Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        {/* alert-dialog */}
        <Section title="Alert Dialog">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button>
                <Text>Show Alert</Text>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  <Text>Cancel</Text>
                </AlertDialogCancel>
                <AlertDialogAction>
                  <Text>Continue</Text>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Section>

        {/* alert */}
        <Section title="Alert">
          <Alert icon={AlertTriangle}>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components and dependencies to your app using the cli.
            </AlertDescription>
          </Alert>
        </Section>

        {/* aspect-ratio */}
        <Section title="Aspect Ratio">
          <AspectRatio ratio={16 / 9} className="max-h-96 overflow-hidden">
            <Image source={{ uri: "https://github.com/shadcn.png" }} />
          </AspectRatio>
        </Section>

        {/* avatar */}
        <Section title="Avatar">
          <Avatar alt="User avatar">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <Text>CN</Text>
            </AvatarFallback>
          </Avatar>
        </Section>

        {/* badge */}
        <Section title="Badge">
          <Badge>
            <Text>Badge</Text>
          </Badge>
        </Section>

        {/* button */}
        <Section title="Button">
          <Button>
            <Text>Button</Text>
          </Button>
        </Section>

        {/* card */}
        <Section title="Card">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>Card content goes here.</Text>
            </CardContent>
          </Card>
        </Section>

        {/* checkbox */}
        <Section title="Checkbox">
          <Checkbox checked={false} onCheckedChange={() => {}} />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </Section>

        {/* collapsible */}
        <Section title="Collapsible">
          <Collapsible>
            <CollapsibleTrigger>
              <Button>
                <Text>Toggle</Text>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Text>Collapsible content</Text>
            </CollapsibleContent>
          </Collapsible>
        </Section>

        {/* context-menu */}
        <Section title="Context Menu">
          <ContextMenu>
            <ContextMenuTrigger>
              <Button>
                <Text>Right click me</Text>
              </Button>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>
                <Text>Profile</Text>
              </ContextMenuItem>
              <ContextMenuItem>
                <Text>Settings</Text>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Section>

        {/* dialog */}
        <Section title="Dialog">
          <Dialog>
            <DialogTrigger>
              <Button>
                <Text>Open Dialog</Text>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a dialog description.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Section>

        {/* dropdown-menu */}
        <Section title="Dropdown Menu">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                <Text>Open Menu</Text>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Text>Profile</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text>Settings</Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        {/* hover-card */}
        <Section title="Hover Card">
          <HoverCard>
            <HoverCardTrigger>
              <Button>
                <Text>Hover me</Text>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <Text>Hover card content</Text>
            </HoverCardContent>
          </HoverCard>
        </Section>

        {/* input */}
        <Section title="Input">
          <Input placeholder="Type something..." />
        </Section>

        {/* label */}
        <Section title="Label">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Enter your email" />
        </Section>

        {/* menubar */}
        <Section title="Menubar">
          <Menubar value={undefined} onValueChange={() => {}}>
            <MenubarMenu value={undefined}>
              <MenubarTrigger>
                <Text>File</Text>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Text>New</Text>
                </MenubarItem>
                <MenubarItem>
                  <Text>Open</Text>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Section>

        {/* navigation-menu */}
        <Section title="Navigation Menu">
          <NavigationMenu value={undefined} onValueChange={() => {}}>
            <NavigationMenuList>
              <NavigationMenuItem value={undefined}>
                <NavigationMenuTrigger>
                  <Text>Getting started</Text>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>
                    <Text>Introduction</Text>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Section>

        {/* popover */}
        <Section title="Popover">
          <Popover>
            <PopoverTrigger>
              <Button>
                <Text>Open popover</Text>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Text>Popover content</Text>
            </PopoverContent>
          </Popover>
        </Section>

        {/* progress */}
        <Section title="Progress">
          <Progress value={33} />
        </Section>

        {/* radio-group */}
        <Section title="Radio Group">
          <RadioGroup value="option-one" onValueChange={() => {}}>
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </RadioGroup>
        </Section>

        {/* select */}
        <Section title="Select">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light" label="Light">
                Light
              </SelectItem>
              <SelectItem value="dark" label="Dark">
                Dark
              </SelectItem>
              <SelectItem value="system" label="System">
                System
              </SelectItem>
            </SelectContent>
          </Select>
        </Section>

        {/* separator */}
        <Section title="Separator">
          <Text>Above separator</Text>
          <Separator />
          <Text>Below separator</Text>
        </Section>

        {/* skeleton */}
        <Section title="Skeleton">
          <Skeleton className="h-5 w-48" />
        </Section>

        {/* switch */}
        <Section title="Switch">
          <Switch checked={false} onCheckedChange={() => {}} />
        </Section>

        {/* table */}
        <Section title="Table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Text>Name</Text>
                </TableHead>
                <TableHead>
                  <Text>Status</Text>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Text>John Doe</Text>
                </TableCell>
                <TableCell>
                  <Text>Active</Text>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* tabs */}
        <Section title="Tabs">
          <Tabs value="tab1" onValueChange={() => {}}>
            <TabsList>
              <TabsTrigger value="tab1">
                <Text>Tab 1</Text>
              </TabsTrigger>
              <TabsTrigger value="tab2">
                <Text>Tab 2</Text>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Text>Tab 1 content</Text>
            </TabsContent>
            <TabsContent value="tab2">
              <Text>Tab 2 content</Text>
            </TabsContent>
          </Tabs>
        </Section>

        {/* text */}
        <Section title="Text">
          <Text>Sample text component</Text>
        </Section>

        {/* textarea */}
        <Section title="Textarea">
          <Textarea placeholder="Type your message here..." />
        </Section>

        {/* toggle */}
        <Section title="Toggle">
          <Toggle pressed={false} onPressedChange={() => {}}>
            <Text>Toggle</Text>
          </Toggle>
        </Section>

        {/* toggle-group */}
        <Section title="Toggle Group">
          <ToggleGroup type="single" value={undefined} onValueChange={() => {}}>
            <ToggleGroupItem value="a">
              <Text>A</Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="b">
              <Text>B</Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="c">
              <Text>C</Text>
            </ToggleGroupItem>
          </ToggleGroup>
        </Section>

        {/* tooltip */}
        <Section title="Tooltip">
          <Tooltip>
            <TooltipTrigger>
              <Button>
                <Text>Hover me</Text>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <Text>Add to library</Text>
            </TooltipContent>
          </Tooltip>
        </Section>

        {/* typography */}
        <Section title="Typography">
          <H1>Heading 1</H1>
          <H2>Heading 2</H2>
          <P>Paragraph text</P>
        </Section>
      </YStack>
    </ScrollView>
  );
}

export function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent className="items-center gap-2 py-8 pb-20">
        {props.children}
      </CardContent>
    </Card>
  );
}
