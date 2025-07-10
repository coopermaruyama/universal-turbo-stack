import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
  SimpleTabs,
} from "./tabs";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Card } from "./card";
import { YStack, XStack, Text, H3 } from "tamagui";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the tabs",
    },
    defaultValue: {
      control: { type: "text" },
      description: "The default active tab",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default tabs
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" width={400}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      
      <TabsContent value="account">
        <YStack gap="$4">
          <YStack gap="$2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </YStack>
          <YStack gap="$2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </YStack>
        </YStack>
      </TabsContent>
      
      <TabsContent value="password">
        <YStack gap="$4">
          <YStack gap="$2">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
          </YStack>
          <YStack gap="$2">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" />
          </YStack>
        </YStack>
      </TabsContent>
    </Tabs>
  ),
};

// Simple tabs component
export const SimpleTabsExample: Story = {
  render: () => (
    <SimpleTabs
      defaultValue="overview"
      tabs={[
        {
          value: "overview",
          label: "Overview",
          content: (
            <YStack gap="$4" padding="$4">
              <H3>Overview</H3>
              <Text>
                Welcome to your dashboard. Here you can see an overview of your account and recent activity.
              </Text>
              <XStack gap="$2">
                <Button>View Details</Button>
                <Button variant="outline">Export Data</Button>
              </XStack>
            </YStack>
          ),
        },
        {
          value: "analytics",
          label: "Analytics",
          content: (
            <YStack gap="$4" padding="$4">
              <H3>Analytics</H3>
              <Text>
                Your analytics and performance metrics will be displayed here.
              </Text>
              <Text fontSize="$3" color="$mutedForeground">
                Analytics data is updated every hour.
              </Text>
            </YStack>
          ),
        },
        {
          value: "reports",
          label: "Reports",
          content: (
            <YStack gap="$4" padding="$4">
              <H3>Reports</H3>
              <Text>
                Generate and view your reports in this section.
              </Text>
              <Button>Generate New Report</Button>
            </YStack>
          ),
        },
      ]}
    />
  ),
};

// Three tabs
export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" width={500}>
      <TabsList>
        <TabsTrigger value="tab1">General</TabsTrigger>
        <TabsTrigger value="tab2">Security</TabsTrigger>
        <TabsTrigger value="tab3">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tab1">
        <YStack gap="$4" padding="$4">
          <Text fontWeight="600" fontSize="$5">General Settings</Text>
          <YStack gap="$3">
            <YStack gap="$2">
              <Label htmlFor="display-name">Display Name</Label>
              <Input id="display-name" placeholder="Your display name" />
            </YStack>
            <YStack gap="$2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" placeholder="Tell us about yourself" />
            </YStack>
          </YStack>
        </YStack>
      </TabsContent>
      
      <TabsContent value="tab2">
        <YStack gap="$4" padding="$4">
          <Text fontWeight="600" fontSize="$5">Security Settings</Text>
          <YStack gap="$3">
            <YStack gap="$2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </YStack>
            <YStack gap="$2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </YStack>
          </YStack>
        </YStack>
      </TabsContent>
      
      <TabsContent value="tab3">
        <YStack gap="$4" padding="$4">
          <Text fontWeight="600" fontSize="$5">Notification Settings</Text>
          <YStack gap="$3">
            <Text>Configure how you receive notifications.</Text>
            <Button variant="outline">Manage Notifications</Button>
          </YStack>
        </YStack>
      </TabsContent>
    </Tabs>
  ),
};

// With disabled tab
export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="available" width={400}>
      <TabsList>
        <TabsTrigger value="available">Available</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="available">
        <YStack gap="$2" padding="$4">
          <Text fontWeight="600">Available Items</Text>
          <Text color="$mutedForeground">
            These items are currently available.
          </Text>
        </YStack>
      </TabsContent>
      
      <TabsContent value="pending">
        <YStack gap="$2" padding="$4">
          <Text fontWeight="600">Pending Items</Text>
          <Text color="$mutedForeground">
            These items are pending approval.
          </Text>
        </YStack>
      </TabsContent>
      
      <TabsContent value="disabled">
        <YStack gap="$2" padding="$4">
          <Text fontWeight="600">Disabled Content</Text>
          <Text color="$mutedForeground">
            This content should not be accessible.
          </Text>
        </YStack>
      </TabsContent>
    </Tabs>
  ),
};

