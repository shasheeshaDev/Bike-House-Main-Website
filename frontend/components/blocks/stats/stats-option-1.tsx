import { PAGE_QUERYResult } from "@/sanity.types";

type StatsOption1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "stats-1" }
>;

export default function StatsOption1({ stats }: StatsOption1Props) {
  if (!stats || stats.length === 0) return null;

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
    >
      {stats.map((item, i) => (
        <div
          key={item._key}
          className={`
            flex flex-col items-start gap-1.5 px-10 py-12
            bg-eh-gold
            ${i < stats.length - 1 ? "border-r border-eh-navy/15" : ""}
          `}
        >
          <span className="font-cormorant text-[48px] font-light text-eh-navy leading-none">
            {item.value}
          </span>
          <span className="font-dmSans text-[11px] font-semibold tracking-[0.1em] uppercase text-eh-navy/60">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
