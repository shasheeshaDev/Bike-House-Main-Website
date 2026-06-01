import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PreFooterCta from "@/components/global/pre-footer-cta";
import {
  fetchSanityPartnerBySlug,
  fetchSanityPartnersStaticParams,
} from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import PortableTextRenderer from "@/components/portable-text-renderer";
import DynamicForm from "@/components/forms/dynamic-form";
import { PARTNERS_SLUGS_QUERYResult } from "@/sanity.types";


export async function generateStaticParams() {
  const slugs: PARTNERS_SLUGS_QUERYResult = await fetchSanityPartnersStaticParams();
  return slugs.map((s) => ({ slug: s.slug?.current }));
}

export default async function PartnerDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const partner = await fetchSanityPartnerBySlug({ slug });
  if (!partner) notFound();

  // Hero image: prefer featuredImage, fall back to thumbnail
  const heroImage = partner.featuredImage ?? partner.image;
  const categoryLabel = partner.category?.title ?? null;

  return (
    <div className="mt-[72px]">

      {/* ── Hero ── */}
      <div className="relative h-[56vh] min-h-[420px] flex items-end px-5 md:px-8 lg:px-20 pb-[72px] overflow-hidden">
        {heroImage?.asset && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlFor(heroImage).url()}
              alt={heroImage.alt ?? partner.name ?? ""}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.92)] via-[rgba(10,22,40,0.40)] to-[rgba(10,22,40,0.15)] z-10" />

        <div className="relative z-20">
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 font-dmSans text-[12px] font-medium tracking-[0.1em] uppercase text-white/60 hover:text-eh-gold mb-5 transition-colors duration-200 no-underline"
          >
            ← All Partners
          </Link>
          {categoryLabel && (
            <p className="flex items-center gap-2.5 font-dmSans text-[9px] font-bold tracking-[0.22em] uppercase text-eh-gold mb-3">
              <span className="block w-4 h-px bg-eh-gold shrink-0" />
              {categoryLabel}
            </p>
          )}
          <h1 className="font-cormorant text-[clamp(44px,5vw,72px)] font-light text-white leading-[1.1]">
            {partner.name}
          </h1>
          {partner.location && (
            <p className="font-dmSans text-[15px] font-light text-white/65 mt-2.5 tracking-[0.05em]">
              {partner.location}
            </p>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <section className="px-5 md:px-10 lg:px-20 py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-20 items-start">

          {/* ── Left ── */}
          <div>
            <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              About This Property
            </p>
            {partner.excerpt && partner.excerpt.length > 0 && (
              <div className="font-dmSans text-[16px] font-light text-eh-midGray leading-[1.8] [&_strong]:font-semibold [&_em]:italic [&_a]:text-eh-gold [&_a:hover]:underline">
                <PortableTextRenderer value={partner.excerpt} />
              </div>
            )}

            {/* Info grid */}
            <div className="grid grid-cols-3 gap-0.5 mt-12">
              {categoryLabel && (
                <div className="bg-eh-cream px-7 py-8">
                  <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-2">
                    Category
                  </p>
                  <p className="font-cormorant text-[20px] font-light text-eh-navy">
                    {categoryLabel}
                  </p>
                </div>
              )}
              {partner.location && (
                <div className="bg-eh-cream px-7 py-8">
                  <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-2">
                    Location
                  </p>
                  <p className="font-cormorant text-[20px] font-light text-eh-navy">
                    {partner.location.split(",")[0]}
                  </p>
                </div>
              )}
              {partner.partnerSince && (
                <div className="bg-eh-cream px-7 py-8">
                  <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-2">
                    Partner Since
                  </p>
                  <p className="font-cormorant text-[20px] font-light text-eh-navy">
                    {partner.partnerSince}
                  </p>
                </div>
              )}
            </div>

            {/* Services provided */}
            {partner.servicesProvided && partner.servicesProvided.length > 0 && (
              <div className="mt-12">
                <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
                  <span className="block w-6 h-px bg-eh-gold shrink-0" />
                  Services We Provide
                </p>
                <ul className="flex flex-col gap-3 list-none p-0 mt-4">
                  {partner.servicesProvided.map((service) => (
                    <li key={service._id} className="flex items-center gap-3">
                      <span className="block w-5 h-px bg-eh-gold shrink-0" />
                      <Link
                        href={`/services/${service.slug?.current ?? "#"}`}
                        className="font-dmSans text-[15px] font-light text-eh-charcoal hover:text-eh-gold transition-colors duration-200 no-underline"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rich body */}
            {partner.body && (
              <div className="prose-eh mt-12">
                <PortableTextRenderer value={partner.body} />
              </div>
            )}
          </div>

          {/* ── Sticky sidebar ── */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">

            {/* Fact Sheet */}
            <div className="bg-eh-navy px-9 py-10">
              <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-3">
                Property Fact Sheet
              </p>
              <h3 className="font-cormorant text-[24px] font-light text-white mb-3 leading-[1.3]">
                Download the full <em className="italic text-eh-sand">fact sheet</em>
              </h3>
              <p className="font-dmSans text-[13px] font-light text-white/60 leading-[1.7] mb-7">
                Get complete property details, room specifications, amenities, rates, and contact information in a single document.
              </p>
              {partner.factSheet?.asset?.url ? (
                <a
                  href={partner.factSheet.asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={partner.factSheet.asset.originalFilename ?? undefined}
                  className="block font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy text-center px-6 py-4 hover:bg-eh-goldLight transition-colors duration-200 no-underline"
                >
                  Download Fact Sheet (PDF)
                </a>
              ) : (
                <>
                  <Link
                    href="/contact"
                    className="block font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy text-center px-6 py-4 hover:bg-eh-goldLight transition-colors duration-200 no-underline"
                  >
                    Request Fact Sheet
                  </Link>
                  <p className="font-dmSans text-[11px] text-white/35 mt-3 text-center">
                    Available on request
                  </p>
                </>
              )}
            </div>

            {/* Book / Enquire */}
            <div className="bg-eh-cream px-9 py-10">
              <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-3">
                Book or Enquire
              </p>
              <h3 className="font-cormorant text-[22px] font-light text-eh-navy mb-5 leading-[1.3]">
                Interested in staying here?
              </h3>

              {/* Website link */}
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-navy text-white text-center px-6 py-4 hover:bg-eh-navyMid transition-colors duration-200 no-underline mb-6"
                >
                  Visit Property Website
                </a>
              )}

              {/* Enquiry form */}
              {partner.enquiryForm?.selectedFormConfig && partner.enquiryForm?.selectedFormSheet ? (
                <DynamicForm
                  formSettings={{
                    selectedFormConfig: partner.enquiryForm.selectedFormConfig as any,
                    selectedFormSheet: partner.enquiryForm.selectedFormSheet as any,
                    uniqKey: `partner-${slug}`,
                  }}
                  hiddenData={{
                    "Partner Page": `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/partners/${slug}`,
                    "Partner Name": partner.name ?? "",
                  }}
                  variant="light"
                />
              ) : (
                <Link
                  href="/contact"
                  className="block font-dmSans text-[12px] font-medium tracking-[0.12em] uppercase bg-transparent text-eh-navy text-center px-6 py-4 border border-eh-navy/20 hover:border-eh-gold hover:text-eh-gold transition-colors duration-200 no-underline"
                >
                  Send an Enquiry
                </Link>
              )}
            </div>

          </div>
        </div>
      </section>
      <PreFooterCta />
    </div>
  );
}
