"use client";

import Image from "next/image";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type CardOption2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "card-2" }
>;

const CardOption2 = ({ introContent, cards }: CardOption2Props) => {
  return (
    <section className="featured-card-option-2 pt-[80px] pb-[80px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-x-5">
          {introContent?.isIntroContent && (
            <div className="col-span-4 sm:col-span-8 lg:col-span-12">
              <div className="intro-content max-w-[948px] mx-auto text-start md:text-center mb-9 lg:mb-16">
                {introContent.eyebrowHeading && (
                  <h5 className="eyebrow-heading">
                    {introContent.eyebrowHeading}
                  </h5>
                )}
                {introContent.heading && (
                  <h2 className="">{introContent.heading}</h2>
                )}
                {introContent.description && (
                  <p className="">
                    {introContent.description}
                  </p>
                )}
              </div>
            </div>
          )}
          <div className="col-span-4 sm:col-span-8 lg:col-span-12">
            <div className="card-wrapper flex flex-col lg:flex-row gap-5">
              {cards &&
                cards.length > 0 &&
                cards.map((item) => {
                  return (
                    <div
                      key={item._key}
                      className="lg:flex-1 group card-item h-[320px] lg:h-[380px] xl:h-[464px] p-8 flex flex-col justify-end overflow-hidden rounded-3xl relative transition-all duration-500 ease-in-out group-hover:flex-[0.5] lg:hover:!flex-[2] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#F1F2F6] hover:after:bg-[#191919] after:opacity-100 after:z-10 after:transition-all after:duration-500 after:ease-in-out hover:after:opacity-40"
                    >
                      {item.backgroundImage?.asset && (
                        <Image
                          src={urlFor(item.backgroundImage).url()}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          alt={item.backgroundImage.alt || ""}
                          width={800}
                          height={464}
                        />
                      )}
                      <div className="content-wrapper relative h-full flex flex-col justify-between z-20">
                        {item.title && (
                          <h4 className="text-black group-hover:text-white transition-all">{item.title}</h4>
                        )}
                        {item.description && (
                          <p className="text-black group-hover:text-white transition-all mt-3">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardOption2;
