import type { Metadata, ResolvingMetadata } from "next";
import { site } from "./site";
import type { Bike, Post, Product, Service } from "./types";

export const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bikehouse.lk"
).replace(/\/$/, "");

export const abs = (path: string) =>
  path.startsWith("http") ? path : `${baseUrl}${path}`;

/** Staging and preview deployments must never be indexed. */
export const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

/**
 * Metadata for a page: self-referential canonical plus matching Open Graph
 * and Twitter title/description/URL.
 *
 * Must be called from `generateMetadata` with its `parent` argument. Next
 * merges metadata *shallowly*, so declaring `openGraph` on a page replaces the
 * inherited block outright — including the image injected by the file-based
 * `opengraph-image`. Carrying the parent's images forward is what keeps the
 * branded card attached.
 */
export async function pageMetadata(
  parent: ResolvingMetadata,
  opts: {
    title: string;
    description: string;
    path: string;
    images?: string[];
    type?: "website" | "article";
    /** Bypass the root `%s — Bike House` template (the home page title already
     *  contains the name and would otherwise repeat it). */
    absoluteTitle?: boolean;
    noindex?: boolean;
  },
): Promise<Metadata> {
  const fullTitle = opts.absoluteTitle ? opts.title : `${opts.title} — ${site.name}`;
  const inherited = (await parent).openGraph?.images ?? [];
  const images = [...(opts.images ?? []), ...inherited];

  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: opts.type ?? "website",
      title: fullTitle,
      description: opts.description,
      url: opts.path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
      images,
    },
    ...(opts.noindex || !isProduction
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

const ORG_ID = `${baseUrl}/#organization`;
const WEBSITE_ID = `${baseUrl}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

/**
 * The workshop as an AutoRepair + MotorcycleDealer, emitted once site-wide.
 *
 * This is the highest-leverage structured data on the site: it is what puts a
 * physical business into local packs, map results and AI answers to questions
 * like "where can I service a Ducati near Colombo". `knowsAbout` lists the
 * service lines as explicit entities.
 */
export function organizationSchema(serviceNames: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "MotorcycleDealer"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: baseUrl,
    image: abs("/img/mural-rider.jpg"),
    telephone: site.phone,
    email: site.email,
    foundingDate: site.founded,
    priceRange: site.priceRange,
    currenciesAccepted: site.currency,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.map.lat,
      longitude: site.map.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.map.lat},${site.map.lng}`,
    sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
    areaServed: [
      { "@type": "City", name: "Colombo" },
      { "@type": "City", name: "Piliyandala" },
      { "@type": "Country", name: "Sri Lanka" },
    ],
    knowsAbout: serviceNames,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.openDays,
        opens: site.opens,
        closes: site.closes,
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: baseUrl,
    name: site.name,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** A bike on the floor, as a Motorcycle with an Offer. */
export function bikeSchema(bike: Bike) {
  return {
    "@context": "https://schema.org",
    "@type": "Motorcycle",
    name: `${bike.brand} ${bike.model} ${bike.year}`,
    ...(bike.description ? { description: bike.description } : {}),
    brand: { "@type": "Brand", name: bike.brand },
    model: bike.model,
    vehicleModelDate: String(bike.year),
    bodyType: bike.type,
    ...(bike.colour ? { color: bike.colour } : {}),
    vehicleEngine: {
      "@type": "EngineSpecification",
      engineDisplacement: {
        "@type": "QuantitativeValue",
        value: bike.engineCc,
        unitCode: "CMQ",
      },
    },
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: bike.mileageKm,
      unitCode: "KMT",
    },
    image: bike.gallery.map(abs),
    url: abs(`/bikes/${bike.slug}`),
    offers: {
      "@type": "Offer",
      price: bike.price,
      priceCurrency: site.currency,
      availability:
        bike.status === "sold"
          ? "https://schema.org/SoldOut"
          : bike.status === "reserved"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/InStock",
      url: abs(`/bikes/${bike.slug}`),
      seller: { "@id": ORG_ID },
    },
  };
}

/** A catalogue part. Phone-order only, so there is no checkout action. */
export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description ?? product.shortDescription,
    ...(product.sku ? { sku: product.sku } : {}),
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    category: product.category,
    ...(product.gallery?.length ? { image: product.gallery.map(abs) } : {}),
    url: abs(`/shop/${product.slug}`),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: site.currency,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/BackOrder",
      url: abs(`/shop/${product.slug}`),
      seller: { "@id": ORG_ID },
    },
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: abs(post.image),
    datePublished: post.publishedAt,
    articleSection: post.category,
    inLanguage: "en",
    author: { "@type": "Organization", name: site.name, "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: abs(`/blog/${post.slug}`),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    url: abs(`/services/${service.slug}`),
  };
}

/** Aggregate rating over the published reviews, for the business entity. */
export function reviewSchema(
  reviews: { name: string; quote: string; rating?: number }[],
) {
  const rated = reviews.filter((r) => typeof r.rating === "number");
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": ORG_ID,
    name: site.name,
    ...(rated.length
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: (
              rated.reduce((sum, r) => sum + (r.rating ?? 0), 0) / rated.length
            ).toFixed(1),
            reviewCount: rated.length,
            bestRating: 5,
          },
        }
      : {}),
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.quote,
      ...(r.rating
        ? { reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 } }
        : {}),
    })),
  };
}
