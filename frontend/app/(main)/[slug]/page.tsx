import Blocks from "@/components/blocks";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import { PAGES_SLUGS_QUERYResult } from "@/sanity.types";
import GlobalBanner from "@/components/global/global-banner";
import PreFooterCta from "@/components/global/pre-footer-cta";

export async function generateStaticParams() {
  const pages: PAGES_SLUGS_QUERYResult = await fetchSanityPagesStaticParams();

  return pages.map((page) => ({
    slug: page.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: params.slug, type: "page" });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  const pageParams = Promise.resolve((await props.searchParams) || {});

  return (
    <>
      {page.isGlobalBanner && page.bannerContent && page.bannerImage &&
        <GlobalBanner content={page.bannerContent} background={page.bannerImage} />
      }
      <Blocks blocks={page?.blocks ?? []} />
      {page.isPrefooterCta !== false && <PreFooterCta />}
    </>
  );
}
