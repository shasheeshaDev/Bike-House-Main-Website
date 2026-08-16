import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BikeCard from "@/components/bike-card";
import CtaBanner from "@/components/cta-banner";
import Icon from "@/components/icon";
import JsonLd from "@/components/json-ld";
import Marquee from "@/components/marquee";
import PostCard from "@/components/post-card";
import ProductCard from "@/components/product-card";
import SectionHead from "@/components/section-head";
import ServiceCard from "@/components/service-card";
import TestimonialCard from "@/components/testimonial-card";
import { getBikesForSale, getPosts, getProducts, getServices, getTestimonials } from "@/lib/data";
import { pageMetadata, reviewSchema } from "@/lib/seo";
import { site } from "@/lib/site";

// Home carries the root default <title> verbatim, so it opts out of the
// `%s — Bike House` template rather than repeating the name.
export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  return pageMetadata(parent, {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    path: "/",
    absoluteTitle: true,
  });
}

const whyUs = [
  { icon: "check", title: "Certified Mechanics", body: "Yamaha, Honda and KTM trained technicians. We treat your bike like our own — because most of us own one too." },
  { icon: "star", title: "Genuine Parts Only", body: "Direct supply from BMW, Ducati, KTM, Yamaha, Honda, Kawasaki and Brembo, Öhlins, Akrapovič, Pirelli, Michelin." },
  { icon: "gauge", title: "Performance Expertise", body: "Track-experienced setup. We've prepped bikes for time trials, hill climbs and amateur road race events." },
  { icon: "tools", title: "Modern Diagnostic Tools", body: "OEM-grade tablet diagnostics, dyno-validated tuning rigs, hot-wire balancing and laser wheel alignment." },
  { icon: "receipt", title: "Transparent Pricing", body: "Itemised quotes before we touch a bolt. Photo updates on long jobs. No surprise invoices, ever." },
  { icon: "heart", title: "Trusted by Owners", body: "Workshop of choice for Sri Lanka's superbike clubs and touring groups. Word-of-mouth has built our entire reputation." },
];

