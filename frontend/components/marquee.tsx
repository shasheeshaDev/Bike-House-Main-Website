import { site } from "@/lib/site";

/**
 * Red scrolling brand strip.
 *
 * The list renders twice because the keyframe translates by -50%; a single
 * copy would leave a gap at the loop point. Decorative, so it is hidden from
 * assistive tech and stops under prefers-reduced-motion.
 */
export default function Marquee({ items = site.marques }: { items?: readonly string[] }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
