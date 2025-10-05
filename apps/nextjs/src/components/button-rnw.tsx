"use client";

import type React from "react";
import { Pressable, StyleSheet } from "react-native";

export function Button(props: React.ComponentProps<typeof Pressable>) {
  return (
    // <_SyledButton {...props} style={styles.button}>
    //   {props.children}
    // </_SyledButton>
    // <StyledButton {...props} style={styles.button}>
    //   {props.children}
    // </StyledButton>
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
