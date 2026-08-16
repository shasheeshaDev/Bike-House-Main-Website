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

  phone: "+94 77 123 4567",
  phoneHref: "tel:+94771234567",
  whatsapp: "https://wa.me/94771234567",
  email: "hello@bikehouse.lk",
  emailHref: "mailto:hello@bikehouse.lk",

  /** Mon–Sat 08:30–19:00, closed Sunday. */
  hours: ["Monday — Saturday", "08.30 — 19.00"],
  hoursLine: "Mon–Sat · 08:30–19:00",
  openDays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  opens: "08:30",
  closes: "19:00",

  currency: "LKR",
  priceRange: "$$",

  map: {
    lat: 6.842,
    lng: 79.923,
    label: "Bike House · No. 42, Horana Road, Piliyandala",
  },

  social: {
    instagram: "https://instagram.com/bikehouse.lk",
    facebook: "https://facebook.com/bikehouse.lk",
    youtube: "https://youtube.com/@bikehouselk",
  },

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
