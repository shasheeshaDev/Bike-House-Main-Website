import type { MetadataRoute } from "next";
import { getBikes, getPosts, getProducts, getServices } from "@/lib/data";
import { abs } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [bikes, products, posts, services] = await Promise.all([
    getBikes(),
    getProducts(),
    getPosts(),
    getServices(),
  ]);

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: abs("/"), changeFrequency: "weekly", priority: 1 },
      { url: abs("/bikes"), changeFrequency: "daily", priority: 0.9 },
      { url: abs("/shop"), changeFrequency: "weekly", priority: 0.8 },
      { url: abs("/services"), changeFrequency: "monthly", priority: 0.8 },
      { url: abs("/blog"), changeFrequency: "weekly", priority: 0.7 },
      { url: abs("/about"), changeFrequency: "monthly", priority: 0.6 },
      { url: abs("/contact"), changeFrequency: "monthly", priority: 0.6 },
    ] as const
  ).map((entry) => ({ ...entry, lastModified: now }));

  return [
    ...staticPages,
    ...bikes.map((b) => ({
      url: abs(`/bikes/${b.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...services.map((s) => ({
      url: abs(`/services/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: abs(`/shop/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: abs(`/blog/${p.slug}`),
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
