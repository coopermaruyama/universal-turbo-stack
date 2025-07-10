import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { 
  Checkbox, 
  RadioGroup, 
  RadioGroupItem, 
  CheckboxWithLabel,
  RadioGroupWithLabels 
} from "./checkbox";
import { Label } from "./label";
import { YStack, XStack, Text } from "tamagui";

// Checkbox Stories
const checkboxMeta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
      description: "Whether the checkbox is checked",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the checkbox is disabled",
    },
  },
};

export default checkboxMeta;
type CheckboxStory = StoryObj<typeof checkboxMeta>;

// Default checkbox
export const Default: CheckboxStory = {
  args: {},
};

// Checked checkbox
export const Checked: CheckboxStory = {
  args: {
    checked: true,
  },
};

// Disabled checkbox
export const Disabled: CheckboxStory = {
  args: {
    disabled: true,
  },
};

// Disabled checked checkbox
export const DisabledChecked: CheckboxStory = {
  args: {
    checked: true,
    disabled: true,
  },
};

// Checkbox with label
export const WithLabel: CheckboxStory = {
  render: () => (
    <XStack gap="$2" alignItems="center">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </XStack>
  ),
};

// Checkbox with description
export const WithDescription: CheckboxStory = {
  render: () => (
    <XStack gap="$2" alignItems="flex-start">
      <Checkbox id="emails" />
      <YStack gap="$1">
        <Label htmlFor="emails">Email notifications</Label>
        <Text fontSize="$3" color="$mutedForeground">
          Receive emails about your account activity.
        </Text>
      </YStack>
    </XStack>
  ),
};

// Multiple checkboxes
export const MultipleCheckboxes: CheckboxStory = {
  render: () => (
    <YStack gap="$3" alignItems="flex-start">
      <XStack gap="$2" alignItems="center">
        <Checkbox id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </XStack>
      
      <XStack gap="$2" alignItems="center">
        <Checkbox id="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </XStack>
      
      <XStack gap="$2" alignItems="center">
        <Checkbox id="option3" />
        <Label htmlFor="option3">Option 3</Label>
      </XStack>
      
      <XStack gap="$2" alignItems="center">
        <Checkbox id="option4" disabled />
        <Label htmlFor="option4" disabled>
          Option 4 (Disabled)
        </Label>
      </XStack>
    </YStack>
  ),
};

// Checkbox with label component
export const WithLabelComponent: CheckboxStory = {
  render: () => (
    <YStack gap="$4" width={300}>
      <CheckboxWithLabel
        id="notifications"
        label="Push notifications"
        description="Receive push notifications on your device."
      />
      
      <CheckboxWithLabel
        id="marketing"
        label="Marketing emails"
        description="Receive emails about new products and features."
      />
      
      <CheckboxWithLabel
        id="updates"
        label="Product updates"
        description="Get notified when we ship new features."
        disabled
      />
    </YStack>
  ),
};

// Controlled checkbox
export const Controlled: CheckboxStory = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    
    return (
      <YStack gap="$3" alignItems="flex-start">
        <XStack gap="$2" alignItems="center">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="controlled">Controlled checkbox</Label>
        </XStack>
        
        <Text fontSize="$3" color="$mutedForeground">
          State: {checked ? "Checked" : "Unchecked"}
        </Text>
      </YStack>
    );
  },
};

// RadioGroup Stories
const radioGroupMeta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the radio group",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the radio group is disabled",
    },
  },
};

type RadioGroupStory = StoryObj<typeof radioGroupMeta>;

// Default radio group
export const RadioGroupDefault: RadioGroupStory = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <YStack gap="$3">
        <XStack gap="$2" alignItems="center">
          <RadioGroupItem value="option1" id="radio1" />
          <Label htmlFor="radio1">Option 1</Label>
        </XStack>
        
        <XStack gap="$2" alignItems="center">
          <RadioGroupItem value="option2" id="radio2" />
          <Label htmlFor="radio2">Option 2</Label>
        </XStack>
        
        <XStack gap="$2" alignItems="center">
          <RadioGroupItem value="option3" id="radio3" />
          <Label htmlFor="radio3">Option 3</Label>
        </XStack>
      </YStack>
    </RadioGroup>
  ),
};

