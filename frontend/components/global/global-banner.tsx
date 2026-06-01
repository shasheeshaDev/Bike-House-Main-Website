import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { renderHeading } from "@/lib/render-heading";
import Image from "next/image";

interface GlobalBannerProps {
  content: NonNullable<NonNullable<PAGE_QUERYResult>["bannerContent"]>;
  background: NonNullable<NonNullable<PAGE_QUERYResult>["bannerImage"]>;
}

const GlobalBanner = ({ content, background }: GlobalBannerProps) => {
  const { eyebrowHeading, heading, description } = content;
  return (
    <section className="global-banner pt-32 pb-20 after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#191919]/30 after:z-10 relative">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {background && (
          <Image
            src={urlFor(background).url()}
            className="w-full h-full object-cover"
            alt={background.alt || "Global banner background"}
            width={1920}
            height={1080}
          />
        )}
      </div>
      <div className="container mx-auto relative z-20">
        <div className="flex items-center justify-center">
          <div className="max-w-[706px] text-start md:text-center">
            {eyebrowHeading && (
              <h2 className="eyebrow-heading text-brand-white mb-5">{eyebrowHeading}</h2>
            )}
            {heading && heading.length > 0 && (
              <h1>{renderHeading(heading)}</h1>
            )}
            {description && (
              <p className="text-brand-white mt-5">{description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalBanner;
