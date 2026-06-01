import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";

type ServicesListOption1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "services-list-1" }
>;

export default function ServicesListOption1({ services }: ServicesListOption1Props) {
  if (!services || services.length === 0) return null;

  return (
    <div className="flex flex-col">
      {services.map((service, index) => (
        <Link
          key={service._id}
          href={`/services/${service.slug?.current ?? "#"}`}
          className="group grid grid-cols-[1fr_minmax(200px,320px)] md:grid-cols-[80px_1fr_minmax(260px,320px)] items-start border-b border-black/[0.08] px-5 md:px-10 lg:px-20 py-16 hover:bg-eh-cream transition-colors duration-300 no-underline"
        >
          {/* Number — auto-generated, desktop only */}
          <span className="hidden md:flex font-cormorant text-[13px] font-light text-eh-gold pt-1.5">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Content */}
          <div>
            <h3 className="font-cormorant text-[34px] font-light text-eh-navy leading-[1.2] mb-4 group-hover:text-eh-navy transition-colors duration-200">
              {service.title}
            </h3>
            <p className="font-dmSans text-[15px] font-light text-eh-midGray leading-[1.8] max-w-[540px]">
              {service.description}
            </p>
          </div>

          {/* Tags */}
          {service.tags && service.tags.length > 0 && (
            <div className="flex flex-col gap-2 pt-1.5 pl-8">
              {service.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="font-dmSans text-[11px] font-medium tracking-[0.08em] uppercase text-eh-midGray border border-black/10 px-4 py-2 w-fit"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
