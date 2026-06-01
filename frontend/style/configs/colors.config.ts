// Bike House Design System — colour palette
// Source: design/assets/css/main.css

export const colors = {
  // ── Brand ────────────────────────────────────────────────────────────────
  brand: {
    red:     "#E10600", // Ducati signal red — primary accent
    redDeep: "#B30500",
    redGlow: "#FF1A0A",
    ember:   "#FF5C1F",
  },

  // ── Surfaces ─────────────────────────────────────────────────────────────
  surface: {
    bg:      "#0A0A0B", // main page background
    bgSoft:  "#111114",
    bgElev:  "#16171A", // elevated panels, cards hover bg
    bgCard:  "#1C1D21", // card background
    footer:  "#050506", // footer (darker than bg)
  },

  // ── Lines / dividers ─────────────────────────────────────────────────────
  line: {
    DEFAULT: "#2A2B30",
    soft:    "#1F2024",
  },

  // ── Type / ink ────────────────────────────────────────────────────────────
  ink: {
    DEFAULT: "#F4F4F2", // primary text
    dim:     "#B7B7B3", // secondary text / body copy
    mute:    "#7E7E7A", // tertiary / labels / placeholders
    low:     "#4C4C49", // disabled / very muted
  },

  // ── Status ───────────────────────────────────────────────────────────────
  status: {
    registered:   "#5DD07A", // registered bike badge (green)
    unregistered: "#FFB547", // unregistered bike badge (amber)
  },
} as const;

export type BrandColor   = keyof typeof colors.brand;
export type SurfaceColor = keyof typeof colors.surface;
export type InkColor     = keyof typeof colors.ink;
export type StatusColor  = keyof typeof colors.status;
