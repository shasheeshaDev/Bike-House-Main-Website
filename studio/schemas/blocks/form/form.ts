import { MailPlus, Mails } from "lucide-react";
import { defineType, defineField } from "sanity";

export default defineType({
  name: "form",
  type: "document",
  title: "Form Section",
  icon: Mails,
  fields: [
    defineField({
      name: "selectedFormConfig",
      type: "reference",
      title: "Form Configuration",
      description: "Select a form configuration of email settings",
      to: [{ type: "formConfig" }],
    }),
    defineField({
      name: "selectedFormSheet",
      type: "reference",
      title: "Form Fields",
      description: "Select a form fields set for submissions",
      to: [{ type: "formSheet" }],
    }),
  ],
});