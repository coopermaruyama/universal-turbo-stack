var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// tamagui.config.ts
var tamagui_config_exports = {};
__export(tamagui_config_exports, {
  config: () => config2
});
module.exports = __toCommonJS(tamagui_config_exports);
var import_core3 = require("@tamagui/core");

// ../../packages/tamagui/tamagui.config.ts
var import_core2 = require("@tamagui/core");

// ../../node_modules/@tamagui/font-inter/dist/esm/index.mjs
var import_core = require("@tamagui/core");
var createInterFont = /* @__PURE__ */ __name((font = {}, {
  sizeLineHeight = /* @__PURE__ */ __name((size) => size + 10, "sizeLineHeight"),
  sizeSize = /* @__PURE__ */ __name((size) => size * 1, "sizeSize")
} = {}) => {
  const size = Object.fromEntries(Object.entries({
    ...defaultSizes,
    ...font.size
  }).map(([k, v]) => [k, sizeSize(+v)]));
  return (0, import_core.createFont)({
    family: import_core.isWeb ? 'Inter, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' : "Inter",
    lineHeight: Object.fromEntries(Object.entries(size).map(([k, v]) => [k, sizeLineHeight((0, import_core.getVariableValue)(v))])),
    weight: {
      4: "300"
    },
    letterSpacing: {
      4: 0
    },
    ...font,
    size
  });
}, "createInterFont");
var defaultSizes = {
  1: 11,
  2: 12,
  3: 13,
  4: 14,
  true: 14,
  5: 16,
  6: 18,
  7: 20,
  8: 23,
  9: 30,
  10: 46,
  11: 55,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 134
};

