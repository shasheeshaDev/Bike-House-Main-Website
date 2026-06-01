import { defineField, defineType, defineArrayMember } from "sanity";
import { Menu, Columns2 } from "lucide-react";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: Menu,
  fields: [
    defineField({
      name: "background",
      type: "image",
      title: "Background Image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description"
    }),
    defineField({
      name: "socialMediaLinks",
      type: "social-media-links",
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Footer Columns",
      description: "Add Link Group for a single-section column, or Multi-Section Column to stack multiple sections (e.g. Partners + Contact) in one column.",
      of: [
        { type: "link-with-label" },
        { type: "link-group" },
        defineArrayMember({
          type: "object",
          name: "footerColumn",
          title: "Multi-Section Column",
          icon: Columns2,
          fields: [
            defineField({
              name: "groups",
              title: "Sections",
              description: "Each section renders a heading + links list in the same column.",
              type: "array",
              of: [{ type: "link-group" }],
              validation: (Rule) => Rule.min(1),
            }),
          ],
          preview: {
            select: { groups: "groups" },
            prepare({ groups }) {
              const titles = groups?.map((g: any) => g.title).filter(Boolean).join(" + ");
              return { title: titles || "Multi-Section Column", subtitle: `${groups?.length ?? 0} sections` };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "bottomLinks",
      title: "Bottom Links",
      description: "Shown in the footer bottom bar — e.g. Privacy Policy, Terms of Use",
      type: "array",
      of: [{ type: "link-with-label" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});
