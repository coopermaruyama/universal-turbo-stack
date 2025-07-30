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
import { Text } from "@acme/ui/text";
import { Textarea } from "@acme/ui/textarea";
import { Toggle } from "@acme/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@acme/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@acme/ui/tooltip";
import { H1, H2, P } from "@acme/ui/typography";
import React from "react";
import { View } from "react-native";

import CollapsibleDemo from "./collapsible";
import DropdownMenuScreen from "./dropdown-menu";
import HoverCardScreen from "./hover-card";
import MenubarDemo from "./menubar";
import NavigationMenuDemo from "./navigation-menu";
import TabsScreen from "./tabs";

export default function UITestScreen() {
  const [checked, setChecked] = React.useState(false);
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [toggleValue, setToggleValue] = React.useState("a");
  React.useEffect(() => {
    // verifyInstallation();
    // Run validation on component mount
    // validateThemes();
  }, []);

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
        <Alert icon={Terminal} className="max-w-xl">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can use a terminal to run commands on your computer.
          </AlertDescription>
        </Alert>
        <Alert icon={AlertTriangle} variant="destructive" className="max-w-xl">
          <AlertTitle>Danger!</AlertTitle>
          <AlertDescription>
            High voltage. Do not touch. Risk of electric shock. Keep away from
            children.
          </AlertDescription>
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
        <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
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
