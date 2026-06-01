import plugin from "tailwindcss/plugin";
import { typographyBlockConfig } from "../configs/typography.config";

/**
 * Typography Plugin
 *
 * Generates utility classes for typography based on typography.config.ts
 *
 * Generated classes:
 * - .h1, .h2, .h3, .h4, .h5, .h6
 * - .xs-para, .s-para, .para, .l-para, .xl-para, .footer-para
 * - .eyebrow-heading, .menu-item, .sub-menu-item, .cta-heading, .cta-para
 * - .main-list-item, .sub-list-item
 * - .anchor
 *
 * Supported properties:
 * - fontFamily, fontSize, fontWeight, lineHeight, color, marginBottom, textDecoration, transition
 *
 * All classes support responsive breakpoints
 */

// Helper to convert camelCase to kebab-case
const toKebabCase = (str: string): string => {
	return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

// Helper to generate CSS properties from config
const generateCSSProperties = (
	blockConfig: any,
	breakpoint?: string
): Record<string, string> => {
	const cssProps: Record<string, string> = {};

	// Simple properties that map directly to CSS
	const simpleProperties = [
		"fontFamily",
		"fontSize",
		"fontWeight",
		"lineHeight",
		"color",
		"marginBottom",
		"textDecoration",
		"transition",
	];

	simpleProperties.forEach((prop) => {
		if (blockConfig[prop]) {
			const value = breakpoint
				? blockConfig[prop][breakpoint]
				: blockConfig[prop].default;
			if (value) {
				const cssProp = toKebabCase(prop);
				cssProps[cssProp] = value;
			}
		}
	});

	return cssProps;
};

export const typographyPlugin = plugin(function ({ addComponents, theme }) {
	const screens = theme("screens") as Record<string, string>;
	const breakpoints = ["default", "sm", "md", "lg", "xl", "2xl"];

	// Generate typography component styles
	const typographyComponents: Record<string, any> = {};

	Object.entries(typographyBlockConfig.blocks).forEach(([blockName, blockConfig]) => {
		const className = `.${toKebabCase(blockName)}`;

		// Base responsive styles object
		const responsiveStyles: Record<string, any> = {};

		// Default styles
		const defaultStyles = generateCSSProperties(blockConfig, "default");
		Object.assign(responsiveStyles, defaultStyles);

		// Generate responsive styles for each breakpoint
		breakpoints.slice(1).forEach((breakpoint) => {
			const breakpointStyles = generateCSSProperties(blockConfig, breakpoint);

			if (Object.keys(breakpointStyles).length > 0) {
				const screenSize = breakpoint === "2xl" ? screens["2xl"] : screens[breakpoint];
				if (!responsiveStyles[`@media (min-width: ${screenSize})`]) {
					responsiveStyles[`@media (min-width: ${screenSize})`] = {};
				}
				Object.assign(
					responsiveStyles[`@media (min-width: ${screenSize})`],
					breakpointStyles
				);
			}
		});

		typographyComponents[className] = responsiveStyles;
	});

	addComponents(typographyComponents);
});
