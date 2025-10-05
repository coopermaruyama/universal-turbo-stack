import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, Info as InfoIcon, Terminal } from "lucide-react-native";

import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive"],
    },
    children: {
      mapping: {
        default: (
          <>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </>
        ),
        destructive: (
          <>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </>
        ),
        info: (
          <>
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              This is an informational alert with useful details.
            </AlertDescription>
          </>
        ),
        simple: <AlertDescription>A simple alert message.</AlertDescription>,
      },
      control: { type: "select" },
      options: ["default", "destructive", "info", "simple"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Terminal,
    children: "default",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    icon: AlertTriangle,
    children: "destructive",
  },
};

export const Info: Story = {
  args: {
    icon: InfoIcon,
    children: "info",
  },
};

export const Simple: Story = {
  args: {
    icon: Terminal,
    children: "simple",
  },
};
