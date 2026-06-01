import { sanityFetch } from "@/sanity/lib/live";
import { HEADER_QUERY, type HeaderData } from "@/sanity/queries/header";
import { FOOTER_QUERY, type FooterData } from "@/sanity/queries/footer";
import { BANNER_QUERY } from "@/sanity/queries/banner";
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/sanity/queries/page";
import { SETTINGS_QUERY } from "@/sanity/queries/settings";
import { CONTACT_QUERY } from "@/sanity/queries/contact";
import { CHANGELOGS_QUERY } from "@/sanity/queries/changelog";
import { TEAM_QUERY } from "@/sanity/queries/team";
import {
  SERVICES_QUERY,
  SERVICE_QUERY,
  SERVICES_SLUGS_QUERY,
} from "@/sanity/queries/service";
import {
  PARTNERS_QUERY,
  PARTNER_QUERY,
  PARTNERS_SLUGS_QUERY,
} from "@/sanity/queries/partner";
import {
  CASE_STUDIES_QUERY,
  CASE_STUDY_QUERY,
  CASE_STUDIES_SLUGS_QUERY,
} from "@/sanity/queries/case-study";
import {
  CAREERS_QUERY,
  CAREER_QUERY,
  CAREERS_SLUGS_QUERY,
} from "@/sanity/queries/career";
import {
  INSIGHTS_QUERY,
  INSIGHT_QUERY,
  INSIGHTS_SLUGS_QUERY,
} from "@/sanity/queries/insight";
import {
  PAGE_QUERYResult,
  PAGES_SLUGS_QUERYResult,
  BANNER_QUERYResult,
  SETTINGS_QUERYResult,
  CONTACT_QUERYResult,
  CHANGELOGS_QUERYResult,
  TEAM_QUERYResult,
  SERVICES_QUERYResult,
  SERVICE_QUERYResult,
  SERVICES_SLUGS_QUERYResult,
  PARTNERS_QUERYResult,
  PARTNER_QUERYResult,
  PARTNERS_SLUGS_QUERYResult,
  CASE_STUDIES_QUERYResult,
  CASE_STUDY_QUERYResult,
  CASE_STUDIES_SLUGS_QUERYResult,
  CAREERS_QUERYResult,
  CAREER_QUERYResult,
  CAREERS_SLUGS_QUERYResult,
  INSIGHTS_QUERYResult,
  INSIGHT_QUERYResult,
  INSIGHTS_SLUGS_QUERYResult,
} from "@/sanity.types";

export const fetchSanityHeader = async (): Promise<HeaderData> => {
  const { data } = await sanityFetch({
    query: HEADER_QUERY,
  });
  return data as HeaderData;
};

export const fetchSanityFooter = async (): Promise<FooterData> => {
  const { data } = await sanityFetch({
    query: FOOTER_QUERY,
  });
  return data as FooterData;
};

export const fetchSanityBanner = async (): Promise<BANNER_QUERYResult> => {
  const { data } = await sanityFetch({
    query: BANNER_QUERY,
  });
  return data as BANNER_QUERYResult;
};

export const fetchSanityPageBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PAGE_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  return data as PAGE_QUERYResult;
};

export const fetchSanityPagesStaticParams =
  async (): Promise<PAGES_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: PAGES_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data as PAGES_SLUGS_QUERYResult;
  };


export const fetchSanityChangelogs =
  async (): Promise<CHANGELOGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: CHANGELOGS_QUERY,
    });

    return data as CHANGELOGS_QUERYResult;
  };

export const fetchSanityTeam = async (): Promise<TEAM_QUERYResult> => {
  const { data } = await sanityFetch({
    query: TEAM_QUERY,
  });
  return data as TEAM_QUERYResult;
};


export const fetchSanitySettings = async (): Promise<SETTINGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return data as SETTINGS_QUERYResult;
};

export const fetchSanityContact = async (): Promise<CONTACT_QUERYResult> => {
  const { data } = await sanityFetch({
    query: CONTACT_QUERY,
  });

  return data as CONTACT_QUERYResult;
};