// Controlled tabs
export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState("home");
    
    return (
      <YStack gap="$4" width={400}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="home">
            <YStack gap="$2" padding="$4">
              <Text fontWeight="600">Home</Text>
              <Text>Welcome to the home page!</Text>
            </YStack>
          </TabsContent>
          
          <TabsContent value="profile">
            <YStack gap="$2" padding="$4">
              <Text fontWeight="600">Profile</Text>
              <Text>Manage your profile settings here.</Text>
            </YStack>
          </TabsContent>
          
          <TabsContent value="settings">
            <YStack gap="$2" padding="$4">
              <Text fontWeight="600">Settings</Text>
              <Text>Configure your application settings.</Text>
            </YStack>
          </TabsContent>
        </Tabs>
        
        <YStack gap="$2">
          <Text fontSize="$3" color="$mutedForeground">
            Active tab: {activeTab}
          </Text>
          <XStack gap="$2">
            <Button 
              variant="outline" 
              size="sm"
              onPress={() => setActiveTab("home")}
            >
              Go to Home
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onPress={() => setActiveTab("profile")}
            >
              Go to Profile
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onPress={() => setActiveTab("settings")}
            >
              Go to Settings
            </Button>
          </XStack>
        </YStack>
      </YStack>
    );
  },
};

// Complex content
export const ComplexContent: Story = {
  render: () => (
    <Tabs defaultValue="dashboard" width={600}>
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <YStack gap="$4" padding="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <H3>Dashboard Overview</H3>
            <Button size="sm">Refresh</Button>
          </XStack>
          
          <XStack gap="$4">
            <Card padding="$4" flex={1}>
              <YStack gap="$2">
                <Text fontSize="$2" color="$mutedForeground">Total Revenue</Text>
                <Text fontSize="$6" fontWeight="600">$45,231.89</Text>
                <Text fontSize="$2" color="green">+20.1% from last month</Text>
              </YStack>
            </Card>
            
            <Card padding="$4" flex={1}>
              <YStack gap="$2">
                <Text fontSize="$2" color="$mutedForeground">Active Users</Text>
                <Text fontSize="$6" fontWeight="600">2,350</Text>
                <Text fontSize="$2" color="green">+180 from last month</Text>
              </YStack>
            </Card>
          </XStack>
        </YStack>
      </TabsContent>
      
      <TabsContent value="transactions">
        <YStack gap="$4" padding="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <H3>Recent Transactions</H3>
            <Button size="sm" variant="outline">Export</Button>
          </XStack>
          
          <YStack gap="$3">
            {[
              { id: 1, desc: "Payment from John Doe", amount: "+$250.00" },
              { id: 2, desc: "Subscription fee", amount: "-$29.99" },
              { id: 3, desc: "Payment from Jane Smith", amount: "+$150.00" },
            ].map((transaction) => (
              <Card key={transaction.id} padding="$3">
                <XStack justifyContent="space-between" alignItems="center">
                  <Text>{transaction.desc}</Text>
                  <Text fontWeight="600">{transaction.amount}</Text>
                </XStack>
              </Card>
            ))}
          </YStack>
        </YStack>
      </TabsContent>
      
      <TabsContent value="invoices">
        <YStack gap="$4" padding="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <H3>Invoices</H3>
            <Button size="sm">Create Invoice</Button>
          </XStack>
          
          <Text color="$mutedForeground">
            No invoices found. Create your first invoice to get started.
          </Text>
        </YStack>
      </TabsContent>
    </Tabs>
  ),
};

// Many tabs (scrollable)
export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" width={500}>
      <TabsList>
        {Array.from({ length: 8 }, (_, i) => (
          <TabsTrigger key={i + 1} value={`tab${i + 1}`}>
            Tab {i + 1}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {Array.from({ length: 8 }, (_, i) => (
        <TabsContent key={i + 1} value={`tab${i + 1}`}>
          <YStack gap="$2" padding="$4">
            <Text fontWeight="600">Content for Tab {i + 1}</Text>
            <Text color="$mutedForeground">
              This is the content for tab number {i + 1}.
            </Text>
          </YStack>
        </TabsContent>
      ))}
    </Tabs>
  ),
};