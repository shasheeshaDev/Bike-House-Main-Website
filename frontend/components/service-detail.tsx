import Image from "next/image";
import Link from "next/link";
import Icon from "./icon";
import type { Service } from "@/lib/types";

/**
 * The alternating copy/visual band on /services — design `.srv-detail`.
 *
 * The design details three of the eight service lines and alternates their
 * sides (`.rev`) and backgrounds. Both are derived from the index here rather
 * than hard-coded, so the rhythm continues correctly however many services the
 * CMS returns.
 *
 * The visual is, in order of preference: a photo, the monospace scan-tool
 * readout the design gives ECU Diagnostics, or the service's own line icon —
 * so a service added in the Studio with neither still renders a complete band.
 */
export default function ServiceDetail({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const reversed = index % 2 === 1;

  const visual = service.image ? (
    <div className="srv-visual">
      <Image
        src={service.image}
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, 45vw"
      />
    </div>
  ) : service.readout?.length ? (
    <div className="srv-visual srv-readout">
      <pre>{service.readout.join("\n")}</pre>
    </div>
  ) : (
    <div className="srv-visual srv-visual-icon">
      <Icon name={service.icon} className="size-20" />
    </div>
  );

  return (
    <section
      id={service.slug}
      className={`section${reversed ? "" : " section-alt"}`}
      aria-labelledby={`${service.slug}-heading`}
    >
      <div className="container">
        <div className={`srv-detail${reversed ? " rev" : ""}`} data-reveal-group>
          {/* Source order stays copy-then-visual so the heading is read first;
              `.rev` swaps them visually only. */}
          <div className="srv-copy">
            <span className="kicker">
              {service.num} / {service.title}
            </span>

            <h2 className="h2" id={`${service.slug}-heading`}>
              {(service.headline ?? service.title)
                .split("\n")
                .map((line, i, all) => (
                  <span key={i}>
                    {line}
                    {i < all.length - 1 && <br />}
                  </span>
                ))}
            </h2>

            <p className="srv-intro">{service.intro ?? service.description}</p>

            {service.includes && service.includes.length > 0 && (
              <ul className="srv-list">
                {service.includes.map((item) => (
                  <li className="spec-line" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <div className="srv-cta">
              {/* Short visible label, descriptive accessible name — eight
                  bands otherwise give a screen reader eight identical
                  "Full details" links with no way to tell them apart. */}
              <Link
                className="btn btn-ghost"
                href={`/services/${service.slug}`}
                aria-label={`Full details on ${service.title}`}
              >
                Full Details <span className="arrow" />
              </Link>
            </div>
          </div>

          {visual}
        </div>
      </div>
    </section>
  );
}
