import type { Metadata, ResolvingMetadata } from "next";
import BikeCard from "@/components/bike-card";
import BikeFilters from "@/components/bike-filters";
import CtaBanner from "@/components/cta-banner";
import EmptyState from "@/components/empty-state";
import JsonLd from "@/components/json-ld";
import PageHero from "@/components/page-hero";
import { getBikesForSale } from "@/lib/data";
import { CC_BANDS } from "@/lib/format";
import { abs, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Bike } from "@/lib/types";

type SearchParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const DESCRIPTION =
  "Hand-picked premium motorcycles for sale in Sri Lanka. Superbikes, supermotos and touring bikes — each inspected and serviced by the Bike House workshop.";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  return pageMetadata(parent, {
    title: "Bikes for Sale",
    description: DESCRIPTION,
    path: "/bikes",
  });
}

/** Filtering and sorting run in JS so one rule covers both Sanity and the
 *  fallback bundle, and so the facet lists always match what is on the floor. */
function applyFilters(bikes: Bike[], params: SearchParams) {
  const brand = first(params.brand);
  const type = first(params.type);
  const reg = first(params.reg);
  const band = CC_BANDS[first(params.cc)];
  const maxPrice = Number(first(params.price)) || 0;
  const sort = first(params.sort) || "newest";

  const filtered = bikes.filter((bike) => {
    if (brand && bike.brand.toLowerCase() !== brand.toLowerCase()) return false;
    if (type && bike.type.toLowerCase() !== type.toLowerCase()) return false;
    if (reg === "yes" && !bike.registered) return false;
    if (reg === "no" && bike.registered) return false;
    if (band && (bike.engineCc < band[0] || bike.engineCc > band[1])) return false;
    if (maxPrice && bike.price > maxPrice) return false;
    return true;
  });

  const sorted = [...filtered];
  if (sort === "low") sorted.sort((a, b) => a.price - b.price);
  else if (sort === "high") sorted.sort((a, b) => b.price - a.price);
  else if (sort === "cc") sorted.sort((a, b) => b.engineCc - a.engineCc);
  else sorted.sort((a, b) => b.year - a.year);

  return sorted;
}

export default async function BikesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const all = await getBikesForSale();
  const bikes = applyFilters(all, params);

  const uniq = (values: string[]) => [...new Set(values)].sort();
  const brands = uniq(all.map((b) => b.brand)).map((b) => ({ label: b, value: b.toLowerCase() }));
  const types = uniq(all.map((b) => b.type)).map((t) => ({ label: t, value: t.toLowerCase() }));

  const hasFilters = ["brand", "type", "reg", "cc", "price"].some((k) => first(params[k]));

  return (
    <>
      <PageHero
        crumbs={[{ name: "Bikes for Sale", path: "/bikes" }]}
        heading="Bikes on the"
        accent="floor."
        lead="Every bike on this page has been through our workshop. Inspected, serviced, documented. No surprises after handover."
      />

      <section className="section-tight">
        <div className="container">
          <BikeFilters brands={brands} types={types} total={bikes.length} />

          {bikes.length > 0 ? (
            <div className="bike-grid" data-reveal-group>
              {bikes.map((bike, i) => (
                <BikeCard key={bike.slug} bike={bike} priority={i < 3} quickView />
              ))}
            </div>
          ) : (
            <EmptyState
              headline="No matches."
              message={
                hasFilters
                  ? "Try widening your filters, or call us — we may have it inbound."
                  : "Nothing on the floor right now. Call us — we can source most machines."
              }
            />
          )}
        </div>
      </section>

      <CtaBanner
        kicker="Looking for something specific?"
        heading={"Tell us what\nyou're hunting."}
        body="We have a network. If we don't have it on the floor, we know who does. Aprilia RSV4, Triumph Speed Triple, KTM 890, MV Agusta — we can source."
        actions={[
          { label: "Send a Brief", href: "/contact" },
          { label: "WhatsApp", href: site.whatsapp, variant: "ghost", external: true },
        ]}
      />

      {bikes.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Bikes for Sale — Bike House",
            numberOfItems: bikes.length,
            itemListElement: bikes.map((bike, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: abs(`/bikes/${bike.slug}`),
              name: `${bike.brand} ${bike.model}`,
            })),
          }}
        />
      )}
    </>
  );
}
