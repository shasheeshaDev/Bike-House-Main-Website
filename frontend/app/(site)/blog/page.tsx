import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EmptyState from "@/components/empty-state";
import FilterChips from "@/components/filter-chips";
import JsonLd from "@/components/json-ld";
import PageHero from "@/components/page-hero";
import PostCard, { PostMeta } from "@/components/post-card";
import NewsletterForm from "./newsletter-form";
import { getPosts } from "@/lib/data";
import { abs, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type SearchParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const DESCRIPTION =
  "Motorcycle tips, maintenance guides, build diaries and notes from the Bike House workshop floor in Piliyandala, Sri Lanka.";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  return pageMetadata(parent, {
    title: "The Journal",
    description: DESCRIPTION,
    path: "/blog",
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const category = first(params.category);
  const all = await getPosts();

  const categories = [...new Set(all.map((p) => p.category))];
  const filtered = category
    ? all.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : all;

  // The large slot takes the newest featured article, else the newest overall.
  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Journal", path: "/blog" }]}
        heading="The"
        accent="Journal."
        lead="Tips, build diaries, maintenance deep-dives, and the occasional opinion piece on what's worth riding right now."
      />

      {featured && (
        <section className="section-tight">
          <div className="container">
            <div className="blog-feature">
              <Link href={`/blog/${featured.slug}`} className="img">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                  priority
                />
                <span className="badge">Featured</span>
              </Link>
              <div className="text">
                <PostMeta post={featured} />
                <h2 className="h2">
                  <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p>{featured.excerpt}</p>
                <div>
                  <Link className="btn-line" href={`/blog/${featured.slug}`}>
                    Read the full article →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-tight pt-0">
        <div className="container">
          <div className="topic-bar">
            <FilterChips
              legend="Topics:"
              param="category"
              basePath="/blog"
              searchParams={params}
              active={category}
              options={[
                { label: "All Articles", value: "" },
                ...categories.map((c) => ({ label: c, value: c.toLowerCase() })),
              ]}
            />
          </div>

          {rest.length > 0 ? (
            <div className="blog-grid" data-reveal-group>
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            !featured && (
              <EmptyState
                headline="Nothing yet."
                message={
                  category
                    ? "No articles in this topic yet — check back soon."
                    : "The first entries from the workshop floor are on their way."
                }
              />
            )
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <span className="kicker">Stay in the loop</span>
              <h3>
                Monthly notes<br />from the workshop.
              </h3>
              <p>
                One email a month. New builds, maintenance reminders, parts that
                landed, bikes worth a look. No spam.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {filtered.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `The Journal — ${site.name}`,
            description: DESCRIPTION,
            url: abs("/blog"),
            blogPost: filtered.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.publishedAt,
              url: abs(`/blog/${post.slug}`),
            })),
          }}
        />
      )}
    </>
  );
}
