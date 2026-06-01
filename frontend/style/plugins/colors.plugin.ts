import plugin from "tailwindcss/plugin";
import { colors } from "../configs/colors.config";

// Extends the Tailwind palette with Bike House brand colours so utility
// classes like bg-brand-red, text-ink-dim, border-line, etc. are available.
export const colorsPlugin = plugin(
  function ({ addBase }) {
    addBase({
      ":root": {
        "--color-brand-red":   colors.brand.red,
        "--color-brand-ember": colors.brand.ember,
      },
    });
  },
  {
    theme: {
      extend: {
        colors,
      },
    },
  },
);
