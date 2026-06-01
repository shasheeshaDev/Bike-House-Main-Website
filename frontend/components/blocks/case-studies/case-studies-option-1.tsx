import Image from "next/image";
import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type CaseStudiesOption1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "case-studies-1" }
>;

export default function CaseStudiesOption1({
  label,
  heading,
  caseStudies,
}: CaseStudiesOption1Props) {
  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <section className="px-5 md:px-10 lg:px-20 py-[120px]">
      {(label || heading) && (
        <div className="mb-16">
          {label && (
            <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              {label}
            </p>
          )}
          {heading && (
            <h2 className="font-cormorant font-light text-eh-navy leading-[1.15]">
              {heading}
            </h2>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5">
        {caseStudies.map((study) => (
          <Link
            key={study._id}
            href={`/case-studies/${study.slug?.current ?? "#"}`}
            className="group bg-eh-cream hover:bg-background border-b-[3px] border-transparent hover:border-eh-gold transition-all duration-300 p-16 flex flex-col no-underline"
          >
            {study.location && (
              <p className="font-dmSans text-[11px] font-semibold tracking-[0.15em] uppercase text-eh-gold mb-3">
                {study.location}
              </p>
            )}
            <h3 className="font-cormorant text-[32px] font-light text-eh-navy leading-[1.2] mb-6">
              {study.title}
            </h3>
            {study.challenge && (
              <>
                <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-midGray mb-2 mt-5">
                  The Challenge
                </p>
                <p className="font-dmSans text-[14px] font-light text-eh-midGray leading-[1.7]">
                  {study.challenge}
                </p>
              </>
            )}
            {study.results && study.results.length > 0 && (
              <>
                <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-midGray mb-3 mt-6">
                  Results Achieved
                </p>
                <ul className="flex flex-col gap-2 list-none p-0">
                  {study.results.map((result, i) => (
                    <li key={i} className="flex items-center gap-3 font-dmSans text-[13px] font-light text-eh-charcoal">
                      <span className="w-1.5 h-1.5 rounded-full bg-eh-gold shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
