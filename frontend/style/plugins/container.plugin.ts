import plugin from "tailwindcss/plugin";
import { containerConfig } from "../configs/container.config";

// Tailwind v4: use explicit @media queries instead of the v3 @screen shorthand.
const SCREENS = {
  sm:  "640px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  "2xl": "1536px",
} as const;

type ScreenKey = keyof typeof SCREENS;

export const containerPlugin = plugin(function ({ addComponents }) {
  if (!containerConfig?.containers || typeof containerConfig.containers !== "object") {
    console.error("containerConfig.containers is not defined or is not an object");
    return;
  }

  const components: Record<string, any> = {};

  Object.entries(containerConfig.containers).forEach(([containerName, containerConfigItem]) => {
    if (!containerConfigItem) return;

    const toKebab = (str: string) =>
      str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

    const containerClass = toKebab(containerName);

    const baseStyles: Record<string, any> = {};
    const responsiveStyles: Record<string, Record<string, any>> = {
      [`@media (min-width: ${SCREENS.sm})`]:   {},
      [`@media (min-width: ${SCREENS.md})`]:   {},
      [`@media (min-width: ${SCREENS.lg})`]:   {},
      [`@media (min-width: ${SCREENS.xl})`]:   {},
      [`@media (min-width: ${SCREENS["2xl"]})`]: {},
    };

    const forScreen = (bp: ScreenKey) =>
      responsiveStyles[`@media (min-width: ${SCREENS[bp]})`];

    // ── Display ──────────────────────────────────────────────────────────────
    if (containerConfigItem.display) {
      const d = containerConfigItem.display;
      baseStyles.display = d.default;
      forScreen("sm").display  = d.sm;
      forScreen("md").display  = d.md;
      forScreen("lg").display  = d.lg;
      forScreen("xl").display  = d.xl;
      forScreen("2xl").display = d["2xl"];
    }

    // ── Width ────────────────────────────────────────────────────────────────
    if (containerConfigItem.width) {
      const w = containerConfigItem.width;
      baseStyles.width = w.default;
      forScreen("sm").width  = w.sm;
      forScreen("md").width  = w.md;
      forScreen("lg").width  = w.lg;
      forScreen("xl").width  = w.xl;
      forScreen("2xl").width = w["2xl"];
    }

    // ── Max-width ────────────────────────────────────────────────────────────
    if (containerConfigItem.maxWidth) {
      const mw = containerConfigItem.maxWidth;
      baseStyles.maxWidth = mw.default;
      forScreen("sm").maxWidth  = mw.sm;
      forScreen("md").maxWidth  = mw.md;
      forScreen("lg").maxWidth  = mw.lg;
      forScreen("xl").maxWidth  = mw.xl;
      forScreen("2xl").maxWidth = mw["2xl"];
    }

    // ── Columns (grid-template-columns) ──────────────────────────────────────
    if (containerConfigItem.columns) {
      const c = containerConfigItem.columns;
      baseStyles.gridTemplateColumns = `repeat(${c.default}, minmax(0, 1fr))`;
      forScreen("sm").gridTemplateColumns  = `repeat(${c.sm}, minmax(0, 1fr))`;
      forScreen("md").gridTemplateColumns  = `repeat(${c.md}, minmax(0, 1fr))`;
      forScreen("lg").gridTemplateColumns  = `repeat(${c.lg}, minmax(0, 1fr))`;
      forScreen("xl").gridTemplateColumns  = `repeat(${c.xl}, minmax(0, 1fr))`;
      forScreen("2xl").gridTemplateColumns = `repeat(${c["2xl"]}, minmax(0, 1fr))`;
    }

    // ── Gap ──────────────────────────────────────────────────────────────────
    if (containerConfigItem.gap) {
      const g = containerConfigItem.gap;
      baseStyles.gap = g.default;
      forScreen("sm").gap  = g.sm;
      forScreen("md").gap  = g.md;
      forScreen("lg").gap  = g.lg;
      forScreen("xl").gap  = g.xl;
      forScreen("2xl").gap = g["2xl"];
    }

    // ── Row gap ──────────────────────────────────────────────────────────────
    if (containerConfigItem.rowGap) {
      const rg = containerConfigItem.rowGap;
      baseStyles.rowGap = rg.default;
      forScreen("sm").rowGap  = rg.sm;
      forScreen("md").rowGap  = rg.md;
      forScreen("lg").rowGap  = rg.lg;
      forScreen("xl").rowGap  = rg.xl;
      forScreen("2xl").rowGap = rg["2xl"];
    }

    // ── Column gap ───────────────────────────────────────────────────────────
    if (containerConfigItem.columnGap) {
      const cg = containerConfigItem.columnGap;
      baseStyles.columnGap = cg.default;
      forScreen("sm").columnGap  = cg.sm;
      forScreen("md").columnGap  = cg.md;
      forScreen("lg").columnGap  = cg.lg;
      forScreen("xl").columnGap  = cg.xl;
      forScreen("2xl").columnGap = cg["2xl"];
    }

    // ── Padding ──────────────────────────────────────────────────────────────
    if (containerConfigItem.padding) {
      const { top, right, bottom, left } = containerConfigItem.padding;

      if (top) {
        baseStyles.paddingTop = top.default;
        forScreen("sm").paddingTop  = top.sm;
        forScreen("md").paddingTop  = top.md;
        forScreen("lg").paddingTop  = top.lg;
        forScreen("xl").paddingTop  = top.xl;
        forScreen("2xl").paddingTop = top["2xl"];
      }
      if (right) {
        baseStyles.paddingRight = right.default;
        forScreen("sm").paddingRight  = right.sm;
        forScreen("md").paddingRight  = right.md;
        forScreen("lg").paddingRight  = right.lg;
        forScreen("xl").paddingRight  = right.xl;
        forScreen("2xl").paddingRight = right["2xl"];
      }
      if (bottom) {
        baseStyles.paddingBottom = bottom.default;
        forScreen("sm").paddingBottom  = bottom.sm;
        forScreen("md").paddingBottom  = bottom.md;
        forScreen("lg").paddingBottom  = bottom.lg;
        forScreen("xl").paddingBottom  = bottom.xl;
        forScreen("2xl").paddingBottom = bottom["2xl"];
      }
      if (left) {
        baseStyles.paddingLeft = left.default;
        forScreen("sm").paddingLeft  = left.sm;
        forScreen("md").paddingLeft  = left.md;
        forScreen("lg").paddingLeft  = left.lg;
        forScreen("xl").paddingLeft  = left.xl;
        forScreen("2xl").paddingLeft = left["2xl"];
      }
    }

    // ── Margin ───────────────────────────────────────────────────────────────
    if (containerConfigItem.margin) {
      const { top, right, bottom, left } = containerConfigItem.margin;

      if (top) {
        baseStyles.marginTop = top.default;
        forScreen("sm").marginTop  = top.sm;
        forScreen("md").marginTop  = top.md;
        forScreen("lg").marginTop  = top.lg;
        forScreen("xl").marginTop  = top.xl;
        forScreen("2xl").marginTop = top["2xl"];
      }
      if (right) {
        baseStyles.marginRight = right.default;
        forScreen("sm").marginRight  = right.sm;
        forScreen("md").marginRight  = right.md;
        forScreen("lg").marginRight  = right.lg;
        forScreen("xl").marginRight  = right.xl;
        forScreen("2xl").marginRight = right["2xl"];
      }
      if (bottom) {
        baseStyles.marginBottom = bottom.default;
        forScreen("sm").marginBottom  = bottom.sm;
        forScreen("md").marginBottom  = bottom.md;
        forScreen("lg").marginBottom  = bottom.lg;
        forScreen("xl").marginBottom  = bottom.xl;
        forScreen("2xl").marginBottom = bottom["2xl"];
      }
      if (left) {
        baseStyles.marginLeft = left.default;
        forScreen("sm").marginLeft  = left.sm;
        forScreen("md").marginLeft  = left.md;
        forScreen("lg").marginLeft  = left.lg;
        forScreen("xl").marginLeft  = left.xl;
        forScreen("2xl").marginLeft = left["2xl"];
      }
    }

    components[`.${containerClass}`] = {
      ...baseStyles,
      ...responsiveStyles,
    };
  });

  addComponents(components);
});
