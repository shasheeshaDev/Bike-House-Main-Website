import { bike } from "./bike";
import { post } from "./post";
import { product } from "./product";
import { service } from "./service";
import { testimonial } from "./testimonial";

/**
 * Sanity holds only the collections that genuinely change: stock, catalogue,
 * articles, reviews and service lines. Page structure and marketing copy live
 * in the frontend (lib/site.ts and lib/fallback-data.ts), so the site renders
 * correctly with no CMS at all.
 */
export const schemaTypes = [bike, product, post, testimonial, service];
