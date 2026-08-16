"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Main image with a thumbnail strip — design/bike.html `.bd-gallery`.
 *
 * All images stay mounted and cross-fade with opacity, so switching a
 * thumbnail never re-requests the file.
 */
export default function Gallery({
  images,
  alt,
  badge,
}: {
  images: string[];
  alt: string;
  badge?: string;
}) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;

  return (
    <div className="bd-gallery">
      <div className="bd-main-img">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === active ? alt : ""}
            fill
            sizes="(max-width: 1000px) 100vw, 55vw"
            priority={i === 0}
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          />
        ))}
        {badge && <span className="badge">{badge}</span>}
      </div>

      {images.length > 1 && (
        <div className="bd-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`bd-thumb${i === active ? " active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1} of ${images.length}`}
              aria-pressed={i === active}
            >
              <Image src={src} alt="" fill sizes="140px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
