import { FileSpreadsheet } from "lucide-react";
import { defineType, defineField } from "sanity";

export default defineType({
  name: "formSheet",
  type: "document",
  icon: FileSpreadsheet,
  title: "Form Fields",
  fields: [
    defineField({ name: "formSheetName", type: "string", title: "Form Sheet Name" }),
    defineField({
      name: "fields",
      type: "array",
      title: "Fields",
      description: "Fields to be included in the form sheet",
      of: [{ type: "formField" }],
    }),
    defineField({
      name: "submitButtonText",
      type: "string",
      title: "Submit Button Text",
      initialValue: "Send Message",
    }),
    defineField({
      name: "successMessage",
      type: "text",
      title: "Success Message",
      description: "Message shown after successful submission",
      initialValue: "Thank you for your enquiry. We'll be in touch soon!",
    }),
  ],
});
