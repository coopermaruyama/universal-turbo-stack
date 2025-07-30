import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu";
import { Text } from "./text";

const meta: Meta<typeof ContextMenu> = {
  title: "UI/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <View className="flex h-32 w-60 items-center justify-center rounded-md border border-dashed border-border bg-muted">
          <Text>Right click here</Text>
        </View>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <Text>Back</Text>
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <Text>Forward</Text>
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Text>Reload</Text>
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Text>More Tools</Text>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              <Text>Save Page As...</Text>
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Create Shortcut...</Text>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Name Window...</Text>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Text>Developer Tools</Text>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked onCheckedChange={() => {}}>
          <Text>Show Bookmarks Bar</Text>
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={false} onCheckedChange={() => {}}>
          <Text>Show Full URLs</Text>
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro" onValueChange={() => {}}>
          <ContextMenuLabel>
            <Text>People</Text>
          </ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">
            <Text>Pedro Duarte</Text>
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">
            <Text>Colm Tuite</Text>
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Simple: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <View className="flex h-24 w-48 items-center justify-center rounded-md border bg-muted">
          <Text>Right click me</Text>
        </View>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <Text>Edit</Text>
        </ContextMenuItem>
        <ContextMenuItem>
          <Text>Copy</Text>
        </ContextMenuItem>
        <ContextMenuItem>
          <Text>Paste</Text>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Text>Delete</Text>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
