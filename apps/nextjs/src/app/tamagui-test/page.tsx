"use client";

import React from "react";
import { Pressable, Text } from "react-native";

import { TestShadcnComponents, validateThemes, YStack } from "@acme/tamagui";
import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";

export default function TamaguiTestPage() {
  React.useEffect(() => {
    // Run validation on component mount
    validateThemes();
  }, []);

  return (
    <YStack padding="$4" space="$4">
      <Badge variant="outline">Badge</Badge>
      <TestShadcnComponents />
      <Button>Sup</Button>
      <Pressable className="bg-white">
        <Text>Sup</Text>
      </Pressable>
    </YStack>
  );
}
