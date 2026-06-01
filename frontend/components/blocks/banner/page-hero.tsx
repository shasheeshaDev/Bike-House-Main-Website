import Image from "next/image";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { renderHeading } from "@/lib/render-heading";

type PageHeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "banner-3" }
>;

export default function PageHero({
  label,
  heading,
  description,
  backgroundImage,
}: PageHeroProps) {
  return (
    <div className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden mt-[72px]">
      {/* Background image */}
      {backgroundImage?.asset && (
        <Image
          src={urlFor(backgroundImage).url()}
          alt={backgroundImage.alt ?? ""}
          fill
          className="object-cover object-center"
          priority
        />
      )}

      {/* Gradient overlay — matches design: rgba(10,22,40,0.88) → rgba(10,22,40,0.25) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.88)] to-[rgba(10,22,40,0.25)]" />

      {/* Content */}
      <div className="relative z-10 px-5 md:px-10 lg:px-20 pb-[72px] max-w-[860px]">
        {label && (
          <p className="flex items-center gap-[10px] font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
            <span className="block w-6 h-px bg-eh-gold shrink-0" />
            {label}
          </p>
        )}
        {heading && heading.length > 0 && (
          <h1 className="font-cormorant text-[clamp(44px,5vw,72px)] font-light text-white leading-[1.1]">
            {renderHeading(heading)}
          </h1>
        )}
        {description && (
          <p className="font-dmSans text-[16px] font-light text-white/70 mt-4 max-w-[520px] leading-[1.7]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
