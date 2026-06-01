import { fonts } from "./font.config";
import { colors } from "./colors.config";

// ─────────────────────────────────────────────────────────────────────────────
// Bike House Typography System
//
// Anton (display, weight 400, always uppercase):
//   displayHeading, h1–h4 — all section / page headings
//
// Barlow Condensed (weight 400–700):
//   kicker, menuItem, subMenuItem, ctaHeading
//   — nav labels, chips, condensed callouts
//
// Manrope (weight 300–600):
//   All paragraph/body styles, anchors, lists
//
// JetBrains Mono (weight 400–500):
//   eyebrowHeading, mono labels — coordinates, tags, meta
//
// Sizing strategy: use clamp() for all fluid values so the plugin outputs a
// single base rule only (no redundant responsive overrides for these classes).
// ─────────────────────────────────────────────────────────────────────────────

type BreakpointValues = {
  default: string;
  sm:  string;
  md:  string;
  lg:  string;
  xl:  string;
  "2xl": string;
};

type BlockConfig = {
  fontFamily?:     BreakpointValues;
  fontSize?:       BreakpointValues;
  fontWeight?:     BreakpointValues;
  lineHeight?:     BreakpointValues;
  letterSpacing?:  BreakpointValues;
  textTransform?:  BreakpointValues;
  textDecoration?: BreakpointValues;
  color?:          BreakpointValues;
  marginBottom?:   BreakpointValues;
  transition?:     BreakpointValues;
};

// All breakpoints share the same value — used for clamp() and fixed tokens.
const bp = (value: string): BreakpointValues => ({
  default: value, sm: value, md: value, lg: value, xl: value, "2xl": value,
});

// Distinct value per breakpoint — used sparingly (body copy only).
const bpResponsive = (
  defaultVal: string,
  sm?:  string,
  md?:  string,
  lg?:  string,
  xl?:  string,
  xl2?: string,
): BreakpointValues => ({
  default: defaultVal,
  sm:  sm  ?? defaultVal,
  md:  md  ?? sm  ?? defaultVal,
  lg:  lg  ?? md  ?? sm  ?? defaultVal,
  xl:  xl  ?? lg  ?? md  ?? sm  ?? defaultVal,
  "2xl": xl2 ?? xl  ?? lg  ?? md  ?? sm  ?? defaultVal,
});

export interface TypographyBlockConfig {
  blocks: {
    anchor:         BlockConfig;
    h1:             BlockConfig;
    h2:             BlockConfig;
    h3:             BlockConfig;
    h4:             BlockConfig;
    h5:             BlockConfig;
    h6:             BlockConfig;
    xsPara:         BlockConfig;
    sPara:          BlockConfig;
    para:           BlockConfig;
    lPara:          BlockConfig;
    xlPara:         BlockConfig;
    eyebrowHeading: BlockConfig;
    displayHeading: BlockConfig;
    menuItem:       BlockConfig;
    subMenuItem:    BlockConfig;
    ctaHeading:     BlockConfig;
    ctaPara:        BlockConfig;
    mainListItem:   BlockConfig;
    subListItem:    BlockConfig;
    [key: string]:  BlockConfig;
  };
}

