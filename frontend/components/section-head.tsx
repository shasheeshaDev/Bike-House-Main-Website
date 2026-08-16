import Link from "next/link";

/** Label + heading on the left, meta on the right, ruled off underneath. */
export default function SectionHead({
  label,
  heading,
  meta,
  metaHref,
}: {
  label?: string;
  /** Use \n for the design's deliberate two-line headings. */
  heading: string;
  meta?: string;
  metaHref?: string;
}) {
  return (
    <div className="section-head" data-reveal>
      <div>
        {label && <div className="label">{label}</div>}
        <h2 className="h2">
          {heading.split("\n").map((line, i, all) => (
            <span key={i}>
              {line}
              {i < all.length - 1 && <br />}
            </span>
          ))}
        </h2>
      </div>
      {meta && (
        <div className="meta">
          {metaHref ? <Link href={metaHref}>{meta} →</Link> : meta}
        </div>
      )}
    </div>
  );
}
