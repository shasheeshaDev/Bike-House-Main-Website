import { FileSliders } from "lucide-react";
import { defineType, defineField } from "sanity";

export default defineType({
  name: "formConfig",
  type: "document",
  title: "Form Configuration",
  icon: FileSliders,
  fields: [
    defineField({ name: "formName", type: "string", title: "Form Configuration Name" }),
    defineField({ name: "formSubject", type: "string", title: "Form Subject" }),
    defineField({ name: "toEmail", type: "string", title: "To Email Address" }),
    defineField({
      name: "ccEmails",
      type: "array",
      title: "CC Email Addresses",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bccEmails",
      type: "array",
      title: "BCC Email Addresses",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "fromName",
      type: "string",
      title: "From Name",
      description: "Name to set in the From header",
    }),
    // defineField({
    //   name: "fromEmail",
    //   type: "string",
    //   title: "From Email Address",
    //   description: "Email address to set in the From header",
    // }),
    defineField({
      name: "replyToEmail",
      type: "string",
      title: "Reply-To Email Address",
      description: "Email address to set in the Reply-To header",
    }),
  ],
});
