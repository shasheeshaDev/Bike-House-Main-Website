import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BikeCard from "@/components/bike-card";
import Gallery from "@/components/gallery";
import JsonLd from "@/components/json-ld";
import SectionHead from "@/components/section-head";
import { getBike, getBikes, getRelatedBikes } from "@/lib/data";
import { formatLKR } from "@/lib/format";
import { bikeSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const bikes = await getBikes();
  return bikes.map((bike) => ({ slug: bike.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const bike = await getBike(slug);
  if (!bike) return {};

  const title = `${bike.brand} ${bike.model} ${bike.year}`;
  return pageMetadata(parent, {
    title,
    description:
      bike.description ??
      `${title} for sale at Bike House, Piliyandala. ${bike.engineCc}cc, ${formatLKR(bike.price)}.`,
    path: `/bikes/${bike.slug}`,
    images: bike.gallery.slice(0, 1),
  });
}

export default async function BikeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bike = await getBike(slug);
  if (!bike) notFound();

  const related = await getRelatedBikes(bike);
  const sold = bike.status === "sold";
  const title = `${bike.brand} ${bike.model}`;

  const specs: [string, string, boolean?][] = [
    ["Engine", `${bike.engineCc} cc`],
    ["Mileage", `${bike.mileageKm.toLocaleString("en-LK")} km`],
    ["Power", bike.power ?? "—", true],
    ["Torque", bike.torque ?? "—", true],
    ["Weight", bike.weight ?? "—"],
    ["Transmission", bike.transmission ?? "—", true],
  ];

  return (
    <>
      <section className="bd-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="crumbs">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><span aria-hidden="true">/</span><Link href="/bikes">Bikes</Link></li>
              <li><span aria-hidden="true">/</span><span aria-current="page">{bike.model}</span></li>
            </ol>
          </nav>

          <div className="bd-grid">
            <Gallery images={bike.gallery} alt={title} badge={sold ? undefined : bike.badge} />

            <div className="bd-side">
              <div className="spec-line red">
                {bike.brand} · {bike.type}
              </div>
              <h1 className="bd-title">
                {bike.model}
                <br />
                <span className="year">{bike.year}</span>
              </h1>

              <div className="bd-price">
                {formatLKR(bike.price, false)} <small>LKR</small>
              </div>

              {sold ? (
                <div className="bd-status unreg">● Sold</div>
              ) : bike.status === "reserved" ? (
                <div className="bd-status unreg">● Reserved</div>
              ) : (
                <div className={`bd-status ${bike.registered ? "reg" : "unreg"}`}>
                  {bike.registered
                    ? `● Registered${bike.registrationNumber ? ` · ${bike.registrationNumber}` : ""}`
                    : "○ Unregistered — buyer to register"}
                </div>
              )}

              <dl className="bd-specs">
                {specs.map(([label, value, small]) => (
                  <div key={label}>
                    <dt className="l">{label}</dt>
                    <dd className={small ? "v sm" : "v"}>{value}</dd>
                  </div>
                ))}
                <div className="wide">
                  <dt className="l">Colour</dt>
                  <dd className="v sm">{bike.colour ?? "—"}</dd>
                </div>
              </dl>

              {!sold && (
                <div className="bd-actions">
                  <a className="btn" href={site.phoneHref}>
                    Call to Inquire <span className="arrow" />
                  </a>
                  <a className="btn btn-ghost" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="bd-more">
            <div>
              <span className="kicker">About this bike</span>
              <h2 className="h2">{bike.model}.</h2>
              {bike.description && <p className="bd-desc">{bike.description}</p>}

              {bike.features && bike.features.length > 0 && (
                <ul className="bd-features">
                  {bike.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}

              <hr className="hr" />

              <div className="bd-included-title">What&apos;s included</div>
              <p className="bd-included">
                Every bike on our floor comes with a documented service inspection, a
                7-day return window for any undisclosed mechanical issue, and a
                complimentary first oil change after delivery.
              </p>
            </div>

            <aside>
              <div className="bd-inquire">
                <span className="kicker">Inquire about this bike</span>
                <h3 className="h3">Talk to us<br />directly.</h3>
                <p>
                  No bots, no forms-that-go-nowhere. Call or WhatsApp and one of the
                  brothers will pick up.
                </p>
                <div className="bd-inquire-actions">
                  <a className="btn" href={site.phoneHref}>
                    Call Now <span className="arrow" />
                  </a>
                  <a className="btn btn-ghost" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp <span className="arrow" />
                  </a>
                  <Link className="btn btn-ghost" href="/contact">
                    Send Inquiry <span className="arrow" />
                  </Link>
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
              label="[ Similar Bikes ]"
              heading={"You might also\nlike these."}
              meta="View All"
              metaHref="/bikes"
            />
            <div className="bike-grid">
              {related.map((item) => (
                <BikeCard key={item.slug} bike={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          bikeSchema(bike),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Bikes", path: "/bikes" },
            { name: bike.model, path: `/bikes/${bike.slug}` },
          ]),
        ]}
      />
    </>
  );
}
