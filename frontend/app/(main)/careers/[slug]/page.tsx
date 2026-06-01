import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PreFooterCta from "@/components/global/pre-footer-cta";
import {
  fetchSanityCareerBySlug,
  fetchSanityCareersStaticParams,
} from "@/sanity/lib/fetch";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { urlFor } from "@/sanity/lib/image";
import ColumnBuilderRenderer from "@/components/blocks/shared/column-builder-renderer";
import DynamicForm from "@/components/forms/dynamic-form";
import { CAREERS_SLUGS_QUERYResult } from "@/sanity.types";

export async function generateStaticParams() {
  const slugs: CAREERS_SLUGS_QUERYResult = await fetchSanityCareersStaticParams();
  return slugs.map((s) => ({ slug: s.slug?.current }));
}

export default async function CareerDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const career = await fetchSanityCareerBySlug({ slug });
  if (!career) notFound();

  return (
    <div className="mt-[72px]">

      {/* ── Hero ── */}
      <div className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        {/* Background image */}
        {career.bannerImage?.asset && (
          <Image
            src={urlFor(career.bannerImage).url()}
            alt={career.bannerImage.alt ?? career.title ?? ""}
            fill
            className="object-cover object-center"
            priority
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.92)] via-[rgba(10,22,40,0.40)] to-[rgba(10,22,40,0.20)]" />

        {/* Content */}
        <div className="relative z-10 px-5 md:px-8 lg:px-20 pb-[72px] w-full">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 font-dmSans text-[12px] font-medium tracking-[0.1em] uppercase text-white/60 hover:text-eh-gold mb-5 transition-colors duration-200 no-underline"
          >
            ← All Careers
          </Link>
          {career.department && (
            <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-3">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              {career.department}
            </p>
          )}
          <h1 className="font-cormorant text-[clamp(40px,5vw,68px)] font-light text-white leading-[1.1] max-w-[700px]">
            {career.title}
          </h1>
          <div className="flex flex-wrap gap-4 mt-4">
            {career.employmentType && (
              <span className="font-dmSans text-[12px] font-semibold tracking-[0.1em] uppercase text-eh-gold bg-eh-gold/15 px-4 py-1.5">
                {career.employmentType}
              </span>
            )}
            {career.location && (
              <span className="font-dmSans text-[12px] font-medium uppercase text-white/60">
                📍 {career.location}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <section className="px-5 md:px-10 lg:px-20 py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-20 items-start">

          <article>
            {/* About the Role — hardcoded eyebrow */}
            <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-5">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              About the Role
            </p>

            {/* Intro — WYSIWYG */}
            {career.intro && career.intro.length > 0 && (
              <div className="font-dmSans text-[16px] font-light text-eh-midGray leading-[1.9] mb-12 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_em]:italic [&_a]:text-eh-gold [&_a:hover]:underline">
                <PortableTextRenderer value={career.intro} />
              </div>
            )}

            {/* What You'll Do */}
            {career.responsibilities && career.responsibilities.length > 0 && (
              <div className="mb-12">
                <h3 className="font-cormorant text-[28px] font-light text-eh-navy mb-5">
                  What you&apos;ll do
                </h3>
                <ul className="flex flex-col gap-3 list-none p-0">
                  {career.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-center gap-3 font-dmSans text-[15px] font-light text-eh-charcoal">
                      <span className="block w-5 h-px bg-eh-gold shrink-0" />{r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What We're Looking For */}
            {career.requirements && career.requirements.length > 0 && (
              <div className="mb-12">
                <h3 className="font-cormorant text-[28px] font-light text-eh-navy mb-5">
                  What we&apos;re looking for
                </h3>
                <ul className="flex flex-col gap-3 list-none p-0">
                  {career.requirements.map((r, i) => (
                    <li key={i} className="flex items-center gap-3 font-dmSans text-[15px] font-light text-eh-charcoal">
                      <span className="block w-5 h-px bg-eh-gold shrink-0" />{r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nice to Have */}
            {career.niceToHave && career.niceToHave.length > 0 && (
              <div className="bg-eh-cream px-12 py-10 mb-12">
                <h3 className="font-cormorant text-[24px] font-light text-eh-navy mb-4">
                  Nice to have
                </h3>
                <ul className="flex flex-col gap-3 list-none p-0">
                  {career.niceToHave.map((r, i) => (
                    <li key={i} className="flex items-center gap-3 font-dmSans text-[14px] font-light text-eh-charcoal">
                      <span className="block w-5 h-px bg-eh-gold shrink-0" />{r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What We Offer */}
            {career.benefits && career.benefits.length > 0 && (
              <div className="mb-12">
                <h3 className="font-cormorant text-[28px] font-light text-eh-navy mb-6">
                  What we offer
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
                  {career.benefits.map((benefit) => (
                    <div key={benefit._key} className="bg-eh-cream px-8 py-7">
                      <p className="font-dmSans text-[10px] font-bold tracking-[0.15em] uppercase text-eh-gold mb-2">
                        {benefit.title}
                      </p>
                      <p className="font-dmSans text-[14px] font-light text-eh-charcoal leading-[1.6]">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About Elevate Hospitality — column-builder note */}
            {career.specialNote && career.specialNote.length > 0 && (
              <div className="bg-eh-navy px-12 py-10 [&_.font-cormorant]:text-white [&_.font-dmSans]:text-white/70 [&_.text-eh-navy]:text-white [&_.text-eh-midGray]:text-white/65 [&_.text-eh-charcoal]:text-white/70">
                <ColumnBuilderRenderer blocks={career.specialNote as any} />
              </div>
            )}
          </article>

          {/* ── Sticky sidebar ── */}
          <aside className="sticky top-28 flex flex-col gap-6">
            <div className="bg-eh-navy p-9">
              <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-3">
                Apply Now
              </p>
              <h3 className="font-cormorant text-[22px] font-light text-white mb-6 leading-[1.3]">
                Interested in this role?
              </h3>

              {career.enquiryForm?.selectedFormConfig && career.enquiryForm?.selectedFormSheet ? (
                <DynamicForm
                  formSettings={{
                    selectedFormConfig: career.enquiryForm.selectedFormConfig as any,
                    selectedFormSheet: career.enquiryForm.selectedFormSheet as any,
                    uniqKey: `career-${slug}`,
                  }}
                  hiddenData={{
                    "Role": career.title ?? "",
                    "Career Page": `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/careers/${slug}`,
                  }}
                  variant="dark"
                />
              ) : (
                <>
                  <a
                    href={`mailto:careers@elevatehospitality.com?subject=Application: ${career.title}`}
                    className="block font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy text-center px-6 py-4 hover:bg-eh-goldLight transition-colors duration-200 no-underline mb-4"
                  >
                    Apply via Email
                  </a>
                  <p className="font-dmSans text-[12px] font-light text-white/40 text-center leading-[1.6]">
                    Send your CV and a short introduction to careers@elevatehospitality.com
                  </p>
                </>
              )}
            </div>
          </aside>

        </div>
      </section>

      <PreFooterCta />
    </div>
  );
}
