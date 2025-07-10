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
  "hsl(0, 0%, 100%)", // background
  "hsl(20, 14.3%, 4.1%)", // foreground
  "hsl(0, 0%, 100%)", // card
  "hsl(20, 14.3%, 4.1%)", // cardForeground
  "hsl(0, 0%, 100%)", // popover
  "hsl(20, 14.3%, 4.1%)", // popoverForeground
  "hsl(24, 9.8%, 10%)", // primary
  "hsl(60, 9.1%, 97.8%)", // primaryForeground
  "hsl(60, 4.8%, 95.9%)", // secondary
  "hsl(24, 9.8%, 10%)", // secondaryForeground
  "hsl(60, 4.8%, 95.9%)", // muted
  "hsl(25, 5.3%, 44.7%)", // mutedForeground
  "hsl(60, 4.8%, 95.9%)", // accent
  "hsl(24, 9.8%, 10%)", // accentForeground
  "hsl(0, 84.2%, 60.2%)", // destructive
  "hsl(60, 9.1%, 97.8%)", // destructiveForeground
  "hsl(20, 5.9%, 90%)", // border
  "hsl(20, 5.9%, 90%)", // input
  "hsl(20, 5.9%, 10%)", // ring
);

const darkStone = createBaseTheme(
  "hsl(20, 14.3%, 4.1%)", // background
  "hsl(60, 9.1%, 97.8%)", // foreground
  "hsl(24, 9.8%, 10%)", // card
  "hsl(60, 9.1%, 97.8%)", // cardForeground
  "hsl(24, 9.8%, 10%)", // popover
  "hsl(60, 9.1%, 97.8%)", // popoverForeground
  "hsl(20, 5.9%, 90%)", // primary
  "hsl(24, 9.8%, 10%)", // primaryForeground
  "hsl(12, 6.5%, 15.1%)", // secondary
  "hsl(60, 9.1%, 97.8%)", // secondaryForeground
  "hsl(12, 6.5%, 15.1%)", // muted
  "hsl(20, 5.9%, 10%)", // mutedForeground
  "hsl(12, 6.5%, 15.1%)", // accent
  "hsl(60, 9.1%, 97.8%)", // accentForeground
  "hsl(0, 62.8%, 30.6%)", // destructive
  "hsl(60, 9.1%, 97.8%)", // destructiveForeground
  "hsl(0, 0%, 100%, 0.1)", // border
  "hsl(0, 0%, 100%, 0.15)", // input
  "hsl(25, 5.3%, 44.7%)", // ring
);

