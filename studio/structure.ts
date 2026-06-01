import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  Files,
  User,
  Quote,
  Menu,
  Settings,
  Info,
  FileText,
  Briefcase,
  Hotel,
  BarChart,
  Users,
  BookOpen,
  Tag,
  UserCircle,
} from "lucide-react";
import { defaultDocumentNode } from "./defaultDocumentNode";

export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    .items([
      // ── Pages ──────────────────────────────────────────────
      orderableDocumentListDeskItem({
        type: "page",
        title: "Pages",
        icon: Files,
        S,
        context,
      }),

      S.divider(),

      // ── EH Content Types ──────────────────────────────────
      orderableDocumentListDeskItem({
        type: "service",
        title: "Services",
        icon: Briefcase,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: "partner",
        title: "Partners",
        icon: Hotel,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: "case-study",
        title: "Case Studies",
        icon: BarChart,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: "career",
        title: "Careers",
        icon: Users,
        S,
        context,
      }),

      S.listItem()
        .title("Insights")
        .icon(BookOpen)
        .child(
          S.documentTypeList("insight")
            .title("Insights")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),

      orderableDocumentListDeskItem({
        type: "team-member",
        title: "Team Members",
        icon: UserCircle,
        S,
        context,
      }),

      S.divider(),

      // ── References ────────────────────────────────────────
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(
          S.documentTypeList("category")
            .title("Categories")
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),

      S.listItem()
        .title("Tags")
        .icon(Tag)
        .child(
          S.documentTypeList("tag")
            .title("Tags")
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),

      orderableDocumentListDeskItem({
        type: "partner-category",
        title: "Partner Categories",
        icon: Tag,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: "author",
        title: "Authors",
        icon: User,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: "testimonial",
        title: "Testimonials",
        icon: Quote,
        S,
        context,
      }),

      S.divider(),

      // ── Global / Settings ─────────────────────────────────
      S.listItem()
        .title("Forms")
        .icon(FileText)
        .child(
          S.list()
            .title("Forms")
            .items([
              S.documentTypeListItem("formConfig").title("Form Configurations"),
              S.documentTypeListItem("formSheet").title("Form Fields"),
            ])
        ),

      S.listItem()
        .title("Pop-up Banner")
        .icon(Info)
        .child(
          S.editor().id("banner").schemaType("banner").documentId("banner")
        ),

      S.listItem()
        .title("Header")
        .icon(Menu)
        .child(
          S.editor().id("header").schemaType("header").documentId("header")
        ),

      S.listItem()
        .title("Footer")
        .icon(Menu)
        .child(
          S.editor().id("footer").schemaType("footer").documentId("footer")
        ),

      S.listItem()
        .title("Settings")
        .icon(Settings)
        .child(
          S.editor()
            .id("settings")
            .schemaType("settings")
            .documentId("settings")
        ),
    ]);
