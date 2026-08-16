import type { Metadata, ResolvingMetadata } from "next";
import CtaBanner from "@/components/cta-banner";
import EmptyState from "@/components/empty-state";
import FilterChips from "@/components/filter-chips";
import JsonLd from "@/components/json-ld";
import PageHero from "@/components/page-hero";
import ProductCard from "@/components/product-card";
import ShopControls from "@/components/shop-controls";
import Icon from "@/components/icon";
import { getProducts } from "@/lib/data";
import { abs, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Product } from "@/lib/types";

type SearchParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const DESCRIPTION =
  "Premium motorcycle parts, helmets, tires, suspension, exhausts and gear from Brembo, Öhlins, Akrapovič, Pirelli, Arai and Motul. Phone-inquiry ordering.";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  return pageMetadata(parent, {
    title: "Shop — Parts & Gear",
    description: DESCRIPTION,
    path: "/shop",
  });
}

function applyFilters(products: Product[], params: SearchParams) {
  const category = first(params.category);
  const query = first(params.q).toLowerCase();
  const inStockOnly = first(params.stock) === "in";
  const sort = first(params.sort) || "featured";

  const filtered = products.filter((product) => {
    if (category && product.category.toLowerCase() !== category.toLowerCase()) return false;
    if (inStockOnly && !product.inStock) return false;
    if (query) {
      const haystack = [
        product.title,
        product.category,
        product.brand,
        product.sku,
        product.shortDescription,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  const sorted = [...filtered];
  if (sort === "low") sorted.sort((a, b) => a.price - b.price);
  else if (sort === "high") sorted.sort((a, b) => b.price - a.price);
  else if (sort === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));

  return sorted;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const all = await getProducts();
  const products = applyFilters(all, params);

  const categories = [...new Set(all.map((p) => p.category))];

  return (
    <>
      <PageHero
        crumbs={[{ name: "Shop", path: "/shop" }]}
        heading="Parts &"
        accent="gear."
        lead="Premium parts for premium machines. Brembo, Öhlins, Akrapovič, Pirelli, Arai, Alpinestars, Motul — direct supply, no grey-market."
      >
        <div className="phone-notice">
          <span className="ico">
            <Icon name="phone" className="size-5" strokeWidth={2} />
          </span>
          <div>
            <div className="spec-line red">Phone-inquiry only</div>
            <div className="notice-title">
              Call <a href={site.phoneHref}>{site.phone}</a> to order
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section-tight">
        <div className="container">
          <ShopControls total={products.length} />

          <div className="chip-wrap">
            <FilterChips
              legend="Category:"
              param="category"
              basePath="/shop"
              searchParams={params}
              active={first(params.category)}
              options={[
                { label: "All", value: "" },
                ...categories.map((c) => ({ label: c, value: c.toLowerCase() })),
              ]}
            />
          </div>

          {products.length > 0 ? (
            <div className="shop-grid" data-reveal-group>
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              headline="No matches."
              message="Try a different search, or call us — we can source most things."
            />
          )}
        </div>
      </section>

      <section className="section-tight brand-bar">
        <div className="container">
          <div className="spec-line center">Authorised supplier of</div>
          <div className="brand-list">
            {site.suppliers.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        kicker="Need something specific?"
        heading={"If we don't have it,\nwe can source it."}
        body="Custom orders welcome. OEM part numbers, performance brands, special-order helmets and suits. Lead time is usually 2–4 weeks."
        actions={[
          { label: "Call to Order", href: site.phoneHref, external: true },
          { label: "WhatsApp", href: site.whatsapp, variant: "ghost", external: true },
        ]}
      />

      {products.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Parts & Gear — Bike House",
            numberOfItems: products.length,
            itemListElement: products.map((product, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: abs(`/shop/${product.slug}`),
              name: product.title,
            })),
          }}
        />
      )}
    </>
  );
}
