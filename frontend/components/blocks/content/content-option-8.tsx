import Image from "next/image";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import ColumnBuilderRenderer from "@/components/blocks/shared/column-builder-renderer";

type ContentOption8Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "content-8" }
>;

export default function ContentOption8({
  textContent,
  image,
  imagePosition = "right",
}: ContentOption8Props) {
  const imageFirst = imagePosition === "left";

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[580px] ${imageFirst ? "lg:[direction:rtl]" : ""}`}>

      {/* Text panel */}
      <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 bg-white lg:[direction:ltr]">
        <ColumnBuilderRenderer blocks={textContent as any} />
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
      </div>

    </div>
  );
}
