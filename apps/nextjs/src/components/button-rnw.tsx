"use client";

import { cssInterop } from "nativewind";
import type React from "react";
import { Pressable, StyleSheet } from "react-native";

const _SyledButton = cssInterop(Pressable, {
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
