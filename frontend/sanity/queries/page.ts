import { groq } from "next-sanity";
import { pageHeroQuery } from "./page-hero/page-hero";
import { metaQuery } from "./shared/meta";
import { imageQuery } from "./shared/image";
import { sectionHeaderQuery } from "./section-header";
import { content1Query } from "./content/content1";
import { content2Query } from "./content/content2";
import { content3Query } from "./content/content3";
import { content4Query } from "./content/content4";
import { card1Query } from "./card/card1";
import { card2Query } from "./card/card2";
import { card3Query } from "./card/card3";
import { card4Query } from "./card/card4";
import { card5Query } from "./card/card5";
import { form1Query } from "./form/form1";
import { banner1Query } from "./banner/banner1";
import { banner2Query } from "./banner/banner2";
import { banner3Query } from "./banner/banner3";
import { stats1Query } from "./stats/stats1";
import { stats2Query } from "./stats/stats2";
import { content5Query } from "./content/content5";
import { content6Query } from "./content/content6";
import { content7Query } from "./content/content7";
import { card6Query } from "./card/card6";
import { servicesList1Query } from "./services/services-list1";
import { partnersGrid1Query } from "./partners/partners-grid1";
import { caseStudies1Query } from "./case-studies/case-studies1";
import { careersList1Query } from "./careers/careers-list1";
import { insightsGrid1Query } from "./insights/insights-grid1";
import { teamMembers1Query } from "./team/team1";
import { teamMembers2Query } from "./team/team2";
import { contact1Query } from "./contact/contact1";
import { content8Query } from "./content/content8";
import { content9Query } from "./content/content9";
import { content10Query } from "./content/content10";
import { testimonial1Query } from "./testimonial/testimonial1";
import { collection1Query } from "./collection/collection1";
import { map1Query } from "./map/map1";
import { video1Query } from "./video/video1";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    isGlobalBanner,
    bannerImage{
      ${imageQuery}
    },
    bannerContent{
      eyebrowHeading,
      heading[]{
        ...
      },
      description
    },
    isPrefooterCta,
    blocks[]{
      ${pageHeroQuery},
      ${sectionHeaderQuery},
      ${content1Query},
      ${content2Query},
      ${content3Query},
      ${content4Query},
      ${card1Query},
      ${card2Query},
      ${card3Query},
      ${card4Query},
      ${card5Query},
      ${form1Query},
      ${banner1Query},
      ${banner2Query},
      ${banner3Query},
      ${stats1Query},
      ${stats2Query},
      ${content5Query},
      ${content6Query},
      ${content7Query},
      ${content8Query},
      ${content9Query},
      ${content10Query},
      ${card6Query},
      ${servicesList1Query},
      ${partnersGrid1Query},
      ${caseStudies1Query},
      ${careersList1Query},
      ${insightsGrid1Query},
      ${teamMembers1Query},
      ${teamMembers2Query},
      ${contact1Query},
      ${testimonial1Query},
      ${collection1Query},
      ${map1Query},
      ${video1Query},
    },
    ${metaQuery},
  }
`;

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug)]{slug}`;
