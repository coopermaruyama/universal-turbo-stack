import React from "react";
import { Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import KitchenSink from "@acme/ui/kitchen-sink";

export default function UITestScreen() {
  const insets = useSafeAreaInsets();
  React.useEffect(() => {
    // Run validation on component mount
    // validateThemes();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
      }}
    >
      <KitchenSink />
    </ScrollView>
  );
}
