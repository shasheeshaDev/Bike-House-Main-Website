import Link from "next/link";

/**
 * Category chips as real links — no client JS, crawlable, and each filtered
 * view has its own URL.
 */
export default function FilterChips({
  legend,
  options,
  active,
  param,
  basePath,
  searchParams,
}: {
  legend?: string;
  options: { label: string; value: string }[];
  active: string;
  param: string;
  basePath: string;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const hrefFor = (value: string) => {
    const next = new URLSearchParams();
    for (const [key, raw] of Object.entries(searchParams)) {
      if (key === param || key === "page" || raw == null) continue;
      next.set(key, Array.isArray(raw) ? raw[0] : raw);
    }
    if (value) next.set(param, value);
    const qs = next.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="chip-row">
      {legend && <span className="spec-line">{legend}</span>}
      {options.map((option) => (
        <Link
          key={option.value || "all"}
          href={hrefFor(option.value)}
          scroll={false}
          className="chip cat-chip"
          // Case-insensitive to match how the pages actually filter: a URL
          // typed or shared as ?category=Tires selects the same products, so
          // it must light the same chip.
          aria-current={
            option.value.toLowerCase() === active.toLowerCase() ? "true" : undefined
          }
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
