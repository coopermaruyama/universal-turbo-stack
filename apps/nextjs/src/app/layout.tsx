import type { Metadata, Viewport } from "next";
import { Montserrat, Source_Code_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider, ThemeToggle } from "@/components/ui/theme";
import { TRPCReactProvider } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

import "../../../../packages/ui/src/styles/globals.css";

import { NextTamaguiProvider } from "@/components/NextTamaguiProvider";
import { env } from "@/env";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          montserrat.variable,
          sourceCodePro.variable,
        )}
      >
        <NextTamaguiProvider>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </NextTamaguiProvider>
      </body>
    </html>
  );
}
