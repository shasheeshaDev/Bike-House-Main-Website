import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";
import { ICON_VARIANTS } from "../../common/icon-variants";

export default defineType({
  name: "page-hero",
  type: "object",
  title: "Page Hero",
  description: "Full-width hero for inner pages — Services, About, Shop, etc.",
  icon: LayoutTemplate,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "notice",  title: "Notice Widget" },
  ],
  fields: [
    // ── Heading ────────────────────────────────────────────────────────────
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      group: "content",
      description: 'Main heading in Anton font. e.g. "What we" (line break added automatically)',
    }),
    defineField({
      name: "headingAccent",
      title: "Heading Accent",
      type: "string",
      group: "content",
      description: 'Second line rendered in brand red. e.g. "do best."',
    }),

    // ── Description ────────────────────────────────────────────────────────
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "content",
      description: "Lead paragraph shown below the heading (max 62ch in the design).",
    }),

    // ── Buttons ────────────────────────────────────────────────────────────
    defineField({
      name: "buttons",
      title: "Button Group",
      type: "button-group",
      group: "content",
      description: "Optional CTAs shown below the description.",
    }),

    // ── Notice widget ──────────────────────────────────────────────────────
    defineField({
      name: "showNotice",
      title: "Show Notice Widget",
      type: "boolean",
      initialValue: false,
      group: "notice",
      description: 'Enable the notice box below the description — e.g. "PHONE-INQUIRY ONLY" on the Shop page.',
    }),
    defineField({
      name: "noticeIcon",
      title: "Icon",
      type: "string",
      group: "notice",
      initialValue: "phone",
      options: {
        list: ICON_VARIANTS.map(({ title, value }) => ({ title, value })),
      },
      hidden: ({ parent }) => !parent?.showNotice,
    }),
    defineField({
      name: "noticeEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "notice",
      description: 'Small red uppercase label. e.g. "PHONE-INQUIRY ONLY"',
      hidden: ({ parent }) => !parent?.showNotice,
    }),
    defineField({
      name: "noticeTitle",
      title: "Title",
      type: "string",
      group: "notice",
      description: 'Larger display text. e.g. "Call +94 77 123 4567 to order"',
      hidden: ({ parent }) => !parent?.showNotice,
    }),
    defineField({
      name: "noticeLink",
      title: "Link",
      type: "link-with-label",
      group: "notice",
      description: "Makes the entire notice widget clickable (e.g. tel: link to the phone number).",
      hidden: ({ parent }) => !parent?.showNotice,
    }),
  ],
  preview: {
    select: {
      heading:       "heading",
      headingAccent: "headingAccent",
      showNotice:    "showNotice",
    },
    prepare({ heading, headingAccent, showNotice }) {
      return {
        title: "Page Hero",
        subtitle: [heading, headingAccent].filter(Boolean).join(" ") || "No heading set",
        ...(showNotice ? { media: LayoutTemplate } : {}),
      };
    },
  },
});
