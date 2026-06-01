import { PAGE_QUERYResult } from "@/sanity.types";
import { renderHeading } from "@/lib/render-heading";

type ContentOption9Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "content-9" }
>;

export default function ContentOption9({ label, heading, items }: ContentOption9Props) {
  const hasHeader = label || (heading && heading.length > 0);

  return (
    <section>
      {hasHeader && (
        <div className="px-5 md:px-10 lg:px-20 pt-20 pb-12 text-center max-w-[700px] mx-auto">
          {label && (
            <p className="flex items-center justify-center gap-3 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              {label}
            </p>
          )}
          {heading && heading.length > 0 && (
            <h2 className="font-cormorant font-light text-eh-navy leading-[1.15] [&_em]:italic [&_em]:text-eh-sand">
              {renderHeading(heading)}
            </h2>
          )}
        </div>
      )}

      {items && items.length > 0 && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(items.length, 4)} gap-0.5`}>
          {items.map((item) => (
            <div
              key={item._key}
              className="group bg-eh-cream px-10 py-14 border-b-[3px] border-transparent hover:border-eh-gold transition-colors duration-300"
            >
              <h4 className="font-cormorant text-[28px] font-light text-eh-navy mb-4 leading-[1.2]">
                {item.title}
              </h4>
              {item.body && (
                <p className="font-dmSans text-[14px] font-light text-eh-midGray leading-[1.7]">
                  {item.body}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