// Zinc themes
const lightZinc = createBaseTheme(
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

const darkZinc = createBaseTheme(
  "hsl(240, 10%, 3.9%)", // background
  "hsl(0, 0%, 98%)", // foreground
  "hsl(240, 5.9%, 10%)", // card
  "hsl(0, 0%, 98%)", // cardForeground
  "hsl(240, 5.9%, 10%)", // popover
  "hsl(0, 0%, 98%)", // popoverForeground
  "hsl(240, 5.9%, 90%)", // primary
  "hsl(240, 5.9%, 10%)", // primaryForeground
  "hsl(240, 3.7%, 15.9%)", // secondary
  "hsl(0, 0%, 98%)", // secondaryForeground
  "hsl(240, 3.7%, 15.9%)", // muted
  "hsl(240, 5.9%, 10%)", // mutedForeground
  "hsl(240, 3.7%, 15.9%)", // accent
  "hsl(0, 0%, 98%)", // accentForeground
  "hsl(0, 62.8%, 30.6%)", // destructive
  "hsl(0, 0%, 98%)", // destructiveForeground
  "hsl(0, 0%, 100%, 0.1)", // border
  "hsl(0, 0%, 100%, 0.15)", // input
  "hsl(240, 3.8%, 46.1%)", // ring
);

// Gray themes
const lightGray = createBaseTheme(
  "hsl(0, 0%, 100%)", // background
  "hsl(224, 71.4%, 4.1%)", // foreground
  "hsl(0, 0%, 100%)", // card
  "hsl(224, 71.4%, 4.1%)", // cardForeground
  "hsl(0, 0%, 100%)", // popover
  "hsl(224, 71.4%, 4.1%)", // popoverForeground
  "hsl(220.9, 39.3%, 11%)", // primary
  "hsl(210, 20%, 98%)", // primaryForeground
  "hsl(220, 14.3%, 95.9%)", // secondary
  "hsl(220.9, 39.3%, 11%)", // secondaryForeground
  "hsl(220, 14.3%, 95.9%)", // muted
  "hsl(220, 8.9%, 46.1%)", // mutedForeground
  "hsl(220, 14.3%, 95.9%)", // accent
  "hsl(220.9, 39.3%, 11%)", // accentForeground
  "hsl(0, 84.2%, 60.2%)", // destructive
  "hsl(210, 20%, 98%)", // destructiveForeground
  "hsl(220, 13%, 91%)", // border
  "hsl(220, 13%, 91%)", // input
  "hsl(224, 71.4%, 4.1%)", // ring
);

const darkGray = createBaseTheme(
  "hsl(224, 71.4%, 4.1%)", // background
  "hsl(210, 20%, 98%)", // foreground
  "hsl(220.9, 39.3%, 11%)", // card
  "hsl(210, 20%, 98%)", // cardForeground
  "hsl(220.9, 39.3%, 11%)", // popover
  "hsl(210, 20%, 98%)", // popoverForeground
  "hsl(220, 13%, 91%)", // primary
  "hsl(220.9, 39.3%, 11%)", // primaryForeground
  "hsl(215, 27.9%, 16.9%)", // secondary
  "hsl(210, 20%, 98%)", // secondaryForeground
  "hsl(215, 27.9%, 16.9%)", // muted
  "hsl(224, 71.4%, 4.1%)", // mutedForeground
  "hsl(215, 27.9%, 16.9%)", // accent
  "hsl(210, 20%, 98%)", // accentForeground
  "hsl(0, 62.8%, 30.6%)", // destructive
  "hsl(210, 20%, 98%)", // destructiveForeground
  "hsl(0, 0%, 100%, 0.1)", // border
  "hsl(0, 0%, 100%, 0.15)", // input
  "hsl(220, 8.9%, 46.1%)", // ring
);

// Slate themes
const lightSlate = createBaseTheme(
  "hsl(0, 0%, 100%)", // background
  "hsl(222.2, 84%, 4.9%)", // foreground
  "hsl(0, 0%, 100%)", // card
  "hsl(222.2, 84%, 4.9%)", // cardForeground
  "hsl(0, 0%, 100%)", // popover
  "hsl(222.2, 84%, 4.9%)", // popoverForeground
  "hsl(222.2, 47.4%, 11.2%)", // primary
  "hsl(210, 40%, 98%)", // primaryForeground
  "hsl(210, 40%, 96%)", // secondary
  "hsl(222.2, 47.4%, 11.2%)", // secondaryForeground
  "hsl(210, 40%, 96%)", // muted
  "hsl(215.4, 16.3%, 46.9%)", // mutedForeground
  "hsl(210, 40%, 96%)", // accent
  "hsl(222.2, 47.4%, 11.2%)", // accentForeground
  "hsl(0, 84.2%, 60.2%)", // destructive
  "hsl(210, 40%, 98%)", // destructiveForeground
  "hsl(214.3, 31.8%, 91.4%)", // border
  "hsl(214.3, 31.8%, 91.4%)", // input
  "hsl(222.2, 84%, 4.9%)", // ring
);

const darkSlate = createBaseTheme(
  "hsl(222.2, 84%, 4.9%)", // background
  "hsl(210, 40%, 98%)", // foreground
  "hsl(222.2, 47.4%, 11.2%)", // card
  "hsl(210, 40%, 98%)", // cardForeground
  "hsl(222.2, 47.4%, 11.2%)", // popover
  "hsl(210, 40%, 98%)", // popoverForeground
  "hsl(214.3, 31.8%, 91.4%)", // primary
  "hsl(222.2, 47.4%, 11.2%)", // primaryForeground
  "hsl(217.2, 32.6%, 17.5%)", // secondary
  "hsl(210, 40%, 98%)", // secondaryForeground
  "hsl(217.2, 32.6%, 17.5%)", // muted
  "hsl(222.2, 84%, 4.9%)", // mutedForeground
  "hsl(217.2, 32.6%, 17.5%)", // accent
  "hsl(210, 40%, 98%)", // accentForeground
  "hsl(0, 62.8%, 30.6%)", // destructive
  "hsl(210, 40%, 98%)", // destructiveForeground
  "hsl(0, 0%, 100%, 0.1)", // border
  "hsl(0, 0%, 100%, 0.15)", // input
  "hsl(215.4, 16.3%, 46.9%)", // ring
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
