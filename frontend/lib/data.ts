import { unstable_cache } from "next/cache";
import { client } from "./sanity/client";
import {
  bikesQuery,
  postsQuery,
  productsQuery,
  servicesQuery,
  testimonialsQuery,
} from "./sanity/queries";
import {
  fallbackBikes,
  fallbackPosts,
  fallbackProducts,
  fallbackServices,
  fallbackTestimonials,
} from "./fallback-data";
import type { Bike, Post, Product, Service, Testimonial } from "./types";

/**
 * Caching model:
 * - Development: no cache — every reload reflects the latest Studio edits.
 * - Production: query results are cached in Next's data cache under the
 *   "sanity" tag (via unstable_cache, which works regardless of the Sanity
 *   client's HTTP transport). The Studio webhook (app/api/revalidate) purges
 *   the tag on publish; the 5-minute window is only a fallback for missed
 *   webhooks.
 */
const isDev = process.env.NODE_ENV === "development";
const REVALIDATE_SECONDS = 300;

export const SANITY_TAG = "sanity";

const cachedQuery = unstable_cache(
  async (query: string) => {
    if (!client) return null;
    return client.fetch<unknown[]>(query);
  },
  ["sanity-query"],
  { tags: [SANITY_TAG], revalidate: REVALIDATE_SECONDS },
);

/**
 * Fallback content stands in for an *unavailable* CMS, not an empty one.
 * A query that succeeds is authoritative even when it returns no documents —
 * otherwise selling the last bike on the floor would silently resurrect the
 * hardcoded samples.
 */
async function fetchWithFallback<T>(query: string, fallback: T[]): Promise<T[]> {
  if (!client) return fallback;
  try {
    const result = isDev
      ? await client.fetch<T[]>(query)
      : ((await cachedQuery(query)) as T[] | null);
    return result ?? fallback;
  } catch (error) {
    console.error("Sanity fetch failed; serving fallback content.", error);
    return fallback;
  }
}

// ── Bikes ───────────────────────────────────────────────────────────────────

export function getBikes(): Promise<Bike[]> {
  return fetchWithFallback<Bike>(bikesQuery, fallbackBikes);
}

/** Sold bikes stay reachable by direct link but are kept off the listing. */
export async function getBikesForSale(): Promise<Bike[]> {
  const bikes = await getBikes();
  return bikes.filter((bike) => bike.status !== "sold");
}

export async function getBike(slug: string): Promise<Bike | undefined> {
  const bikes = await getBikes();
  return bikes.find((bike) => bike.slug === slug);
}

/** Same body type first, topped up with others so the row always fills. */
export async function getRelatedBikes(bike: Bike, limit = 3): Promise<Bike[]> {
  const others = (await getBikesForSale()).filter((b) => b.slug !== bike.slug);
  const sameType = others.filter((b) => b.type === bike.type);
  const rest = others.filter((b) => b.type !== bike.type);
  return [...sameType, ...rest].slice(0, limit);
}

// ── Shop ────────────────────────────────────────────────────────────────────

export function getProducts(): Promise<Product[]> {
  return fetchWithFallback<Product>(productsQuery, fallbackProducts);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const products = await getProducts();
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, limit);
}

// ── Journal ─────────────────────────────────────────────────────────────────

export function getPosts(): Promise<Post[]> {
  return fetchWithFallback<Post>(postsQuery, fallbackPosts);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const posts = await getPosts();
  const sameCategory = posts.filter(
    (p) => p.slug !== post.slug && p.category === post.category,
  );
  const rest = posts.filter(
    (p) => p.slug !== post.slug && p.category !== post.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

// ── Testimonials & services ─────────────────────────────────────────────────

export function getTestimonials(): Promise<Testimonial[]> {
  return fetchWithFallback<Testimonial>(testimonialsQuery, fallbackTestimonials);
}

export function getServices(): Promise<Service[]> {
  return fetchWithFallback<Service>(servicesQuery, fallbackServices);
}

export async function getService(slug: string): Promise<Service | undefined> {
  const services = await getServices();
  return services.find((service) => service.slug === slug);
}
