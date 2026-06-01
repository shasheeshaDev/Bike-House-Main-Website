type HeadingSpan = {
  _key: string;
  _type: "span";
  text?: string;
  marks?: string[];
};

type HeadingBlock = {
  _key: string;
  _type: "block";
  children?: HeadingSpan[];
};

export function renderHeading(
  blocks: HeadingBlock[]
): React.ReactNode {
  return blocks.flatMap((block) => {
    if (block._type !== "block" || !block.children) return [];
    return block.children.map((span) =>
      span.marks?.includes("em") ? (
        <em key={span._key} className="italic text-eh-sand">
          {span.text}
        </em>
      ) : (
        <span key={span._key}>{span.text}</span>
      )
    );
  });
}
