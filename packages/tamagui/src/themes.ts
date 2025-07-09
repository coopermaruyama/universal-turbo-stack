// Manual theme creation for shadcn compatibility
// We'll create themes that match shadcn's structure exactly

// Base theme template that maps to shadcn's CSS variables
const createBaseTheme = (
  background: string,
  foreground: string,
  card: string,
  cardForeground: string,
  popover: string,
  popoverForeground: string,
  primary: string,
  primaryForeground: string,
  secondary: string,
  secondaryForeground: string,
  muted: string,
  mutedForeground: string,
  accent: string,
  accentForeground: string,
  destructive: string,
  destructiveForeground: string,
  border: string,
  input: string,
  ring: string,
) => ({
  // Core Tamagui color tokens that components expect
  background,
  backgroundHover: muted,
  backgroundPress: muted,
  backgroundFocus: muted,
  backgroundStrong: card,
  backgroundTransparent: "transparent",

  color: foreground,
  colorHover: foreground,
  colorPress: foreground,
  colorFocus: foreground,
  colorTransparent: "transparent",

  borderColor: border,
  borderColorHover: border,
  borderColorPress: border,
  borderColorFocus: ring,

  // Additional required Tamagui tokens
  foreground, // Explicitly include foreground as a top-level token

  // Shadcn semantic colors (for compatibility and component usage)
  card,
  cardForeground,
  popover,
  popoverForeground,
  primary,
  primaryForeground,
  secondary,
  secondaryForeground,
  muted,
  mutedForeground,
  accent,
  accentForeground,
  destructive,
  destructiveForeground,
  border,
  input,
  ring,

  // Additional Tamagui-specific colors
  shadowColor: foreground,
  shadowColorHover: foreground,
  shadowColorPress: foreground,
  shadowColorFocus: foreground,
  placeholderColor: mutedForeground,

  // Hover colors for button variants (matching shadcn's /90 and /80 opacity)
  primaryHover: primary, // Will be calculated as primary with 90% opacity
  secondaryHover: secondary, // Will be calculated as secondary with 80% opacity
  destructiveHover: destructive, // Will be calculated as destructive with 90% opacity

  // Chart colors (vibrant defaults that work with any theme)
  chart1: "hsl(12, 76%, 61%)",
  chart2: "hsl(173, 58%, 39%)",
  chart3: "hsl(197, 37%, 24%)",
  chart4: "hsl(43, 74%, 66%)",
  chart5: "hsl(27, 87%, 67%)",
});

// Neutral/Default themes
const lightNeutral = createBaseTheme(
  "hsl(0, 0%, 100%)", // background
  "hsl(240, 10%, 3.9%)", // foreground
  "hsl(0, 0%, 100%)", // card
  "hsl(240, 10%, 3.9%)", // cardForeground
  "hsl(0, 0%, 100%)", // popover
  "hsl(240, 10%, 3.9%)", // popoverForeground
  "hsl(240, 5.9%, 10%)", // primary
  "hsl(0, 0%, 98%)", // primaryForeground
  "hsl(240, 4.8%, 95.9%)", // secondary
  "hsl(240, 5.9%, 10%)", // secondaryForeground
  "hsl(240, 4.8%, 95.9%)", // muted
  "hsl(240, 3.8%, 46.1%)", // mutedForeground
  "hsl(240, 4.8%, 95.9%)", // accent
  "hsl(240, 5.9%, 10%)", // accentForeground
  "hsl(0, 84.2%, 60.2%)", // destructive
  "hsl(0, 0%, 98%)", // destructiveForeground
  "hsl(240, 5.9%, 90%)", // border
  "hsl(240, 5.9%, 90%)", // input
  "hsl(240, 5.9%, 10%)", // ring
);

const darkNeutral = createBaseTheme(
  "hsl(240, 10%, 3.9%)", // background
  "hsl(0, 0%, 98%)", // foreground
  "hsl(240, 10%, 3.9%)", // card
  "hsl(0, 0%, 98%)", // cardForeground
  "hsl(240, 10%, 3.9%)", // popover
  "hsl(0, 0%, 98%)", // popoverForeground
  "hsl(0, 0%, 98%)", // primary
  "hsl(240, 5.9%, 10%)", // primaryForeground
  "hsl(240, 3.7%, 15.9%)", // secondary
  "hsl(0, 0%, 98%)", // secondaryForeground
  "hsl(240, 3.7%, 15.9%)", // muted
  "hsl(240, 5%, 64.9%)", // mutedForeground
  "hsl(240, 3.7%, 15.9%)", // accent
  "hsl(0, 0%, 98%)", // accentForeground
  "hsl(0, 62.8%, 30.6%)", // destructive
  "hsl(0, 0%, 98%)", // destructiveForeground
  "hsl(240, 3.7%, 15.9%)", // border
  "hsl(240, 3.7%, 15.9%)", // input
  "hsl(240, 4.9%, 83.9%)", // ring
);

