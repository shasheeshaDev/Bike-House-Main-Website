import { defineType, defineField, defineArrayMember } from "sanity";
import { Users } from "lucide-react";

export default defineType({
  name: "team-members-1",
  type: "object",
  title: "Team Members",
  description: "Team member section — auto-fetches all Team Member documents. Featured shown as large cards, rest in compact grid.",
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
      description: 'Eyebrow label e.g. "Leadership"',
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
      return { title: "Team Members", subtitle: "Auto-fetches all team members" };
    },
  },
});