// ../../packages/tamagui/src/themes.ts
var createBaseTheme = /* @__PURE__ */ __name((background, foreground, card, cardForeground, popover, popoverForeground, primary, primaryForeground, secondary, secondaryForeground, muted, mutedForeground, accent, accentForeground, destructive, destructiveForeground, border, input, ring) => ({
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
  foreground,
  // Explicitly include foreground as a top-level token
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
  primaryHover: primary,
  // Will be calculated as primary with 90% opacity
  secondaryHover: secondary,
  // Will be calculated as secondary with 80% opacity
  destructiveHover: destructive,
  // Will be calculated as destructive with 90% opacity
  // Chart colors (vibrant defaults that work with any theme)
  chart1: "oklch(0.646 0.222 41.116)",
  chart2: "oklch(0.6 0.118 184.704)",
  chart3: "oklch(0.398 0.07 227.392)",
  chart4: "oklch(0.828 0.189 84.429)",
  chart5: "oklch(0.769 0.188 70.08)"
}), "createBaseTheme");
var lightNeutral = createBaseTheme(
  "oklch(1 0 0)",
  // background
  "oklch(0.145 0 0)",
  // foreground
  "oklch(1 0 0)",
  // card
  "oklch(0.145 0 0)",
  // cardForeground
  "oklch(1 0 0)",
  // popover
  "oklch(0.145 0 0)",
  // popoverForeground
  "oklch(0.205 0 0)",
  // primary
  "oklch(0.985 0 0)",
  // primaryForeground
  "oklch(0.97 0 0)",
  // secondary
  "oklch(0.205 0 0)",
  // secondaryForeground
  "oklch(0.97 0 0)",
  // muted
  "oklch(0.556 0 0)",
  // mutedForeground
  "oklch(0.97 0 0)",
  // accent
  "oklch(0.205 0 0)",
  // accentForeground
  "oklch(0.577 0.245 27.325)",
  // destructive
  "oklch(0.985 0 0)",
  // destructiveForeground
  "oklch(0.922 0 0)",
  // border
  "oklch(0.922 0 0)",
  // input
  "oklch(0.708 0 0)"
  // ring
);
var darkNeutral = createBaseTheme(
  "oklch(0.145 0 0)",
  // background
  "oklch(0.985 0 0)",
  // foreground
  "oklch(0.205 0 0)",
  // card
  "oklch(0.985 0 0)",
  // cardForeground
  "oklch(0.205 0 0)",
  // popover
  "oklch(0.985 0 0)",
  // popoverForeground
  "oklch(0.922 0 0)",
  // primary
  "oklch(0.205 0 0)",
  // primaryForeground
  "oklch(0.269 0 0)",
  // secondary
  "oklch(0.985 0 0)",
  // secondaryForeground
  "oklch(0.269 0 0)",
  // muted
  "oklch(0.708 0 0)",
  // mutedForeground
  "oklch(0.269 0 0)",
  // accent
  "oklch(0.985 0 0)",
  // accentForeground
  "oklch(0.704 0.191 22.216)",
  // destructive
  "oklch(0.985 0 0)",
  // destructiveForeground
  "oklch(1 0 0 / 10%)",
  // border (with alpha)
  "oklch(1 0 0 / 15%)",
  // input (with alpha)
  "oklch(0.556 0 0)"
  // ring
);
var lightStone = createBaseTheme(
  "oklch(1 0 0)",
  // background
  "oklch(0.147 0.004 49.25)",
  // foreground
  "oklch(1 0 0)",
  // card
  "oklch(0.147 0.004 49.25)",
  // cardForeground
  "oklch(1 0 0)",
  // popover
  "oklch(0.147 0.004 49.25)",
  // popoverForeground
  "oklch(0.216 0.006 56.043)",
  // primary
  "oklch(0.985 0.001 106.423)",
  // primaryForeground
  "oklch(0.97 0.001 106.424)",
  // secondary
  "oklch(0.216 0.006 56.043)",
  // secondaryForeground
  "oklch(0.97 0.001 106.424)",
  // muted
  "oklch(0.553 0.013 58.071)",
  // mutedForeground
  "oklch(0.97 0.001 106.424)",
  // accent
  "oklch(0.216 0.006 56.043)",
  // accentForeground
  "oklch(0.577 0.245 27.325)",
  // destructive
  "oklch(0.985 0.001 106.423)",
  // destructiveForeground
  "oklch(0.923 0.003 48.717)",
  // border
  "oklch(0.923 0.003 48.717)",
  // input
  "oklch(0.709 0.01 56.259)"
  // ring
);
var darkStone = createBaseTheme(
  "oklch(0.147 0.004 49.25)",
  // background
  "oklch(0.985 0.001 106.423)",
  // foreground
  "oklch(0.216 0.006 56.043)",
  // card
  "oklch(0.985 0.001 106.423)",
  // cardForeground
  "oklch(0.216 0.006 56.043)",
  // popover
  "oklch(0.985 0.001 106.423)",
  // popoverForeground
  "oklch(0.923 0.003 48.717)",
  // primary
  "oklch(0.216 0.006 56.043)",
  // primaryForeground
  "oklch(0.268 0.007 34.298)",
  // secondary
  "oklch(0.985 0.001 106.423)",
  // secondaryForeground
  "oklch(0.268 0.007 34.298)",
  // muted
  "oklch(0.709 0.01 56.259)",
  // mutedForeground
  "oklch(0.268 0.007 34.298)",
  // accent
  "oklch(0.985 0.001 106.423)",
  // accentForeground
  "oklch(0.704 0.191 22.216)",
  // destructive
  "oklch(0.985 0.001 106.423)",
  // destructiveForeground
  "oklch(1 0 0 / 10%)",
  // border
  "oklch(1 0 0 / 15%)",
  // input
  "oklch(0.553 0.013 58.071)"
  // ring
);
var lightZinc = createBaseTheme(
  "oklch(1 0 0)",
  // background
  "oklch(0.141 0.005 285.823)",
  // foreground
  "oklch(1 0 0)",
  // card
  "oklch(0.141 0.005 285.823)",
  // cardForeground
  "oklch(1 0 0)",
  // popover
  "oklch(0.141 0.005 285.823)",
  // popoverForeground
  "oklch(0.21 0.006 285.885)",
  // primary
  "oklch(0.985 0 0)",
  // primaryForeground
  "oklch(0.967 0.001 286.375)",
  // secondary
  "oklch(0.21 0.006 285.885)",
  // secondaryForeground
  "oklch(0.967 0.001 286.375)",
  // muted
  "oklch(0.552 0.016 285.938)",
  // mutedForeground
  "oklch(0.967 0.001 286.375)",
  // accent
  "oklch(0.21 0.006 285.885)",
  // accentForeground
  "oklch(0.577 0.245 27.325)",
  // destructive
  "oklch(0.985 0 0)",
  // destructiveForeground
  "oklch(0.92 0.004 286.32)",
  // border
  "oklch(0.92 0.004 286.32)",
  // input
  "oklch(0.705 0.015 286.067)"
  // ring
);
var darkZinc = createBaseTheme(
  "oklch(0.141 0.005 285.823)",
  // background
  "oklch(0.985 0 0)",
  // foreground
  "oklch(0.21 0.006 285.885)",
  // card
  "oklch(0.985 0 0)",
  // cardForeground
  "oklch(0.21 0.006 285.885)",
  // popover
  "oklch(0.985 0 0)",
  // popoverForeground
  "oklch(0.92 0.004 286.32)",
  // primary
  "oklch(0.21 0.006 285.885)",
  // primaryForeground
  "oklch(0.274 0.006 286.033)",
  // secondary
  "oklch(0.985 0 0)",
  // secondaryForeground
  "oklch(0.274 0.006 286.033)",
  // muted
  "oklch(0.705 0.015 286.067)",
  // mutedForeground
  "oklch(0.274 0.006 286.033)",
  // accent
  "oklch(0.985 0 0)",
  // accentForeground
  "oklch(0.704 0.191 22.216)",
  // destructive
  "oklch(0.985 0 0)",
  // destructiveForeground
  "oklch(1 0 0 / 10%)",
  // border
  "oklch(1 0 0 / 15%)",
  // input
  "oklch(0.552 0.016 285.938)"
  // ring
);
var lightGray = createBaseTheme(
  "oklch(1 0 0)",
  // background
  "oklch(0.13 0.028 261.692)",
  // foreground
  "oklch(1 0 0)",
  // card
  "oklch(0.13 0.028 261.692)",
  // cardForeground
  "oklch(1 0 0)",
  // popover
  "oklch(0.13 0.028 261.692)",
  // popoverForeground
  "oklch(0.21 0.034 264.665)",
  // primary
  "oklch(0.985 0.002 247.839)",
  // primaryForeground
  "oklch(0.967 0.003 264.542)",
  // secondary
  "oklch(0.21 0.034 264.665)",
  // secondaryForeground
  "oklch(0.967 0.003 264.542)",
  // muted
  "oklch(0.551 0.027 264.364)",
  // mutedForeground
  "oklch(0.967 0.003 264.542)",
  // accent
  "oklch(0.21 0.034 264.665)",
  // accentForeground
  "oklch(0.577 0.245 27.325)",
  // destructive
  "oklch(0.985 0.002 247.839)",
  // destructiveForeground
  "oklch(0.928 0.006 264.531)",
  // border
  "oklch(0.928 0.006 264.531)",
  // input
  "oklch(0.707 0.022 261.325)"
  // ring
);
var darkGray = createBaseTheme(
  "oklch(0.13 0.028 261.692)",
  // background
  "oklch(0.985 0.002 247.839)",
  // foreground
  "oklch(0.21 0.034 264.665)",
  // card
  "oklch(0.985 0.002 247.839)",
  // cardForeground
  "oklch(0.21 0.034 264.665)",
  // popover
  "oklch(0.985 0.002 247.839)",
  // popoverForeground
  "oklch(0.928 0.006 264.531)",
  // primary
  "oklch(0.21 0.034 264.665)",
  // primaryForeground
  "oklch(0.278 0.033 256.848)",
  // secondary
  "oklch(0.985 0.002 247.839)",
  // secondaryForeground
  "oklch(0.278 0.033 256.848)",
  // muted
  "oklch(0.707 0.022 261.325)",
  // mutedForeground
  "oklch(0.278 0.033 256.848)",
  // accent
  "oklch(0.985 0.002 247.839)",
  // accentForeground
  "oklch(0.704 0.191 22.216)",
  // destructive
  "oklch(0.985 0.002 247.839)",
  // destructiveForeground
  "oklch(1 0 0 / 10%)",
  // border
  "oklch(1 0 0 / 15%)",
  // input
  "oklch(0.551 0.027 264.364)"
  // ring
);
var lightSlate = createBaseTheme(
  "oklch(1 0 0)",
  // background
  "oklch(0.129 0.042 264.695)",
  // foreground
  "oklch(1 0 0)",
  // card
  "oklch(0.129 0.042 264.695)",
  // cardForeground
  "oklch(1 0 0)",
  // popover
  "oklch(0.129 0.042 264.695)",
  // popoverForeground
  "oklch(0.208 0.042 265.755)",
  // primary
  "oklch(0.984 0.003 247.858)",
  // primaryForeground
  "oklch(0.968 0.007 247.896)",
  // secondary
  "oklch(0.208 0.042 265.755)",
  // secondaryForeground
  "oklch(0.968 0.007 247.896)",
  // muted
  "oklch(0.554 0.046 257.417)",
  // mutedForeground
  "oklch(0.968 0.007 247.896)",
  // accent
  "oklch(0.208 0.042 265.755)",
  // accentForeground
  "oklch(0.577 0.245 27.325)",
  // destructive
  "oklch(0.984 0.003 247.858)",
  // destructiveForeground
  "oklch(0.929 0.013 255.508)",
  // border
  "oklch(0.929 0.013 255.508)",
  // input
  "oklch(0.704 0.04 256.788)"
  // ring
);
var darkSlate = createBaseTheme(
  "oklch(0.129 0.042 264.695)",
  // background
  "oklch(0.984 0.003 247.858)",
  // foreground
  "oklch(0.208 0.042 265.755)",
  // card
  "oklch(0.984 0.003 247.858)",
  // cardForeground
  "oklch(0.208 0.042 265.755)",
  // popover
  "oklch(0.984 0.003 247.858)",
  // popoverForeground
  "oklch(0.929 0.013 255.508)",
  // primary
  "oklch(0.208 0.042 265.755)",
  // primaryForeground
  "oklch(0.279 0.041 260.031)",
  // secondary
  "oklch(0.984 0.003 247.858)",
  // secondaryForeground
  "oklch(0.279 0.041 260.031)",
  // muted
  "oklch(0.704 0.04 256.788)",
  // mutedForeground
  "oklch(0.279 0.041 260.031)",
  // accent
  "oklch(0.984 0.003 247.858)",
  // accentForeground
  "oklch(0.704 0.191 22.216)",
  // destructive
  "oklch(0.984 0.003 247.858)",
  // destructiveForeground
  "oklch(1 0 0 / 10%)",
  // border
  "oklch(1 0 0 / 15%)",
  // input
  "oklch(0.551 0.027 264.364)"
  // ring
);
var themes = {
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
    ...lightNeutral
    // Override specific colors for buttons if needed
  },
  dark_Button: {
    ...darkNeutral
    // Override specific colors for buttons if needed
  },
  light_Card: {
    ...lightNeutral
    // Override specific colors for cards if needed
  },
  dark_Card: {
    ...darkNeutral
    // Override specific colors for cards if needed
  }
};

