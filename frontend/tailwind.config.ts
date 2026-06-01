import type { Config } from "tailwindcss";
import { typographyPlugin } from "./style/plugins/typography.plugin";
import { containerPlugin } from "./style/plugins/container.plugin";
import { colorsPlugin } from "./style/plugins/colors.plugin";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
        plusJakartaSans: ["var(--font-plus-jakarta-sans)", ...fontFamily.sans],
        cormorant: ["var(--font-cormorant)", ...fontFamily.serif],
        dmSans: ["var(--font-dm-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "scroll-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scaleY(0.8)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "accordion-up": "accordion-up 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "scroll-pulse": "scroll-pulse 2s ease infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    containerPlugin,
    typographyPlugin,
    colorsPlugin,
  ],
};

export default config;
