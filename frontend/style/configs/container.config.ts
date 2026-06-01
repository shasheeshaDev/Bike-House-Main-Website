// Helper types for breakpoint values
type BreakpointValues = {
	default: string;
	sm: string;
	md: string;
	lg: string;
	xl: string;
	"2xl": string;
};

// Container configuration structure
type ContainerConfigType = {
	maxWidth?: BreakpointValues;
	padding?: {
		top?: BreakpointValues;
		right?: BreakpointValues;
		bottom?: BreakpointValues;
		left?: BreakpointValues;
	};
	columns?: BreakpointValues;
	gap?: BreakpointValues;
	rowGap?: BreakpointValues;
	columnGap?: BreakpointValues;
	display?: BreakpointValues;
	width?: BreakpointValues;
	margin?: {
		top?: BreakpointValues;
		right?: BreakpointValues;
		bottom?: BreakpointValues;
		left?: BreakpointValues;
	};
};

// Helper function to create breakpoint values
const bp = (value: string): BreakpointValues => ({
	default: value,
	sm: value,
	md: value,
	lg: value,
	xl: value,
	"2xl": value,
});

// Helper function to create responsive breakpoint values
const bpResponsive = (
	defaultVal: string,
	sm?: string,
	md?: string,
	lg?: string,
	xl?: string,
	xl2?: string
): BreakpointValues => ({
	default: defaultVal,
	sm: sm || defaultVal,
	md: md || sm || defaultVal,
	lg: lg || md || sm || defaultVal,
	xl: xl || lg || md || sm || defaultVal,
	"2xl": xl2 || xl || lg || md || sm || defaultVal,
});

// Main configuration interface
export interface ContainerConfig {
	containers: {
		container: ContainerConfigType;
		[key: string]: ContainerConfigType; // Allow dynamic containers
	};
}

// Configuration
export const containerConfig: ContainerConfig = {
	containers: {
		// Normal Container
		container: {
			maxWidth: bpResponsive("100%", "640px", "768px", "1024px", "1280px", "1432px"),
			padding: {
				left: bpResponsive("16px", "16px", "32px", "32px", "32px", "32px"),
				right: bpResponsive("16px", "16px", "32px", "32px", "32px", "32px"),
			},
			width: bp("100%"),
			margin: {
				left: bp("auto"),
				right: bp("auto"),
			},
		},
	},
};

// Export helper functions
export { bp, bpResponsive };
