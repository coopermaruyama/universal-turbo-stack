"use client";

import React from "react";
import { verifyInstallation } from "nativewind";

import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";
import KitchenSink from "@acme/ui/components/kitchen-sink";

export default function UITestScreen() {
  React.useEffect(() => {
    verifyInstallation();
    // Run validation on component mount
  }, []);

  return <KitchenSink />;
}
