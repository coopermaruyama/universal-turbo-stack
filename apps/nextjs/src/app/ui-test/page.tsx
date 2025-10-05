"use client";

import KitchenSink from "@acme/ui/kitchen-sink";
// import { verifyInstallation } from "nativewind";
import React from "react";

export default function UITestScreen() {
  React.useEffect(() => {
    // verifyInstallation();
    // Run validation on component mount
  }, []);

  return <KitchenSink />;
}
