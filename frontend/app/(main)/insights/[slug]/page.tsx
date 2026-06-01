import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PreFooterCta from "@/components/global/pre-footer-cta";
import {
  fetchSanityInsightBySlug,
  fetchSanityInsightsStaticParams,
} from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { INSIGHTS_SLUGS_QUERYResult } from "@/sanity.types";

export async function generateStaticParams() {
  const slugs: INSIGHTS_SLUGS_QUERYResult = await fetchSanityInsightsStaticParams();
  return slugs.map((s) => ({ slug: s.slug?.current }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default async function InsightDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const insight = await fetchSanityInsightBySlug({ slug });
  if (!insight) notFound();

  return (
    <div className="mt-[72px]">

      {/* ── Hero ── */}
      <div className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        {insight.image?.asset && (
          <Image
            src={urlFor(insight.image).url()}
            alt={insight.image.alt ?? ""}
            fill
            className="object-cover object-center"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.88)] via-[rgba(10,22,40,0.40)] to-[rgba(10,22,40,0.25)]" />

        <div className="relative z-10 px-5 md:px-8 lg:px-20 pb-[72px] max-w-[860px]">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-dmSans text-[12px] font-medium tracking-[0.1em] uppercase text-white/60 hover:text-eh-gold mb-5 transition-colors duration-200 no-underline"
          >
            ← All Insights
          </Link>
          {insight.category?.title && (
            <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-3">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              {insight.category.title}
            </p>
          )}
          <h1 className="font-cormorant text-[clamp(36px,4vw,60px)] font-light text-white leading-[1.15]">
            {insight.title}
          </h1>
          {insight.publishedAt && (
            <p className="font-dmSans text-[13px] text-white/50 mt-3.5 tracking-[0.05em]">
              {formatDate(insight.publishedAt)}
              {insight.estimatedReadingTime ? ` · ${insight.estimatedReadingTime} min read` : ""}
            </p>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <section className="px-5 md:px-10 lg:px-20 py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-20 items-start">

          {/* Article */}
          <article>
            {/* Excerpt / intro */}
            {insight.excerpt && (
              <p className="font-dmSans text-[17px] font-light text-eh-midGray leading-[1.9] mb-8">
                {insight.excerpt}
              </p>
            )}

            {/* Body — EH prose styles via parent selectors */}
            {insight.body && (
              <div className="
                [&_p]:font-dmSans [&_p]:text-[16px] [&_p]:font-light [&_p]:text-eh-midGray [&_p]:leading-[1.9] [&_p]:mb-6 [&_p:last-child]:mb-0
                [&_h2]:font-cormorant [&_h2]:text-[32px] [&_h2]:font-light [&_h2]:text-eh-navy [&_h2]:leading-[1.2] [&_h2]:mb-4 [&_h2]:mt-12
                [&_h3]:font-cormorant [&_h3]:text-[28px] [&_h3]:font-light [&_h3]:text-eh-navy [&_h3]:leading-[1.2] [&_h3]:mb-4 [&_h3]:mt-10
                [&_h4]:font-cormorant [&_h4]:text-[24px] [&_h4]:font-light [&_h4]:text-eh-navy [&_h4]:mb-3 [&_h4]:mt-8
                [&_strong]:font-semibold [&_em]:italic
                [&_a]:text-eh-gold [&_a:hover]:underline
              ">
                <PortableTextRenderer value={insight.body} />
              </div>
            )}

            {/* End CTA */}
            <div className="bg-eh-cream px-12 py-10 mt-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-2">
                  Want to apply this to your property?
                </p>
                <h3 className="font-cormorant text-[26px] font-light text-eh-navy">
                  Let&apos;s discuss your commercial strategy
                </h3>
              </div>
              <Link
                href="/contact"
                className="shrink-0 font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy px-9 py-4 hover:bg-eh-goldLight transition-colors duration-200 no-underline"
              >
                Book a Strategy Call
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="sticky top-28 flex flex-col gap-8">

            {/* Related Topics — navy */}
            {insight.relatedCategories && insight.relatedCategories.length > 0 && (
              <div className="bg-eh-navy px-8 py-9">
                <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-4">
                  Related Topics
                </p>
                <div className="flex flex-col">
                  {insight.relatedCategories.map((cat, i) => (
                    <Link
                      key={cat._id}
                      href="/insights"
                      className={`font-dmSans text-[14px] font-light text-white/70 hover:text-eh-gold py-[10px] transition-colors duration-200 no-underline ${
                        i < insight.relatedCategories!.length - 1
                          ? "border-b border-white/[0.08]"
                          : ""
                      }`}
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Our Services — cream */}
            <div className="bg-eh-cream px-8 py-9">
              <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-3">
                Our Services
              </p>
              <p className="font-dmSans text-[13px] font-light text-eh-midGray leading-[1.7] mb-5">
                We implement revenue management strategies that deliver measurable results for hotels and resorts.
              </p>
              <Link
                href="/services"
                className="block font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy text-center px-6 py-4 hover:bg-eh-goldLight transition-colors duration-200 no-underline"
              >
                View All Services
              </Link>
            </div>

          </aside>
        </div>
      </section>

      <PreFooterCta />
    </div>
  );
}
