import Link from "next/link";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { renderHeading } from "@/lib/render-heading";
import { PAGE_QUERYResult } from "@/sanity.types";

type Content2Block = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "content-2" }
>;

type ColumnBuilderBlock = NonNullable<Content2Block["contentBlock"]>[number];

interface ColumnBuilderRendererProps {
  blocks: ColumnBuilderBlock[] | null;
  className?: string;
}

const isPrimary = (variant?: string | null) =>
  !variant || variant === "primary" || variant === "default";

export default function ColumnBuilderRenderer({
  blocks,
  className,
}: ColumnBuilderRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className={`flex flex-col gap-6 ${className ?? ""}`}>
      {blocks.map((block) => {
        switch (block._type) {

          case "headingBlock":
            const Tag = (block.headingLevel || "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
            return (
              <Tag key={block._key} className="font-cormorant font-light text-eh-navy leading-[1.15]">
                {block.headingText}
              </Tag>
            );

          case "introContentBlock":
            return (
              <div key={block._key} className="flex flex-col gap-4">
                {block.eyebrowHeading && (
                  <p className="flex items-center gap-[10px] font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold">
                    <span className="block w-6 h-px bg-eh-gold shrink-0" />
                    {block.eyebrowHeading}
                  </p>
                )}
                {block.heading && (block.heading as any[]).length > 0 && (
                  <h2 className="font-cormorant font-light text-eh-navy leading-[1.15] [&_em]:italic [&_em]:text-eh-sand">
                    {renderHeading(block.heading as any)}
                  </h2>
                )}
                {block.description && (
                  <p className="font-dmSans text-[16px] font-light text-eh-midGray leading-[1.8]">
                    {block.description}
                  </p>
                )}
              </div>
            );

          case "bodyBlock":
            return (
              <div
                key={block._key}
                className="font-dmSans text-[16px] font-light text-eh-midGray leading-[1.8] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_em]:italic"
              >
                {block.content && <PortableTextRenderer value={block.content} />}
              </div>
            );

          case "benefitListBlock":
            return (
              <div key={block._key} className="flex flex-col gap-5">
                {(block as any).items?.map((item: { _key?: string; title?: string; description?: string }, i: number) => (
                  <div key={item._key ?? i} className="flex items-start gap-4">
                    {/* Cream box with gold dot — matches design */}
                    <div className="w-10 h-10 bg-eh-cream flex items-center justify-center shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-eh-gold" />
                    </div>
                    <div>
                      {item.title && (
                        <p className="font-dmSans text-[15px] font-medium text-eh-navy mb-1">
                          {item.title}
                        </p>
                      )}
                      {item.description && (
                        <p className="font-dmSans text-[14px] font-light text-eh-midGray leading-[1.6]">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );

          case "buttonGroupBlock":
            return (
              <div key={block._key} className="flex flex-wrap gap-3 mt-2">
                {block.buttons?.map((button) => {
                  const base =
                    "font-dmSans text-[12px] tracking-[0.12em] uppercase px-9 py-4 transition-all duration-200 cursor-pointer inline-block no-underline";
                  const cls = isPrimary(button.buttonVariant)
                    ? `${base} font-semibold bg-eh-gold text-eh-navy hover:bg-eh-goldLight`
                    : `${base} font-medium bg-transparent text-eh-navy border border-eh-navy/20 hover:border-eh-gold hover:text-eh-gold`;
                  const href = button.isExternal ? (button.href ?? "#") : (button.href ?? "#");
                  return button.isExternal ? (
                    <a
                      key={button._key}
                      href={href}
                      target={button.target ? "_blank" : undefined}
                      rel={button.target ? "noopener noreferrer" : undefined}
                      className={cls}
                    >
                      {button.label}
                    </a>
                  ) : (
                    <Link key={button._key} href={href} className={cls}>
                      {button.label}
                    </Link>
                  );
                })}
              </div>
            );

          case "unorderedList":
            return (
              <ul key={block._key} className="flex flex-col gap-2.5 list-none p-0">
                {block.listItems?.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-dmSans text-[15px] font-light text-eh-charcoal">
                    <span className="block w-5 h-px bg-eh-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "orderedList":
            return (
              <ol key={block._key} className="flex flex-col gap-2 list-none p-0 counter-reset-[item]">
                {block.listItems?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-dmSans text-[15px] font-light text-eh-charcoal">
                    <span className="font-cormorant text-[13px] font-light text-eh-gold shrink-0 pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            );

          case "tagBlock":
            return (
              <div key={block._key} className="flex flex-wrap gap-2">
                {block.tags?.map((tag) => (
                  <span
                    key={tag._key}
                    className="font-dmSans text-[11px] font-medium tracking-[0.08em] uppercase text-eh-midGray border border-black/10 px-4 py-2"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            );

          case "contactLinkBlock":
            return (
              <div key={block._key} className="flex flex-col gap-2">
                {block.links?.map((link) => (
                  <a
                    key={link._key}
                    href={link.href || "#"}
                    target={link.target ? "_blank" : undefined}
                    rel={link.target ? "noopener noreferrer" : undefined}
                    className="font-dmSans text-[15px] font-light text-eh-gold hover:underline transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
