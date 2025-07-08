import type { Meta, StoryObj } from "@storybook/nextjs";
import React, { useState } from "react";

// Demo component that showcases various features
const ComponentShowcase = () => {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`rounded-lg border p-8 transition-colors ${
        darkMode
          ? "border-gray-700 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-gray-900"
      }`}
    >
      <h2 className="mb-4 text-2xl font-bold">Component Showcase</h2>

      <div className="grid gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount(count + 1)}
            className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Count: {count}
          </button>

          <button
            onClick={() => setCount(0)}
            className="rounded bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="darkMode"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="darkMode" className="text-sm">
            Toggle component dark mode
          </label>
        </div>

        <div className="rounded border-2 border-dashed border-gray-300 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This showcase demonstrates:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
            <li>State management with useState</li>
            <li>Conditional styling and theming</li>
            <li>Interactive elements</li>
            <li>Responsive design patterns</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof ComponentShowcase> = {
  title: "Examples/Component Showcase",
  component: ComponentShowcase,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Component Showcase

This is a comprehensive example that demonstrates various React patterns and Storybook features:

- **Interactive State**: Counter with increment and reset functionality
- **Theme Toggle**: Component-level dark/light mode switching
- **Responsive Design**: Flexible grid layout that adapts to different screen sizes
- **Code Preview**: View the source code using the "Show code" tab
- **Dark Mode**: Use the dark mode toggle in the toolbar to see global theme changes

## Features Demonstrated

1. **useState Hook**: Managing component state for counters and toggles
2. **Conditional Rendering**: Dynamic styling based on state
3. **Event Handling**: Click handlers and form interactions
4. **CSS Classes**: Tailwind CSS for styling and responsive design
5. **Accessibility**: Proper labeling and semantic HTML

Try interacting with the components and switching between light and dark themes!
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InMobileViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
};

export const InTabletViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
