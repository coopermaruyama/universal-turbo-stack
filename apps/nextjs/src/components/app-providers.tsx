"use client";

import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { useServerInsertedHTML } from "next/navigation";
import { useTheme } from "next-themes";

import { PortalHost } from "@acme/ui/index";

import { ThemeProvider } from "./theme-provider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useTheme();

  useServerInsertedHTML(() => {
    // @ts-ignore
    const rnwStyle = StyleSheet.getSheet();
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
