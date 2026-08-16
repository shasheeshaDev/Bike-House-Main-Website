import { defineField, defineType } from "sanity";

/**
 * A part or piece of gear in the Shop.
 *
 * There is no online checkout by design — the Shop is a phone-inquiry
 * catalogue — so this document carries no cart, stock count or payment fields.
 * `icon` is the fallback glyph shown when a product has no photography, which
 * is how the design renders every card.
 */
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "sales", title: "Pricing & Stock" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Product Name",
      type: "string",
      group: "overview",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "overview",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "overview",
      options: {
        list: ["Helmets", "Tires", "Suspension", "Exhausts", "Oils", "Brakes", "Gear", "Chains"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Fallback Icon",
      type: "string",
      description: "Shown on the card when there is no photo yet.",
      group: "overview",
      options: {
        list: [
          { title: "Helmet", value: "helmet" },
          { title: "Tire", value: "tire" },
          { title: "Shock / Suspension", value: "shock" },
          { title: "Exhaust", value: "exhaust" },
          { title: "Oil / Fluid", value: "oil" },
          { title: "Brake Disc", value: "disc" },
          { title: "Suit / Gear", value: "suit" },
          { title: "Chain", value: "chain" },
        ],
      },
      initialValue: "tire",
    }),
    defineField({ name: "brand", title: "Brand", type: "string", group: "overview" }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      group: "overview",
      initialValue: 100,
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "One or two lines, shown on the product card.",
      group: "overview",
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
      rows: 8,
      group: "overview",
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "overview",
    }),
    defineField({
      name: "gallery",
      title: "Photos",
      type: "array",
      description: "Optional — the category icon stands in when empty.",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "overview",
    }),

    defineField({
      name: "price",
      title: "Price (LKR)",
      type: "number",
      group: "sales",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      description: "Searchable on the Shop page.",
      group: "sales",
    }),
    defineField({
      name: "tag",
      title: "Card Tag",
      type: "string",
      description: 'Small label in the card corner — e.g. "PREMIUM"',
      group: "sales",
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      description: "Off marks the product as Special Order (2–4 week lead time).",
      group: "sales",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Show on homepage",
      type: "boolean",
      group: "sales",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "title",
      category: "category",
      brand: "brand",
      price: "price",
      inStock: "inStock",
      media: "gallery.0",
    },
    prepare({ title, category, brand, price, inStock, media }) {
      const priceLabel =
        typeof price === "number" ? `LKR ${price.toLocaleString("en-LK")}` : "No price";
      return {
        title,
        subtitle: `${[category, brand].filter(Boolean).join(" · ")} — ${priceLabel}${
          inStock === false ? " · SPECIAL ORDER" : ""
        }`,
        media,
      };
    },
  },
});
