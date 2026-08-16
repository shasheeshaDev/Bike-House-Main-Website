/** Formatting helpers shared across listings and detail pages. */

/** "LKR 8,950,000" — or "8,950,000" when the prefix is rendered separately. */
export function formatLKR(value: number, withPrefix = true): string {
  const n = Number.isFinite(value) ? value : 0;
  const formatted = n.toLocaleString("en-LK", { maximumFractionDigits: 0 });
  return withPrefix ? `LKR ${formatted}` : formatted;
}

/** "4.2K" for 4,200 km — the compact form the design uses on bike cards. */
export function formatKm(km: number | undefined): string {
  if (km == null) return "—";
  if (km < 1000) return String(km);
  return `${(km / 1000).toFixed(1)}K`;
}

/** "Nov 18, 2025" — the format used throughout the design's meta lines. */
export function formatDate(iso: string): string {
  return new Date(`${iso.split("T")[0]}T00:00:00`).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).replace(/(\d+) (\w+) (\d+)/, "$2 $1, $3");
}

/** ISO date for <time dateTime> and JSON-LD. */
export const isoDate = (value: string) => value.split("T")[0];

/**
 * Builds a dialable tel: href from whatever is typed.
 *
 * Naively prefixing "+" broke local formats: "011 275 4000" became
 * "tel:+0112754000", which is not a valid international number.
 */
export function telHref(phone: string): string {
  const hasPlus = phone.trim().startsWith("+");
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (hasPlus || digits.startsWith("94")) return `tel:+${digits.replace(/^94/, "94")}`;
  if (digits.startsWith("0")) return `tel:+94${digits.slice(1)}`;
  return `tel:+${digits}`;
}

/** Capacity bands from design/bikes.html. */
export const CC_BANDS: Record<string, [min: number, max: number]> = {
  "0-300": [0, 300],
  "300-700": [300, 700],
  "700-1000": [700, 1000],
  "1000-9999": [1000, Infinity],
};

export const PRICE_CAPS = [
  { label: "Up to 2M", value: "2000000" },
  { label: "Up to 5M", value: "5000000" },
  { label: "Up to 8M", value: "8000000" },
  { label: "Up to 15M", value: "15000000" },
];
