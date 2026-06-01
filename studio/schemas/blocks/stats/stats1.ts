import { defineType, defineField, defineArrayMember } from "sanity";
import { BarChart2 } from "lucide-react";

export default defineType({
  name: "stats-1",
  type: "object",
  title: "Stats Bar",
  description: "Gold stats bar — headline figures with labels, shown in a horizontal row.",
  icon: BarChart2,
  groups: [
    { name: "content", title: "Content", default: true },
  ],
  fields: [
    defineField({
      name: "stats",
      type: "array",
      title: "Stats",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", title: "Value", description: 'e.g. "20+" or "Sri Lanka"' }),
            defineField({ name: "label", type: "string", title: "Label", description: 'e.g. "Partner Properties"' }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(6),
    }),
  ],
  preview: {
    select: { stats: "stats" },
    prepare({ stats }) {
      return {
        title: "Stats Bar",
        subtitle: stats?.map((s: any) => s.value).join(" · ") || "No stats",
      };
    },
  },
});
