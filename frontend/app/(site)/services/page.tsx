import type { Metadata, ResolvingMetadata } from "next";
import CtaBanner from "@/components/cta-banner";
import JsonLd from "@/components/json-ld";
import PageHero from "@/components/page-hero";
import SectionHead from "@/components/section-head";
import ServiceCard from "@/components/service-card";
import { getServices } from "@/lib/data";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const DESCRIPTION =
  "Engine repairs, performance tuning, ECU diagnostics, suspension, custom modifications and accident repair for high-capacity motorcycles in Piliyandala.";

const PROCESS = [
  ["Drop-Off & Brief", "You describe symptoms. We ask questions. No assumptions."],
  ["Diagnose", "ECU scan, visual inspection, test ride. We confirm before we touch anything."],
  ["Itemised Quote", "Labour, parts, lead time. You approve before work starts."],
  ["Repair & Test", "Work + test ride + final inspection. Photos at major stages."],
  ["Handover", "Walkthrough of what we did. 30-day workmanship guarantee on every job."],
];

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  return pageMetadata(parent, {
    title: "Workshop Services",
    description: DESCRIPTION,
    path: "/services",
  });
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        heading="What we"
        accent="do best."
        lead="Eight service lines, one workshop, and the diagnostic equipment most independents don't invest in. If it has more than 400cc, we've probably had it on the lift."
      />

      <section className="section">
        <div className="container">
          <div className="services-grid" data-reveal-group>
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead
            label="[ How We Work ]"
            heading={"A bike comes in.\nThis is what happens."}
          />
          <ol className="process-grid" data-reveal-group>
            {PROCESS.map(([title, body], i) => (
              <li className="card process-step" key={title}>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h4 className="h4">{title}</h4>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner
        kicker="Book ahead"
        heading={"Slot your bike in\nthis week."}
        body="Most jobs are quoted same-day. Bring it in, or call and we'll tell you what to expect before you ride over."
        actions={[
          { label: "Book a Service", href: "/contact" },
          { label: "WhatsApp Us", href: site.whatsapp, variant: "ghost", external: true },
        ]}
      />

      <JsonLd data={services.map(serviceSchema)} />
    </>
  );
}