export default async function HomePage() {
  const [services, bikes, products, testimonials, posts] = await Promise.all([
    getServices(),
    getBikesForSale(),
    getProducts(),
    getTestimonials(),
    getPosts(),
  ]);

  const featuredBikes = bikes.filter((b) => b.featured);
  const homeBikes = (featuredBikes.length ? featuredBikes : bikes).slice(0, 3);
  const featuredProducts = products.filter((p) => p.featured);
  const homeProducts = (featuredProducts.length ? featuredProducts : products).slice(0, 4);
  const homeReviews = testimonials.filter((t) => t.featured !== false).slice(0, 3);
  const homePosts = posts.slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg">
          <video autoPlay muted loop playsInline poster="/img/mural-rider.jpg">
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container hero-content">
          <div className="hero-badges">
            <span className="chip chip-red chip-dot">Open Now · Mon–Sat 08:30</span>
            <span className="eyebrow">Piliyandala / Sri Lanka</span>
          </div>

          <h1 className="hero-display">
            Built for<br />
            <span className="stroke">the open</span><br />
            <span className="red">road.</span>
          </h1>

          <p className="hero-tagline">
            A specialist garage for superbikes, supermotos and high-capacity touring
            machines. Diagnostics, performance tuning, and the kind of hands-on craft
            your bike actually deserves.
          </p>

          <div className="hero-ctas">
            <Link className="btn" href="/contact">
              Book a Service <span className="arrow" />
            </Link>
            <Link className="btn btn-ghost" href="/bikes">
              Explore Bikes <span className="arrow" />
            </Link>
            <a className="btn btn-ghost" href={site.phoneHref}>
              <Icon name="phone" className="size-3.5" strokeWidth={2} /> Call Now
            </a>
          </div>
        </div>

        <div className="container hero-footer">
          <dl className="hero-stats">
            <div>
              <dd className="num">11+</dd>
              <dt className="lbl">Years Operating</dt>
            </div>
            <div>
              <dd className="num">2.4K</dd>
              <dt className="lbl">Bikes Serviced</dt>
            </div>
            <div>
              <dd className="num">6</dd>
              <dt className="lbl">Brands Certified</dt>
            </div>
          </dl>
          <div className="hero-meta">
            <span className="live">Live</span>
            <span>BH–001 · Workshop</span>
            <span>06.842°N / 79.923°E</span>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ── About ── */}
      <section className="section">
        <div className="container">
          <div className="about">
            <div className="about-img">
              <Image src="/img/diagnostic-work.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
            <div>
              <span className="kicker">Our Workshop</span>
              <h2 className="h2">
                A garage built<br />by riders, for riders.
              </h2>
              <p className="lead">
                Bike House started in 2014 as a single-bay workshop on the Horana road.
                A decade on, we&apos;re Sri Lanka&apos;s go-to specialist for high-capacity
                machines — and we still answer the phone ourselves.
              </p>
              <p className="about-body">
                From Panigale valve services to MT-09 ECU flashes, from accident rebuilds
                to custom supermoto conversions, we work on bikes most workshops politely
                refuse. Every job is documented, every customer is on a first-name basis,
                and every bike leaves better than it came in.
              </p>
              <div className="about-tags">
                {["Superbikes", "Touring", "Supermoto", "Adventure", "Café Racers"].map((t) => (
                  <span className="chip" key={t}>{t}</span>
                ))}
              </div>
              <dl className="about-stats">
                <div><dd className="num">11</dd><dt className="lbl">Years</dt></div>
                <div><dd className="num">2,400+</dd><dt className="lbl">Bikes Serviced</dt></div>
                <div><dd className="num">98%</dd><dt className="lbl">Return Rate</dt></div>
              </dl>
              <div className="about-cta">
                <Link className="btn btn-ghost" href="/about">
                  The Full Story <span className="arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            label="[ 03 / Capabilities ]"
            heading={"Everything your\nbike will ever need."}
            meta={`${services.length} Service Lines · Indoors · Insured`}
          />
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="section-foot">
            <Link className="btn btn-ghost" href="/services">
              View All Services <span className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bikes ── */}
      {homeBikes.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead
              label="[ 04 / Marketplace ]"
              heading={"Bikes on the floor\nright now."}
              meta="View All"
              metaHref="/bikes"
            />
            <div className="bike-grid">
              {homeBikes.map((bike) => (
                <BikeCard key={bike.slug} bike={bike} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Why us ── */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            label="[ 05 / Why Bike House ]"
            heading={"Riders don't\ncome back by accident."}
            meta="Six reasons we earn the loyalty"
          />
          <div className="feature-grid">
            {whyUs.map((f) => (
              <div className="feature" key={f.title}>
                <span className="ico">
                  <Icon name={f.icon} className="size-11" />
                </span>
                <h4>{f.title}</h4>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop ── */}
      {homeProducts.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead
              label="[ 06 / Parts & Gear ]"
              heading={"Premium parts,\ngenuine fitment."}
              meta="Full Catalogue"
              metaHref="/shop"
            />
            <div className="shop-grid">
              {homeProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
            <p className="shop-note">
              All purchases via phone inquiry · Call{" "}
              <a href={site.phoneHref} className="red">{site.phone}</a>
            </p>
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      {homeReviews.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHead
              label="[ 07 / Word of Mouth ]"
              heading={"What riders say\nwhen we're not in the room."}
              meta="5.0 · Verified Owners"
            />
            <div className="testimonial-grid">
              {homeReviews.map((item) => (
                <TestimonialCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
          <JsonLd data={reviewSchema(homeReviews)} />
        </section>
      )}

      {/* ── Journal ── */}
      {homePosts.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead
              label="[ 08 / Journal ]"
              heading={"From the workshop\nfloor."}
              meta="All Articles"
              metaHref="/blog"
            />
            <div className="blog-grid">
              {homePosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        kicker="Ready when you are"
        heading={"Drop your bike\noff this week."}
        body="Walk-in diagnostics. Same-day quotes on most jobs. Workshop slots fill quickly — book ahead to avoid the queue."
        actions={[
          { label: "Book a Service", href: "/contact" },
          { label: "WhatsApp Us", href: site.whatsapp, variant: "ghost", external: true },
        ]}
      />
    </>
  );
}
