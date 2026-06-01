import { PAGE_QUERYResult } from "@/sanity.types";
import { renderHeading } from "@/lib/render-heading";

type ContentOption10Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "content-10" }
>;

const bgClasses: Record<string, string> = {
  cream: "bg-eh-cream",
  white: "bg-white",
  navy: "bg-eh-navy",
};

const headingClasses: Record<string, string> = {
  cream: "text-eh-navy",
  white: "text-eh-navy",
  navy: "text-white",
};

const bodyClasses: Record<string, string> = {
  cream: "text-eh-midGray",
  white: "text-eh-midGray",
  navy: "text-white/65",
};

export default function ContentOption10({
  background = "cream",
  label,
  heading,
  body,
  maxWidth = "760px",
}: ContentOption10Props) {
  const bg = bgClasses[background ?? "cream"] ?? bgClasses.cream;
  const headingColor = headingClasses[background ?? "cream"] ?? headingClasses.cream;
  const bodyColor = bodyClasses[background ?? "cream"] ?? bodyClasses.cream;

  return (
    <section className={`${bg} px-5 md:px-10 lg:px-20 py-[120px]`}>
      <div className="mx-auto text-center" style={{ maxWidth: maxWidth ?? "760px" }}>
        {label && (
          <p className="flex items-center justify-center gap-[10px] font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-5">
            <span className="block w-6 h-px bg-eh-gold shrink-0" />
            {label}
            <span className="block w-6 h-px bg-eh-gold shrink-0" />
          </p>
        )}
        {heading && heading.length > 0 && (
          <h2 className={`font-cormorant font-light leading-[1.15] mb-6 ${headingColor}`}>
            {renderHeading(heading)}
          </h2>
        )}
        {body && (
          <p className={`font-dmSans text-[17px] font-light leading-[1.8] ${bodyColor}`}>
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
