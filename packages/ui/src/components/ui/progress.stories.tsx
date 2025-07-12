import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 33,
    className: "w-80",
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    className: "w-80",
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    className: "w-80",
  },
};

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(13);

    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);

    return <Progress value={progress} className="w-80" />;
  },
};

export const Loading: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }, []);

    return <Progress value={progress} className="w-80" />;
  },
};

export const Small: Story = {
  args: {
    value: 45,
    className: "w-40 h-2",
  },
};

export const Large: Story = {
  args: {
    value: 75,
    className: "w-96 h-6",
  },
};