"use client";

import { PortalHost } from "@acme/ui/index";
import { useServerInsertedHTML } from "next/navigation";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { StyleSheet } from "react-native";

import { ThemeProvider } from "./theme-provider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  useTheme();

  useServerInsertedHTML(() => {
    // @ts-ignore
    const _ = StyleSheet.getSheet();
    return (
      <>
        <style jsx global>{`
          html {
            font-family: "Montserrat", sans-serif;
          }
          body {
            background-color: var(--background);
            color: var(--color);
          }
        `}</style>
        {/* <style
          dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }}
          id={rnwStyle.id}
        /> */}
      </>
    );
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <PortalHost />
    </ThemeProvider>
  );
};
