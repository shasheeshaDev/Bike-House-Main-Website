import Link from "next/link";
import Icon from "./icon";
import ServiceCardMedia from "./service-card-media";
import type { Service } from "@/lib/types";

/**
 * A card on the services grid.
 *
 * Stays a server component: only the background media needs client code, and
 * it is a leaf, so the card's content is still rendered and streamed as HTML.
 * `data-bg` is what lifts that content above the media layer in CSS — cards
 * without a background keep the flat treatment untouched.
 */
export default function ServiceCard({ service }: { service: Service }) {
  const background = service.background;
  // A background whose chosen asset is missing is no background at all.
  const hasMedia = Boolean(
    background && (background.kind === "video" ? background.video : background.image),
  );

  return (
    <Link
      href={`/services/${service.slug}`}
      className="service-card"
      {...(hasMedia ? { "data-bg": background!.kind } : {})}
    >
      {hasMedia && <ServiceCardMedia background={background!} />}
      <div className="num">{service.num}</div>
      <span className="ico">
        <Icon name={service.icon} className="size-7" />
      </span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span className="more">Learn More</span>
    </Link>
  );
}
