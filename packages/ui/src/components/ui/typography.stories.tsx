import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import {
  H1,
  H2,
  H3,
  H4,
  P,
  BlockQuote,
  Code,
  Lead,
  Large,
  Small,
  Muted,
} from "./typography";

const meta: Meta<typeof H1> = {
  title: "UI/Typography",
  component: H1,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllHeadings: Story = {
  render: () => (
    <View className="w-full max-w-2xl space-y-4">
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
    </View>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <View className="w-full max-w-2xl space-y-4">
      <H2>Typography</H2>
      <P>
        The king, seeing how much happier his subjects were, realized the
        importance of their happiness and well-being over mere gold and silver.
      </P>
      <P>
        From that day forward, the kingdom flourished not just in wealth, but in
        the joy and contentment of its people.
      </P>
    </View>
  ),
};

export const Quote: Story = {
  render: () => (
    <View className="w-full max-w-2xl space-y-4">
      <H3>Inspirational Quote</H3>
      <BlockQuote>
        "After all," he said, "everyone enjoys a good joke, so it's only fair
        that they should pay for the privilege."
      </BlockQuote>
    </View>
  ),
};

export const CodeExample: Story = {
  render: () => (
    <View className="w-full max-w-2xl space-y-4">
      <H3>Code Sample</H3>
      <P>
        Install the package by running <Code>npm install @acme/ui</Code> in your
        terminal.
      </P>
    </View>
  ),
};

export const TextSizes: Story = {
  render: () => (
    <View className="w-full max-w-2xl space-y-4">
      <Lead>
        This is a lead paragraph. It stands out from regular paragraph text.
      </Lead>
      <Large>This is large text.</Large>
      <P>This is regular paragraph text.</P>
      <Small>This is small text.</Small>
      <Muted>This is muted text.</Muted>
    </View>
  ),
};

export const Article: Story = {
  render: () => (
    <View className="w-full max-w-2xl space-y-6">
      <View>
        <H1>Introduction to React Native</H1>
        <Lead>
          Learn how to build mobile applications using React Native and modern
          development practices.
        </Lead>
      </View>
      
      <View className="space-y-4">
        <H2>Getting Started</H2>
        <P>
          React Native is a framework for building native mobile applications
          using React. It allows you to write your app once and deploy it to
          both iOS and Android platforms.
        </P>
        
        <H3>Installation</H3>
        <P>
          To get started, you'll need to install the React Native CLI. Run the
          following command in your terminal:
        </P>
        <Code>npx react-native init MyProject</Code>
        
        <H3>Key Benefits</H3>
        <P>
          React Native offers several advantages for mobile development:
        </P>
        <BlockQuote>
          "Learn once, write anywhere" - this philosophy allows developers to
          leverage their React knowledge for mobile development.
        </BlockQuote>
      </View>
      
      <View>
        <Small>Last updated: December 2024</Small>
      </View>
    </View>
  ),
};