// ../../packages/tamagui/tamagui.config.ts
var interFont = createInterFont();
var tokens = (0, import_core2.createTokens)({
  size: {
    0: 0,
    0.25: 2,
    0.5: 4,
    0.75: 6,
    1: 8,
    1.5: 12,
    2: 16,
    2.5: 20,
    3: 24,
    3.5: 28,
    4: 32,
    5: 40,
    6: 48,
    7: 56,
    8: 64,
    9: 72,
    10: 80,
    11: 88,
    12: 96,
    14: 112,
    16: 128,
    20: 160,
    24: 192,
    28: 224,
    32: 256,
    36: 288,
    40: 320,
    44: 352,
    48: 384,
    52: 416,
    56: 448,
    60: 480,
    64: 512,
    72: 576,
    80: 640,
    96: 768
  },
  space: {
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    80: 320,
    96: 384
  },
  radius: {
    0: 0,
    1: 3,
    2: 6,
    3: 8,
    4: 12,
    true: 6
  },
  zIndex: {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5
  },
  color: {
    white: "#fff",
    black: "#000",
    transparent: "transparent"
  }
});
var config = (0, import_core2.createTamagui)({
  // Tokens - design system values
  tokens,
  // Use our shadcn-inspired themes
  themes,
  // Fonts
  fonts: {
    inter: interFont,
    body: interFont,
    heading: interFont
  },
  // Media queries
  media: {
    xs: { maxWidth: 479 },
    sm: { maxWidth: 639 },
    md: { maxWidth: 767 },
    lg: { maxWidth: 895 },
    xl: { maxWidth: 1023 },
    xxl: { minWidth: 1024 },
    gtXs: { minWidth: 480 },
    gtSm: { minWidth: 640 },
    gtMd: { minWidth: 768 },
    gtLg: { minWidth: 896 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" }
  },
  // Shorthands for common style properties
  shorthands: {
    px: "paddingHorizontal",
    py: "paddingVertical",
    pt: "paddingTop",
    pr: "paddingRight",
    pb: "paddingBottom",
    pl: "paddingLeft",
    mx: "marginHorizontal",
    my: "marginVertical",
    mt: "marginTop",
    mr: "marginRight",
    mb: "marginBottom",
    ml: "marginLeft",
    bg: "backgroundColor",
    f: "flex",
    fd: "flexDirection",
    fw: "flexWrap",
    ai: "alignItems",
    ac: "alignContent",
    jc: "justifyContent",
    ta: "textAlign",
    pos: "position",
    t: "top",
    r: "right",
    b: "bottom",
    l: "left",
    w: "width",
    h: "height",
    minW: "minWidth",
    maxW: "maxWidth",
    minH: "minHeight",
    maxH: "maxHeight",
    ov: "overflow",
    bc: "borderColor",
    bw: "borderWidth",
    br: "borderRadius",
    btlr: "borderTopLeftRadius",
    btrr: "borderTopRightRadius",
    bblr: "borderBottomLeftRadius",
    bbrr: "borderBottomRightRadius",
    zi: "zIndex",
    o: "opacity"
  },
  settings: {
    allowedStyleValues: "somewhat-strict-web",
    autocompleteSpecificTokens: "except-special",
    themeClassNameOnRoot: true
  }
});

// tamagui.config.ts
var config2 = (0, import_core3.createTamagui)({
  ...config
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config
});
