"use client";

import Image from "next/image";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import ColumnBuilderRenderer from "../shared/column-builder-renderer";

type CollectionBlock1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "collection-1" }
>;

const CollectionBlock1 = ({ collections }: CollectionBlock1Props) => {
  if (!collections || collections.length === 0) {
    return null;
  }

  console.log("collection data : ", collections)

  return (
    <section className="collection-block-1 pt-[40px] pb-[40px]">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          {collections.map((item, index) => (
            <div
              key={item._id}
              className={`w-full flex ${index % 2 === 0 ? "flex-col" : "flex-col-reverse"} lg:grid lg:grid-cols-12`}
            >
              {index % 2 === 0 && (
                <div className="lg:col-span-6 xl:col-span-7">
                  <div className="aspect-square lg:aspect-auto w-full lg:h-full rounded-3xl overflow-hidden h-[360px] lg:min-h-[72dvh]">
                    {item.image?.asset && (
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.name || ""}
                        className="w-full h-full object-cover"
                        width={1920}
                        height={1080}
                      />
                    )}
                  </div>
                </div>
              )}

              <div className="lg:col-span-6 xl:col-span-5">
                <div className="bg-brand-tertiary rounded-3xl h-full py-10 lg:py-20 px-8">
                  <div className="intro-content max-w-[948px]">
                    {item.name && (
                      <h2 className="" dangerouslySetInnerHTML={{ __html: item.name }} />
                    )}
                  </div>
                  {item.location && (
                    <div className="description-content mt-1 mb-5 lg:mb-8">
                      <p className="font-medium text-lg">{item.location}</p>
                    </div>
                  )}
                  {item.contentBlock &&
                    <ColumnBuilderRenderer blocks={item.contentBlock} className="[&_.button-content]:mt-7 md:[&_.button-content]:mt-10 lg:[&_.button-content]:mt-16" />
                  }
                </div>
              </div>

              {index % 2 !== 0 && (
                <div className="lg:col-span-6 xl:col-span-7">
                  <div className="aspect-square lg:aspect-auto w-full lg:h-full rounded-3xl overflow-hidden h-[360px] lg:min-h-[72dvh]">
                    {item.image?.asset && (
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.name || ""}
                        className="w-full h-full object-cover"
                        width={1920}
                        height={1080}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionBlock1;
