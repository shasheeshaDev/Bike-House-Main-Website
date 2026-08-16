import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import CtaBanner from "@/components/cta-banner";
import Icon from "@/components/icon";
import PageHero from "@/components/page-hero";
import SectionHead from "@/components/section-head";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const DESCRIPTION =
  "Two brothers, one workshop, eleven years on the road. How Bike House became Sri Lanka's specialist garage for high-capacity motorcycles.";

const MILESTONES = [
  ["2014", "Founding", "First bay opens on the Horana road. Tools borrowed, ambition not."],
  ["2017", "Expansion", "Second bay. First ECU diagnostic tablet. Ducati Hypermotard becomes the unofficial workshop bike."],
  ["2020", "Certified", "Becomes a Yamaha and KTM authorised service partner. Dyno installed for proper tuning work."],
  ["2023", "Mural", "Workshop expands to current footprint. Mural painted. We finally have a couch in the waiting area."],
  ["2026", "Next", "Marketplace launches. Performance parts catalogue goes live. Track-prep service in beta."],
];

const FOUNDERS = [
  {
    initials: "SC",
    name: ["Supun", "Chaturanga"],
    role: "Co-Founder · Head of Workshop",
    bio: "The hands-on half. Started turning wrenches at 14 in his father's repair shed. Trained as a mechanical engineer, came back to bikes because nothing else felt right. Personal ride: BMW S1000RR.",
    highlights: ["Engine rebuilds & performance tuning", "Dyno calibration", "12+ years on superbikes"],
  },
  {
    initials: "KC",
    name: ["Kasun", "Chaturanga"],
    role: "Co-Founder · Operations",
    bio: "The one who answers the phone, sources the parts and keeps the quotes honest. Built the supplier network that lets us get an Öhlins shock in three weeks instead of three months. Personal ride: Ducati Hypermotard.",
    highlights: ["Parts sourcing & supplier network", "Customer relations", "Marketplace & valuations"],
  },
];

const VALUES = [
  ["receipt", "Itemised, always", "You see labour, parts and lead time before we touch a bolt. No surprise invoices, ever."],
  ["check", "Genuine parts only", "Direct from brand. We'd rather lose the job than fit a counterfeit brake line."],
  ["cpu", "Diagnose, don't guess", "ECU scan and test ride before a quote. Replacing parts until it works is not a method."],
  ["heart", "We ride what we service", "Every mechanic here owns a bike. Your machine gets treated the way we treat ours."],
];

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  return pageMetadata(parent, {
    title: "About Bike House",
    description: DESCRIPTION,
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        heading="About"
        accent="Bike House."
        lead="A single bay on the Horana road in 2014. Today, the workshop Sri Lanka's superbike owners drive past three closer garages to reach."
      />

      <section className="section">
        <div className="container">
          <div className="about" data-reveal-group>
            <div className="about-img">
              <Image src="/img/diagnostic-work.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
            <div>
              <span className="kicker">The Beginning</span>
              <h2 className="h2">
                From one bench<br />to a regional landmark.
              </h2>
              <p className="lead">
                We opened with borrowed tools and one lift. The first month we serviced
                four bikes. Last month we serviced two hundred and thirty.
              </p>
              <p className="about-body">
                What changed wasn&apos;t the ambition — it was the trust. Riders talk.
                One properly-diagnosed electrical fault turns into five referrals, and
                five turns into a reputation you can&apos;t buy.
              </p>
              <div className="about-tags">
                {["Independent", "Owner-Operated", "Certified", "Dyno-Equipped"].map((t) => (
                  <span className="chip" key={t}>{t}</span>
                ))}
              </div>
              <dl className="about-stats">
                <div><dd className="num">11</dd><dt className="lbl">Years</dt></div>
                <div><dd className="num">2,400+</dd><dt className="lbl">Bikes Serviced</dt></div>
                <div><dd className="num">98%</dd><dt className="lbl">Return Rate</dt></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead
            label="[ Milestones ]"
            heading="Eleven years on the road."
            meta="2014 → Today"
          />
          <ol className="timeline-grid" data-reveal-group>
            {MILESTONES.map(([year, label, body]) => (
              <li key={year}>
                <div className="year">{year}</div>
                <div className="spec-line">{label}</div>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            label="[ The Brothers ]"
            heading={"Two brothers.\nOne workshop."}
            meta="Founders · Operators · Mechanics"
          />
          <div className="founders-grid" data-reveal-group>
            {FOUNDERS.map((person, i) => (
              <article className="founder" key={person.initials}>
                <div className="founder-panel">
                  <div className="initials" aria-hidden="true">
                    {person.initials.split("").map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                  <span className="tagline">
                    {String(i + 1).padStart(2, "0")} / Co-Founder
                  </span>
                </div>
                <div className="founder-body">
                  <div className="spec-line red">{person.role}</div>
                  <h3 className="h3">
                    {person.name[0]}
                    <br />
                    {person.name[1]}
                  </h3>
                  <p>{person.bio}</p>
                  <ul>
                    {person.highlights.map((h) => (
                      <li className="spec-line" key={h}>▸ {h}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead label="[ What We Stand For ]" heading="Four non-negotiables." />
          <div className="feature-grid" data-reveal-group>
            {VALUES.map(([icon, title, body]) => (
              <div className="feature" key={title}>
                <span className="ico">
                  <Icon name={icon} className="size-11" />
                </span>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        kicker="Come say hello"
        heading={"Come walk through\nthe workshop."}
        body="No appointment needed for a look around. Mon–Sat, 08:30–19:00. There's coffee and usually a project bike in pieces."
        actions={[
          { label: "Get Directions", href: "/contact" },
          { label: "Call Workshop", href: site.phoneHref, variant: "ghost", external: true },
        ]}
      />
    </>
  );
}
