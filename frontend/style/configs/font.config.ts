// Bike House font stack
// CSS variables are injected by next/font in layout.tsx
export const fonts = {
  display:   "var(--font-anton)",           // Anton — hero / section headings
  condensed: "var(--font-barlow-condensed)", // Barlow Condensed — nav, labels, chips
  body:      "var(--font-manrope)",          // Manrope — all body copy
  mono:      "var(--font-jetbrains-mono)",   // JetBrains Mono — code, coords, tags
} as const;

export type FontFamily = (typeof fonts)[keyof typeof fonts];
