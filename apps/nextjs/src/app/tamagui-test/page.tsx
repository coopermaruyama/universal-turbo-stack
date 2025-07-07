"use client";

import React from "react";

import { TestShadcnComponents, validateThemes, YStack } from "@acme/tamagui";

export default function TamaguiTestPage() {
  React.useEffect(() => {
    // Run validation on component mount
    validateThemes();
  }, []);

  return (
    <YStack padding="$4" space="$4">
      <TestShadcnComponents />
    </YStack>
  );
}
