import type { Meta, StoryObj } from "@storybook/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Text } from "./text";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select onValueChange={() => {}}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple" label="Apple">
          <Text>Apple</Text>
        </SelectItem>
        <SelectItem value="banana" label="Banana">
          <Text>Banana</Text>
        </SelectItem>
        <SelectItem value="blueberry" label="Blueberry">
          <Text>Blueberry</Text>
        </SelectItem>
        <SelectItem value="grapes" label="Grapes">
          <Text>Grapes</Text>
        </SelectItem>
        <SelectItem value="pineapple" label="Pineapple">
          <Text>Pineapple</Text>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select onValueChange={() => {}}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            <Text>North America</Text>
          </SelectLabel>
          <SelectItem value="est" label="Eastern Standard Time (EST)">
            <Text>Eastern Standard Time (EST)</Text>
          </SelectItem>
          <SelectItem value="cst" label="Central Standard Time (CST)">
            <Text>Central Standard Time (CST)</Text>
          </SelectItem>
          <SelectItem value="mst" label="Mountain Standard Time (MST)">
            <Text>Mountain Standard Time (MST)</Text>
          </SelectItem>
          <SelectItem value="pst" label="Pacific Standard Time (PST)">
            <Text>Pacific Standard Time (PST)</Text>
          </SelectItem>
          <SelectItem value="akst" label="Alaska Standard Time (AKST)">
            <Text>Alaska Standard Time (AKST)</Text>
          </SelectItem>
          <SelectItem value="hst" label="Hawaii Standard Time (HST)">
            <Text>Hawaii Standard Time (HST)</Text>
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>
            <Text>Europe & Africa</Text>
          </SelectLabel>
          <SelectItem value="gmt" label="Greenwich Mean Time (GMT)">
            <Text>Greenwich Mean Time (GMT)</Text>
          </SelectItem>
          <SelectItem value="cet" label="Central European Time (CET)">
            <Text>Central European Time (CET)</Text>
          </SelectItem>
          <SelectItem value="eet" label="Eastern European Time (EET)">
            <Text>Eastern European Time (EET)</Text>
          </SelectItem>
          <SelectItem value="west" label="Western European Summer Time (WEST)">
            <Text>Western European Summer Time (WEST)</Text>
          </SelectItem>
          <SelectItem value="cat" label="Central Africa Time (CAT)">
            <Text>Central Africa Time (CAT)</Text>
          </SelectItem>
          <SelectItem value="eat" label="East Africa Time (EAT)">
            <Text>East Africa Time (EAT)</Text>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled onValueChange={() => {}}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Disabled select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="item1" label="Item 1" disabled>
          <Text>Item 1</Text>
        </SelectItem>
        <SelectItem value="item2" label="Item 2">
          <Text>Item 2</Text>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
<Select defaultValue={"apple" as any} onValueChange={() => {}}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple" label="Apple">
          <Text>Apple</Text>
        </SelectItem>
        <SelectItem value="banana" label="Banana">
          <Text>Banana</Text>
        </SelectItem>
        <SelectItem value="orange" label="Orange">
          <Text>Orange</Text>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};
