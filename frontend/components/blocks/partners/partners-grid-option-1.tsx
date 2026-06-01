import Image from "next/image";
import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { renderHeading } from "@/lib/render-heading";

type PartnersGridOption1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "partners-grid-1" }
>;

type Partner = NonNullable<PartnersGridOption1Props["partners"]>[number];

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <Link
      href={`/partners/${partner.slug?.current ?? "#"}`}
      className="group relative overflow-hidden bg-eh-navy block no-underline aspect-[4/3]"
    >
      {partner.image?.asset && (
        <Image
          src={urlFor(partner.image).url()}
          alt={partner.image.alt ?? partner.name ?? ""}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.88)] via-[rgba(10,22,40,0.15)] to-transparent transition-all duration-300 group-hover:from-[rgba(10,22,40,0.96)] group-hover:via-[rgba(10,22,40,0.50)]" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        {partner.category?.title && (
          <p className="flex items-center gap-2 font-dmSans text-[9px] font-bold tracking-[0.22em] uppercase text-eh-gold mb-1.5">
            <span className="block w-4 h-px bg-eh-gold shrink-0" />
            {partner.category.title}
          </p>
        )}
        <p className="font-cormorant text-[22px] font-light text-white leading-[1.2] mb-1">
          {partner.name}
        </p>
        {partner.location && (
          <p className="font-dmSans text-[12px] font-light text-white/55 tracking-[0.05em]">
            {partner.location}
          </p>
        )}
        <div className="flex items-center gap-2 mt-3.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span className="font-dmSans text-[11px] font-semibold tracking-[0.12em] uppercase text-eh-gold">
            View Property
          </span>
          <span className="text-eh-gold text-lg leading-none">→</span>
        </div>
      </div>
    </Link>
  );
}

export default function PartnersGridOption1({
  category,
  label,
  heading,
  body,
  partners,
}: PartnersGridOption1Props) {
  if (!partners || partners.length === 0) return null;

  const isFiltered = !!category;
  const hasHeader = label || (heading && heading.length > 0) || body;

  // Group by category for "all" view
  const grouped = !isFiltered
    ? partners.reduce<Record<string, { title: string; items: Partner[] }>>((acc, p) => {
        const id = p.category?._id ?? "uncategorised";
        const title = p.category?.title ?? "Other";
        if (!acc[id]) acc[id] = { title, items: [] };
        acc[id].items.push(p);
        return acc;
      }, {})
    : null;

  return (
    <div>
      {/* Section header */}
      {hasHeader && (
        <div className="px-5 md:px-10 lg:px-20 pt-[72px] pb-12">
          {label && (
            <p className="flex items-center gap-[10px] font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              {label}
            </p>
          )}
          {heading && heading.length > 0 && (
            <h2 className="font-cormorant font-light text-eh-navy leading-[1.15] mb-4 [&_em]:italic [&_em]:text-eh-sand">
              {renderHeading(heading)}
            </h2>
          )}
          {body && (
            <p className="font-dmSans text-[15px] font-light text-eh-midGray leading-[1.8] max-w-[560px]">
              {body}
            </p>
          )}
        </div>
      )}

      {/* Filtered — single flat grid */}
      {isFiltered && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 px-5 md:px-10 lg:px-20 pb-20">
          {partners.map((p) => <PartnerCard key={p._id} partner={p} />)}
        </div>
      )}

      {/* All — grouped by dynamic category */}
      {!isFiltered && grouped && Object.entries(grouped).map(([id, { title, items }]) => (
        <div key={id}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-black/[0.08] px-5 md:px-10 lg:px-20 pt-[72px] pb-10">
            <h2 className="font-cormorant text-[clamp(36px,4vw,52px)] font-light text-eh-navy leading-[1.1]">
              {title}
            </h2>
            <p className="font-dmSans text-[14px] font-light text-eh-midGray md:text-right mt-3 md:mt-0">
              {items.length} {items.length === 1 ? "property" : "properties"}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 px-5 md:px-10 lg:px-20 pb-20">
            {items.map((p) => <PartnerCard key={p._id} partner={p} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
