import React from "react";
import { ScrollView } from "react-native";

import { TestShadcnComponents, validateThemes, YStack } from "@acme/tamagui";

export default function TamaguiTestScreen() {
  React.useEffect(() => {
    // Run validation on component mount
    validateThemes();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <YStack padding="$4" space="$4">
        <TestShadcnComponents />
      </YStack>
    </ScrollView>
  );
}
