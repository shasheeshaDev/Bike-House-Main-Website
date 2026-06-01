import { type SchemaTypeDefinition } from "sanity";
// documents
import page from "./schemas/documents/page";
import collection from "./schemas/documents/collection";
import author from "./schemas/documents/author";
import category from "./schemas/documents/category";
import faq from "./schemas/documents/faq";
import testimonial from "./schemas/documents/testimonial";
import header from "./schemas/documents/header";
import footer from "./schemas/documents/footer";
import settings from "./schemas/documents/settings";
import banner from "./schemas/documents/banner";
// EH-specific documents
import tag from "./schemas/documents/tag";
import service from "./schemas/documents/service";
import partnerCategory from "./schemas/documents/partner-category";
import partner from "./schemas/documents/partner";
import caseStudy from "./schemas/documents/case-study";
import career from "./schemas/documents/career";
import insight from "./schemas/documents/insight";
import teamMember from "./schemas/documents/team-member";

// Schema UI shared objects
import blockContent from "./schemas/common/block-content";
import link from "./schemas/common/link";
import button from "./schemas/common/button";
import buttonGroup from "./schemas/common/button-group";
import linkGroup from "./schemas/common/link-group";
import { buttonVariant } from "./schemas/common/button-variant";
import sectionPadding from "./schemas/common/section-padding";
import { columnBuilder, columnBuilderBlocks } from "./schemas/common/column-builder";
import socialMediaLinks from "./schemas/common/social-media-link";
import video from "./schemas/common/video";
import background from "./schemas/common/background";
import introContent from "./schemas/common/intro-content";
// Video
import video1 from "./schemas/blocks/video/video1";
// Content
import content1 from "./schemas/blocks/content/content1";
import content2 from "./schemas/blocks/content/content2";
import content3 from "./schemas/blocks/content/content3";
import content4 from "./schemas/blocks/content/content4";
import content5 from "./schemas/blocks/content/content5";
import content6 from "./schemas/blocks/content/content6";
import content7 from "./schemas/blocks/content/content7";
import content8 from "./schemas/blocks/content/content8";
import content9 from "./schemas/blocks/content/content9";
import content10 from "./schemas/blocks/content/content10";
// Stats
import stats1 from "./schemas/blocks/stats/stats1";
import stats2 from "./schemas/blocks/stats/stats2";
// Form Components
import form from "./schemas/blocks/form/form";
import formConfig from "./schemas/blocks/form/form-config";
import formSheet from "./schemas/blocks/form/form-sheet";
import formField from "./schemas/blocks/form/form-input";
// Form
import form1 from "./schemas/blocks/form/form1";
// Banner
import banner1 from "./schemas/blocks/banner/banner1";
import banner2 from "./schemas/blocks/banner/banner2";
import banner3 from "./schemas/blocks/banner/banner3";
// Card
import card1 from "./schemas/blocks/card/card1";
import card2 from "./schemas/blocks/card/card2";
import card3 from "./schemas/blocks/card/card3";
import card4 from "./schemas/blocks/card/card4";
import card5 from "./schemas/blocks/card/card5";
import card6 from "./schemas/blocks/card/card6";
// Testimonial
import testimonial1 from "./schemas/blocks/testimonial/testimonial1";
// Collection
import collection1 from "./schemas/blocks/collection/collection1";
// Map
import map1 from "./schemas/blocks/map/map1";
// EH-specific listing blocks
import servicesList1 from "./schemas/blocks/services/services-list1";
import partnersGrid1 from "./schemas/blocks/partners/partners-grid1";
import caseStudies1 from "./schemas/blocks/case-studies/case-studies1";
import careersList1 from "./schemas/blocks/careers/careers-list1";
import insightsGrid1 from "./schemas/blocks/insights/insights-grid1";
import teamMembers1 from "./schemas/blocks/team/team1";
import teamMembers2 from "./schemas/blocks/team/team2";
import contact1 from "./schemas/blocks/contact/contact1";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    page,
    collection,
    author,
    category,
    faq,
    testimonial,
    header,
    footer,
    settings,
    banner,
    // EH-specific documents
    tag,
    service,
    partnerCategory,
    partner,
    caseStudy,
    career,
    insight,
    teamMember,
    // shared objects
    introContent,
    video,
    background,
    blockContent,
    link,
    button,
    buttonGroup,
    linkGroup,
    socialMediaLinks,
    buttonVariant,
    sectionPadding,
    columnBuilder,
    ...columnBuilderBlocks,
    // All Blocks - Start
    // Banner
    banner1,
    banner2,
    banner3,
    // Card
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    // Video
    video1,
    // Content
    content1,
    content2,
    content3,
    content4,
    content5,
    content6,
    content7,
    content8,
    content9,
    content10,
    // Stats
    stats1,
    stats2,
    // Testimonial
    testimonial1,
    // Collection
    collection1,
    // Form Components
    form,
    formConfig,
    formSheet,
    formField,
    // Form
    form1,
    // Map
    map1,
    // EH listing blocks
    servicesList1,
    partnersGrid1,
    caseStudies1,
    careersList1,
    insightsGrid1,
    teamMembers1,
    teamMembers2,
    contact1,
  ],
};
