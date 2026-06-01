export const fonts = {
  poppins: "var(--font-poppins)",
  plusJakartaSans: "var(--font-plus-jakarta-sans)",
  cormorant: "var(--font-cormorant)",
  dmSans: "var(--font-dm-sans)",
} as const;

export type FontFamily = typeof fonts[keyof typeof fonts];
