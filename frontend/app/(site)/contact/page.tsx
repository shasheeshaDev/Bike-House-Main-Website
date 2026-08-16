import type { Metadata, ResolvingMetadata } from "next";
import Icon from "@/components/icon";
import PageHero from "@/components/page-hero";
import SectionHead from "@/components/section-head";
import ContactForm from "./contact-form";
import { getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { mapEmbedUrl, site } from "@/lib/site";

const DESCRIPTION =
  "Book a service, ask about a bike, or find the workshop. No. 42 Horana Road, Piliyandala. Mon–Sat 08:30–19:00.";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  return pageMetadata(parent, {
    title: "Contact & Book a Service",
    description: DESCRIPTION,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const services = await getServices();

  const blocks = [
    { icon: "phone", label: "Workshop Phone", value: site.phone, note: "Fastest way to get a quote. Mon–Sat 08:30–19:00.", href: site.phoneHref },
    { icon: "chat", label: "WhatsApp", value: site.phone, note: "Send photos of damage or part numbers. Replies within a few hours.", href: site.whatsapp },
    { icon: "mail", label: "Email", value: site.email, note: "For larger inquiries, sponsorship, fleet contracts.", href: site.emailHref },
    { icon: "pin", label: "Workshop Address", value: site.address.plain, note: "Free parking. Bring your bike — we'll come out." },
    { icon: "clock", label: "Opening Hours", value: `${site.hours[0]} · ${site.hours[1]}`, note: "Closed Sundays. Public holidays vary — call ahead." },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        heading="Get in"
        accent="touch."
        lead="Booking a service, asking about a bike on the floor, or chasing a part — the fastest route is the phone. The form works too."
      />

      <section className="section" id="book">
        <div className="container">
          <div className="contact-grid" data-reveal-group>
            <div>
              <span className="kicker">Book a service</span>
              <h2 className="h2">
                Tell us about<br />your bike.
              </h2>
              <ContactForm services={services.map((s) => s.title)} />
            </div>

            <aside className="contact-info-grid" data-reveal-group>
              {blocks.map((block) => {
                const Wrapper = block.href ? "a" : "div";
                const external = block.href?.startsWith("http");
                return (
                  <Wrapper
                    key={block.label}
                    className="info-block"
                    {...(block.href
                      ? {
                          href: block.href,
                          ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
                        }
                      : {})}
                  >
                    <span className="ico">
                      <Icon name={block.icon} className="size-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <h5>{block.label}</h5>
                      <div className="v">{block.value}</div>
                      <p>{block.note}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </aside>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <SectionHead label="[ Find Us ]" heading="Just off Horana Road." />
          <div className="map-frame" data-reveal>
            <iframe
              src={mapEmbedUrl()}
              title="Workshop location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
