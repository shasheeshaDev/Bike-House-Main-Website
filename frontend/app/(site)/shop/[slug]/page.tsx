import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/gallery";
import JsonLd from "@/components/json-ld";
import ProductCard from "@/components/product-card";
import ProductIcon from "@/components/product-icon";
import SectionHead from "@/components/section-head";
import { getProduct, getProducts, getRelatedProducts } from "@/lib/data";
import { formatLKR } from "@/lib/format";
import { breadcrumbSchema, pageMetadata, productSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const PROMISES = [
  ["Fitment", "Most parts in our catalogue come with bike-specific fitment. Call with your VIN and we'll confirm."],
  ["Supply", "Direct from brand. No grey-market parts, no questionable knock-offs."],
  ["Lead time", "In-stock items: same-day. Special order: 2–4 weeks depending on item."],
  ["Installation", "We fit what we sell. Workshop rates apply for installation; quoted separately."],
];

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  return pageMetadata(parent, {
    title: product.title,
    description: product.shortDescription,
    path: `/shop/${product.slug}`,
    images: product.gallery?.slice(0, 1),
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const gallery = product.gallery ?? [];

  return (
    <>
      <section className="pd-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="crumbs">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><span aria-hidden="true">/</span><Link href="/shop">Shop</Link></li>
              <li>
                <span aria-hidden="true">/</span>
                <Link href={`/shop?category=${product.category.toLowerCase()}`}>{product.category}</Link>
              </li>
              <li><span aria-hidden="true">/</span><span aria-current="page">{product.title}</span></li>
            </ol>
          </nav>

          <div className="pd-grid">
            {gallery.length > 0 ? (
              <Gallery images={gallery} alt={product.title} />
            ) : (
              <div className="pd-image">
                <ProductIcon name={product.icon} />
                {product.tag && <span className="tag">{product.tag}</span>}
              </div>
            )}

            <div>
              <div className="spec-line red">
                {[product.category, product.brand].filter(Boolean).join(" · ")}
              </div>
              <h1 className="pd-title">{product.title}</h1>
              <div className="pd-price">
                {formatLKR(product.price, false)} <small>LKR</small>
              </div>

              <div className={`stock ${product.inStock ? "in" : "out"}`}>
                {product.inStock ? "● In Stock" : "○ Special Order · 2–4 weeks"}
              </div>

              <p className="pd-lead">{product.shortDescription}</p>

              <dl className="pd-meta">
                <div>
                  <dt className="l">SKU</dt>
                  <dd className="v">{product.sku ?? "—"}</dd>
                </div>
                <div>
                  <dt className="l">Brand</dt>
                  <dd className="v">{product.brand ?? "—"}</dd>
                </div>
              </dl>

              <div className="bd-actions">
                <a className="btn" href={site.phoneHref}>
                  Call {site.phone} <span className="arrow" />
                </a>
                <a className="btn btn-ghost" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pd-more" data-reveal-group>
            <div>
              <span className="kicker">Description</span>
              <h2 className="h2">Details</h2>
              {product.description && <p className="bd-desc">{product.description}</p>}

              {product.features && product.features.length > 0 && (
                <div className="pd-features-wrap">
                  <div className="bd-included-title">Key features</div>
                  <ul className="pd-features">
                    {product.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <hr className="hr" />

              <div className="pd-promises" data-reveal>
                {PROMISES.map(([label, body]) => (
                  <div key={label}>
                    <div className="spec-line red">{label}</div>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside>
              <div className="bd-inquire">
                <span className="kicker">Phone-inquiry only</span>
                <h3 className="h3">Reserve this part<br />by phone.</h3>
                <p>
                  No online checkout. We confirm fitment, price and lead time on the
                  call — then hold the part for you.
                </p>
                <div className="bd-inquire-actions">
                  <a className="btn" href={site.phoneHref}>
                    Call {site.phone} <span className="arrow" />
                  </a>
                  <a className="btn btn-ghost" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp <span className="arrow" />
                  </a>
                </div>
                <div className="bd-inquire-meta">
                  {site.hoursLine}
                  <br />
                  {site.address.plain}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHead
              label="[ Same Category ]"
              heading={`More from\n${product.category}.`}
              meta="Full Catalogue"
              metaHref="/shop"
            />
            <div className="shop-grid" data-reveal-group>
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: product.title, path: `/shop/${product.slug}` },
          ]),
        ]}
      />
    </>
  );
}
