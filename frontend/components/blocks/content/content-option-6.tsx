import Image from "next/image";
import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { renderHeading } from "@/lib/render-heading";

type ContentOption6Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "content-6" }
>;

export default function ContentOption6({
  label,
  heading,
  body,
  listItems,
  buttons,
  mainImage,
  accentImage,
  statValue,
  statLabel,
}: ContentOption6Props) {
  return (
    <section className="px-5 md:px-10 lg:px-20 py-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Visual */}
        <div className="relative h-[560px]">
          {mainImage?.asset && (
            <div className="absolute top-0 left-0 w-[75%] h-[85%] overflow-hidden">
              <Image
                src={urlFor(mainImage).url()}
                alt={mainImage.alt ?? ""}
                fill
                className="object-cover"
              />
            </div>
          )}
          {accentImage?.asset && (
            <div className="absolute bottom-0 right-0 w-[55%] h-[55%] overflow-hidden border-[6px] border-background">
              <Image
                src={urlFor(accentImage).url()}
                alt={accentImage.alt ?? ""}
                fill
                className="object-cover"
              />
            </div>
          )}
          {(statValue || statLabel) && (
            <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 bg-eh-navy text-white px-8 py-6 z-10">
              {statValue && (
                <p className="font-cormorant text-[48px] font-light text-eh-gold leading-none">
                  {statValue}
                </p>
              )}
              {statLabel && (
                <p className="font-dmSans text-[11px] font-medium tracking-[0.1em] uppercase text-white/60 mt-1.5">
                  {statLabel}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Text */}
        <div>
          {label && (
            <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              {label}
            </p>
          )}
          {heading && heading.length > 0 && (
            <h2 className="font-cormorant font-light text-eh-navy [&_em]:text-eh-navy leading-[1.15] mb-6">
              {renderHeading(heading)}
            </h2>
          )}
          {body && (
            <p className="font-dmSans text-[16px] font-light text-eh-midGray leading-[1.8]">
              {body}
            </p>
          )}
          {listItems && listItems.length > 0 && (
            <ul className="mt-8 flex flex-col gap-3 list-none p-0">
              {listItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-dmSans text-[15px] font-light text-eh-charcoal">
                  <span className="block w-5 h-px bg-eh-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-10">
              {buttons.map((button) => {
                const base = "font-dmSans text-[12px] tracking-[0.12em] uppercase px-9 py-4 transition-all duration-200 cursor-pointer inline-block no-underline";
                const cls = !button.buttonVariant || button.buttonVariant === "primary" || button.buttonVariant === "default"
                  ? `${base} font-semibold bg-eh-gold text-eh-navy hover:bg-eh-goldLight`
                  : `${base} font-medium bg-transparent text-eh-navy border border-eh-navy/20 hover:border-eh-gold hover:text-eh-gold`;
                return button.isExternal && button.href ? (
                  <a key={button._key} href={button.href} target={button.target ? "_blank" : undefined} rel={button.target ? "noopener noreferrer" : undefined} className={cls}>
                    {button.label}
                  </a>
                ) : (
                  <Link key={button._key} href={button.href ?? "#"} className={cls}>
                    {button.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
