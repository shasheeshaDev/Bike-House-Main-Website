import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBanner from "@/components/cta-banner";
import Icon from "@/components/icon";
import JsonLd from "@/components/json-ld";
import PageHero from "@/components/page-hero";
import RichBody from "@/components/rich-body";
import SectionHead from "@/components/section-head";
import ServiceCard from "@/components/service-card";
import { getService, getServices } from "@/lib/data";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};

  return pageMetadata(parent, {
    title: service.title,
    description: service.intro ?? service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const others = (await getServices()).filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        heading={service.title}
        lead={service.intro ?? service.description}
      />

      <section className="section">
        <div className="container">
          <div className="bd-more" data-reveal-group>
            <div>
              <span className="kicker">What&apos;s involved</span>
              <h2 className="h2">{service.title}.</h2>
              {service.body ? (
                <div className="prose">
                  <RichBody value={service.body} />
                </div>
              ) : (
                <p className="bd-desc">{service.description}</p>
              )}

              {service.includes && service.includes.length > 0 && (
                <>
                  <hr className="hr" />
                  <div className="bd-included-title">What&apos;s included</div>
                  <ul className="bd-features">
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <aside>
              <div className="bd-inquire">
                <span className="ico-lg">
                  <Icon name={service.icon} className="size-8" />
                </span>
                <h3 className="h3">Book this<br />service.</h3>
                <p>
                  Tell us the symptoms and what you ride — we&apos;ll quote before
                  any work starts.
                </p>
                <div className="bd-inquire-actions">
                  <Link className="btn" href="/contact">
                    Book a Service <span className="arrow" />
                  </Link>
                  <a className="btn btn-ghost" href={site.phoneHref}>
                    Call Workshop <span className="arrow" />
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

      {others.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHead
              label="[ Other Services ]"
              heading={"Everything else\nwe do."}
              meta="All Services"
              metaHref="/services"
            />
            <div className="services-grid" data-reveal-group>
              {others.map((item) => (
                <ServiceCard key={item.slug} service={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        kicker="Ready when you are"
        heading={"Drop your bike\noff this week."}
        actions={[
          { label: "Book a Service", href: "/contact" },
          { label: "WhatsApp Us", href: site.whatsapp, variant: "ghost", external: true },
        ]}
      />

      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
