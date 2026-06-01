import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PreFooterCta from "@/components/global/pre-footer-cta";
import {
  fetchSanityCaseStudyBySlug,
  fetchSanityCaseStudiesStaticParams,
} from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { CASE_STUDIES_SLUGS_QUERYResult } from "@/sanity.types";

export async function generateStaticParams() {
  const slugs: CASE_STUDIES_SLUGS_QUERYResult = await fetchSanityCaseStudiesStaticParams();
  return slugs.map((s) => ({ slug: s.slug?.current }));
}

export default async function CaseStudyDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const study = await fetchSanityCaseStudyBySlug({ slug });
  if (!study) notFound();

  return (
    <div className="mt-[72px]">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[380px] flex items-end px-5 md:px-8 lg:px-20 pb-[72px] overflow-hidden">
        {study.image?.asset && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlFor(study.image).url()}
              alt={study.image.alt ?? ""}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.88)] via-[rgba(10,22,40,0.40)] to-[rgba(10,22,40,0.25)] z-10" />
        <div className="relative z-20">
          <Link href="/case-studies" className="inline-flex items-center gap-2 font-dmSans text-[12px] font-medium tracking-[0.1em] uppercase text-white/60 hover:text-eh-gold mb-5 transition-colors duration-200 no-underline">
            ← Case Studies
          </Link>
          {study.location && (
            <p className="font-dmSans text-[11px] font-semibold tracking-[0.15em] uppercase text-eh-gold mb-3">{study.location}</p>
          )}
          <h1 className="font-cormorant text-[clamp(40px,5vw,68px)] font-light text-white leading-[1.1]">
            {study.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <section className="px-5 md:px-10 lg:px-20 py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-20 items-start">
          <article>
            {study.challenge && (
              <div className="mb-12">
                <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-4 flex items-center gap-2.5">
                  <span className="block w-6 h-px bg-eh-gold shrink-0" />The Challenge
                </p>
                <p className="font-dmSans text-[17px] font-light text-eh-midGray leading-[1.9]">{study.challenge}</p>
              </div>
            )}
            {study.strategy && (
              <div className="mb-12">
                <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-4 flex items-center gap-2.5">
                  <span className="block w-6 h-px bg-eh-gold shrink-0" />The Strategy
                </p>
                <p className="font-dmSans text-[17px] font-light text-eh-midGray leading-[1.9]">{study.strategy}</p>
              </div>
            )}
            {study.body && (
              <div className="prose-eh">
                <PortableTextRenderer value={study.body} />
              </div>
            )}
          </article>

          <aside className="sticky top-28">
            {study.results && study.results.length > 0 && (
              <div className="bg-eh-navy p-9">
                <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-5">Results Achieved</p>
                <ul className="flex flex-col gap-3 list-none p-0">
                  {study.results.map((result, i) => (
                    <li key={i} className="flex items-center gap-3 font-dmSans text-[13px] font-light text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-eh-gold shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block mt-8 font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy text-center px-6 py-4 hover:bg-eh-goldLight transition-colors duration-200 no-underline">
                  Get Similar Results
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>
      <PreFooterCta />
    </div>
  );
}
