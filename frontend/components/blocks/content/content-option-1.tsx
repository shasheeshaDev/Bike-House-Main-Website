import { PAGE_QUERYResult } from "@/sanity.types";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { renderHeading } from "@/lib/render-heading";

type ContentOption1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "content-1" }
>;

const ContentOption1 = ({ eyebrowHeading, heading, description }: ContentOption1Props) => {
  return (
    <section className="px-5 md:px-10 lg:px-20 py-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left — eyebrow + heading */}
        <div>
          {eyebrowHeading && (
            <p className="flex items-center gap-[10px] font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-5">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              {eyebrowHeading}
            </p>
          )}
          {heading && heading.length > 0 && (
            <h2 className="font-cormorant font-light text-eh-navy leading-[1.15] [&_em]:italic [&_em]:text-eh-sand">
              {renderHeading(heading)}
            </h2>
          )}
        </div>

        {/* Right — rich text */}
        {description && (
          <div className="font-dmSans text-[16px] font-light text-eh-midGray leading-[1.8] [&_p]:mb-5 [&_p:last-child]:mb-0">
            <PortableTextRenderer value={description} />
          </div>
        )}

      </div>
    </section>
  );
};

export default ContentOption1;
