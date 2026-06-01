import Blocks from "@/components/blocks";
import { fetchSanityPageBySlug } from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import MissingSanityPage from "@/components/ui/missing-sanity-page";
import GlobalBanner from "@/components/global/global-banner";
import PreFooterCta from "@/components/global/pre-footer-cta";

export async function generateMetadata() {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  return generatePageMetadata({ page, slug: "index", type: "page" });
}

export default async function IndexPage() {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  if (!page) {
    return MissingSanityPage({ document: "page", slug: "index" });
  }

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
