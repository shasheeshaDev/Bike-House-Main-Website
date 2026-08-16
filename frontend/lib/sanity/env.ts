export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-04-16";

/** Read token. The dataset is private, so unauthenticated reads resolve every
 *  query to null rather than erroring — which silently empties the site. */
export const readToken = process.env.SANITY_API_READ_TOKEN ?? "";

/** True once a Sanity project is wired up via env vars. Until then the site
 *  renders the built-in fallback content from the design. */
export const sanityConfigured = projectId.length > 0;
