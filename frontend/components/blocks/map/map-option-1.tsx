import { PAGE_QUERYResult } from "@/sanity.types";

type Map1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "map-1" }
>;

export default function Map1({ mapEmbedLink }: Map1Props) {
  if (!mapEmbedLink) return null;

  return (
    <section className="relative w-full h-[420px] overflow-hidden bg-eh-navy">
      <iframe
        src={mapEmbedLink}
        className="w-full h-full border-none"
        style={{ filter: "saturate(0.7) contrast(1.1)" }}
        title="Location Map"
        loading="lazy"
      />
    </section>
  );
}
