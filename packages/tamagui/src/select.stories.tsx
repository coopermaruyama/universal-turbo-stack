import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectItem, SelectItemText, SelectSeparator, SelectLabel, SelectGroup } from "./select";
import { Label } from "./label";
import { YStack } from "tamagui";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text when no value is selected",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the select is disabled",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
      description: "The select size",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default select
export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectItem index={0} value="apple">
        <SelectItemText>Apple</SelectItemText>
      </SelectItem>
      <SelectItem index={1} value="banana">
        <SelectItemText>Banana</SelectItemText>
      </SelectItem>
      <SelectItem index={2} value="orange">
        <SelectItemText>Orange</SelectItemText>
      </SelectItem>
      <SelectItem index={3} value="grape">
        <SelectItemText>Grape</SelectItemText>
      </SelectItem>
    </Select>
  ),
  args: {
    placeholder: "Select a fruit...",
  },
};

// With Label
export const WithLabel: Story = {
  render: () => (
    <YStack gap="$2" width={300}>
      <Label htmlFor="fruit-select">Choose a fruit</Label>
      <Select placeholder="Select a fruit...">
        <SelectItem index={0} value="apple">
          <SelectItemText>Apple</SelectItemText>
        </SelectItem>
        <SelectItem index={1} value="banana">
          <SelectItemText>Banana</SelectItemText>
        </SelectItem>
        <SelectItem index={2} value="orange">
          <SelectItemText>Orange</SelectItemText>
        </SelectItem>
        <SelectItem index={3} value="grape">
          <SelectItemText>Grape</SelectItemText>
        </SelectItem>
      </Select>
    </YStack>
  ),
};

// With default value
export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="banana" placeholder="Select a fruit...">
      <SelectItem index={0} value="apple">
        <SelectItemText>Apple</SelectItemText>
      </SelectItem>
      <SelectItem index={1} value="banana">
        <SelectItemText>Banana</SelectItemText>
      </SelectItem>
      <SelectItem index={2} value="orange">
        <SelectItemText>Orange</SelectItemText>
      </SelectItem>
      <SelectItem index={3} value="grape">
        <SelectItemText>Grape</SelectItemText>
      </SelectItem>
    </Select>
  ),
};

// Disabled select
export const Disabled: Story = {
  render: () => (
    <Select disabled placeholder="This select is disabled">
      <SelectItem index={0} value="apple">
        <SelectItemText>Apple</SelectItemText>
      </SelectItem>
      <SelectItem index={1} value="banana">
        <SelectItemText>Banana</SelectItemText>
      </SelectItem>
    </Select>
  ),
};

// With separators and groups
export const WithGroups: Story = {
  render: () => (
    <Select placeholder="Select an option...">
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem index={0} value="apple">
          <SelectItemText>Apple</SelectItemText>
        </SelectItem>
        <SelectItem index={1} value="banana">
          <SelectItemText>Banana</SelectItemText>
        </SelectItem>
        <SelectItem index={2} value="orange">
          <SelectItemText>Orange</SelectItemText>
        </SelectItem>
      </SelectGroup>
      
      <SelectSeparator />
      
      <SelectGroup>
        <SelectLabel>Vegetables</SelectLabel>
        <SelectItem index={0} value="carrot">
          <SelectItemText>Carrot</SelectItemText>
        </SelectItem>
        <SelectItem index={0} value="broccoli">
          <SelectItemText>Broccoli</SelectItemText>
        </SelectItem>
        <SelectItem index={0} value="spinach">
          <SelectItemText>Spinach</SelectItemText>
        </SelectItem>
      </SelectGroup>
    </Select>
  ),
};

