/** Shared content types — the shape returned by both Sanity queries and the
 *  local fallback data, so pages render identically with either source. */

import type { PortableTextBlock } from "@portabletext/types";

/** Long-form copy: plain paragraphs in fallback data, Portable Text from
 *  Sanity. Render with the RichBody component, which handles both. */
export type RichText = string[] | PortableTextBlock[];

/** Availability of a bike on the floor. */
export type BikeStatus = "available" | "reserved" | "sold";

export interface Bike {
  slug: string;
  order: number;
  /** Model only, without the brand — e.g. "S1000RR M-Sport" */
  model: string;
  /** Manufacturer — e.g. "BMW" */
  brand: string;
  /** Body style — e.g. "Superbike", "Supermoto" */
  type: string;
  year: number;
  /** Engine capacity in cc; drives the capacity-band filter. */
  engineCc: number;
  /** Odometer reading in km. */
  mileageKm: number;
  /** Whole rupees. */
  price: number;
  status: BikeStatus;
  /** False means the buyer handles registration. */
  registered: boolean;
  /** Partially masked is fine — e.g. "CBN-XXXX" */
  registrationNumber?: string;
  /** Corner ribbon on the card — e.g. "Featured", "Just In" */
  badge?: string;
  colour?: string;
  /** e.g. "207 hp @ 13,500 rpm" */
  power?: string;
  /** e.g. "113 Nm @ 11,000 rpm" */
  torque?: string;
  /** e.g. "197 kg" */
  weight?: string;
  transmission?: string;
  description?: string;
  features?: string[];
  /** Image URLs (local path or Sanity CDN). First is the card thumbnail. */
  gallery: string[];
  /** Fills the homepage marketplace row. */
  featured?: boolean;
}

export interface Product {
  slug: string;
  order: number;
  title: string;
  /** Category name — e.g. "Helmets" */
  category: string;
  /** Fallback line-icon key when there is no photo: helmet | tire | shock |
   *  exhaust | oil | disc | suit | chain */
  icon: string;
  brand?: string;
  /** One or two lines, shown on the card. */
  shortDescription: string;
  description?: string;
  features?: string[];
  /** Whole rupees. */
  price: number;
  sku?: string;
  /** Small label in the card corner — e.g. "PREMIUM" */
  tag?: string;
  /** False marks the product as Special Order (2–4 week lead time). */
  inStock: boolean;
  /** Optional photography; the category icon stands in when empty. */
  gallery?: string[];
  featured?: boolean;
}

export interface Post {
  slug: string;
  order: number;
  title: string;
  excerpt: string;
  /** Category name — e.g. "Diagnostics" */
  category: string;
  /** ISO date. */
  publishedAt: string;
  /** e.g. "7 min read". Computed from the body when absent. */
  readTime?: string;
  author?: string;
  authorRole?: string;
  /** Cover image URL (local path or Sanity CDN). */
  image: string;
  body: RichText;
  /** Fills the large slot at the top of the Journal. */
  featured?: boolean;
}

export interface Testimonial {
  slug: string;
  order: number;
  name: string;
  /** Shown under the name — e.g. "Owner · BMW S1000RR" */
  role?: string;
  quote: string;
  /** Out of 5. Omit to hide the stars. */
  rating?: number;
  featured?: boolean;
}

export interface Service {
  slug: string;
  order: number;
  /** "01" … "08" — rendered above the card title. */
  num: string;
  title: string;
  /** Line-icon key from components/icon.tsx */
  icon: string;
  /** Card copy on the services grid. */
  description: string;
  /**
   * Display heading for the alternating detail band on /services. Uses \n for
   * the design's deliberate two-line break, as SectionHead and CtaBanner do.
   */
  headline?: string;
  /** Detail-page hero lead, and the paragraph in the /services detail band. */
  intro?: string;
  body?: RichText;
  /** Bullet points on the detail page and in the /services detail band. */
  includes?: string[];
  /** Photo for the detail band. Falls back to the icon panel when absent. */
  image?: string;
  /**
   * Monospace scan-tool readout rendered instead of a photo — the design gives
   * ECU Diagnostics this treatment in place of an image.
   */
  readout?: string[];
}
