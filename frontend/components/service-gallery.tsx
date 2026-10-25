import Image from "next/image";
import type { ServiceShot } from "@/lib/types";

/**
 * A service's work in photographs — a masonry wall, captions optional.
 *
 * Masonry by CSS `columns` rather than a grid or a layout library: the shots
 * are mixed portrait and landscape, and `columns` is the one approach that
 * packs them without measuring anything in JavaScript. `grid-template-rows:
 * masonry` would be tidier, but it is still not reliable across browsers, and
 * this is a server component precisely so the wall costs no client bundle.
 *
 * Each shot is a <figure>. When a story is present it becomes the <figcaption>
 * and carries the meaning, so the image takes empty alt rather than repeating
 * the caption to a screen reader; without one, the image needs its own alt and
 * falls back to a description built from the service.
 */
export default function ServiceGallery({
  shots,
  serviceTitle,
}: {
  shots: ServiceShot[];
  serviceTitle: string;
}) {
  if (shots.length === 0) return null;

  return (
    <div className="srv-wall" data-reveal-group>
      {shots.map((shot, i) => {
        const described = Boolean(shot.alt || shot.story);
        return (
          <figure className="srv-shot" key={`${shot.image}-${i}`}>
            <Image
              src={shot.image}
              alt={shot.alt ?? (shot.story ? "" : `${serviceTitle} at Bike House`)}
              width={shot.width}
              height={shot.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
              // The first row is close enough to the fold to be worth eager
              // loading; the rest of a long wall is not.
              loading={i < 3 ? "eager" : "lazy"}
              {...(described ? {} : { "aria-hidden": true })}
            />
            {shot.story && <figcaption>{shot.story}</figcaption>}
          </figure>
        );
      })}
    </div>
  );
}
