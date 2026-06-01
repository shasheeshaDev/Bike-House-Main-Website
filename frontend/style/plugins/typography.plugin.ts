import plugin from "tailwindcss/plugin";
import { typographyBlockConfig } from "../configs/typography.config";

const toKebabCase = (str: string): string =>
  str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const SUPPORTED_PROPS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
  "textTransform",
  "textDecoration",
  "color",
  "marginBottom",
  "transition",
] as const;

const SCREENS = {
  sm:    "640px",
  md:    "768px",
  lg:    "1024px",
  xl:    "1280px",
  "2xl": "1536px",
} as const;

type ScreenKey = keyof typeof SCREENS;

const generateCSSProperties = (
  blockConfig: Record<string, any>,
  breakpoint?: string,
): Record<string, string> => {
  const cssProps: Record<string, string> = {};
  for (const prop of SUPPORTED_PROPS) {
    const cfg = blockConfig[prop];
    if (!cfg) continue;
    const value: string | undefined = breakpoint ? cfg[breakpoint] : cfg.default;
    if (value) cssProps[toKebabCase(prop)] = value;
  }
  return cssProps;
};

export const typographyPlugin = plugin(function ({ addComponents }) {
  const components: Record<string, any> = {};

  for (const [blockName, blockConfig] of Object.entries(typographyBlockConfig.blocks)) {
    const className = `.${toKebabCase(blockName)}`;
    const styles: Record<string, any> = {};

    // Base (default) styles
    Object.assign(styles, generateCSSProperties(blockConfig));

    // Responsive overrides — use explicit @media queries (Tailwind v4 compatible)
    for (const bp of Object.keys(SCREENS) as ScreenKey[]) {
      const bpStyles = generateCSSProperties(blockConfig, bp);
      if (Object.keys(bpStyles).length > 0) {
        const query = `@media (min-width: ${SCREENS[bp]})`;
        styles[query] = { ...styles[query], ...bpStyles };
      }
    }

    components[className] = styles;
  }

  addComponents(components);
});
