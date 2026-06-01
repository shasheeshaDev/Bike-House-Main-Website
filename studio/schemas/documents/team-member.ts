import { defineField, defineType } from "sanity";
import { Users } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "team-member",
  title: "Team Member",
  type: "document",
  icon: Users,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Full Name",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "initials",
      type: "string",
      title: "Initials",
      description: "2–3 character initials shown when no photo is uploaded (e.g. YN)",
      group: "content",
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Role / Title",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      type: "text",
      title: "Bio",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "expertise",
      type: "array",
      title: "Expertise Tags",
      description: "Skills or specialisms shown as pills (e.g. Revenue Management, Travel Trade)",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "isFeatured",
      type: "boolean",
      title: "Featured (Co-Founder / Leadership)",
      description: "Featured members appear as large cards at the top of the team section",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "avatar",
      type: "image",
      title: "Photo",
      group: "media",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    orderRankField({ type: "team-member" }),
  ],
  preview: {
    select: { name: "name", role: "role", media: "avatar" },
    prepare({ name, role, media }) {
      return { title: name, subtitle: role, media };
    },
  },
});
