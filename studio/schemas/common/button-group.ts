import { defineType } from "sanity";

export default defineType({
  name: "button-group",
  type: "array",
  title: "Button Group",
  of: [{ type: "button" }],
});
