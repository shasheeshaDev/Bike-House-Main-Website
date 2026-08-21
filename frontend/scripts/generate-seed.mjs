/**
 * Generates ../studio/seed.ndjson (plus ../studio/images/) from this app's
 * lib/fallback-data.ts, so the design's content can be imported into a Sanity
 * dataset. Run from the frontend, then import from the studio:
 *
 *   cd frontend && npm run generate-seed
 *   cd ../studio && npm run import-seed   # sanity dataset import seed.ndjson
 *
 * Image fields use the `_sanityAsset` convention: the CLI uploads the files
 * referenced relative to the ndjson during import, so no asset IDs are
 * hard-coded here.
 *
 * Keeping the seed derived from the fallback bundle is what stops the two
 * drifting — there is one copy of the content, in code.
 */
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const {
  fallbackBikes,
  fallbackPosts,
  fallbackProducts,
  fallbackServices,
  fallbackTestimonials,
} = await import(join(root, "lib/fallback-data.ts"));

const outDir = join(root, "..", "studio");
const imgDir = join(outDir, "images");
mkdirSync(imgDir, { recursive: true });

const usedImages = new Set();

/** Copies the public asset next to the ndjson and returns a _sanityAsset ref. */
function imageRef(publicPath) {
  const file = basename(publicPath);
  if (!usedImages.has(file)) {
    copyFileSync(join(root, "public", publicPath), join(imgDir, file));
    usedImages.add(file);
  }
  return { _type: "image", _sanityAsset: `image@file://./images/${file}` };
}

const slug = (current) => ({ _type: "slug", current });

/** Portable Text block from a plain paragraph. */
const block = (text, i) => ({
  _type: "block",
  _key: `b${i}`,
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
});

const docs = [];

for (const service of fallbackServices) {
  docs.push({
    _id: `service-${service.slug}`,
    _type: "service",
    title: service.title,
    slug: slug(service.slug),
    num: service.num,
    order: service.order,
    icon: service.icon,
    description: service.description,
    ...(service.headline ? { headline: service.headline } : {}),
    ...(service.intro ? { intro: service.intro } : {}),
    ...(service.body ? { body: service.body.map(block) } : {}),
    ...(service.includes ? { includes: service.includes } : {}),
    ...(service.image ? { image: imageRef(service.image) } : {}),
    ...(service.readout ? { readout: service.readout } : {}),
  });
}

for (const bike of fallbackBikes) {
  docs.push({
    _id: `bike-${bike.slug}`,
    _type: "bike",
    model: bike.model,
    slug: slug(bike.slug),
    brand: bike.brand,
    type: bike.type,
    year: bike.year,
    order: bike.order,
    engineCc: bike.engineCc,
    mileageKm: bike.mileageKm,
    price: bike.price,
    status: bike.status,
    registered: bike.registered,
    ...(bike.registrationNumber ? { registrationNumber: bike.registrationNumber } : {}),
    ...(bike.badge ? { badge: bike.badge } : {}),
    ...(bike.colour ? { colour: bike.colour } : {}),
    ...(bike.power ? { power: bike.power } : {}),
    ...(bike.torque ? { torque: bike.torque } : {}),
    ...(bike.weight ? { weight: bike.weight } : {}),
    ...(bike.transmission ? { transmission: bike.transmission } : {}),
    ...(bike.description ? { description: bike.description } : {}),
    ...(bike.features ? { features: bike.features } : {}),
    gallery: bike.gallery.map((src, i) => ({ ...imageRef(src), _key: `g${i}` })),
    ...(bike.featured ? { featured: true } : {}),
  });
}

for (const product of fallbackProducts) {
  docs.push({
    _id: `product-${product.slug}`,
    _type: "product",
    title: product.title,
    slug: slug(product.slug),
    category: product.category,
    icon: product.icon,
    order: product.order,
    ...(product.brand ? { brand: product.brand } : {}),
    shortDescription: product.shortDescription,
    ...(product.description ? { description: product.description } : {}),
    ...(product.features ? { features: product.features } : {}),
    price: product.price,
    ...(product.sku ? { sku: product.sku } : {}),
    ...(product.tag ? { tag: product.tag } : {}),
    inStock: product.inStock,
    ...(product.gallery?.length
      ? { gallery: product.gallery.map((src, i) => ({ ...imageRef(src), _key: `g${i}` })) }
      : {}),
    ...(product.featured ? { featured: true } : {}),
  });
}

for (const post of fallbackPosts) {
  docs.push({
    _id: `post-${post.slug}`,
    _type: "post",
    title: post.title,
    slug: slug(post.slug),
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.publishedAt,
    order: post.order,
    ...(post.readTime ? { readTime: post.readTime } : {}),
    ...(post.author ? { author: post.author } : {}),
    ...(post.authorRole ? { authorRole: post.authorRole } : {}),
    image: imageRef(post.image),
    body: (post.body ?? []).map(block),
    ...(post.featured ? { featured: true } : {}),
  });
}

for (const item of fallbackTestimonials) {
  docs.push({
    _id: `testimonial-${item.slug}`,
    _type: "testimonial",
    name: item.name,
    slug: slug(item.slug),
    ...(item.role ? { role: item.role } : {}),
    quote: item.quote,
    ...(item.rating ? { rating: item.rating } : {}),
    order: item.order,
    ...(item.featured ? { featured: true } : {}),
  });
}

writeFileSync(
  join(outDir, "seed.ndjson"),
  docs.map((doc) => JSON.stringify(doc)).join("\n") + "\n",
);

const counts = docs.reduce((acc, d) => {
  acc[d._type] = (acc[d._type] ?? 0) + 1;
  return acc;
}, {});

console.log(`Wrote ${docs.length} documents to studio/seed.ndjson`);
for (const [type, n] of Object.entries(counts).sort()) {
  console.log(`  ${String(n).padStart(3)}  ${type}`);
}
console.log(`  ${String(usedImages.size).padStart(3)}  images → studio/images/`);
