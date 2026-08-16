import type { Testimonial } from "@/lib/types";

export default function TestimonialCard({ item }: { item: Testimonial }) {
  const initial = item.name.trim().charAt(0).toUpperCase();
  const rating = item.rating ?? 0;

  return (
    <figure className="testimonial">
      {rating > 0 && (
        <div className="stars" aria-label={`${rating} out of 5`}>
          <span aria-hidden="true">{"★".repeat(rating)}</span>
        </div>
      )}
      <blockquote className="quote">{item.quote}</blockquote>
      <figcaption className="who">
        <div className="avatar" aria-hidden="true">
          {initial}
        </div>
        <div>
          <div className="name">{item.name}</div>
          {item.role && <div className="role">{item.role}</div>}
        </div>
      </figcaption>
    </figure>
  );
}
