import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, readToken, sanityConfigured } from "./env";

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // The dataset is private: without a token every query resolves to null.
      ...(readToken ? { token: readToken } : {}),
      // Fetch from the live API, not Sanity's CDN: Next.js already caches
      // responses (ISR + tags), and the CDN would add a second, slower-to-
      // purge layer on top — making edits appear late even after revalidation.
      useCdn: false,
      perspective: "published",
      stega: false,
    })
  : null;
