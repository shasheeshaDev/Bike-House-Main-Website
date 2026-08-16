import Image from "next/image";
import Link from "next/link";
import { formatDate, isoDate } from "@/lib/format";
import type { Post } from "@/lib/types";

export function PostMeta({ post }: { post: Post }) {
  return (
    <div className="meta">
      <span className="red">{post.category}</span>
      {" · "}
      <time dateTime={isoDate(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
      {post.readTime ? ` · ${post.readTime}` : ""}
    </div>
  );
}

export default function PostCard({
  post,
  priority = false,
  sizes = "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw",
}: {
  post: Post;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card">
      <div className="img">
        <Image src={post.image} alt="" fill sizes={sizes} priority={priority} />
      </div>
      <PostMeta post={post} />
      <h4>{post.title}</h4>
      <p className="excerpt">{post.excerpt}</p>
    </Link>
  );
}
