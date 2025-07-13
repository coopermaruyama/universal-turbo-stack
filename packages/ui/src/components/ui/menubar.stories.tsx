import type { Meta, StoryObj } from "@storybook/react";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./menubar";
import { Text } from "./text";

const meta: Meta<typeof Menubar> = {
  title: "UI/Menubar",
  component: Menubar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menubar value="default" onValueChange={(value) => console.log(value)}>
      <MenubarMenu value="file">
        <MenubarTrigger>
          <Text>File</Text>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Text>New Tab</Text>
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Text>New Window</Text>
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            <Text>New Incognito Window</Text>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <Text>Share</Text>
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <Text>Email link</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Messages</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Notes</Text>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            <Text>Print...</Text>
            <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="edit">
        <MenubarTrigger>
          <Text>Edit</Text>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Text>Undo</Text>
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Text>Redo</Text>
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <Text>Find</Text>
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <Text>Search the web</Text>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Text>Find...</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Find Next</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Find Previous</Text>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            <Text>Cut</Text>
          </MenubarItem>
          <MenubarItem>
            <Text>Copy</Text>
          </MenubarItem>
          <MenubarItem>
            <Text>Paste</Text>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="view">
        <MenubarTrigger>
          <Text>View</Text>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            checked
            onCheckedChange={(checked) => console.log(checked)}
          >
            <Text>Always Show Bookmarks Bar</Text>
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked
            onCheckedChange={(checked) => console.log(checked)}
          >
            <Text>Always Show Full URLs</Text>
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            <Text>Reload</Text>
            <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            <Text>Force Reload</Text>
            <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>
            <Text>Toggle Fullscreen</Text>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>
            <Text>Hide Sidebar</Text>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="profiles">
        <MenubarTrigger>
          <Text>Profiles</Text>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup
            value="benoit"
            onValueChange={(value) => console.log(value)}
          >
            <MenubarRadioItem value="andy">
              <Text>Andy</Text>
            </MenubarRadioItem>
            <MenubarRadioItem value="benoit">
              <Text>Benoit</Text>
            </MenubarRadioItem>
            <MenubarRadioItem value="Luis">
              <Text>Luis</Text>
            </MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>
            <Text>Edit...</Text>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>
            <Text>Add Profile...</Text>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const Simple: Story = {
  render: () => (
    <Menubar value="simple" onValueChange={(value) => console.log(value)}>
      <MenubarMenu value="file">
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
          <MenubarSeparator />
          <MenubarItem>
            <Text>Save</Text>
          </MenubarItem>
          <MenubarItem>
            <Text>Save As</Text>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="edit">
        <MenubarTrigger>
          <Text>Edit</Text>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Text>Cut</Text>
          </MenubarItem>
          <MenubarItem>
            <Text>Copy</Text>
          </MenubarItem>
          <MenubarItem>
            <Text>Paste</Text>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
