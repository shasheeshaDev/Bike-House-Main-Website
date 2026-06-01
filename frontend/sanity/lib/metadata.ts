import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity.types";
import { getOgImageUrl } from "@/sanity/lib/fetch";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export function generatePageMetadata({
  page,
  slug,
  type,
}: {
  page: PAGE_QUERYResult | Record<string, any> | null | undefined;
  slug: string;
  type: "page" | string;
}) {
  // Fall back to the document's own title when no meta title is set
  const fallbackTitle = (page as any)?.title ?? (page as any)?.name ?? undefined;

  return {
    title: (page as any)?.meta?.title ?? fallbackTitle,
    description: (page as any)?.meta?.description,
    openGraph: {
      images: [
        {
          url: (page as any)?.meta?.image
            ? urlFor((page as any)?.meta?.image).quality(100).url()
            : getOgImageUrl({ type, slug }),
          width: (page as any)?.meta?.image?.asset?.metadata?.dimensions?.width || 1200,
          height: (page as any)?.meta?.image?.asset?.metadata?.dimensions?.height || 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    robots: !isProduction
      ? "noindex, nofollow"
      : (page as any)?.meta?.noindex
        ? "noindex"
        : "index, follow",
    alternates: {
      canonical: `/${slug === "index" ? "" : slug}`,
    },
  };
}
