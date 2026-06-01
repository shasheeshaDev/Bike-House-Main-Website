import type { Config } from "tailwindcss";
import { typographyPlugin } from "./style/plugins/typography.plugin";
import { containerPlugin } from "./style/plugins/container.plugin";
import { colorsPlugin } from "./style/plugins/colors.plugin";

// Design tokens (colors, fonts, radius, animations) live in globals.css @theme inline.
// This file is kept only to load plugins that require TypeScript evaluation at build time.
const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require("tailwindcss-animate"),
    containerPlugin,
    typographyPlugin,
    colorsPlugin,
  ],
};

export default config;
