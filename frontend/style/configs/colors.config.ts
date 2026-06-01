export const brandColors = {
  primary: "#FFBB00",
  secondary: "#2B2B2B",
  tertiary: "#F1F2F6",
  white: "#FFFFFF",
  black: "#000000",
} as const;

// Elevate Hospitality brand palette
export const ehColors = {
  navy: "#0A1628",
  navyMid: "#152240",
  gold: "#B8975A",
  goldLight: "#D4B97A",
  sand: "#C9B99A",
  sandLight: "#E8DFD0",
  cream: "#F7F4EF",
  warmWhite: "#FDFBF8",
  charcoal: "#2D2D2D",
  midGray: "#6B6B6B",
  lightGray: "#ADADAD",
} as const;

export const colors = {
  brand: brandColors,
  eh: ehColors,
} as const;

export type BrandColor = keyof typeof brandColors;
export type EHColor = keyof typeof ehColors;
export type ColorScale = keyof typeof colors;
