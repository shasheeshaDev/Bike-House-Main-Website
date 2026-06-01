import Image from "next/image";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { renderHeading } from "@/lib/render-heading";

type ContentOption5Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "content-5" }
>;

export default function ContentOption5({
  label,
  heading,
  body,
  image,
  imagePosition = "right",
}: ContentOption5Props) {
  const imageFirst = imagePosition === "left";

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[600px] ${imageFirst ? "lg:[direction:rtl]" : ""}`}>
      {/* Text panel — navy background */}
      <div className={`bg-eh-navy flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 lg:[direction:ltr]`}>
        {label && (
          <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
            <span className="block w-6 h-px bg-eh-gold shrink-0" />
            {label}
          </p>
        )}
        {heading && heading.length > 0 && (
          <h2 className="font-cormorant font-light text-white [&_em]:text-white leading-[1.15] mb-6">
            {renderHeading(heading)}
          </h2>
        )}
        {body && (
          <p className="font-dmSans text-[16px] font-light text-white/70 leading-[1.8] max-w-[540px]">
            {body}
          </p>
        )}
      </div>

      {/* Image panel */}
      <div className="relative min-h-[360px] lg:min-h-0 overflow-hidden lg:[direction:ltr]">
        {image?.asset ? (
          <Image
            src={urlFor(image).url()}
            alt={image.alt ?? ""}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-eh-sandLight" />
        )}
        <div className="absolute inset-0 bg-eh-navy/15" />
      </div>
    </div>
  );
}
