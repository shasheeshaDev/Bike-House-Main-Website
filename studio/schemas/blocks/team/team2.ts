import { defineType, defineField, defineArrayMember } from "sanity";
import { Users } from "lucide-react";

export default defineType({
  name: "team-members-2",
  type: "object",
  title: "Full Team Grid",
  description: "4-column compact team grid — auto-fetches all non-featured Team Member documents.",
  icon: Users,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({ name: "padding", type: "section-padding", group: "block-settings" }),
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      description: 'Eyebrow label e.g. "The Team"',
      group: "content",
    }),
    defineField({
      name: "heading",
      type: "array",
      title: "Heading",
      description: "Use Emphasis (italic) to highlight key words.",
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
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 3,
      group: "content",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Full Team Grid", subtitle: "Auto-fetches non-featured team members" };
    },
  },
});
