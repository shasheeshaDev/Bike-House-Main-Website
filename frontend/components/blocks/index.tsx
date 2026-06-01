import { PAGE_QUERYResult } from "@/sanity.types";

// Banner components
import HeroBanner from "@/components/blocks/banner/hero-banner";
import CtaBanner from "@/components/blocks/banner/cta-banner";
import PageHero from "@/components/blocks/banner/page-hero";

// Card components
import CardOption1 from "@/components/blocks/card/card-option-1";
import CardOption2 from "@/components/blocks/card/card-option-2";
import CardOption3 from "@/components/blocks/card/card-option-3";
import CardOption4 from "@/components/blocks/card/card-option-4";
import CardOption5 from "@/components/blocks/card/card-option-5";
import CardOption6 from "@/components/blocks/card/card-option-6";

// Content components
import ContentOption1 from "@/components/blocks/content/content-option-1";
import ContentOption2 from "@/components/blocks/content/content-option-2";
import ContentOption3 from "@/components/blocks/content/content-option-3";
import ContentOption4 from "@/components/blocks/content/content-option-4";
import ContentOption5 from "@/components/blocks/content/content-option-5";
import ContentOption6 from "@/components/blocks/content/content-option-6";
import ContentOption7 from "@/components/blocks/content/content-option-7";
import ContentOption8 from "@/components/blocks/content/content-option-8";
import ContentOption9 from "@/components/blocks/content/content-option-9";
import ContentOption10 from "@/components/blocks/content/content-option-10";

// Stats components
import StatsOption1 from "@/components/blocks/stats/stats-option-1";
import StatsOption2 from "@/components/blocks/stats/stats-option-2";

// EH listing components
import ServicesListOption1 from "@/components/blocks/services/services-list-option-1";
import PartnersGridOption1 from "@/components/blocks/partners/partners-grid-option-1";
import CaseStudiesOption1 from "@/components/blocks/case-studies/case-studies-option-1";
import CareersListOption1 from "@/components/blocks/careers/careers-list-option-1";
import InsightsGridOption1 from "@/components/blocks/insights/insights-grid-option-1";
import TeamMembers1 from "@/components/blocks/team/team-option-1";
import TeamMembers2 from "@/components/blocks/team/team-option-2";
import Contact1 from "@/components/blocks/contact/contact-option-1";
import Map1 from "@/components/blocks/map/map-option-1";

// Form components
import Form1 from "@/components/blocks/form/form1";

// Testimonial components
import TestimonialOption1 from "@/components/blocks/testimonial/testimonial-option-1";

// Video components
import VideoOption1 from "@/components/blocks/video/video-option-1";

// Collection components
import CollectionBlock1 from "@/components/blocks/collection/collection-block-1";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];

const componentMap: Record<string, React.ComponentType<any>> = {
  // Banner blocks
  "banner-1": HeroBanner,
  "banner-2": CtaBanner,
  "banner-3": PageHero,

  // Stats blocks
  "stats-1": StatsOption1,
  "stats-2": StatsOption2,

  // Card blocks
  "card-1": CardOption1,
  "card-2": CardOption2,
  "card-3": CardOption3,
  "card-4": CardOption4,
  "card-5": CardOption5,
  "card-6": CardOption6,

  // Content blocks
  "content-1": ContentOption1,
  "content-2": ContentOption2,
  "content-3": ContentOption4,
  "content-4": ContentOption3,
  "content-5": ContentOption5,
  "content-6": ContentOption6,
  "content-7": ContentOption7,
  "content-8": ContentOption8,
  "content-9": ContentOption9,
  "content-10": ContentOption10,

  // Form blocks
  "form-1": Form1,

  // Testimonial blocks
  "testimonial-1": TestimonialOption1,

  // Video blocks
  "video-1": VideoOption1,

  // Collection blocks
  "collection-1": CollectionBlock1,

  // EH listing blocks
  "services-list-1": ServicesListOption1,
  "partners-grid-1": PartnersGridOption1,
  "case-studies-1": CaseStudiesOption1,
  "careers-list-1": CareersListOption1,
  "insights-grid-1": InsightsGridOption1,
  "team-members-1": TeamMembers1,
  "team-members-2": TeamMembers2,
  "contact-1": Contact1,
  "map-1": Map1,
};

export default function Blocks({
  blocks,
  searchParams,
}: {
  blocks: Block[];
  searchParams?: Promise<{ page?: string }>;
}) {
  return (
    <>
      {blocks?.map((block) => {
        const Component = componentMap[block._type];
        const blockWithKey = block as Block & { _key: string };

        if (!Component) {
          console.warn(`No component implemented for block type: ${block._type}`);
          return <div data-type={block._type} key={blockWithKey._key} />;
        }
        return (
          <Component
            {...(block as any)}
            key={blockWithKey._key}
            searchParams={searchParams}
          />
        );
      })}
    </>
  );
}
