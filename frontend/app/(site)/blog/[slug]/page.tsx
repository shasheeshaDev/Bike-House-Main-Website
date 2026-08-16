import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/json-ld";
import PostCard, { PostMeta } from "@/components/post-card";
import RichBody from "@/components/rich-body";
import SectionHead from "@/components/section-head";
import { getPost, getPosts, getRelatedPosts } from "@/lib/data";
import { isoDate } from "@/lib/format";
import { abs, articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return pageMetadata(parent, {
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    images: [post.image],
    type: "article",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);
  const url = abs(`/blog/${post.slug}`);
  const initial = (post.author ?? site.name).trim().charAt(0).toUpperCase();

  const shares = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      path: "M9 8H6v4h3v8h4v-8h3l1-4h-4V6.5C13 5.5 13.5 5 14.5 5H17V1h-3c-3 0-5 1.8-5 5v2Z",
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`,
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}`,
      path: "M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.2.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2Z",
    },
  ];

  return (
    <>
      <article>
        <section className="post-hero">
          <div className="container">
            <nav aria-label="Breadcrumb" className="crumbs">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><span aria-hidden="true">/</span><Link href="/blog">Journal</Link></li>
                <li><span aria-hidden="true">/</span><span aria-current="page">{post.title}</span></li>
              </ol>
            </nav>
            <PostMeta post={post} />
            <h1 className="post-title">{post.title}</h1>
          </div>
        </section>

        <div className="post-cover">
          <Image src={post.image} alt="" fill sizes="100vw" priority />
        </div>

        <div className="post-body">
          <p className="post-excerpt">{post.excerpt}</p>
          <RichBody value={post.body} />

          <div className="post-share">
            <span className="label">Share this article</span>
            <div className="links">
              {shares.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="author-block" data-reveal>
            <div className="av" aria-hidden="true">{initial}</div>
            <div>
              <div className="name">{post.author ?? site.name}</div>
              <div className="role">
                {post.authorRole ?? "Workshop Team"} ·{" "}
                <time dateTime={isoDate(post.publishedAt)}>{isoDate(post.publishedAt)}</time>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHead
              label="[ Keep Reading ]"
              heading={"More from\nthe Journal."}
              meta="All Articles"
              metaHref="/blog"
            />
            <div className="blog-grid" data-reveal-group>
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
    </>
  );
}
