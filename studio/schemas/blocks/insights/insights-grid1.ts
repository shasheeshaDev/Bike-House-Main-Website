import { defineType, defineField } from "sanity";
import { Rss } from "lucide-react";

export default defineType({
  name: "insights-grid-1",
  type: "object",
  title: "Insights Grid",
  description: "Filterable insights grid — auto-fetches all Insight documents.",
  icon: Rss,
  fields: [
    defineField({
      name: "postsPerPage",
      type: "number",
      title: "Posts Per Page",
      description: "Number of insights to display (default: all)",
      initialValue: 0,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Insights Grid", subtitle: "Fetches all insight documents" };
    },
  },
});