// Long list
export const LongList: Story = {
  render: () => (
    <Select placeholder="Select a country...">
      <SelectItem index={0} value="us">
        <SelectItemText>United States</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="uk">
        <SelectItemText>United Kingdom</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="ca">
        <SelectItemText>Canada</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="au">
        <SelectItemText>Australia</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="de">
        <SelectItemText>Germany</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="fr">
        <SelectItemText>France</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="it">
        <SelectItemText>Italy</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="es">
        <SelectItemText>Spain</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="jp">
        <SelectItemText>Japan</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="kr">
        <SelectItemText>South Korea</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="cn">
        <SelectItemText>China</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="in">
        <SelectItemText>India</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="br">
        <SelectItemText>Brazil</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="mx">
        <SelectItemText>Mexico</SelectItemText>
      </SelectItem>
      <SelectItem index={0} value="ar">
        <SelectItemText>Argentina</SelectItemText>
      </SelectItem>
    </Select>
  ),
};

// Form example
export const FormExample: Story = {
  render: () => (
    <YStack gap="$4" width={300}>
      <YStack gap="$2">
        <Label htmlFor="category">Category</Label>
        <Select placeholder="Select a category...">
          <SelectItem index={0} value="electronics">
            <SelectItemText>Electronics</SelectItemText>
          </SelectItem>
          <SelectItem index={0} value="clothing">
            <SelectItemText>Clothing</SelectItemText>
          </SelectItem>
          <SelectItem index={0} value="books">
            <SelectItemText>Books</SelectItemText>
          </SelectItem>
          <SelectItem index={0} value="home">
            <SelectItemText>Home & Garden</SelectItemText>
          </SelectItem>
        </Select>
      </YStack>
      
      <YStack gap="$2">
        <Label htmlFor="priority">Priority</Label>
        <Select defaultValue="medium" placeholder="Select priority...">
          <SelectItem index={0} value="low">
            <SelectItemText>Low</SelectItemText>
          </SelectItem>
          <SelectItem index={0} value="medium">
            <SelectItemText>Medium</SelectItemText>
          </SelectItem>
          <SelectItem index={0} value="high">
            <SelectItemText>High</SelectItemText>
          </SelectItem>
          <SelectItem index={0} value="urgent">
            <SelectItemText>Urgent</SelectItemText>
          </SelectItem>
        </Select>
      </YStack>
      
      <YStack gap="$2">
        <Label htmlFor="status">Status</Label>
        <Select placeholder="Select status...">
          <SelectGroup>
            <SelectLabel>Active</SelectLabel>
            <SelectItem index={0} value="draft">
              <SelectItemText>Draft</SelectItemText>
            </SelectItem>
            <SelectItem index={0} value="pending">
              <SelectItemText>Pending Review</SelectItemText>
            </SelectItem>
            <SelectItem index={0} value="published">
              <SelectItemText>Published</SelectItemText>
            </SelectItem>
          </SelectGroup>
          
          <SelectSeparator />
          
          <SelectGroup>
            <SelectLabel>Inactive</SelectLabel>
            <SelectItem index={0} value="archived">
              <SelectItemText>Archived</SelectItemText>
            </SelectItem>
            <SelectItem index={0} value="deleted">
              <SelectItemText>Deleted</SelectItemText>
            </SelectItem>
          </SelectGroup>
        </Select>
      </YStack>
    </YStack>
  ),
};

// Controlled example
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>("");
    
    return (
      <YStack gap="$3" width={300}>
        <Select value={value} onValueChange={setValue} placeholder="Select an option...">
          <SelectItem index={0} value="option1">
            <SelectItemText>Option 1</SelectItemText>
          </SelectItem>
          <SelectItem index={0} value="option2">
            <SelectItemText>Option 2</SelectItemText>
          </SelectItem>
          <SelectItem index={0} value="option3">
            <SelectItemText>Option 3</SelectItemText>
          </SelectItem>
        </Select>
        
        <YStack gap="$2">
          <Label>Selected value: {value || "None"}</Label>
          <Label fontSize="$2" color="$mutedForeground" fontWeight="400">
            This example shows controlled state management.
          </Label>
        </YStack>
      </YStack>
    );
  },
};