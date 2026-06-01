"use client";

import Image from "next/image";
import { useMemo } from "react";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type CardOption5Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "card-5" }
>;

const CardOption5 = ({ introContent, cards }: CardOption5Props) => {
  const remainder = useMemo(() => (cards?.length ?? 0) % 3, [cards?.length]);

  return (
    <section className="featured-card-option-5 pt-[40px] pb-[80px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-5">
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
                  <div className="[&_p]:mb-5 [&_p]:last:mb-0 mt-16 lg:pr-16">
                    <p>{introContent.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="col-span-4 sm:col-span-8 lg:col-span-12">
            <div className="card-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
              {cards &&
                cards.length > 0 &&
                cards.map((card, index) => {
                  const isLastItem = index === cards.length - 1;
                  const isSecondLastItem = index === cards.length - 2;

                  let colSpan = "col-span-1 lg:col-span-2";

                  if (remainder === 1 && isLastItem) {
                    colSpan = "col-span-1 lg:col-span-6";
                  } else if (remainder === 2 && (isLastItem || isSecondLastItem)) {
                    colSpan = "col-span-1 lg:col-span-3";
                  }

                  return (
                    <div
                      key={card._key}
                      className={`${colSpan} group card-item border border-[#2B2B2B] p-4 lg:p-8 flex flex-col justify-start overflow-hidden rounded-xl relative`}
                    >
                      <div className="flex items-start gap-4">
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
                          <h4 className="font-semibold text-base sm:text-lg lg:text-2xl">{card.title}</h4>
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

export default CardOption5;