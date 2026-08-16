/**
 * Studio configuration, read from SANITY_STUDIO_* environment variables.
 * These are the vars Sanity's toolchain exposes to the Studio bundle — the
 * frontend's NEXT_PUBLIC_SANITY_* vars are not visible here, so the same
 * project must be described again with the SANITY_STUDIO_ prefix (see .env).
 */
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
export const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";
export const apiVersion = process.env.SANITY_STUDIO_API_VERSION ?? "2025-04-16";
