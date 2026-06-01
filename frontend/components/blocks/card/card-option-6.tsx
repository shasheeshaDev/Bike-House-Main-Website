import { PAGE_QUERYResult } from "@/sanity.types";
import { renderHeading } from "@/lib/render-heading";

type CardOption6Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "card-6" }
>;

export default function CardOption6({ label, heading, steps }: CardOption6Props) {
  return (
    <section className="bg-eh-navy px-5 md:px-10 lg:px-20 py-[120px]">
      {label && (
        <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
          <span className="block w-6 h-px bg-eh-gold shrink-0" />
          {label}
        </p>
      )}
      {heading && heading.length > 0 && (
        <h2 className="font-cormorant font-light text-white leading-[1.15] mb-16 [&_em]:italic [&_em]:text-eh-sand">
          {renderHeading(heading)}
        </h2>
      )}

      {steps && steps.length > 0 && (
        <div className={`grid gap-0.5 grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(steps.length, 3)}`}>
          {steps.map((step) => (
            <div
              key={step._key}
              className="relative bg-eh-navyMid px-12 py-14 overflow-hidden hover:bg-[#1a2f50] transition-colors duration-300"
            >
              {/* Large ghost number */}
              <span className="absolute top-6 right-6 font-cormorant text-[96px] font-light text-eh-gold/12 leading-none select-none">
                {step.number}
              </span>
              {step.stepLabel && (
                <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-4">
                  {step.stepLabel}
                </p>
              )}
              {step.title && (
                <h3 className="font-cormorant text-[36px] font-light text-white mb-4 leading-[1.2]">
                  {step.title}
                </h3>
              )}
              {step.body && (
                <p className="font-dmSans text-[14px] font-light text-white/60 leading-[1.7]">
                  {step.body}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
