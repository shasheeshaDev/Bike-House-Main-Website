import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import type { RichText } from "@/lib/types";

/** Renders long-form copy from either source: plain paragraph strings
 *  (fallback data) or Portable Text blocks (Sanity). */
export default function RichBody({ value }: { value?: RichText }) {
  if (!value || value.length === 0) return null;
  if (typeof value[0] === "string") {
    return (
      <>
        {(value as string[]).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </>
    );
  }
  return <PortableText value={value as PortableTextBlock[]} />;
}