// Horizontal radio group
export const RadioGroupHorizontal: RadioGroupStory = {
  render: () => (
    <RadioGroup defaultValue="small" orientation="horizontal">
      <XStack gap="$4">
        <XStack gap="$2" alignItems="center">
          <RadioGroupItem value="small" id="size-small" />
          <Label htmlFor="size-small">Small</Label>
        </XStack>
        
        <XStack gap="$2" alignItems="center">
          <RadioGroupItem value="medium" id="size-medium" />
          <Label htmlFor="size-medium">Medium</Label>
        </XStack>
        
        <XStack gap="$2" alignItems="center">
          <RadioGroupItem value="large" id="size-large" />
          <Label htmlFor="size-large">Large</Label>
        </XStack>
      </XStack>
    </RadioGroup>
  ),
};

// RadioGroup with labels component
export const RadioGroupWithLabelsComponent: RadioGroupStory = {
  render: () => (
    <YStack gap="$4" width={400}>
      <YStack gap="$2">
        <Label>Notification method</Label>
        <RadioGroupWithLabels
          value="email"
          options={[
            {
              value: "email",
              label: "Email",
              description: "Get notified via email",
            },
            {
              value: "sms",
              label: "SMS",
              description: "Get notified via text message",
            },
            {
              value: "push",
              label: "Push notification",
              description: "Get notified via push notification",
            },
            {
              value: "none",
              label: "Nothing",
              description: "No notifications",
              disabled: true,
            },
          ]}
        />
      </YStack>
    </YStack>
  ),
};

// RadioGroup form example
export const RadioGroupForm: RadioGroupStory = {
  render: () => (
    <YStack gap="$4" width={300}>
      <YStack gap="$2">
        <Label>Account type</Label>
        <RadioGroup defaultValue="personal">
          <YStack gap="$3">
            <XStack gap="$2" alignItems="flex-start">
              <RadioGroupItem value="personal" id="account-personal" />
              <YStack gap="$1">
                <Label htmlFor="account-personal">Personal</Label>
                <Text fontSize="$3" color="$mutedForeground">
                  For individual use
                </Text>
              </YStack>
            </XStack>
            
            <XStack gap="$2" alignItems="flex-start">
              <RadioGroupItem value="business" id="account-business" />
              <YStack gap="$1">
                <Label htmlFor="account-business">Business</Label>
                <Text fontSize="$3" color="$mutedForeground">
                  For business and teams
                </Text>
              </YStack>
            </XStack>
            
            <XStack gap="$2" alignItems="flex-start">
              <RadioGroupItem value="enterprise" id="account-enterprise" />
              <YStack gap="$1">
                <Label htmlFor="account-enterprise">Enterprise</Label>
                <Text fontSize="$3" color="$mutedForeground">
                  For large organizations
                </Text>
              </YStack>
            </XStack>
          </YStack>
        </RadioGroup>
      </YStack>
    </YStack>
  ),
};

// Controlled radio group
export const RadioGroupControlled: RadioGroupStory = {
  render: () => {
    const [value, setValue] = React.useState("option1");
    
    return (
      <YStack gap="$3" alignItems="flex-start">
        <RadioGroup value={value} onValueChange={setValue}>
          <YStack gap="$3">
            <XStack gap="$2" alignItems="center">
              <RadioGroupItem value="option1" id="controlled-radio1" />
              <Label htmlFor="controlled-radio1">Option 1</Label>
            </XStack>
            
            <XStack gap="$2" alignItems="center">
              <RadioGroupItem value="option2" id="controlled-radio2" />
              <Label htmlFor="controlled-radio2">Option 2</Label>
            </XStack>
            
            <XStack gap="$2" alignItems="center">
              <RadioGroupItem value="option3" id="controlled-radio3" />
              <Label htmlFor="controlled-radio3">Option 3</Label>
            </XStack>
          </YStack>
        </RadioGroup>
        
        <Text fontSize="$3" color="$mutedForeground">
          Selected: {value}
        </Text>
      </YStack>
    );
  },
};