"use client";

import Image from "next/image";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type CardOption4Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "card-4" }
>;

const CardOption4 = ({ introContent, cards }: CardOption4Props) => {
  return (
    <section className="featured-card-option-4 pt-[40px] pb-[40px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-5">
          {introContent?.isIntroContent && (
            <div className="col-span-4 sm:col-span-8 lg:col-span-6">
              <div className="intro-content mb-9 lg:mb-0">
                {introContent.eyebrowHeading && (
                  <h5 className="eyebrow-heading mb-5">
                    {introContent.eyebrowHeading}
                  </h5>
                )}
                {introContent.heading && (
                  <h2 className="">{introContent.heading}</h2>
                )}
                {introContent.description && (
                  <div className="[&_p]:mb-5 [&_p]:last:mb-0 mt-16 lg:pr-16">
                    <p>{introContent.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={`col-span-4 sm:col-span-8 ${introContent?.isIntroContent ? "lg:col-span-6" : "lg:col-span-12"}`}>
            <div className={`grid ${introContent?.isIntroContent ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"} grid-cols-1 sm:grid-cols-2 gap-5`}>
              {cards &&
                cards.length > 0 &&
                cards.map((card) => {
                  return (
                    <div key={card._key} className="card-item py-8 px-7 border border-[#2B2B2B]">
                      {card.icon?.asset && (
                        <div className="w-10 aspect-square rounded-lg border border-[#2B2B2B] p-2 mb-5">
                          <Image
                            src={urlFor(card.icon).url()}
                            alt=""
                            width={56}
                            height={56}
                          />
                        </div>
                      )}
                      {card.title && (
                        <h3 className="font-semibold text-2xl">{card.title}</h3>
                      )}
                      {card.description && (
                        <p className="text-base mt-3">{card.description}</p>
                      )}
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

export default CardOption4;
