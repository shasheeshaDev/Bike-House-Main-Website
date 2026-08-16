"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatLKR } from "@/lib/format";
import { site } from "@/lib/site";
import type { Bike } from "@/lib/types";

/**
 * Quick-view overlay from design/bikes.html.
 *
 * Built on the native <dialog>: showModal() supplies focus trapping,
 * Esc-to-close, an inert background and ::backdrop styling with no library.
 * The trigger is a sibling of the card link, not a descendant — a button
 * nested inside an anchor is invalid and breaks keyboard activation.
 */
export default function BikeQuickView({ bike }: { bike: Bike }) {
  const ref = useRef<HTMLDialogElement>(null);

  const specs: [string, string][] = [
    ["Engine", `${bike.engineCc} cc`],
    ["Year", String(bike.year)],
    ["Mileage", `${bike.mileageKm.toLocaleString("en-LK")} km`],
    ["Power", bike.power?.split("@")[0].trim() || "—"],
    ["Weight", bike.weight ?? "—"],
    ["Colour", bike.colour ?? "—"],
  ];

  return (
    <>
      <button
        type="button"
        className="quick-btn"
        onClick={() => ref.current?.showModal()}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        Quick View
      </button>

      <dialog
        ref={ref}
        className="qv"
        aria-label={`${bike.brand} ${bike.model} — quick view`}
        // Clicking the backdrop closes: the dialog element itself is the
        // backdrop hit-area, so only a click landing on it (not on the panel)
        // should dismiss.
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
      >
        <button
          type="button"
          className="qv-close"
          onClick={() => ref.current?.close()}
          aria-label="Close quick view"
        >
          ×
        </button>

        <div className="qv-grid">
          <div className="qv-img">
            {bike.gallery[0] && (
              <Image src={bike.gallery[0]} alt="" fill sizes="(max-width: 760px) 100vw, 55vw" />
            )}
            {bike.badge && <span className="badge">{bike.badge}</span>}
            <span className={`reg-badge${bike.registered ? "" : " unreg"}`}>
              {bike.registered ? "● Registered" : "○ Unregistered"}
            </span>
          </div>

          <div className="qv-info">
            <div className="spec-line red">
              {bike.brand} · {bike.type}
            </div>
            <h3 className="h3">{bike.model}</h3>
            <div className="qv-price">
              {formatLKR(bike.price, false)} <small>LKR</small>
            </div>

            <dl className="qv-specs">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <dt className="spec-line">{label}</dt>
                  <dd className="v">{value}</dd>
                </div>
              ))}
            </dl>

            {bike.description && <p className="qv-desc">{bike.description}</p>}

            <div className="qv-actions">
              <Link href={`/bikes/${bike.slug}`} className="btn">
                View Full Details <span className="arrow" />
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost">
                Call to Inquire
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
