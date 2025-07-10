import React from "react";
import { ScrollView } from "react-native";

import { TestShadcnComponents, validateThemes, YStack } from "@acme/tamagui";
import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";
import { Text } from "@acme/ui/text";

export default function TamaguiTestScreen() {
  React.useEffect(() => {
    // Run validation on component mount
    validateThemes();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <YStack padding="$4" space="$4">
        <Button>
          <Text>Sup</Text>
        </Button>
        <Badge variant="outline">
          <Text>Badge</Text>
        </Badge>
        <TestShadcnComponents />
      </YStack>
    </ScrollView>
  );
}
