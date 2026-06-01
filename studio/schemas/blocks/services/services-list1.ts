import { defineType, defineField } from "sanity";
import { List } from "lucide-react";

export default defineType({
  name: "services-list-1",
  type: "object",
  title: "Services List",
  description: "Numbered services list — auto-fetches all Service documents.",
  icon: List,
  groups: [
    { name: "content", title: "Content", default: true },
  ],
  fields: [
    defineField({
      name: "showAll",
      type: "boolean",
      title: "Show All Services",
      description: "When enabled, displays all published services in order",
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Services List", subtitle: "Fetches all service documents" };
    },
  },
});
