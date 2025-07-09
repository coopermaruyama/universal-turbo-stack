import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Text, XStack, YStack } from "tamagui";

import { Label } from "./label";
import { ShadcnSwitch as Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
    },
    checked: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    onCheckedChange: {
      action: "checked changed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic default switch
export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch checked={checked} onCheckedChange={setChecked} />;
  },
};

// Switch with label
export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <XStack space="$2" alignItems="center">
        <Switch
          id="airplane-mode"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="airplane-mode">Airplane mode</Label>
      </XStack>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [smallChecked, setSmallChecked] = useState(false);
    const [defaultChecked, setDefaultChecked] = useState(true);
    const [largeChecked, setLargeChecked] = useState(false);

    return (
      <YStack space="$4" alignItems="flex-start">
        <XStack space="$3" alignItems="center">
          <Switch
            size="sm"
            checked={smallChecked}
            onCheckedChange={setSmallChecked}
          />
          <Text>Small</Text>
        </XStack>
        <XStack space="$3" alignItems="center">
          <Switch
            size="default"
            checked={defaultChecked}
            onCheckedChange={setDefaultChecked}
          />
          <Text>Default</Text>
        </XStack>
        <XStack space="$3" alignItems="center">
          <Switch
            size="lg"
            checked={largeChecked}
            onCheckedChange={setLargeChecked}
          />
          <Text>Large</Text>
        </XStack>
      </YStack>
    );
  },
};

// Disabled states
export const Disabled: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start">
      <XStack space="$3" alignItems="center">
        <Switch disabled checked={false} />
        <Text opacity={0.5}>Disabled (unchecked)</Text>
      </XStack>
      <XStack space="$3" alignItems="center">
        <Switch disabled checked={true} />
        <Text opacity={0.5}>Disabled (checked)</Text>
      </XStack>
    </YStack>
  ),
};

// Form example
export const FormExample: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      marketing: false,
      security: true,
      analytics: false,
    });

    const updateSetting =
      (key: keyof typeof settings) => (checked: boolean) => {
        setSettings((prev) => ({ ...prev, [key]: checked }));
      };

    return (
      <YStack space="$4" minWidth={300}>
        <Text fontSize="$5" fontWeight="600">
          Notification Settings
        </Text>

        <YStack space="$3">
          <XStack space="$3" alignItems="center" justifyContent="space-between">
            <YStack flex={1}>
              <Label htmlFor="marketing">Marketing emails</Label>
              <Text fontSize="$2" color="$mutedForeground">
                Receive emails about new products, features, and more.
              </Text>
            </YStack>
            <Switch
              id="marketing"
              checked={settings.marketing}
              onCheckedChange={updateSetting("marketing")}
            />
          </XStack>

          <XStack space="$3" alignItems="center" justifyContent="space-between">
            <YStack flex={1}>
              <Label htmlFor="security">Security emails</Label>
              <Text fontSize="$2" color="$mutedForeground">
                Receive emails about your account security.
              </Text>
            </YStack>
            <Switch
              id="security"
              checked={settings.security}
              onCheckedChange={updateSetting("security")}
            />
          </XStack>

          <XStack space="$3" alignItems="center" justifyContent="space-between">
            <YStack flex={1}>
              <Label htmlFor="analytics">Analytics emails</Label>
              <Text fontSize="$2" color="$mutedForeground">
                Receive emails about your account activity.
              </Text>
            </YStack>
            <Switch
              id="analytics"
              checked={settings.analytics}
              onCheckedChange={updateSetting("analytics")}
            />
          </XStack>
        </YStack>
      </YStack>
    );
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => {
    const [state1, setState1] = useState(false);
    const [state2, setState2] = useState(true);

    return (
      <YStack space="$4" alignItems="flex-start">
        <Text fontSize="$4" fontWeight="500">
          Interactive States
        </Text>

        <XStack space="$4" flexWrap="wrap">
          <YStack space="$2" alignItems="center">
            <Switch checked={state1} onCheckedChange={setState1} />
            <Text fontSize="$2">Unchecked</Text>
          </YStack>

          <YStack space="$2" alignItems="center">
            <Switch checked={state2} onCheckedChange={setState2} />
            <Text fontSize="$2">Checked</Text>
          </YStack>

          <YStack space="$2" alignItems="center">
            <Switch disabled checked={false} />
            <Text fontSize="$2">Disabled Off</Text>
          </YStack>

          <YStack space="$2" alignItems="center">
            <Switch disabled checked={true} />
            <Text fontSize="$2">Disabled On</Text>
          </YStack>
        </XStack>

        <Text fontSize="$4" fontWeight="500" marginTop="$4">
          Size Variants
        </Text>

        <XStack space="$4" alignItems="center" flexWrap="wrap">
          <YStack space="$2" alignItems="center">
            <Switch size="sm" checked={true} onCheckedChange={() => {}} />
            <Text fontSize="$2">Small</Text>
          </YStack>

          <YStack space="$2" alignItems="center">
            <Switch size="default" checked={true} onCheckedChange={() => {}} />
            <Text fontSize="$2">Default</Text>
          </YStack>

          <YStack space="$2" alignItems="center">
            <Switch size="lg" checked={true} onCheckedChange={() => {}} />
            <Text fontSize="$2">Large</Text>
          </YStack>
        </XStack>
      </YStack>
    );
  },
};

// Settings panel example
export const SettingsPanel: Story = {
  render: () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [autoSave, setAutoSave] = useState(true);
    const [analytics, setAnalytics] = useState(false);

    return (
      <YStack
        space="$4"
        padding="$4"
        minWidth={350}
        backgroundColor="$background"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$border"
      >
        <Text fontSize="$5" fontWeight="600">
          Settings
        </Text>

        <YStack space="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <YStack flex={1}>
              <Text fontWeight="500">Dark mode</Text>
              <Text fontSize="$3" color="$mutedForeground">
                Use dark theme
              </Text>
            </YStack>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </XStack>

          <XStack justifyContent="space-between" alignItems="center">
            <YStack flex={1}>
              <Text fontWeight="500">Push notifications</Text>
              <Text fontSize="$3" color="$mutedForeground">
                Receive push notifications
              </Text>
            </YStack>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </XStack>

          <XStack justifyContent="space-between" alignItems="center">
            <YStack flex={1}>
              <Text fontWeight="500">Auto-save</Text>
              <Text fontSize="$3" color="$mutedForeground">
                Automatically save changes
              </Text>
            </YStack>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </XStack>

          <XStack justifyContent="space-between" alignItems="center">
            <YStack flex={1}>
              <Text fontWeight="500">Analytics</Text>
              <Text fontSize="$3" color="$mutedForeground">
                Help improve our service
              </Text>
            </YStack>
            <Switch checked={analytics} onCheckedChange={setAnalytics} />
          </XStack>
        </YStack>
      </YStack>
    );
  },
};

// Playground story for interactive testing
export const Playground: Story = {
  args: {
    size: "default",
    checked: false,
    disabled: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};
