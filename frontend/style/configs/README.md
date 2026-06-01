# Style Configuration Guide

This directory contains configuration files for the Dudley Park project's design system.

## Color Configuration

### Overview

The color system is defined in [colors.config.ts](colors.config.ts) and includes:

- **Brand Colors**: Primary brand colors used throughout the application
- **Icon Colors**: Specific colors for iconography
- **PDP Color Scales**: Seven color palettes with multiple shades (50-950)

### Using Colors in Components

In your React components, use Tailwind classes:

```tsx
// Brand colors
<div className="bg-brand-primary text-brand-white">
<button className="bg-brand-secondary hover:bg-brand-tertiary">
<section className="bg-brand-page-background">

// Icon colors
<Icon className="text-icon-primary" />
<Icon className="text-icon-destructive" />

// PDP color scales
<div className="bg-pdp-garden-green-500">
<div className="bg-pdp-sandstone-300 text-pdp-pomegranate-600">
<div className="border-pdp-fresh-leaf-400">
```

All colors work with all Tailwind utilities: `bg-*`, `text-*`, `border-*`, `ring-*`, `divide-*`, `placeholder-*`, etc.

### Using Colors in Config Files

When defining styles in configuration files (typography, container, etc.), import the `color` object:

```typescript
import { color } from "./colors.config";

// Use with breakpoint helpers
h1: {
  color: bp(color.brand.primary),        // Brand color
  color: bp(color.brand.foreground),     // Foreground color
  color: bp(color.icon.destructive),     // Icon color
  color: bp(color.pdp.gardenGreen[500]), // PDP color scale
}
```

### Available Color Exports

```typescript
// Structured color object (recommended for configs)
import { color } from "./colors.config";
color.brand.primary          // #244634
color.brand.secondary        // #BED7A3
color.icon.primary           // #18181B
color.pdp.gardenGreen[500]   // #244634
color.pdp.sandstone[300]     // #FFF6D9

// Individual color objects
import { brandColors, iconColors, pdpGardenGreen } from "./colors.config";
brandColors.primary          // #244634
iconColors.primary           // #18181B
pdpGardenGreen[500]         // #244634

// All colors for Tailwind
import { colors } from "./colors.config";
// This is used automatically by the colors plugin
```

## Brand Colors Reference

| Color Name | Hex Value | Usage |
|-----------|-----------|-------|
| `brand-primary` | #244634 | Primary brand color (Garden Green) |
| `brand-secondary` | #BED7A3 | Secondary brand color |
| `brand-secondary-80` | #C9DDB1 | Secondary with 80% opacity |
| `brand-tertiary` | #2F7F37 | Tertiary brand color |
| `brand-white` | #FFFFFF | White |
| `brand-black` | #000000 | Black |
| `brand-page-background` | #F3F1E8 | Page background |
| `brand-page-background-v2` | #FFFCF2 | Alternative page background |
| `brand-foreground` | #1D3728 | Primary text color |
| `brand-url` | #3560AC | Link color |
| `brand-green` | #388F47 | Accent green |

## Icon Colors Reference

| Color Name | Hex Value | Usage |
|-----------|-----------|-------|
| `icon-primary` | #18181B | Primary icon color |
| `icon-secondary` | #F3F1E8 | Secondary icon color |
| `icon-muted` | #F4F4F5 | Muted icons |
| `icon-destructive` | #DC2626 | Destructive/error icons |
| `icon-disabled` | #D4D4D8 | Disabled state |
| `icon-tertiary` | #3F3F46 | Tertiary icon color |

## PDP Color Scales

All PDP color scales include shades from 50 (lightest) to 950 (darkest).

### Available Scales

- `pdp-sandstone` (300-950)
- `pdp-garden-green` (50-950)
- `pdp-fresh-leaf` (50-950)
- `pdp-morning-dew` (50-950)
- `pdp-spring-green` (50-950)
- `pdp-golden-sand` (50-950)
- `pdp-pomegranate` (50-950)

## Typography Configuration

See [typography.config.ts](typography.config.ts) for examples of using colors in typography styles.

## Container Configuration

See [container.config.ts](container.config.ts) for responsive container configurations.

## Adding New Colors

1. Add the color to the appropriate section in [colors.config.ts](colors.config.ts)
2. If adding a new color scale, follow the PDP pattern with shades 50-950
3. The color will automatically be available as Tailwind classes via the colors plugin
4. Import and use in config files using the `color` object

## Font Configuration

See [font.config.ts](font.config.ts) for font family definitions.
