import plugin from "tailwindcss/plugin";
import { containerConfig } from "../configs/container.config";

export const containerPlugin = plugin(function ({ addComponents }) {
	// Guard clause
	if (!containerConfig?.containers || typeof containerConfig.containers !== "object") {
		console.error("containerConfig.containers is not defined or is not an object");
		return;
	}

	const components: Record<string, any> = {};

	// Iterate through each container configuration
	Object.entries(containerConfig.containers).forEach(([containerName, containerConfigItem]) => {
		if (!containerConfigItem) return;

		// Helper to convert camelCase to kebab-case
		const toKebab = (str: string) =>
			str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

		const containerClass = toKebab(containerName);

		// Build the container base class
		const baseStyles: Record<string, any> = {};
		const responsiveStyles: Record<string, any> = {
			"@screen sm": {},
			"@screen md": {},
			"@screen lg": {},
			"@screen xl": {},
			"@screen 2xl": {},
		};

		// ========== DISPLAY ==========
		if (containerConfigItem.display) {
			baseStyles.display = containerConfigItem.display.default;
			responsiveStyles["@screen sm"].display = containerConfigItem.display.sm;
			responsiveStyles["@screen md"].display = containerConfigItem.display.md;
			responsiveStyles["@screen lg"].display = containerConfigItem.display.lg;
			responsiveStyles["@screen xl"].display = containerConfigItem.display.xl;
			responsiveStyles["@screen 2xl"].display = containerConfigItem.display["2xl"];
		}

		// ========== WIDTH ==========
		if (containerConfigItem.width) {
			baseStyles.width = containerConfigItem.width.default;
			responsiveStyles["@screen sm"].width = containerConfigItem.width.sm;
			responsiveStyles["@screen md"].width = containerConfigItem.width.md;
			responsiveStyles["@screen lg"].width = containerConfigItem.width.lg;
			responsiveStyles["@screen xl"].width = containerConfigItem.width.xl;
			responsiveStyles["@screen 2xl"].width = containerConfigItem.width["2xl"];
		}

		// ========== MAX WIDTH ==========
		if (containerConfigItem.maxWidth) {
			baseStyles.maxWidth = containerConfigItem.maxWidth.default;
			responsiveStyles["@screen sm"].maxWidth = containerConfigItem.maxWidth.sm;
			responsiveStyles["@screen md"].maxWidth = containerConfigItem.maxWidth.md;
			responsiveStyles["@screen lg"].maxWidth = containerConfigItem.maxWidth.lg;
			responsiveStyles["@screen xl"].maxWidth = containerConfigItem.maxWidth.xl;
			responsiveStyles["@screen 2xl"].maxWidth = containerConfigItem.maxWidth["2xl"];
		}

		// ========== COLUMNS (Grid Template Columns) ==========
		if (containerConfigItem.columns) {
			baseStyles.gridTemplateColumns = `repeat(${containerConfigItem.columns.default}, minmax(0, 1fr))`;
			responsiveStyles["@screen sm"].gridTemplateColumns = `repeat(${containerConfigItem.columns.sm}, minmax(0, 1fr))`;
			responsiveStyles["@screen md"].gridTemplateColumns = `repeat(${containerConfigItem.columns.md}, minmax(0, 1fr))`;
			responsiveStyles["@screen lg"].gridTemplateColumns = `repeat(${containerConfigItem.columns.lg}, minmax(0, 1fr))`;
			responsiveStyles["@screen xl"].gridTemplateColumns = `repeat(${containerConfigItem.columns.xl}, minmax(0, 1fr))`;
			responsiveStyles["@screen 2xl"].gridTemplateColumns = `repeat(${containerConfigItem.columns["2xl"]}, minmax(0, 1fr))`;
		}

		// ========== GAP ==========
		if (containerConfigItem.gap) {
			baseStyles.gap = containerConfigItem.gap.default;
			responsiveStyles["@screen sm"].gap = containerConfigItem.gap.sm;
			responsiveStyles["@screen md"].gap = containerConfigItem.gap.md;
			responsiveStyles["@screen lg"].gap = containerConfigItem.gap.lg;
			responsiveStyles["@screen xl"].gap = containerConfigItem.gap.xl;
			responsiveStyles["@screen 2xl"].gap = containerConfigItem.gap["2xl"];
		}

		// ========== ROW GAP ==========
		if (containerConfigItem.rowGap) {
			baseStyles.rowGap = containerConfigItem.rowGap.default;
			responsiveStyles["@screen sm"].rowGap = containerConfigItem.rowGap.sm;
			responsiveStyles["@screen md"].rowGap = containerConfigItem.rowGap.md;
			responsiveStyles["@screen lg"].rowGap = containerConfigItem.rowGap.lg;
			responsiveStyles["@screen xl"].rowGap = containerConfigItem.rowGap.xl;
			responsiveStyles["@screen 2xl"].rowGap = containerConfigItem.rowGap["2xl"];
		}

		// ========== COLUMN GAP ==========
		if (containerConfigItem.columnGap) {
			baseStyles.columnGap = containerConfigItem.columnGap.default;
			responsiveStyles["@screen sm"].columnGap = containerConfigItem.columnGap.sm;
			responsiveStyles["@screen md"].columnGap = containerConfigItem.columnGap.md;
			responsiveStyles["@screen lg"].columnGap = containerConfigItem.columnGap.lg;
			responsiveStyles["@screen xl"].columnGap = containerConfigItem.columnGap.xl;
			responsiveStyles["@screen 2xl"].columnGap = containerConfigItem.columnGap["2xl"];
		}

		// ========== PADDING ==========
		if (containerConfigItem.padding) {
			const { top, right, bottom, left } = containerConfigItem.padding;

			// Padding Top
			if (top) {
				baseStyles.paddingTop = top.default;
				responsiveStyles["@screen sm"].paddingTop = top.sm;
				responsiveStyles["@screen md"].paddingTop = top.md;
				responsiveStyles["@screen lg"].paddingTop = top.lg;
				responsiveStyles["@screen xl"].paddingTop = top.xl;
				responsiveStyles["@screen 2xl"].paddingTop = top["2xl"];
			}

			// Padding Right
			if (right) {
				baseStyles.paddingRight = right.default;
				responsiveStyles["@screen sm"].paddingRight = right.sm;
				responsiveStyles["@screen md"].paddingRight = right.md;
				responsiveStyles["@screen lg"].paddingRight = right.lg;
				responsiveStyles["@screen xl"].paddingRight = right.xl;
				responsiveStyles["@screen 2xl"].paddingRight = right["2xl"];
			}

			// Padding Bottom
			if (bottom) {
				baseStyles.paddingBottom = bottom.default;
				responsiveStyles["@screen sm"].paddingBottom = bottom.sm;
				responsiveStyles["@screen md"].paddingBottom = bottom.md;
				responsiveStyles["@screen lg"].paddingBottom = bottom.lg;
				responsiveStyles["@screen xl"].paddingBottom = bottom.xl;
				responsiveStyles["@screen 2xl"].paddingBottom = bottom["2xl"];
			}

			// Padding Left
			if (left) {
				baseStyles.paddingLeft = left.default;
				responsiveStyles["@screen sm"].paddingLeft = left.sm;
				responsiveStyles["@screen md"].paddingLeft = left.md;
				responsiveStyles["@screen lg"].paddingLeft = left.lg;
				responsiveStyles["@screen xl"].paddingLeft = left.xl;
				responsiveStyles["@screen 2xl"].paddingLeft = left["2xl"];
			}
		}

		// ========== MARGIN ==========
		if (containerConfigItem.margin) {
			const { top, right, bottom, left } = containerConfigItem.margin;

			// Margin Top
			if (top) {
				baseStyles.marginTop = top.default;
				responsiveStyles["@screen sm"].marginTop = top.sm;
				responsiveStyles["@screen md"].marginTop = top.md;
				responsiveStyles["@screen lg"].marginTop = top.lg;
				responsiveStyles["@screen xl"].marginTop = top.xl;
				responsiveStyles["@screen 2xl"].marginTop = top["2xl"];
			}

			// Margin Right
			if (right) {
				baseStyles.marginRight = right.default;
				responsiveStyles["@screen sm"].marginRight = right.sm;
				responsiveStyles["@screen md"].marginRight = right.md;
				responsiveStyles["@screen lg"].marginRight = right.lg;
				responsiveStyles["@screen xl"].marginRight = right.xl;
				responsiveStyles["@screen 2xl"].marginRight = right["2xl"];
			}

			// Margin Bottom
			if (bottom) {
				baseStyles.marginBottom = bottom.default;
				responsiveStyles["@screen sm"].marginBottom = bottom.sm;
				responsiveStyles["@screen md"].marginBottom = bottom.md;
				responsiveStyles["@screen lg"].marginBottom = bottom.lg;
				responsiveStyles["@screen xl"].marginBottom = bottom.xl;
				responsiveStyles["@screen 2xl"].marginBottom = bottom["2xl"];
			}

			// Margin Left
			if (left) {
				baseStyles.marginLeft = left.default;
				responsiveStyles["@screen sm"].marginLeft = left.sm;
				responsiveStyles["@screen md"].marginLeft = left.md;
				responsiveStyles["@screen lg"].marginLeft = left.lg;
				responsiveStyles["@screen xl"].marginLeft = left.xl;
				responsiveStyles["@screen 2xl"].marginLeft = left["2xl"];
			}
		}

		// Combine base styles with responsive styles
		components[`.${containerClass}`] = {
			...baseStyles,
			...responsiveStyles,
		};
	});

	addComponents(components);
});
