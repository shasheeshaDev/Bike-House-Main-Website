<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## This repository

Two independent projects: `frontend/` (Next.js) and `studio/` (Sanity). They are
not a workspace — install and run each separately.

**Content model.** Sanity holds only genuinely dynamic collections (bikes,
products, posts, testimonials, services). Page structure and marketing copy live
in `frontend/lib/site.ts` and the page files. There is no CMS page-builder.

**The fallback contract.** `frontend/lib/types.ts` is the shape returned by both
Sanity queries and `lib/fallback-data.ts`. Any field added to a query must be
added to the type and the fallback, or the site will diverge depending on
whether the CMS is reachable. `studio/seed.ndjson` is *generated* from the
fallback bundle — never edit it by hand.

**Styling.** `app/globals.css` is the design system ported from
`design/assets/css/main.css`, wrapped in `@layer components`. Tailwind supplies
theme tokens and utilities only; Preflight is deliberately not imported. Prefer
the ported semantic classes over utility soup.