// Stone themes
const lightStone = createBaseTheme(
  "oklch(1 0 0)", // background
  "oklch(0.147 0.004 49.25)", // foreground
  "oklch(1 0 0)", // card
  "oklch(0.147 0.004 49.25)", // cardForeground
  "oklch(1 0 0)", // popover
  "oklch(0.147 0.004 49.25)", // popoverForeground
  "oklch(0.216 0.006 56.043)", // primary
  "oklch(0.985 0.001 106.423)", // primaryForeground
  "oklch(0.97 0.001 106.424)", // secondary
  "oklch(0.216 0.006 56.043)", // secondaryForeground
  "oklch(0.97 0.001 106.424)", // muted
  "oklch(0.553 0.013 58.071)", // mutedForeground
  "oklch(0.97 0.001 106.424)", // accent
  "oklch(0.216 0.006 56.043)", // accentForeground
  "oklch(0.577 0.245 27.325)", // destructive
  "oklch(0.985 0.001 106.423)", // destructiveForeground
  "oklch(0.923 0.003 48.717)", // border
  "oklch(0.923 0.003 48.717)", // input
  "oklch(0.709 0.01 56.259)", // ring
);

const darkStone = createBaseTheme(
  "oklch(0.147 0.004 49.25)", // background
  "oklch(0.985 0.001 106.423)", // foreground
  "oklch(0.216 0.006 56.043)", // card
  "oklch(0.985 0.001 106.423)", // cardForeground
  "oklch(0.216 0.006 56.043)", // popover
  "oklch(0.985 0.001 106.423)", // popoverForeground
  "oklch(0.923 0.003 48.717)", // primary
  "oklch(0.216 0.006 56.043)", // primaryForeground
  "oklch(0.268 0.007 34.298)", // secondary
  "oklch(0.985 0.001 106.423)", // secondaryForeground
  "oklch(0.268 0.007 34.298)", // muted
  "oklch(0.709 0.01 56.259)", // mutedForeground
  "oklch(0.268 0.007 34.298)", // accent
  "oklch(0.985 0.001 106.423)", // accentForeground
  "oklch(0.704 0.191 22.216)", // destructive
  "oklch(0.985 0.001 106.423)", // destructiveForeground
  "oklch(1 0 0 / 10%)", // border
  "oklch(1 0 0 / 15%)", // input
  "oklch(0.553 0.013 58.071)", // ring
);

// Zinc themes
const lightZinc = createBaseTheme(
  "oklch(1 0 0)", // background
  "oklch(0.141 0.005 285.823)", // foreground
  "oklch(1 0 0)", // card
  "oklch(0.141 0.005 285.823)", // cardForeground
  "oklch(1 0 0)", // popover
  "oklch(0.141 0.005 285.823)", // popoverForeground
  "oklch(0.21 0.006 285.885)", // primary
  "oklch(0.985 0 0)", // primaryForeground
  "oklch(0.967 0.001 286.375)", // secondary
  "oklch(0.21 0.006 285.885)", // secondaryForeground
  "oklch(0.967 0.001 286.375)", // muted
  "oklch(0.552 0.016 285.938)", // mutedForeground
  "oklch(0.967 0.001 286.375)", // accent
  "oklch(0.21 0.006 285.885)", // accentForeground
  "oklch(0.577 0.245 27.325)", // destructive
  "oklch(0.985 0 0)", // destructiveForeground
  "oklch(0.92 0.004 286.32)", // border
  "oklch(0.92 0.004 286.32)", // input
  "oklch(0.705 0.015 286.067)", // ring
);

const darkZinc = createBaseTheme(
  "oklch(0.141 0.005 285.823)", // background
  "oklch(0.985 0 0)", // foreground
  "oklch(0.21 0.006 285.885)", // card
  "oklch(0.985 0 0)", // cardForeground
  "oklch(0.21 0.006 285.885)", // popover
  "oklch(0.985 0 0)", // popoverForeground
  "oklch(0.92 0.004 286.32)", // primary
  "oklch(0.21 0.006 285.885)", // primaryForeground
  "oklch(0.274 0.006 286.033)", // secondary
  "oklch(0.985 0 0)", // secondaryForeground
  "oklch(0.274 0.006 286.033)", // muted
  "oklch(0.705 0.015 286.067)", // mutedForeground
  "oklch(0.274 0.006 286.033)", // accent
  "oklch(0.985 0 0)", // accentForeground
  "oklch(0.704 0.191 22.216)", // destructive
  "oklch(0.985 0 0)", // destructiveForeground
  "oklch(1 0 0 / 10%)", // border
  "oklch(1 0 0 / 15%)", // input
  "oklch(0.552 0.016 285.938)", // ring
);

// Gray themes
const lightGray = createBaseTheme(
  "oklch(1 0 0)", // background
  "oklch(0.13 0.028 261.692)", // foreground
  "oklch(1 0 0)", // card
  "oklch(0.13 0.028 261.692)", // cardForeground
  "oklch(1 0 0)", // popover
  "oklch(0.13 0.028 261.692)", // popoverForeground
  "oklch(0.21 0.034 264.665)", // primary
  "oklch(0.985 0.002 247.839)", // primaryForeground
  "oklch(0.967 0.003 264.542)", // secondary
  "oklch(0.21 0.034 264.665)", // secondaryForeground
  "oklch(0.967 0.003 264.542)", // muted
  "oklch(0.551 0.027 264.364)", // mutedForeground
  "oklch(0.967 0.003 264.542)", // accent
  "oklch(0.21 0.034 264.665)", // accentForeground
  "oklch(0.577 0.245 27.325)", // destructive
  "oklch(0.985 0.002 247.839)", // destructiveForeground
  "oklch(0.928 0.006 264.531)", // border
  "oklch(0.928 0.006 264.531)", // input
  "oklch(0.707 0.022 261.325)", // ring
);

