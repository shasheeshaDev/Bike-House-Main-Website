# Bike House — Studio

Sanity Studio v4 for the Bike House website. Standalone: install and run it
independently of `frontend/`.

```bash
npm install
cp env.example .env      # point at the same Sanity project as the frontend
npm run dev              # http://localhost:3333
npm run deploy           # → *.sanity.studio
```

## Content model

Sanity holds only the collections that genuinely change:

| Type | What it is |
| --- | --- |
| `bike` | A motorcycle on the showroom floor |
| `product` | A part or piece of gear in the Shop |
| `post` | A Journal article |
| `testimonial` | A customer review |
| `service` | A workshop service line |

Page structure and marketing copy live in the frontend (`lib/site.ts` and
`lib/fallback-data.ts`), so the site renders correctly with no CMS at all.

## Seeding

The seed is generated from the frontend's fallback content, so the two never
drift:

```bash
cd ../frontend && npm run generate-seed   # writes ../studio/seed.ndjson + images/
cd ../studio   && npm run import-seed     # sanity dataset import
```

## Live updates

Publishing purges the frontend's cache instantly via a webhook. Configure at
sanity.io → project → API → Webhooks:

- **URL:** `https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`
- **Dataset:** production · **Trigger on:** create, update, delete

Also add the site's origins under **API → CORS Origins** (with credentials), or
the Studio's live preview cannot reach the dataset from the browser.
