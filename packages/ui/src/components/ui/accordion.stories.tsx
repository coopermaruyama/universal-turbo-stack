import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Text } from "./text";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text>Is it accessible?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <Text>Is it styled?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <Text>Is it animated?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text>Section 1</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Content for section 1.</Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <Text>Section 2</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Content for section 2.</Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <Text>Section 3</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Content for section 3.</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Single: Story = {
  render: () => (
    <Accordion type="single" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text>FAQ Item</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>This is a single accordion item with detailed content.</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