const darkGray = createBaseTheme(
  "oklch(0.13 0.028 261.692)", // background
  "oklch(0.985 0.002 247.839)", // foreground
  "oklch(0.21 0.034 264.665)", // card
  "oklch(0.985 0.002 247.839)", // cardForeground
  "oklch(0.21 0.034 264.665)", // popover
  "oklch(0.985 0.002 247.839)", // popoverForeground
  "oklch(0.928 0.006 264.531)", // primary
  "oklch(0.21 0.034 264.665)", // primaryForeground
  "oklch(0.278 0.033 256.848)", // secondary
  "oklch(0.985 0.002 247.839)", // secondaryForeground
  "oklch(0.278 0.033 256.848)", // muted
  "oklch(0.707 0.022 261.325)", // mutedForeground
  "oklch(0.278 0.033 256.848)", // accent
  "oklch(0.985 0.002 247.839)", // accentForeground
  "oklch(0.704 0.191 22.216)", // destructive
  "oklch(0.985 0.002 247.839)", // destructiveForeground
  "oklch(1 0 0 / 10%)", // border
  "oklch(1 0 0 / 15%)", // input
  "oklch(0.551 0.027 264.364)", // ring
);

// Slate themes
const lightSlate = createBaseTheme(
  "oklch(1 0 0)", // background
  "oklch(0.129 0.042 264.695)", // foreground
  "oklch(1 0 0)", // card
  "oklch(0.129 0.042 264.695)", // cardForeground
  "oklch(1 0 0)", // popover
  "oklch(0.129 0.042 264.695)", // popoverForeground
  "oklch(0.208 0.042 265.755)", // primary
  "oklch(0.984 0.003 247.858)", // primaryForeground
  "oklch(0.968 0.007 247.896)", // secondary
  "oklch(0.208 0.042 265.755)", // secondaryForeground
  "oklch(0.968 0.007 247.896)", // muted
  "oklch(0.554 0.046 257.417)", // mutedForeground
  "oklch(0.968 0.007 247.896)", // accent
  "oklch(0.208 0.042 265.755)", // accentForeground
  "oklch(0.577 0.245 27.325)", // destructive
  "oklch(0.984 0.003 247.858)", // destructiveForeground
  "oklch(0.929 0.013 255.508)", // border
  "oklch(0.929 0.013 255.508)", // input
  "oklch(0.704 0.04 256.788)", // ring
);

const darkSlate = createBaseTheme(
  "oklch(0.129 0.042 264.695)", // background
  "oklch(0.984 0.003 247.858)", // foreground
  "oklch(0.208 0.042 265.755)", // card
  "oklch(0.984 0.003 247.858)", // cardForeground
  "oklch(0.208 0.042 265.755)", // popover
  "oklch(0.984 0.003 247.858)", // popoverForeground
  "oklch(0.929 0.013 255.508)", // primary
  "oklch(0.208 0.042 265.755)", // primaryForeground
  "oklch(0.279 0.041 260.031)", // secondary
  "oklch(0.984 0.003 247.858)", // secondaryForeground
  "oklch(0.279 0.041 260.031)", // muted
  "oklch(0.704 0.04 256.788)", // mutedForeground
  "oklch(0.279 0.041 260.031)", // accent
  "oklch(0.984 0.003 247.858)", // accentForeground
  "oklch(0.704 0.191 22.216)", // destructive
  "oklch(0.984 0.003 247.858)", // destructiveForeground
  "oklch(1 0 0 / 10%)", // border
  "oklch(1 0 0 / 15%)", // input
  "oklch(0.551 0.027 264.364)", // ring
);

// Export all themes
export const themes = {
  // Base themes (neutral/default)
  light: lightNeutral,
  dark: darkNeutral,

  // Stone theme variants
  light_stone: lightStone,
  dark_stone: darkStone,

  // Zinc theme variants
  light_zinc: lightZinc,
  dark_zinc: darkZinc,

  // Gray theme variants
  light_gray: lightGray,
  dark_gray: darkGray,

  // Slate theme variants
  light_slate: lightSlate,
  dark_slate: darkSlate,

  // Component sub-themes (these will be inherited by components)
  light_Button: {
    ...lightNeutral,
    // Override specific colors for buttons if needed
  },
  dark_Button: {
    ...darkNeutral,
    // Override specific colors for buttons if needed
  },

  light_Card: {
    ...lightNeutral,
    // Override specific colors for cards if needed
  },
  dark_Card: {
    ...darkNeutral,
    // Override specific colors for cards if needed
  },
};
