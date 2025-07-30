import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui/tabs";
import { Text } from "@acme/ui/text";
import * as React from "react";
import { View } from "react-native";

export default function TabsScreen() {
  const [value, setValue] = React.useState("account");
  return (
    <View className="flex-1 justify-center p-6">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="mx-auto w-full max-w-[400px] flex-col gap-1.5"
      >
        <TabsList className="w-full flex-row">
          <TabsTrigger value="account" className="flex-1">
            <Text>Account</Text>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex-1">
            <Text>Password</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="native:gap-2 gap-4">
              <View className="gap-1">
                <Label nativeID="name">Name</Label>
                <Input
                  aria-aria-labelledby="name"
                  defaultValue="Pedro Duarte"
                />
              </View>
              <View className="gap-1">
                <Label nativeID="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </View>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Save changes</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="native:gap-2 gap-4">
              <View className="gap-1">
                <Label nativeID="current">Current password</Label>
                <Input
                  placeholder="********"
                  aria-labelledby="current"
                  secureTextEntry
                />
              </View>
              <View className="gap-1">
                <Label nativeID="new">New password</Label>
                <Input
                  placeholder="********"
                  aria-labelledby="new"
                  secureTextEntry
                />
              </View>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Save password</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}
