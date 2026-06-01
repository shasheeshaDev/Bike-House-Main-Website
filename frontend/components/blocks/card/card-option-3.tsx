"use client";

import Image from "next/image";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type CardOption3Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "card-3" }
>;

const CardOption3 = ({
  eyebrowHeading,
  heading,
  description,
  buttons,
  cards,
  background,
}: CardOption3Props) => {
  return (
    <section className="featured-card-option-3 pt-[80px] pb-[40px]">
      <div className="container mx-auto">
        <div className="relative rounded-3xl overflow-hidden py-[40px] xl:py-[60px] px-[20px] sm:px-[40px]">
          {background?.backgroundType === "image" && background.backgroundImage?.asset && (
            <div className="absolute top-0 left-0 w-full h-full z-0 after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#191919]/40 after:z-10">
              <Image
                src={urlFor(background.backgroundImage).url()}
                className="w-full h-full object-cover"
                alt={background.backgroundImage.alt || ""}
                width={1920}
                height={1080}
              />
            </div>
          )}
          <div className="intro-content relative max-w-[948px] mx-auto text-start md:text-center z-10 mb-9 lg:mb-12">
            {eyebrowHeading && (
              <h5 className="eyebrow-heading text-brand-white">{eyebrowHeading}</h5>
            )}
            {heading && (
              <h2 className="text-brand-white">{heading}</h2>
            )}
            {description && (
              <p className="text-brand-white">{description}</p>
            )}
            {buttons && buttons.length > 0 && (
              <div className="mt-5">
                {buttons.map((button) => (
                  <a
                    key={button._key}
                    href={button.href || "#"}
                    target={button.target ? "_blank" : undefined}
                    rel={button.target ? "noopener noreferrer" : undefined}
                    className="cta-button inline-block mr-4"
                  >
                    {button.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="card-wrapper relative grid grid-cols-1 lg:grid-cols-3 gap-5 z-10">
            {cards &&
              cards.length > 0 &&
              cards.map((item) => {
                return (
                  <div
                    key={item._key}
                    className="flex flex-row lg:flex-col-reverse xl:flex-row items-center rounded-2xl overflow-hidden bg-[#D9D9D9]/20 backdrop-blur-xl"
                  >
                    {item.backgroundImage?.asset && (
                      <Image
                        src={urlFor(item.backgroundImage).url()}
                        className="w-2/5 lg:w-full xl:w-2/5 rounded-2xl aspect-square sm:aspect-video xl:aspect-square object-cover"
                        alt={item.backgroundImage.alt || ""}
                        width={400}
                        height={400}
                      />
                    )}
                    <div className="content-wrapper flex flex-col p-4 xl:p-5 pl-4 sm:pl-6">
                      {item.title && (
                        <h4 className="text-brand-white">{item.title}</h4>
                      )}
                      {item.description && (
                        <p className="text-brand-white text-xs sm:text-sm leading-tight mt-2.5">
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
    </section>
  );
};

export default CardOption3;
