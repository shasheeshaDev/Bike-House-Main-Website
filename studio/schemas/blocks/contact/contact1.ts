import { defineType, defineField, defineArrayMember } from "sanity";
import { Mail } from "lucide-react";

export default defineType({
  name: "contact-1",
  type: "object",
  title: "Contact Section",
  description: "Tabbed contact forms — add multiple form tabs, each with its own panel content and form.",
  icon: Mail,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "map", title: "Map" },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({ name: "padding", type: "section-padding", group: "block-settings" }),

    // Page header
    defineField({
      name: "label",
      type: "string",
      title: "Eyebrow Label",
      description: 'e.g. "Reach Out"',
      group: "content",
    }),
    defineField({
      name: "heading",
      type: "array",
      title: "Page Heading",
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

    // Dynamic form tabs
    defineField({
      name: "forms",
      type: "array",
      title: "Form Tabs",
      description: "Each item becomes a tab. The first tab is active by default.",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "formTab",
          title: "Form Tab",
          fields: [
            // Tab toggle label
            defineField({ name: "tabLabel", type: "string", title: "Tab Label", description: 'Shown in the tab bar e.g. "For Hotels & Operators"', validation: (Rule) => Rule.required() }),

            // Left panel content
            defineField({ name: "panelLabel", type: "string", title: "Panel Eyebrow", description: 'e.g. "Get in Touch"' }),
            defineField({
              name: "panelHeading",
              type: "array",
              title: "Panel Heading",
              description: "Use Emphasis (italic) to highlight key words.",
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
            defineField({ name: "panelDescription", type: "text", title: "Panel Description", rows: 3 }),
            defineField({
              name: "contactDetails",
              type: "array",
              title: "Contact Details",
              description: "Label/value pairs shown in the left panel",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "label", type: "string", title: "Label", validation: (Rule) => Rule.required() }),
                    defineField({ name: "value", type: "string", title: "Value", validation: (Rule) => Rule.required() }),
                  ],
                  preview: {
                    select: { label: "label", value: "value" },
                    prepare: ({ label, value }) => ({ title: label, subtitle: value }),
                  },
                }),
              ],
            }),
            defineField({ name: "panelCta", type: "button", title: "Panel CTA Button", description: "Optional button shown at the bottom of the left panel" }),

            // Form configuration
            defineField({ name: "formTitle", type: "string", title: "Form Title", description: 'Shown above the form e.g. "Strategy Consultation Request"' }),
            defineField({
              name: "selectedFormConfig",
              type: "reference",
              title: "Form Configuration",
              description: "Email settings — recipient, subject, from name",
              to: [{ type: "formConfig" }],
            }),
            defineField({
              name: "selectedFormSheet",
              type: "reference",
              title: "Form Fields",
              description: "The set of fields to display",
              to: [{ type: "formSheet" }],
            }),
            defineField({ name: "successTitle", type: "string", title: "Success Title", initialValue: "Thank you" }),
            defineField({ name: "successMessage", type: "text", title: "Success Message", rows: 2, initialValue: "We've received your enquiry and will be in touch shortly." }),
          ],
          preview: {
            select: { tabLabel: "tabLabel", formTitle: "formTitle" },
            prepare: ({ tabLabel, formTitle }) => ({ title: tabLabel || "Form Tab", subtitle: formTitle }),
          },
        }),
      ],
    }),

    // Map
    defineField({
      name: "mapEmbedUrl",
      type: "url",
      title: "Map Embed URL",
      description: "OpenStreetMap or Google Maps embed URL",
      group: "map",
    }),
    defineField({
      name: "mapLabel",
      type: "string",
      title: "Map Label",
      description: "Label shown over the map",
      group: "map",
      initialValue: "Elevate Hospitality — Sri Lanka & Global Markets",
    }),
  ],
  preview: {
    select: { forms: "forms" },
    prepare({ forms }) {
      return { title: "Contact Section", subtitle: `${forms?.length ?? 0} form tab${forms?.length !== 1 ? "s" : ""}` };
    },
  },
});
