import type { MetadataRoute } from "next";
import { baseUrl, isProduction } from "@/lib/seo";

/**
 * AI / answer-engine crawlers are allowed explicitly rather than falling
 * through to `*`. Bike House wants to be citable in AI answers, and an
 * explicit rule makes a future opt-out a one-line edit.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  // Staging and preview deployments must never be crawlable.
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
