import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";
import { renderHeading } from "@/lib/render-heading";

type CareersListOption1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "careers-list-1" }
>;

export default function CareersListOption1({
  label,
  heading,
  description,
  bottomNote,
  speculativeEmail,
  careers,
}: CareersListOption1Props) {
  return (
    <section className="bg-eh-navy px-5 md:px-10 lg:px-20 py-[120px]">

      {/* Intro */}
      {label && (
        <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
          <span className="block w-6 h-px bg-eh-gold shrink-0" />
          {label}
        </p>
      )}
      {heading && heading.length > 0 && (
        <h2 className="font-cormorant font-light text-white leading-[1.15] mb-4 [&_em]:italic [&_em]:text-eh-sand">
          {renderHeading(heading)}
        </h2>
      )}
      {description && (
        <p className="font-dmSans text-[16px] font-light text-white/65 leading-[1.8] max-w-[600px] mb-12">
          {description}
        </p>
      )}
      {/* default bottom margin when no description */}
      {!description && (heading || label) && <div className="mb-12" />}

      {/* Job rows */}
      {careers && careers.length > 0 ? (
        <div className="flex flex-col gap-0.5">
          {careers.map((career) => (
            <Link
              key={career._id}
              href={`/careers/${career.slug?.current ?? "#"}`}
              className="group flex items-center justify-between bg-white/5 hover:bg-white/[0.09] px-10 py-8 transition-colors duration-200 no-underline"
            >
              <div>
                <p className="font-cormorant text-[24px] font-light text-white mb-2 leading-tight">
                  {career.title}
                </p>
                <div className="flex flex-wrap gap-4">
                  {career.employmentType && (
                    <span className="font-dmSans text-[11px] font-semibold tracking-[0.1em] uppercase text-eh-gold bg-eh-gold/15 px-3 py-1">
                      {career.employmentType}
                    </span>
                  )}
                  {career.location && (
                    <span className="font-dmSans text-[12px] text-white/40">{career.location}</span>
                  )}
                  {career.department && (
                    <span className="font-dmSans text-[12px] text-white/40">{career.department}</span>
                  )}
                </div>
              </div>
              <span className="text-eh-gold text-2xl flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="font-dmSans text-[16px] font-light text-white/50">
          No open positions at the moment. Check back soon.
        </p>
      )}

      {/* Bottom note */}
      {(bottomNote || speculativeEmail) && (
        <div className="mt-8 px-10 py-7 bg-eh-gold/10 border-l-[3px] border-eh-gold">
          <p className="font-dmSans text-[14px] font-light text-white/65 leading-[1.7]">
            {bottomNote ?? "Don't see a role that fits? We welcome speculative applications."}
            {speculativeEmail && (
              <>
                {" "}
                <a href={`mailto:${speculativeEmail}`} className="text-eh-gold hover:underline">
                  {speculativeEmail}
                </a>
              </>
            )}
          </p>
        </div>
      )}

    </section>
  );
}
