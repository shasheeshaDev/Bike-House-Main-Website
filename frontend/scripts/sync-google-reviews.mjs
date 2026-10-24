/**
 * Imports the workshop's Google reviews into Sanity as `testimonial` documents.
 *
 *   cd frontend && npm run sync-reviews          # write
 *   cd frontend && npm run sync-reviews -- --dry # report only, no mutations
 *
 * Why the Business Profile API and not Places: the Places API returns at most
 * five reviews, picked by its own relevance ranking, and its policies forbid
 * storing the content — which would make a Sanity copy a terms violation and
 * leave the fallback bundle with nothing to fall back to. Business Profile
 * returns the full history for a location the authenticated account manages,
 * and those are the workshop's own reviews.
 *
 * Reviews are the *source* of this content, not the owner of the presentation.
 * The sync writes only the fields Google is authoritative for — quote, rating,
 * author, date — and leaves `order`, `role` and `featured` alone after the
 * first import, so curation done in the Studio survives the next run.
 *
 * Environment (see env.example):
 *   GOOGLE_OAUTH_CLIENT_ID / _SECRET / _REFRESH_TOKEN
 *   GOOGLE_BUSINESS_ACCOUNT_ID     accounts/<id>
 *   GOOGLE_BUSINESS_LOCATION_ID    locations/<id>
 *   GOOGLE_REVIEWS_MIN_RATING      stars needed to be featured (default 4)
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN
 */
const DRY = process.argv.includes("--dry");

const env = (name, fallback) => {
  const value = process.env[name] ?? fallback;
  if (value === undefined) throw new Error(`Missing environment variable: ${name}`);
  return value;
};

const PROJECT = env("NEXT_PUBLIC_SANITY_PROJECT_ID");
const DATASET = env("NEXT_PUBLIC_SANITY_DATASET", "production");
const MIN_FEATURED = Number(env("GOOGLE_REVIEWS_MIN_RATING", "4"));

/** Business Profile reviews never moved to the newer split APIs. */
const REVIEWS_HOST = "https://mybusiness.googleapis.com/v4";
const STARS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

async function accessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env("GOOGLE_OAUTH_CLIENT_ID"),
      client_secret: env("GOOGLE_OAUTH_CLIENT_SECRET"),
      refresh_token: env("GOOGLE_OAUTH_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function fetchReviews(token) {
  const parent = `${env("GOOGLE_BUSINESS_ACCOUNT_ID")}/${env("GOOGLE_BUSINESS_LOCATION_ID")}`;
  const all = [];
  let pageToken;
  let summary = {};

  do {
    const url = new URL(`${REVIEWS_HOST}/${parent}/reviews`);
    url.searchParams.set("pageSize", "50"); // the API's maximum
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Reviews fetch failed: ${res.status} ${await res.text()}`);
    const page = await res.json();

    all.push(...(page.reviews ?? []));
    summary = { averageRating: page.averageRating, totalReviewCount: page.totalReviewCount };
    pageToken = page.nextPageToken;
  } while (pageToken);

  return { reviews: all, ...summary };
}

/** Stable, readable document id derived from Google's own review id. */
function docId(reviewId) {
  return `testimonial-google-${reviewId.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 60)}`;
}

function toDocument(review) {
  const rating = STARS[review.starRating];
  const name = review.reviewer?.isAnonymous
    ? "Google reviewer"
    : (review.reviewer?.displayName ?? "Google reviewer");

  return {
    _id: docId(review.reviewId),
    _type: "testimonial",
    name,
    slug: { _type: "slug", current: docId(review.reviewId).replace("testimonial-", "") },
    quote: review.comment.trim(),
    rating,
    source: "google",
    publishedAt: review.createTime,
    googleReviewId: review.reviewId,
    // Anonymous reviewers get no photo to credit, and Google omits it.
    ...(review.reviewer?.profilePhotoUrl && !review.reviewer?.isAnonymous
      ? { authorPhoto: review.reviewer.profilePhotoUrl }
      : {}),
    // Deliberately no reviewUrl: the v4 Review carries `reviewReplyUrl`, which
    // opens the owner's reply form on business.google.com and is useless to a
    // visitor. There is no public per-review permalink in this API, so the card
    // falls back to site.googleReviewsUrl — the listing's own reviews page.
  };
}

async function mutate(mutations) {
  const res = await fetch(
    `https://${PROJECT}.api.sanity.io/v2025-04-16/data/mutate/${DATASET}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env("SANITY_API_WRITE_TOKEN")}`,
      },
      body: JSON.stringify({ mutations }),
    },
  );
  if (!res.ok) throw new Error(`Sanity mutate failed: ${res.status} ${await res.text()}`);
  return res.json();
}

const token = await accessToken();
const { reviews, averageRating, totalReviewCount } = await fetchReviews(token);

console.log(
  `Google: ${reviews.length} fetched of ${totalReviewCount ?? "?"} total` +
    (averageRating ? ` · average ${Number(averageRating).toFixed(1)}★` : ""),
);

// A star-only review has no words to quote, and `quote` is a required field.
const usable = reviews.filter((r) => r.comment && r.comment.trim() && STARS[r.starRating]);
const skipped = reviews.length - usable.length;
if (skipped) console.log(`  ${skipped} skipped (no written comment or no rating)`);

const mutations = [];
for (const review of usable) {
  const doc = toDocument(review);
  const { _id, ...owned } = doc;

  // createIfNotExists seeds the editorial fields once; the patch that follows
  // never mentions them again, so a rating change on Google updates the card
  // while `featured`, `order` and `role` stay as the Studio left them.
  mutations.push({
    createIfNotExists: {
      ...doc,
      order: 100,
      featured: STARS[review.starRating] >= MIN_FEATURED,
    },
  });
  mutations.push({ patch: { id: _id, set: owned } });
}

if (DRY) {
  console.log(`\nDry run — ${usable.length} review(s) would be written:\n`);
  for (const review of usable) {
    const doc = toDocument(review);
    console.log(
      `  ${doc.rating}★  ${doc.name.padEnd(24)} ${doc.publishedAt?.slice(0, 10)}  ` +
        `${doc.quote.replace(/\s+/g, " ").slice(0, 72)}…`,
    );
  }
  console.log(`\n(${mutations.length} mutations withheld)`);
} else if (mutations.length) {
  await mutate(mutations);
  console.log(`\nWrote ${usable.length} review(s) to Sanity (${DATASET}).`);
} else {
  console.log("\nNothing to write.");
}
