import { fonts } from "./font.config";
import { colors } from "./colors.config";

type BreakpointValues = {
  default: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
};

type BlockConfig = {
  fontFamily?: BreakpointValues;
  fontSize?: BreakpointValues;
  fontWeight?: BreakpointValues;
  lineHeight?: BreakpointValues;
  color?: BreakpointValues;
  marginBottom?: BreakpointValues;
  textDecoration?: BreakpointValues;
  transition?: BreakpointValues;
};

const bp = (value: string): BreakpointValues => ({
  default: value,
  sm: value,
  md: value,
  lg: value,
  xl: value,
  "2xl": value,
});

const bpResponsive = (
  defaultVal: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string,
  xl2?: string,
): BreakpointValues => ({
  default: defaultVal,
  sm: sm || defaultVal,
  md: md || sm || defaultVal,
  lg: lg || md || sm || defaultVal,
  xl: xl || lg || md || sm || defaultVal,
  "2xl": xl2 || xl || lg || md || sm || defaultVal,
});

export interface TypographyBlockConfig {
  blocks: {
    anchor: BlockConfig;
    h1: BlockConfig;
    h2: BlockConfig;
    h3: BlockConfig;
    h4: BlockConfig;
    h5: BlockConfig;
    h6: BlockConfig;
    span: BlockConfig;
    xsPara: BlockConfig;
    sPara: BlockConfig;
    para: BlockConfig;
    lPara: BlockConfig;
    xlPara: BlockConfig;
    eyebrowHeading: BlockConfig;
    displayHeading: BlockConfig;
    menuItem: BlockConfig;
    subMenuItem: BlockConfig;
    ctaHeading: BlockConfig;
    ctaPara: BlockConfig;
    mainListItem: BlockConfig;
    subListItem: BlockConfig;
    [key: string]: BlockConfig;
  };
}

// ─── Elevate Hospitality Typography ───────────────────────────────────────────
//
// Cormorant Garamond (serif, weight 300–700):
//   h1, h2, h3, h4, displayHeading, ctaHeading
//   → All section / page headings
//
// DM Sans (sans-serif, weight 300–500):
//   h5, h6, all paragraph/body styles, eyebrow, nav/CTA labels
//   → UI text, body copy, captions
//
// EH colour defaults:
//   Headings on light backgrounds → eh-navy (#0A1628)
//   Body copy → eh-midGray (#6B6B6B)
//   Eyebrow labels → eh-gold (#B8975A)
// ──────────────────────────────────────────────────────────────────────────────

