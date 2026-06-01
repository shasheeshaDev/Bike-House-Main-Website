import { defineType, defineField, defineArrayMember } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "banner-1",
  type: "object",
  title: "Hero Banner",
  description: "Banner 1: Home Page Hero Banner",
  icon: Images,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "block-settings",
      title: "Block Settings",
    },
  ],
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
      group: "block-settings",
    }),
    defineField({
      name: "eyebrowHeading",
      type: "string",
      title: "Eyebrow Heading",
      description: "Small label displayed above the main heading",
      group: "content",
    }),
    defineField({
      name: "heading",
      type: "array",
      title: "Heading",
      description:
        "Main heading. Select a word and click Emphasis (italic) to highlight it — e.g. 'Increase Revenue'.",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [{ title: "Emphasis", value: "em" }],
            annotations: [],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "subText",
      type: "text",
      title: "Sub Text",
      description: "Supporting paragraph displayed below the heading",
      group: "content",
      rows: 4,
    }),
    defineField({
      name: "buttons",
      type: "button-group",
      group: "content",
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "scrollIndicatorText",
      type: "string",
      title: "Scroll Indicator Text",
      description: "Label shown on the animated scroll indicator",
      group: "content",
      initialValue: "Scroll",
    }),
    defineField({
      name: "background",
      type: "background",
      group: "content",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      eyebrow: "eyebrowHeading",
      subText: "subText",
    },
    prepare({ heading, eyebrow, subText }) {
      const headingText = heading
        ?.flatMap((block: any) =>
          block._type === "block"
            ? (block.children?.map((child: any) => child.text).join("") ?? "")
            : ""
        )
        .join(" ");
      return {
        title: "Hero Banner",
        subtitle: headingText || eyebrow || subText || "Home Hero Banner",
      };
    },
  },
});
