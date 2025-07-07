"use client";

import React from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import { cssInterop, StyleSheet as NativewindStyleSheet } from "nativewind";

const SyledButton = cssInterop(Pressable, {
  className: {
    target: "style",
    nativeStyleToProp: {},
  },
});

export function Button(props: React.ComponentProps<typeof Pressable>) {
  return (
    <Pressable {...props} style={styles.button}>
      {props.children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
