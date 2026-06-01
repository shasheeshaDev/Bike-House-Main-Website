import Image from "next/image";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import ColumnBuilderRenderer from "@/components/blocks/shared/column-builder-renderer";

type ContentOption4Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "content-3" }
>;

const ContentOption4 = ({ contentBlock, imageBlock }: ContentOption4Props) => {
  return (
    <section className="content-option-4">
      <div className="container mx-auto">
        <div className="w-full grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 sm:col-span-4 lg:col-span-7">
            <div className="aspect-square sm:aspect-auto w-full h-full rounded-4xl overflow-hidden">
              {imageBlock?.asset && (
                <Image
                  src={urlFor(imageBlock).url()}
                  alt={imageBlock.alt || ""}
                  className="w-full h-full object-cover"
                  width={1920}
                  height={1080}
                />
              )}
            </div>
          </div>
          <div className="col-span-4 sm:col-span-4 lg:col-span-5">
            <div className="bg-brand-tertiary rounded-4xl h-full py-20 px-8 text-black">
              <ColumnBuilderRenderer blocks={contentBlock} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentOption4;
