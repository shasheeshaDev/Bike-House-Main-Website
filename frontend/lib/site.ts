/** Workshop-wide constants used across pages, header, and footer. */
export const site = {
  name: "Bike House",
  legalName: "Bike House LK",
  tagline: "Sri Lanka's Specialist Superbike Garage",
  description:
    "Piliyandala-based specialist garage for high-capacity motorcycles. Diagnostics, performance tuning, service, parts and bike sales.",
  founded: "2014",
  /** Shown under the wordmark in the header and footer. */
  brandLine: "Piliyandala · Est 2014",

  address: {
    /** Block form, with line breaks. */
    line1: "No. 42, Horana Road,<br />Piliyandala, Sri Lanka",
    /** Single-line plain text, for prose, attributes, metadata, and email. */
    plain: "No. 42, Horana Road, Piliyandala, Sri Lanka",
    /** Street component only, for schema.org PostalAddress. */
    street: "No. 42, Horana Road",
    locality: "Piliyandala",
    region: "Western Province",
    postalCode: "10300",
    country: "LK",
  },

  phone: "+94 75 882 3884",
  phoneHref: "tel:+94758823884",
  /** Same line as `phone` — the workshop number is WhatsApp-enabled. */
  whatsapp: "https://wa.me/94758823884",
  email: "chathurangasupun96@gmail.com",
  emailHref: "mailto:chathurangasupun96@gmail.com",

  /**
   * Tue–Sun 09:00–19:00, closed Monday.
   *
   * Every surface that shows hours reads from here — the footer, the contact
   * blocks, the hero chip, the sidebar panels, llms.txt and the JSON-LD
   * `openingHoursSpecification`. Nothing restates them as a literal, so a
   * change to the roster lands everywhere at once.
   */
  hours: ["Tuesday — Sunday", "09.00 — 19.00"],
  hoursLine: "Tue–Sun · 09:00–19:00",
  /** Companion to `hoursLine`, for surfaces that list the closed day too. */
  closedLine: "Monday · Closed",
  /** Sentence form, for prose and meta descriptions. */
  hoursSentence: "Tue–Sun 09:00–19:00, closed Monday",
  openDays: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  /** Feeds the `opens: 00:00 / closes: 00:00` closed-day spec in JSON-LD. */
  closedDays: ["Monday"],
  opens: "09:00",
  closes: "19:00",

  currency: "LKR",
  priceRange: "$$",

  map: {
    lat: 6.842,
    lng: 79.923,
    label: "Bike House · No. 42, Horana Road, Piliyandala",
  },

  /**
   * Only confirmed profiles belong here: these feed the footer *and* the
   * `sameAs` array in JSON-LD, where a URL that 404s is a false identity claim
   * to search and answer engines. Instagram and YouTube were placeholders
   * carried over from the design and have been removed until real handles are
   * supplied — add them back as extra keys and the footer picks them up.
   */
  social: {
    facebook: "https://www.facebook.com/www.bikehouse.lk/",
  },

  /**
   * The listing's public reviews page on Google. Synced testimonials link here
   * so a visitor can check a quote against the source: the Business Profile API
   * exposes no per-review permalink, only an owner-reply URL. Leave empty and
   * the attribution renders as plain text instead of a link.
   */
  googleReviewsUrl: "",

  /** Marques the workshop is equipped for. Feeds the marquee and JSON-LD. */
  marques: [
    "Ducati",
    "BMW Motorrad",
    "Yamaha Racing",
    "KTM",
    "Honda",
    "Kawasaki",
    "Aprilia",
    "Brembo",
    "Öhlins",
    "Akrapovič",
    "Pirelli",
    "Michelin",
  ],

  /** Parts brands shown in the Shop's "Authorised supplier of" bar. */
  suppliers: [
    "Brembo",
    "Öhlins",
    "Akrapovič",
    "Pirelli",
    "Michelin",
    "Arai",
    "Alpinestars",
    "Motul",
    "DID",
    "K&N",
  ],
} as const;

/** Google Maps embed centred on the workshop (no API key required). */
export function mapEmbedUrl(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(site.map.label)}&output=embed`;
}

/** Deep link that opens turn-by-turn directions to the workshop. */
export function mapDirectionsUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.map.label)}`;
}

export const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "services", label: "Services", href: "/services" },
  { id: "bikes", label: "Bikes", href: "/bikes" },
  { id: "shop", label: "Shop", href: "/shop" },
  { id: "blog", label: "Journal", href: "/blog" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

/** Footer link columns. */
export const footerColumns = [
  {
    title: "Workshop",
    links: [
      { label: "All Services", href: "/services" },
      { label: "Book a Service", href: "/contact" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    title: "Marketplace",
    links: [
      { label: "Bikes for Sale", href: "/bikes" },
      { label: "Parts & Gear", href: "/shop" },
      { label: "The Journal", href: "/blog" },
    ],
  },
] as const;
