# Bike House

The website for Bike House, an independent Sri Lankan specialist garage for
superbikes, supermotos and high-capacity touring machines. This repository is a
monorepo of two **independent** projects:

| Folder | What it is | Stack | Deploys to |
| --- | --- | --- | --- |
| [`frontend/`](frontend) | The public website | Next.js (App Router), Tailwind CSS, Resend | Vercel |
| [`studio/`](studio) | The content backend | Sanity Studio v4 | Sanity hosting (`*.sanity.studio`) |

The two are decoupled: the frontend reads content from Sanity over the API and
falls back to built-in design content when Sanity isn't configured or is
unreachable. The Studio is a standalone project, not embedded in the Next.js app.

## Getting started

Each project is self-contained — install and run them separately.

```bash
# The website
cd frontend
npm install
cp env.example .env.local     # fill in Sanity + Resend values
npm run dev                   # http://localhost:3000

# The content studio (in another terminal)
cd studio
npm install
cp env.example .env           # point at the SAME Sanity project
npm run dev                   # http://localhost:3333
```

The frontend names its Sanity variables `NEXT_PUBLIC_SANITY_*`; the Studio names
the same project `SANITY_STUDIO_*`. Both must reference one and the same Sanity
project and dataset.

The site runs with **no Sanity project at all** — leave
`NEXT_PUBLIC_SANITY_PROJECT_ID` blank and it renders the design's content from
`frontend/lib/fallback-data.ts`.

## Content

Sanity holds only the collections that genuinely change — bikes, shop products,
Journal articles, testimonials and service lines. Page structure and marketing
copy live in the frontend (`lib/site.ts`, and the page files themselves), so the
site is never at the mercy of an empty or unreachable CMS.

- Seed the dataset with the approved design content:
  `cd studio && npm run import-seed`
- Regenerate that seed after editing fallback content:
  `cd frontend && npm run generate-seed` (writes into `studio/`)
- Live edits reach the deployed site instantly via a revalidation webhook —
  see [`studio/README.md`](studio/README.md).

## Deployment

- **Frontend → Vercel:** set the project's **Root Directory** to `frontend`.
  `frontend/vercel.json` pins the Next.js framework preset. Add the frontend env
  vars in the Vercel dashboard.
- **Studio → Sanity:** `cd studio && npm run deploy`.

## Reference

`design/` holds the original static HTML design the site was built from. It is
reference material only and is not part of either deployable project.