export const typographyBlockConfig: TypographyBlockConfig = {
  blocks: {
    // ── Anchor ───────────────────────────────────────────────────────────────
    anchor: {
      fontFamily: bp(fonts.dmSans),
      color: bp(colors.eh.charcoal),
      textDecoration: bp("none"),
      transition: bp("color 0.2s ease"),
    },

    // ── Span ─────────────────────────────────────────────────────────────────
    span: {
      fontFamily: bp(fonts.dmSans),
    },

    // ── Headings (Cormorant Garamond, light weight) ───────────────────────────
    h1: {
      fontFamily: bp(fonts.cormorant),
      fontSize: bpResponsive("44px", "48px", "56px", "64px", "72px", "72px"),
      fontWeight: bp("300"),
      lineHeight: bp("110%"),
      color: bp(colors.eh.navy),
    },

    h2: {
      fontFamily: bp(fonts.cormorant),
      fontSize: bpResponsive("32px", "36px", "40px", "48px", "58px", "58px"),
      fontWeight: bp("300"),
      lineHeight: bp("115%"),
      color: bp(colors.eh.navy),
    },

    h3: {
      fontFamily: bp(fonts.cormorant),
      fontSize: bpResponsive("26px", "28px", "30px", "34px", "40px", "40px"),
      fontWeight: bp("300"),
      lineHeight: bp("120%"),
      color: bp(colors.eh.navy),
    },

    h4: {
      fontFamily: bp(fonts.cormorant),
      fontSize: bpResponsive("22px", "22px", "24px", "26px", "30px", "30px"),
      fontWeight: bp("400"),
      lineHeight: bp("120%"),
      color: bp(colors.eh.navy),
    },

    // h5 / h6 → DM Sans for small UI headings / sub-labels
    h5: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bpResponsive("16px", "16px", "17px", "18px", "18px", "18px"),
      fontWeight: bp("500"),
      lineHeight: bp("140%"),
      color: bp(colors.eh.charcoal),
    },

    h6: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bp("14px"),
      fontWeight: bp("500"),
      lineHeight: bp("140%"),
      color: bp(colors.eh.charcoal),
    },

    // ── Display heading (hero-level, Cormorant) ───────────────────────────────
    displayHeading: {
      fontFamily: bp(fonts.cormorant),
      fontSize: bpResponsive("48px", "56px", "64px", "72px", "84px", "84px"),
      fontWeight: bp("300"),
      lineHeight: bp("110%"),
      color: bp(colors.eh.navy),
    },

    // ── Body / paragraph copy (DM Sans) ─────────────────────────────────────
    xsPara: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bp("12px"),
      fontWeight: bp("300"),
      lineHeight: bp("170%"),
      color: bp(colors.eh.midGray),
    },

    sPara: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bp("14px"),
      fontWeight: bp("300"),
      lineHeight: bp("170%"),
      color: bp(colors.eh.midGray),
    },

    para: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bpResponsive("14px", "15px", "15px", "16px", "17px", "17px"),
      fontWeight: bp("300"),
      lineHeight: bp("170%"),
      color: bp(colors.eh.midGray),
    },

    lPara: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bpResponsive("16px", "17px", "17px", "18px", "20px", "20px"),
      fontWeight: bp("300"),
      lineHeight: bp("170%"),
      color: bp(colors.eh.midGray),
    },

    xlPara: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bpResponsive("18px", "18px", "18px", "20px", "22px", "22px"),
      fontWeight: bp("300"),
      lineHeight: bp("170%"),
      color: bp(colors.eh.midGray),
    },

    // ── Special UI text (DM Sans) ─────────────────────────────────────────────
    eyebrowHeading: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bp("11px"),
      fontWeight: bp("600"),
      lineHeight: bp("140%"),
      color: bp(colors.eh.gold),
    },

    menuItem: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bpResponsive("15px", "15px", "15px", "13px", "13px", "13px"),
      fontWeight: bp("500"),
      lineHeight: bp("140%"),
      color: bp(colors.eh.charcoal),
    },

    subMenuItem: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bp("13px"),
      fontWeight: bp("400"),
      lineHeight: bp("140%"),
      color: bp(colors.eh.charcoal),
    },

    // ── CTA / section callout ─────────────────────────────────────────────────
    ctaHeading: {
      fontFamily: bp(fonts.cormorant),
      fontSize: bpResponsive("36px", "40px", "44px", "52px", "64px", "64px"),
      fontWeight: bp("300"),
      lineHeight: bp("115%"),
      color: bp(colors.eh.navy),
    },

    ctaPara: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bp("16px"),
      fontWeight: bp("300"),
      lineHeight: bp("170%"),
      color: bp(colors.eh.midGray),
    },

    // ── List items ────────────────────────────────────────────────────────────
    mainListItem: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bp("15px"),
      fontWeight: bp("300"),
      lineHeight: bp("170%"),
      color: bp(colors.eh.charcoal),
    },

    subListItem: {
      fontFamily: bp(fonts.dmSans),
      fontSize: bp("14px"),
      fontWeight: bp("300"),
      lineHeight: bp("170%"),
      color: bp(colors.eh.charcoal),
    },
  },
};

export { bp, bpResponsive, fonts };
