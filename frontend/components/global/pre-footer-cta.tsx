import Image from "next/image";
import Link from "next/link";
import { fetchSanitySettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { renderHeading } from "@/lib/render-heading";

export default async function PreFooterCta() {
  const settings = await fetchSanitySettings();
  const cta = settings?.prefooterCta;

  // Don't render if no CTA content configured in Settings
  if (!cta?.heading?.length && !cta?.buttonLabel) return null;

  return (
    <div className="relative px-5 md:px-20 py-[120px] flex items-center justify-center text-center overflow-hidden">
      {/* Background image */}
      {cta.backgroundImage?.asset && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(cta.backgroundImage).url()}
            alt={cta.backgroundImage.alt ?? ""}
            fill
            className="object-cover object-center"
          />
        </div>
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-eh-navy/75 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-[700px]">
        {cta.eyebrowLabel && (
          <p className="flex items-center justify-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
            <span className="block w-6 h-px bg-eh-gold shrink-0" />
            {cta.eyebrowLabel}
          </p>
        )}

        {cta.heading && cta.heading.length > 0 && (
          <h2 className="font-cormorant font-light text-white [&_em]:text-white leading-[1.15] mb-4 [&_em]:italic">
            {renderHeading(cta.heading)}
          </h2>
        )}

        {cta.description && (
          <p className="font-dmSans text-[16px] font-light text-white/70 mb-10">
            {cta.description}
          </p>
        )}

        {cta.buttonLabel && cta.buttonHref && (
          <Link
            href={cta.buttonHref}
            className="inline-block font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy px-9 py-4 hover:bg-eh-goldLight transition-colors duration-200"
          >
            {cta.buttonLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
