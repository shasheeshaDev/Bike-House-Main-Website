import { site } from "@/lib/site";
import type { Testimonial } from "@/lib/types";

/**
 * A review card — design `.testimonial`.
 *
 * Google-sourced reviews are somebody else's words, so they carry three things
 * a written testimonial does not: the reviewer's own photo, the date they left
 * it, and a link to the review on Google. The link is the point — a quote a
 * visitor can go and check is worth more than one they cannot.
 */
export default function TestimonialCard({ item }: { item: Testimonial }) {
  const initial = item.name.trim().charAt(0).toUpperCase();
  const rating = item.rating ?? 0;
  const fromGoogle = item.source === "google";
  // Per-review first, then the listing's reviews page. Either is something a
  // visitor can actually open; with neither, the credit stays plain text.
  const href = item.reviewUrl || site.googleReviewsUrl || null;

  // Month and year only: a review's exact day is noise, and the month is what
  // tells a reader whether the workshop is still this good.
  const reviewed =
    item.publishedAt &&
    new Date(item.publishedAt).toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });

  return (
    <figure className="testimonial">
      {rating > 0 && (
        <div className="stars" aria-label={`${rating} out of 5`}>
          <span aria-hidden="true">{"★".repeat(rating)}</span>
        </div>
      )}
      <blockquote className="quote">{item.quote}</blockquote>
      <figcaption className="who">
        {item.authorPhoto ? (
          // Reviewer avatars are hotlinked from Google's CDN, which is not in
          // next.config's remotePatterns and should not be — an arbitrary
          // remote host behind the image optimiser is a cost and a liability.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="avatar"
            src={item.authorPhoto}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="avatar" aria-hidden="true">
            {initial}
          </div>
        )}
        <div>
          <div className="name">{item.name}</div>
          {item.role && <div className="role">{item.role}</div>}
          {fromGoogle && (
            <div className="role src">
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer nofollow">
                  Google review{reviewed ? ` · ${reviewed}` : ""}
                </a>
              ) : (
                <>Google review{reviewed ? ` · ${reviewed}` : ""}</>
              )}
            </div>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
