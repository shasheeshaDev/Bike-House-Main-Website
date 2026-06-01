import plugin from "tailwindcss/plugin";
import { colors } from "../configs/colors.config";

/**
 * Colors Plugin
 *
 * Extends Tailwind CSS with custom brand colors, icon colors, and PDP color scales.
 *
 * Generated color classes:
 *
 * Brand Colors:
 * - bg-brand-primary, text-brand-primary, border-brand-primary
 * - bg-brand-secondary, text-brand-secondary, border-brand-secondary
 * - bg-brand-tertiary, text-brand-tertiary, etc.
 *
 * Icon Colors:
 * - bg-icon-primary, text-icon-primary
 * - bg-icon-secondary, text-icon-secondary, etc.
 *
 * PDP Color Scales:
 * - bg-pdp-sandstone-300, bg-pdp-sandstone-400, etc.
 * - bg-pdp-garden-green-50, bg-pdp-garden-green-100, etc.
 * - bg-pdp-fresh-leaf-50, bg-pdp-fresh-leaf-100, etc.
 * - bg-pdp-morning-dew-50, bg-pdp-morning-dew-100, etc.
 * - bg-pdp-spring-green-50, bg-pdp-spring-green-100, etc.
 * - bg-pdp-golden-sand-50, bg-pdp-golden-sand-100, etc.
 * - bg-pdp-pomegranate-50, bg-pdp-pomegranate-100, etc.
 *
 * All color classes support all Tailwind color utilities:
 * - bg-*, text-*, border-*, ring-*, divide-*, placeholder-*, etc.
 */

export const colorsPlugin = plugin(
	function ({ addBase }) {
		// You can add any base styles here if needed
		// For example, CSS custom properties for colors
		addBase({
			":root": {
				// Brand colors as CSS custom properties
				"--color-brand-primary": colors.brand.primary,
				"--color-brand-secondary": colors.brand.secondary,
				"--color-brand-tertiary": colors.brand.tertiary,
			},
		});
	},
	{
		theme: {
			extend: {
				colors: colors,
			},
		},
	}
);
