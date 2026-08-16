import Image from "next/image";
import Link from "next/link";
import BikeQuickView from "./bike-quick-view";
import { formatKm, formatLKR } from "@/lib/format";
import type { Bike } from "@/lib/types";

export default function BikeCard({
  bike,
  priority = false,
  quickView = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw",
}: {
  bike: Bike;
  priority?: boolean;
  /** Adds the hover overlay button. Listing pages only. */
  quickView?: boolean;
  sizes?: string;
}) {
  const href = `/bikes/${bike.slug}`;
  const sold = bike.status === "sold";
  const title = `${bike.brand} ${bike.model}`;

  return (
    <article className="bike-card">
      <Link href={href} className="img" aria-label={`View ${title}`}>
        {bike.gallery[0] && (
          <Image src={bike.gallery[0]} alt="" fill sizes={sizes} priority={priority} />
        )}
        {bike.badge && !sold && <span className="badge">{bike.badge}</span>}
        <span className={`reg-badge${bike.registered ? "" : " unreg"}`}>
          {bike.registered ? "● Registered" : "○ Unregistered"}
        </span>
        {sold && <span className="sold-badge">Sold</span>}
      </Link>

      {quickView && !sold && <BikeQuickView bike={bike} />}

      <div className="info">
        <div className="brand">
          {bike.brand} · {bike.type}
        </div>
        <h3>
          <Link href={href}>{bike.model}</Link>
        </h3>
        <div className="specs">
          <span>
            <strong>{bike.engineCc} cc</strong>
            <small>Engine</small>
          </span>
          <span>
            <strong>{bike.year}</strong>
            <small>Year</small>
          </span>
          <span>
            <strong>{formatKm(bike.mileageKm)}</strong>
            <small>Km</small>
          </span>
        </div>
        <div className="foot">
          <div className="price">
            {formatLKR(bike.price, false)} <small>LKR</small>
          </div>
          <Link href={href} className="btn-line">
            {sold ? "View" : bike.status === "reserved" ? "Reserved" : "View Details"}
          </Link>
        </div>
      </div>
    </article>
  );
}