// ── Services ──────────────────────────────────────────────────────────────
export const fetchSanityServices = async (): Promise<SERVICES_QUERYResult> => {
  const { data } = await sanityFetch({ query: SERVICES_QUERY });
  return data as SERVICES_QUERYResult;
};
export const fetchSanityServiceBySlug = async ({ slug }: { slug: string }): Promise<SERVICE_QUERYResult> => {
  const { data } = await sanityFetch({ query: SERVICE_QUERY, params: { slug } });
  return data as SERVICE_QUERYResult;
};
export const fetchSanityServicesStaticParams = async (): Promise<SERVICES_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({ query: SERVICES_SLUGS_QUERY, perspective: "published", stega: false });
  return data as SERVICES_SLUGS_QUERYResult;
};

// ── Partners ───────────────────────────────────────────────────────────────
export const fetchSanityPartners = async (): Promise<PARTNERS_QUERYResult> => {
  const { data } = await sanityFetch({ query: PARTNERS_QUERY });
  return data as PARTNERS_QUERYResult;
};
export const fetchSanityPartnerBySlug = async ({ slug }: { slug: string }): Promise<PARTNER_QUERYResult> => {
  const { data } = await sanityFetch({ query: PARTNER_QUERY, params: { slug } });
  return data as PARTNER_QUERYResult;
};
export const fetchSanityPartnersStaticParams = async (): Promise<PARTNERS_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({ query: PARTNERS_SLUGS_QUERY, perspective: "published", stega: false });
  return data as PARTNERS_SLUGS_QUERYResult;
};

// ── Case Studies ───────────────────────────────────────────────────────────
export const fetchSanityCaseStudies = async (): Promise<CASE_STUDIES_QUERYResult> => {
  const { data } = await sanityFetch({ query: CASE_STUDIES_QUERY });
  return data as CASE_STUDIES_QUERYResult;
};
export const fetchSanityCaseStudyBySlug = async ({ slug }: { slug: string }): Promise<CASE_STUDY_QUERYResult> => {
  const { data } = await sanityFetch({ query: CASE_STUDY_QUERY, params: { slug } });
  return data as CASE_STUDY_QUERYResult;
};
export const fetchSanityCaseStudiesStaticParams = async (): Promise<CASE_STUDIES_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({ query: CASE_STUDIES_SLUGS_QUERY, perspective: "published", stega: false });
  return data as CASE_STUDIES_SLUGS_QUERYResult;
};

// ── Careers ────────────────────────────────────────────────────────────────
export const fetchSanityCareers = async (): Promise<CAREERS_QUERYResult> => {
  const { data } = await sanityFetch({ query: CAREERS_QUERY });
  return data as CAREERS_QUERYResult;
};
export const fetchSanityCareerBySlug = async ({ slug }: { slug: string }): Promise<CAREER_QUERYResult> => {
  const { data } = await sanityFetch({ query: CAREER_QUERY, params: { slug } });
  return data as CAREER_QUERYResult;
};
export const fetchSanityCareersStaticParams = async (): Promise<CAREERS_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({ query: CAREERS_SLUGS_QUERY, perspective: "published", stega: false });
  return data as CAREERS_SLUGS_QUERYResult;
};

// ── Insights ───────────────────────────────────────────────────────────────
export const fetchSanityInsights = async (): Promise<INSIGHTS_QUERYResult> => {
  const { data } = await sanityFetch({ query: INSIGHTS_QUERY });
  return data as INSIGHTS_QUERYResult;
};
export const fetchSanityInsightBySlug = async ({ slug }: { slug: string }): Promise<INSIGHT_QUERYResult> => {
  const { data } = await sanityFetch({ query: INSIGHT_QUERY, params: { slug } });
  return data as INSIGHT_QUERYResult;
};
export const fetchSanityInsightsStaticParams = async (): Promise<INSIGHTS_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({ query: INSIGHTS_SLUGS_QUERY, perspective: "published", stega: false });
  return data as INSIGHTS_SLUGS_QUERYResult;
};

export const getOgImageUrl = ({
  type,
  slug,
}: {
  type: string;
  slug: string;
}): string => {
  // Clean the slug by removing any path segments before the last slash (e.g. "blog/my-post" becomes "my-post")
  const cleanSlug = slug.split("/").pop() || slug;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${baseUrl}/api/og?type=${type}&slug=${encodeURIComponent(cleanSlug)}`;
};
