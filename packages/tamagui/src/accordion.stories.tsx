import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent,
  SimpleAccordion,
} from "./accordion";
import { Button } from "./button";
import { YStack, Text } from "tamagui";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
      description: "Whether multiple items can be open at once",
    },
    collapsible: {
      control: { type: "boolean" },
      description: "Whether items can be collapsed when type is single",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default accordion
export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" width={400}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and uses semantic HTML elements.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the shadcn/ui design system, 
          but you can customize it however you want.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses Tamagui's animation system for smooth open and close transitions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Multiple type accordion
export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["item-1", "item-3"]} width={400}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces, 
          particularly web applications. It was developed by Facebook and 
          allows developers to create reusable UI components.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>What is Tamagui?</AccordionTrigger>
        <AccordionContent>
          Tamagui is a universal UI library and design system that works 
          across React Native and Web with optimized performance and 
          developer experience.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger>What is TypeScript?</AccordionTrigger>
        <AccordionContent>
          TypeScript is a strongly typed programming language that builds 
          on JavaScript, giving you better tooling at any scale. It adds 
          type definitions to JavaScript.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-4">
        <AccordionTrigger>What is Next.js?</AccordionTrigger>
        <AccordionContent>
          Next.js is a React framework that provides many built-in features 
          such as server-side rendering, static site generation, and 
          automatic code splitting.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Simple accordion component
export const SimpleAccordionExample: Story = {
  render: () => (
    <SimpleAccordion
      type="single"
      collapsible
      defaultValue="faq-1"
      items={[
        {
          value: "faq-1",
          title: "How do I create an account?",
          content: "You can create an account by clicking the 'Sign Up' button and filling out the required information.",
        },
        {
          value: "faq-2",
          title: "How do I reset my password?",
          content: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
        },
        {
          value: "faq-3",
          title: "Can I change my username?",
          content: "Yes, you can change your username in your account settings. Note that this can only be done once every 30 days.",
        },
        {
          value: "faq-4",
          title: "How do I delete my account?",
          content: "Account deletion can be requested through the support page. Please note that this action is irreversible.",
          disabled: true,
        },
      ]}
    />
  ),
};

// With disabled item
export const WithDisabled: Story = {
  render: () => (
    <Accordion type="single" collapsible width={400}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Available Item</AccordionTrigger>
        <AccordionContent>
          This item is available and can be opened normally.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled Item</AccordionTrigger>
        <AccordionContent>
          This content should not be visible since the item is disabled.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger>Another Available Item</AccordionTrigger>
        <AccordionContent>
          This is another item that works normally.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Controlled accordion
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>("item-1");
    
    return (
      <YStack gap="$4" width={400}>
        <Accordion 
          type="single" 
          collapsible 
          value={value} 
          onValueChange={(val) => setValue(val as string | undefined)}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>First Item</AccordionTrigger>
            <AccordionContent>
              This is the content of the first item.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>
              This is the content of the second item.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>Third Item</AccordionTrigger>
            <AccordionContent>
              This is the content of the third item.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <YStack gap="$2">
          <Text fontSize="$3" color="$mutedForeground">
            Current value: {value || "none"}
          </Text>
          
          <YStack gap="$2">
            <Button 
              variant="outline" 
              size="sm"
              onPress={() => setValue("item-1")}
            >
              Open Item 1
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onPress={() => setValue("item-2")}
            >
              Open Item 2
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onPress={() => setValue("item-3")}
            >
              Open Item 3
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onPress={() => setValue(undefined)}
            >
              Close All
            </Button>
          </YStack>
        </YStack>
      </YStack>
    );
  },
};

// Multiple controlled
export const MultipleControlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(["item-1"]);
    
    return (
      <YStack gap="$4" width={400}>
        <Accordion 
          type="multiple" 
          value={value} 
          onValueChange={(newValue) => setValue(newValue as string[])}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Programming Languages</AccordionTrigger>
            <AccordionContent>
              JavaScript, TypeScript, Python, Rust, Go, and many more!
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Frameworks</AccordionTrigger>
            <AccordionContent>
              React, Next.js, Vue.js, Angular, Svelte, and others.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>Tools</AccordionTrigger>
            <AccordionContent>
              VS Code, Git, Docker, Webpack, Vite, ESLint, Prettier.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <YStack gap="$2">
          <Text fontSize="$3" color="$mutedForeground">
            Open items: {value.length > 0 ? value.join(", ") : "none"}
          </Text>
          
          <YStack gap="$2">
            <Button 
              variant="outline" 
              size="sm"
              onPress={() => setValue(["item-1", "item-2", "item-3"])}
            >
              Open All
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onPress={() => setValue([])}
            >
              Close All
            </Button>
          </YStack>
        </YStack>
      </YStack>
    );
  },
};

// FAQ example
export const FAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible width={500}>
      <AccordionItem value="shipping">
        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
        <AccordionContent>
          We offer standard shipping (5-7 business days) and express shipping 
          (2-3 business days). Free shipping is available on orders over $50 
          for standard delivery.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="returns">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          We accept returns within 30 days of purchase. Items must be in 
          original condition with tags attached. Return shipping is free 
          for defective items or our error.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="sizing">
        <AccordionTrigger>How do I find the right size?</AccordionTrigger>
        <AccordionContent>
          Each product page includes a detailed size chart. You can also 
          use our size recommendation tool by entering your measurements. 
          If you're between sizes, we generally recommend sizing up.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="warranty">
        <AccordionTrigger>Do you offer a warranty?</AccordionTrigger>
        <AccordionContent>
          Yes, all our products come with a 1-year warranty against 
          manufacturing defects. Electronics include an additional 
          6-month warranty for electrical components.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="international">
        <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
        <AccordionContent>
          We currently ship to over 50 countries worldwide. International 
          shipping costs vary by destination and are calculated at checkout. 
          Delivery times range from 7-21 business days depending on location.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};