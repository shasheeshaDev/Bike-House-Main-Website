import { defineQuery } from "next-sanity";

/** Projections match the shapes in lib/types.ts. Images resolve to a CDN URL
 *  string so pages can treat Sanity and fallback content identically. */

export const bikesQuery = defineQuery(`
  *[_type == "bike" && defined(slug.current)] | order(order asc, year desc) {
    "slug": slug.current,
    order,
    model,
    "brand": brand,
    "type": type,
    year,
    engineCc,
    mileageKm,
    price,
    status,
    registered,
    registrationNumber,
    badge,
    colour,
    power,
    torque,
    weight,
    transmission,
    description,
    features,
    "gallery": gallery[].asset->url,
    featured
  }
`);

export const productsQuery = defineQuery(`
  *[_type == "product" && defined(slug.current)] | order(order asc, title asc) {
    "slug": slug.current,
    order,
    title,
    category,
    icon,
    brand,
    shortDescription,
    description,
    features,
    price,
    sku,
    tag,
    inStock,
    "gallery": gallery[].asset->url,
    featured
  }
`);

export const postsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc, order asc) {
    "slug": slug.current,
    order,
    title,
    excerpt,
    category,
    publishedAt,
    readTime,
    author,
    authorRole,
    "image": image.asset->url,
    body,
    featured
  }
`);

export const testimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(order asc) {
    "slug": slug.current,
    order,
    name,
    role,
    quote,
    rating,
    featured,
    source,
    publishedAt,
    authorPhoto,
    reviewUrl
  }
`);

/**
 * The `background` projection flattens the schema's object into the
 * ServiceBackground shape the fallback bundle also returns: a single `image`
 * key, filled from either the image field or the video's poster, so the card
 * never has to know which branch produced it. A service with no background
 * projects to null, which the card reads as "no media".
 */
export const servicesQuery = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(order asc) {
    "slug": slug.current,
    order,
    num,
    title,
    icon,
    description,
    headline,
    intro,
    body,
    includes,
    "image": image.asset->url,
    readout,
    "background": background{
      kind,
      "image": coalesce(image.asset->url, poster.asset->url),
      "video": video.asset->url
    }
  }
`);
