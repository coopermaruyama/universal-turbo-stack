# Tamagui Package - Development Notes

This file contains important development notes and quirks discovered while building the shadcn/ui to Tamagui port.

## 🚨 Critical React Native Compatibility Issues

### Color Format Limitations

**Problem**: React Native does not support modern CSS color formats like `oklch()`.

**Symptoms**:
- Colors work perfectly on web (Next.js)
- Colors appear as fallback/default on React Native
- Theme tokens resolve to `undefined` or default values

**Solution**: Use only React Native-compatible color formats:
- ✅ `hsl(240, 5.9%, 10%)`
- ✅ `#0a0a0a` 
- ✅ `rgb(26, 26, 26)`
- ❌ `oklch(0.205 0 0)`
- ❌ `color(display-p3 0.1 0.1 0.1)`

**Implementation**:
```typescript
// ❌ Don't use in themes.ts
const theme = {
  primary: "oklch(0.205 0 0)", // Breaks React Native
}

// ✅ Use instead
const theme = {
  primary: "hsl(240, 5.9%, 10%)", // Works everywhere
}
```

### Styled Component Variant Issues

**Problem**: Tamagui styled component variants don't always apply correctly in React Native, especially for text colors.

**Symptoms**:
- Base styles override variant styles
- Color variants don't apply
- `color: "$token"` falls back to generic color

**Solution**: Use direct prop passing for critical styles:
```typescript
// ❌ Problematic approach
const ButtonText = styled(Text, {
  color: "$color", // Base color conflicts
  variants: {
    variant: {
      default: { color: "$primaryForeground" }, // May not apply
    }
  }
});

// ✅ Working approach  
const ButtonText = styled(Text, {
  // No base color conflicts
  variants: {
    size: { /* size variants only */ }
  }
});

// Direct prop passing in component
<ButtonText 
  color={
    variant === "default" ? "$primaryForeground" :
    variant === "destructive" ? "$destructiveForeground" :
    "$foreground"
  }
>
```

## 🔧 Component Architecture Patterns

### Button Component Structure

The Button component uses a two-component approach:
1. **ButtonBase** - Handles background, borders, layout, hover states
2. **ButtonText** - Handles typography and text color

**Why**: This separation allows better control over styling hierarchy and prevents conflicts between container and text styles.

### Theme Token Resolution

**Best Practices**:
- Always test color changes in both web AND React Native
- Use HSL format for all theme colors
- Prefer direct props over complex variant inheritance
- Keep base styles minimal to avoid conflicts

## 🎨 Theme System Notes

### Current Theme Structure

```typescript
const lightNeutral = createBaseTheme(
  "hsl(0, 0%, 100%)",        // background
  "hsl(240, 10%, 3.9%)",     // foreground  
  "hsl(240, 5.9%, 10%)",     // primary
  "hsl(0, 0%, 98%)",         // primaryForeground
  // ... more colors
);
```

### Color Conversion Reference

When converting from shadcn/ui to React Native compatible:

| shadcn/ui Original | React Native Compatible |
|-------------------|------------------------|
| `oklch(0.205 0 0)` | `hsl(240, 5.9%, 10%)` |
| `oklch(0.985 0 0)` | `hsl(0, 0%, 98%)` |
| `oklch(0.577 0.245 27.325)` | `hsl(0, 84.2%, 60.2%)` |

## 🐛 Common Debugging Steps

### Colors Not Showing in React Native

1. **Check color format**: Ensure no `oklch()` in themes
2. **Verify theme provider**: Confirm TamaguiProvider has correct config
3. **Test with hardcoded colors**: Replace tokens with hex/hsl temporarily
4. **Check variant application**: Use direct props instead of styled variants

### Hydration Mismatches

**Common Causes**:
- Theme switching between server/client
- CSS variables vs Tamagui tokens mismatch
- Different color formats resolving differently

**Solution**: Ensure consistent theme configuration across platforms

## 📚 References

- [Tamagui Color Documentation](https://tamagui.dev/docs/core/theme)
- [React Native Color Support](https://reactnative.dev/docs/colors)
- [shadcn/ui Color System](https://ui.shadcn.com/docs/theming)

## 🚀 Future Improvements

- [ ] Convert all remaining theme variants from oklch to hsl
- [ ] Add automated tests for color compatibility
- [ ] Create color conversion utilities
- [ ] Add theme validation helpers