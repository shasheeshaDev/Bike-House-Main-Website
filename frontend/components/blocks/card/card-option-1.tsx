"use client";

import Image from "next/image";
import { useMemo } from "react";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type CardOption1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "card-1" }
>;

const CardOption1 = ({ introContent, cards }: CardOption1Props) => {
  const remainder = useMemo(() => (cards?.length || 0) % 3, [cards?.length]);

  return (
    <section className="featured-card-option-1 pt-[40px] pb-[80px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-5">
          {introContent?.isIntroContent && (
            <div className="col-span-4 sm:col-span-8 lg:col-span-12">
              <div className="intro-content max-w-[948px] mx-auto text-start md:text-center mb-9 lg:mb-16">
                {introContent.eyebrowHeading && (
                  <h5 className="eyebrow-heading mb-5">
                    {introContent.eyebrowHeading}
                  </h5>
                )}
                {introContent.heading && (
                  <h2 className="">{introContent.heading}</h2>
                )}
                {introContent.description && (
                  <p className="mt-3">
                    {introContent.description}
                  </p>
                )}
              </div>
            </div>
          )}
          <div className="col-span-4 sm:col-span-8 lg:col-span-12">
            <div className="card-wrapper grid grid-cols-1 lg:grid-cols-6 gap-5">
              {cards &&
                cards.length > 0 &&
                cards.map((item, index) => {
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
                      key={item._key}
                      className={`${colSpan} group rounded-3xl xl:rounded-[40px] card-item h-[360px] sm:h-[320px] lg:h-[420px] xl:h-[464px] p-8 flex flex-col justify-end overflow-hidden rounded-4xl after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#191919] after:opacity-35 after:z-10 relative`}
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
                      <div className="content-wrapper relative z-20">
                        <div className="text-content">
                          {item.title && (
                            <h4 className="text-brand-white">{item.title}</h4>
                          )}
                          {item.description && (
                            <p className="text-brand-white mt-3">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {item.link?.label && (
                          <div className="relative mt-0 group-hover:mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out max-h-0 group-hover:max-h-20 overflow-hidden">
                            <a
                              href={item.link.href || "#"}
                              target={item.link.target ? "_blank" : undefined}
                              rel={item.link.target ? "noopener noreferrer" : undefined}
                              className="cta-button inline-block"
                            >
                              {item.link.label}
                            </a>
                          </div>
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

export default CardOption1;
