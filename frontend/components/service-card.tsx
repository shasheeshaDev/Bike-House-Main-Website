import Link from "next/link";
import Icon from "./icon";
import type { Service } from "@/lib/types";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="service-card">
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
