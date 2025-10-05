"use client";

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
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";
import { Checkbox } from "@acme/ui/checkbox";
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
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";
import { AlertTriangle } from "@acme/ui/lib/icons/AlertTriangle";
import { Terminal } from "@acme/ui/lib/icons/Terminal";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";
import { Progress } from "@acme/ui/progress";
import { RadioGroup, RadioGroupItem } from "@acme/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { Text } from "@acme/ui/text";
import { Textarea } from "@acme/ui/textarea";
import { Toggle } from "@acme/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@acme/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@acme/ui/tooltip";
import { H1, H2, P } from "@acme/ui/typography";
import type { TriggerRef } from "@rn-primitives/select";
import { BadgeCheckIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Icon } from "../ui/icon";
import CollapsibleDemo from "./collapsible";
import DropdownMenuScreen from "./dropdown-menu";
import HoverCardScreen from "./hover-card";
import MenubarDemo from "./menubar";
import NavigationMenuDemo from "./navigation-menu";
import TabsScreen from "./tabs";

export default function UITestScreen() {
  const selectRef = React.useRef<TriggerRef>(null);
  const [checked, setChecked] = React.useState(false);
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [toggleValue, setToggleValue] = React.useState("a");
  React.useEffect(() => {
    // verifyInstallation();
    // Run validation on component mount
    // validateThemes();
  }, []);
  function onTouchStartSelect() {
    selectRef.current?.open();
  }

  return (
    <View style={{ flex: 1 }} className="gap-4 p-4">
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
            <Text>Show Alert</Text>
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
        <Alert icon={Terminal}>
          <AlertTitle>This Alert has no description.</AlertTitle>
        </Alert>
        <Alert variant="destructive" icon={AlertTriangle}>
          <AlertTitle>Unable to process your payment.</AlertTitle>
          <AlertDescription>
            Please verify your billing information and try again.
          </AlertDescription>
          <View role="list" className="ml-0.5 pb-2 pl-6">
            <Text role="listitem" className="text-sm">
              <Text className="web:pr-2">•</Text> Check your card details
            </Text>
            <Text role="listitem" className="text-sm">
              <Text className="web:pr-2">•</Text> Ensure sufficient funds
            </Text>
            <Text role="listitem" className="text-sm">
              <Text className="web:pr-2">•</Text> Verify billing address
            </Text>
          </View>
        </Alert>
      </Section>

      {/* aspect-ratio */}
      {/* <Section title="Aspect Ratio">
        <AspectRatio ratio={16 / 9}>
          <View className="items-center justify-center w-full h-full rounded-lg">
            <Image
              source={{ uri: "https://github.com/shadcn.png" }}
              className="items-center justify-center w-full h-full bg-blue-500 rounded-lg"
            />
          </View>
        </AspectRatio>
      </Section> */}

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
        <View className="flex w-full flex-row flex-wrap gap-2">
          <Badge>
            <Text>Badge</Text>
          </Badge>
          <Badge variant="secondary">
            <Text>Secondary</Text>
          </Badge>
          <Badge variant="destructive">
            <Text>Destructive</Text>
          </Badge>
          <Badge variant="outline">
            <Text>Outline</Text>
          </Badge>
        </View>
        <View className="flex w-full flex-row flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-500 dark:bg-blue-600">
            <Icon as={BadgeCheckIcon} className="text-white" />
            <Text className="text-white">Verified</Text>
          </Badge>
          <Badge className="min-w-5 rounded-full px-1">
            <Text>8</Text>
          </Badge>
          <Badge className="min-w-5 rounded-full px-1" variant="destructive">
            <Text>99</Text>
          </Badge>
          <Badge className="min-w-5 rounded-full px-1" variant="outline">
            <Text>20+</Text>
          </Badge>
        </View>
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
        <View className="flex-row items-center gap-3">
          <Checkbox
            aria-labelledby="terms"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label nativeID="terms" onPress={() => setChecked((prev) => !prev)}>
            Accept terms and conditions
          </Label>
        </View>
      </Section>

      {/* collapsible */}
      <Section title="Collapsible">
        <CollapsibleDemo />
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
            <Text>Open Dialog</Text>
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
        <DropdownMenuScreen />
      </Section>

      {/* hover-card */}
      <Section title="Hover Card">
        <HoverCardScreen />
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
        <MenubarDemo />
      </Section>

      {/* navigation-menu */}
      <Section title="Navigation Menu">
        <NavigationMenuDemo />
      </Section>

      {/* popover */}
      <Section title="Popover">
        <Popover>
          <PopoverTrigger>
            <Text>Open popover</Text>
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
        <RadioGroup value={"option-one"} onValueChange={() => {}}>
          <View className="flex flex-row items-center gap-3">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1" onPress={() => {}}>
              Default
            </Label>
          </View>
          <View className="flex flex-row items-center gap-3">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2" onPress={() => {}}>
              Comfortable
            </Label>
          </View>
          <View className="flex flex-row items-center gap-3">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3" onPress={() => {}}>
              Compact
            </Label>
          </View>
        </RadioGroup>
      </Section>

      {/* select */}
      <Section title="Select">
        <Select>
          <SelectTrigger
            ref={selectRef}
            className="w-[180px]"
            onTouchStart={onTouchStartSelect}
          >
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent
            insets={{ top: 8, left: 8, right: 8, bottom: 8 }}
            className="w-[180px]"
          >
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem key="apple" label="Apple" value="apple">
                Apple
              </SelectItem>
              <SelectItem key="banana" label="Banana" value="banana">
                Apple
              </SelectItem>
              <SelectItem key="orange" label="Orange" value="orange">
                Orange
              </SelectItem>
            </SelectGroup>
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
        <View className="flex-row items-center gap-2">
          <Switch
            checked={switchChecked}
            onCheckedChange={setSwitchChecked}
            id="airplane-mode"
            nativeID="airplane-mode"
          />

          <Label
            nativeID="airplane-mode"
            htmlFor="airplane-mode"
            onPress={() => setSwitchChecked((prev) => !prev)}
          >
            Airplane Mode
          </Label>
        </View>

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
        <TabsScreen />
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
        <ToggleGroup
          type="single"
          value={toggleValue}
          onValueChange={(v) => setToggleValue(v || "")}
        >
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
            <Text>Hover me</Text>
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
        <P className="pl-6">another paragraph text</P>
      </Section>
    </View>
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
