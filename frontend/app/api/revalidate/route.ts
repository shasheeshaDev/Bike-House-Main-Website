import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { SANITY_TAG } from "@/lib/data";

/**
 * Instant cache purge, called by the Sanity webhook on publish/unpublish.
 *
 * Configure at sanity.io → project → API → Webhooks:
 *   URL:     https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 *   Dataset: production · Trigger on: create, update, delete
 *
 * The shared secret in the URL must match SANITY_REVALIDATE_SECRET. Can also
 * be called manually (POST or GET) to force a refresh.
 */
export async function POST(request: NextRequest) {
  return handle(request);
}

export async function GET(request: NextRequest) {
  return handle(request);
}

async function handle(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { revalidated: false, message: "SANITY_REVALIDATE_SECRET is not configured" },
      { status: 500 },
    );
  }
  if (request.nextUrl.searchParams.get("secret") !== secret) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  // "max" marks the tag stale with stale-while-revalidate semantics: the next
  // visit triggers a background refresh and content is fresh from then on —
  // without blocking any visitor on a Sanity round-trip.
  revalidateTag(SANITY_TAG, "max");
  return NextResponse.json({ revalidated: true, tag: SANITY_TAG, now: Date.now() });
}
