import { defineField, defineType, defineArrayMember } from "sanity";
import { Users } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import meta from "../common/meta";

export default defineType({
  name: "career",
  title: "Career",
  type: "document",
  icon: Users,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      description: 'e.g. "Revenue Management Executive"',
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      description: 'e.g. "Revenue & Distribution"',
      group: "settings",
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      group: "settings",
      initialValue: "Full-time",
      options: {
        list: [
          { title: "Full-time", value: "Full-time" },
          { title: "Part-time", value: "Part-time" },
          { title: "Contract", value: "Contract" },
          { title: "Internship", value: "Internship" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Colombo / Remote"',
      group: "settings",
    }),
    defineField({
      name: "isActive",
      title: "Active Listing",
      type: "boolean",
      description: "Toggle off to hide this role without deleting it",
      group: "settings",
      initialValue: true,
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      description: "Background image shown in the page hero",
      group: "settings",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    // Role Introduction — WYSIWYG
    defineField({
      name: "intro",
      title: "Role Introduction",
      type: "block-content",
      description: "Introduction paragraph shown at the top of the role content",
      group: "content",
    }),
    defineField({
      name: "responsibilities",
      title: "What You'll Do",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "requirements",
      title: "What We're Looking For",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "niceToHave",
      title: "Nice to Have",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "benefits",
      title: "What We Offer",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Benefit Title" }),
            defineField({ name: "description", type: "text", title: "Description", rows: 2 }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    // Special Note — column-builder section at the bottom of role content
    defineField({
      name: "specialNote",
      title: "Special Note",
      type: "column-builder",
      description: "Shown as a navy callout at the bottom of the role. Add an Intro Content block for the eyebrow/heading, then Body Text, etc.",
      group: "content",
    }),
    // Apply / Enquiry Form
    defineField({
      name: "enquiryForm",
      title: "Application Form",
      type: "object",
      description: "Select the form to display in the Apply Now sidebar.",
      group: "settings",
      fields: [
        defineField({
          name: "selectedFormConfig",
          title: "Form Configuration",
          description: "Email settings — recipient, subject, from name",
          type: "reference",
          to: [{ type: "formConfig" }],
        }),
        defineField({
          name: "selectedFormSheet",
          title: "Form Fields",
          description: "The set of fields to display in the form",
          type: "reference",
          to: [{ type: "formSheet" }],
        }),
      ],
    }),
    meta,
    orderRankField({ type: "career" }),
  ],
  preview: {
    select: { title: "title", dept: "department", type: "employmentType" },
    prepare({ title, dept, type }) {
      return { title, subtitle: [type, dept].filter(Boolean).join(" · ") };
    },
  },
});
