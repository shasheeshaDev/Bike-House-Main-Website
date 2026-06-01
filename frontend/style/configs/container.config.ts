// Container configuration — matches the Bike House design system
// Design: max-width 1400px, padding-inline: clamp(20px, 4vw, 56px)

type BreakpointValues = {
  default: string;
  sm:  string;
  md:  string;
  lg:  string;
  xl:  string;
  "2xl": string;
};

type ContainerConfigType = {
  maxWidth?:  BreakpointValues;
  width?:     BreakpointValues;
  margin?: {
    top?:    BreakpointValues;
    right?:  BreakpointValues;
    bottom?: BreakpointValues;
    left?:   BreakpointValues;
  };
  padding?: {
    top?:    BreakpointValues;
    right?:  BreakpointValues;
    bottom?: BreakpointValues;
    left?:   BreakpointValues;
  };
  display?:    BreakpointValues;
  columns?:    BreakpointValues;
  gap?:        BreakpointValues;
  rowGap?:     BreakpointValues;
  columnGap?:  BreakpointValues;
};

export interface ContainerConfig {
  containers: {
    container: ContainerConfigType;
    [key: string]: ContainerConfigType;
  };
}

// Single value across all breakpoints — use for clamp() and fixed tokens.
const bp = (value: string): BreakpointValues => ({
  default: value, sm: value, md: value, lg: value, xl: value, "2xl": value,
});

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

export const containerConfig: ContainerConfig = {
  containers: {
    // Main wrapper — 1400 px max, fluid side gutter matching --gutter
    container: {
      maxWidth: bp("1400px"),
      width:    bp("100%"),
      margin: {
        left:  bp("auto"),
        right: bp("auto"),
      },
      // Use clamp() — same formula as design's --gutter variable
      padding: {
        left:  bp("clamp(20px, 4vw, 56px)"),
        right: bp("clamp(20px, 4vw, 56px)"),
      },
    },
  },
};

export { bp, bpResponsive };
