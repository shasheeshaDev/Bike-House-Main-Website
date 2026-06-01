import { PAGE_QUERYResult } from "@/sanity.types";
import { renderHeading } from "@/lib/render-heading";

type StatsOption2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "stats-2" }
>;

export default function StatsOption2({ label, heading, body, stats }: StatsOption2Props) {
  return (
    // Outer white section — matches design's `.section { padding: 120px 80px }`
    <section className="bg-white px-5 md:px-20 py-[120px]">

      {/* Inner navy box — matches design's inner div with padding: 64px 72px */}
      <div className="bg-eh-navy px-8 md:px-[72px] py-[64px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left — text */}
        <div>
          {label && (
            <p className="flex items-center gap-[10px] font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              {label}
            </p>
          )}
          {heading && heading.length > 0 && (
            <h2 className="font-cormorant text-[40px] font-light text-white leading-[1.2] mb-5 [&_em]:italic [&_em]:text-white">
              {renderHeading(heading)}
            </h2>
          )}
          {body && (
            <p className="font-dmSans text-[15px] font-light text-white/65 leading-[1.8]">
              {body}
            </p>
          )}
        </div>

        {/* Right — 2×2 stats grid */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-[2px]">
            {stats.map((stat) => (
              <div key={stat._key} className="bg-white/5 px-7 py-8">
                <p className="font-cormorant text-[40px] font-light text-eh-gold leading-none">
                  {stat.value}
                </p>
                <p className="font-dmSans text-[11px] font-semibold tracking-[0.1em] uppercase text-white/50 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
