import { PAGE_QUERYResult } from "@/sanity.types";
import { renderHeading } from "@/lib/render-heading";

type ContentOption7Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "content-7" }
>;

type Panel = NonNullable<ContentOption7Props["leftPanel"]>;

function SplitPanel({
  panel,
  dark,
}: {
  panel: Panel | null | undefined;
  dark: boolean;
}) {
  if (!panel) return null;

  return (
    <div
      className={`flex flex-col justify-center gap-6 px-8 md:px-[72px] py-20
        ${dark ? "bg-eh-navy" : "bg-eh-cream"}`}
    >
      {panel.label && (
        <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold">
          <span className="block w-6 h-px bg-eh-gold shrink-0" />
          {panel.label}
        </p>
      )}
      {panel.heading && panel.heading.length > 0 && (
        <h3
          className={`font-cormorant text-[36px] font-light leading-[1.2]
            [&_em]:italic [&_em]:text-eh-sand
            ${dark ? "text-white" : "text-eh-navy"}`}
        >
          {renderHeading(panel.heading)}
        </h3>
      )}
      {panel.items && panel.items.length > 0 && (
        <ul className="flex flex-col gap-2.5 list-none p-0">
          {panel.items.map((item, i) => (
            <li
              key={i}
              className={`relative pl-5 font-dmSans text-[14px] font-light leading-[1.6]
                before:content-['—'] before:absolute before:left-0 before:text-eh-gold before:text-[12px]
                ${dark ? "text-white/65" : "text-eh-midGray"}`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ContentOption7({ leftPanel, rightPanel }: ContentOption7Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <SplitPanel panel={leftPanel} dark={true} />
      <SplitPanel panel={rightPanel} dark={false} />
    </div>
  );
}