export const typographyBlockConfig: TypographyBlockConfig = {
  blocks: {

    // ── Anchor ──────────────────────────────────────────────────────────────
    // Design: a { color: inherit; text-decoration: none; }
    anchor: {
      fontFamily:     bp(fonts.body),
      color:          bp("inherit"),
      textDecoration: bp("none"),
      transition:     bp("color 0.2s ease"),
    },

    // ── Display heading (hero-level) ─────────────────────────────────────────
    // Design: .display { font-size: clamp(64px, 13vw, 220px); line-height: .82; letter-spacing: -.01em; }
    displayHeading: {
      fontFamily:    bp(fonts.display),
      fontSize:      bp("clamp(64px, 13vw, 220px)"),
      fontWeight:    bp("400"),
      lineHeight:    bp("0.82"),
      letterSpacing: bp("-0.01em"),
      textTransform: bp("uppercase"),
      color:         bp(colors.ink.DEFAULT),
    },

    // ── Section headings (Anton, uppercase) ──────────────────────────────────
    // Design base: h1–h4 { font-display; weight 400; letter-spacing .005em; line-height .92; uppercase }
    // Design sizes: .h1 clamp(48px,7vw,110px) | .h2 clamp(38px,5.2vw,84px) |
    //               .h3 clamp(28px,3.4vw,52px) | .h4 clamp(22px,2.2vw,32px)
    h1: {
      fontFamily:    bp(fonts.display),
      fontSize:      bp("clamp(48px, 7vw, 110px)"),
      fontWeight:    bp("400"),
      lineHeight:    bp("0.92"),
      letterSpacing: bp("0.005em"),
      textTransform: bp("uppercase"),
      color:         bp(colors.ink.DEFAULT),
    },

    h2: {
      fontFamily:    bp(fonts.display),
      fontSize:      bp("clamp(38px, 5.2vw, 84px)"),
      fontWeight:    bp("400"),
      lineHeight:    bp("0.92"),
      letterSpacing: bp("0.005em"),
      textTransform: bp("uppercase"),
      color:         bp(colors.ink.DEFAULT),
    },

    h3: {
      fontFamily:    bp(fonts.display),
      fontSize:      bp("clamp(28px, 3.4vw, 52px)"),
      fontWeight:    bp("400"),
      lineHeight:    bp("0.92"),
      letterSpacing: bp("0.005em"),
      textTransform: bp("uppercase"),
      color:         bp(colors.ink.DEFAULT),
    },

    h4: {
      fontFamily:    bp(fonts.display),
      fontSize:      bp("clamp(22px, 2.2vw, 32px)"),
      fontWeight:    bp("400"),
      lineHeight:    bp("0.92"),
      letterSpacing: bp("0.005em"),
      textTransform: bp("uppercase"),
      color:         bp(colors.ink.DEFAULT),
    },

    // ── UI sub-headings (Barlow Condensed) ───────────────────────────────────
    // Design: footer column headers, info block labels
    h5: {
      fontFamily:    bp(fonts.condensed),
      fontSize:      bp("12px"),
      fontWeight:    bp("500"),
      lineHeight:    bp("1.3"),
      letterSpacing: bp("0.25em"),
      textTransform: bp("uppercase"),
      color:         bp(colors.ink.mute),
    },

    h6: {
      fontFamily:    bp(fonts.condensed),
      fontSize:      bp("11px"),
      fontWeight:    bp("500"),
      lineHeight:    bp("1.4"),
      letterSpacing: bp("0.25em"),
      textTransform: bp("uppercase"),
      color:         bp(colors.ink.mute),
    },

    // ── Body / paragraph copy (Manrope) ──────────────────────────────────────
    // Design: p { color: var(--ink-dim); }  body: 16px / 1.55
    xsPara: {
      fontFamily: bp(fonts.body),
      fontSize:   bp("11px"),
      fontWeight: bp("400"),
      lineHeight: bp("1.6"),
      color:      bp(colors.ink.mute),
    },

    sPara: {
      fontFamily: bp(fonts.body),
      fontSize:   bp("13px"),
      fontWeight: bp("400"),
      lineHeight: bp("1.65"),
      color:      bp(colors.ink.dim),
    },

    // Default paragraph — matches design body size
    para: {
      fontFamily: bp(fonts.body),
      fontSize:   bpResponsive("14px", "15px", "15px", "16px", "16px"),
      fontWeight: bp("400"),
      lineHeight: bp("1.55"),
      color:      bp(colors.ink.dim),
    },

    // Lead paragraph — design: .lead { clamp(17px,1.4vw,21px); line-height 1.55 }
    lPara: {
      fontFamily: bp(fonts.body),
      fontSize:   bp("clamp(17px, 1.4vw, 21px)"),
      fontWeight: bp("300"),
      lineHeight: bp("1.55"),
      color:      bp(colors.ink.dim),
    },

    xlPara: {
      fontFamily: bp(fonts.body),
      fontSize:   bp("clamp(18px, 1.5vw, 22px)"),
      fontWeight: bp("300"),
      lineHeight: bp("1.55"),
      color:      bp(colors.ink.dim),
    },

    // ── Eyebrow label (JetBrains Mono) ───────────────────────────────────────
    // Design: .eyebrow { font-mono; 11px; letter-spacing .2em; ink-mute; uppercase }
    eyebrowHeading: {
      fontFamily:    bp(fonts.mono),
      fontSize:      bp("11px"),
      fontWeight:    bp("400"),
      lineHeight:    bp("1.0"),
      letterSpacing: bp("0.2em"),
      textTransform: bp("uppercase"),
      color:         bp(colors.ink.mute),
    },

    // ── Navigation (Barlow Condensed) ─────────────────────────────────────────
    // Design: .nav-links a { font-condensed; weight 500; 14px; letter-spacing .15em; ink-dim }
    menuItem: {
      fontFamily:    bp(fonts.condensed),
      fontSize:      bp("14px"),
      fontWeight:    bp("500"),
      lineHeight:    bp("1.0"),
      letterSpacing: bp("0.15em"),
      textTransform: bp("uppercase"),
      color:         bp(colors.ink.dim),
    },

    subMenuItem: {
      fontFamily:    bp(fonts.condensed),
      fontSize:      bp("13px"),
      fontWeight:    bp("400"),
      lineHeight:    bp("1.4"),
      letterSpacing: bp("0.08em"),
      color:         bp(colors.ink.dim),
    },

    // ── CTA section callout (Anton) ───────────────────────────────────────────
    // Design: .cta-banner h3 { clamp(36px, 5vw, 72px) }
    ctaHeading: {
      fontFamily:    bp(fonts.display),
      fontSize:      bp("clamp(36px, 5vw, 72px)"),
      fontWeight:    bp("400"),
      lineHeight:    bp("0.92"),
      letterSpacing: bp("0.005em"),
      textTransform: bp("uppercase"),
      color:         bp(colors.ink.DEFAULT),
    },

    ctaPara: {
      fontFamily: bp(fonts.body),
      fontSize:   bp("16px"),
      fontWeight: bp("300"),
      lineHeight: bp("1.55"),
      color:      bp(colors.ink.dim),
    },

    // ── List items ───────────────────────────────────────────────────────────
    mainListItem: {
      fontFamily: bp(fonts.body),
      fontSize:   bp("15px"),
      fontWeight: bp("400"),
      lineHeight: bp("1.65"),
      color:      bp(colors.ink.dim),
    },

    subListItem: {
      fontFamily: bp(fonts.body),
      fontSize:   bp("13px"),
      fontWeight: bp("400"),
      lineHeight: bp("1.65"),
      color:      bp(colors.ink.mute),
    },

  },
};

export { bp, bpResponsive, fonts };
