import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PreFooterCta from "@/components/global/pre-footer-cta";
import {
  fetchSanityServiceBySlug,
  fetchSanityServicesStaticParams,
} from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { SERVICES_SLUGS_QUERYResult } from "@/sanity.types";

export async function generateStaticParams() {
  const slugs: SERVICES_SLUGS_QUERYResult = await fetchSanityServicesStaticParams();
  return slugs.map((s) => ({ slug: s.slug?.current }));
}

export default async function ServiceDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const service = await fetchSanityServiceBySlug({ slug });
  if (!service) notFound();

  const heroImage = service.featuredImage ?? service.image;

  return (
    <div className="mt-[72px]">
      {/* Page hero */}
      <div className="relative h-[50vh] min-h-[380px] flex items-end px-5 md:px-8 lg:px-20 pb-[72px] overflow-hidden">
        {heroImage?.asset && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlFor(heroImage).url()}
              alt={heroImage.alt ?? ""}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.88)] via-[rgba(10,22,40,0.40)] to-[rgba(10,22,40,0.25)] z-10" />
        <div className="relative z-20">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-dmSans text-[12px] font-medium tracking-[0.1em] uppercase text-white/60 hover:text-eh-gold mb-5 transition-colors duration-200 no-underline"
          >
            ← All Services
          </Link>
          {service.number && (
            <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              Service {service.number}
            </p>
          )}
          <h1 className="font-cormorant text-[clamp(40px,5vw,68px)] font-light text-white leading-[1.1] max-w-[700px]">
            {service.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <section className="px-5 md:px-10 lg:px-20 py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-20 items-start">
          <article>
            {service.description && (
              <p className="font-dmSans text-[17px] font-light text-eh-midGray leading-[1.9] mb-12">
                {service.description}
              </p>
            )}
            {service.body && (
              <div className="prose-eh">
                <PortableTextRenderer value={service.body} />
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="sticky top-28 flex flex-col gap-8">
            {service.tags && service.tags.length > 0 && (
              <div className="bg-eh-navy p-9">
                <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-4">
                  What&apos;s Included
                </p>
                <div className="flex flex-col gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag._id} className="font-dmSans text-[13px] font-light text-white/70 py-2.5 border-b border-white/[0.08] last:border-0">
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-eh-cream p-9">
              <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-3">
                Interested in this service?
              </p>
              <h3 className="font-cormorant text-[22px] font-light text-eh-navy mb-4 leading-[1.3]">
                Let&apos;s discuss your property
              </h3>
              <Link
                href="/contact"
                className="block font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy text-center px-6 py-4 hover:bg-eh-goldLight transition-colors duration-200 no-underline"
              >
                Book a Strategy Call
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <PreFooterCta />
    </div>
  );
}
