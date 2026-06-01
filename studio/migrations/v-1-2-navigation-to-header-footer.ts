// @ts-ignore
import { defineMigration, createOrReplace } from "sanity/migrate";

interface NavigationDocument {
  _id: string;
  _type: "navigation";
  title: string;
  links?: Array<any>;
}

// Global state to collect data from navigation documents
let headerData: { links: any[]; ctaLinks: any[] } = { links: [], ctaLinks: [] };
let footerData: { links: any[]; bottomLinks: any[] } = {
  links: [],
  bottomLinks: [],
};
let processedDocuments = new Set<string>();

export default defineMigration({
  title: "Move navigation data to header and footer documents",

  migrate: {
    document(doc: NavigationDocument, context: any) {
      // Only process navigation documents
      if (doc._type !== "navigation") {
        return;
      }

      const { title, links } = doc;
      const normalizedTitle = title?.toLowerCase();

      // Collect data based on navigation title
      switch (normalizedTitle) {
        case "header":
          if (!processedDocuments.has("header")) {
            headerData.links = links || [];
            processedDocuments.add("header");
            console.log(
              `📎 Collected header navigation data (${links?.length || 0} links)`
            );
          }
          break;

        case "header action":
          if (!processedDocuments.has("header action")) {
            headerData.ctaLinks = links || [];
            processedDocuments.add("header action");
            console.log(
              `🔗 Collected header action data (${links?.length || 0} CTA links)`
            );
          }
          break;

        case "footer":
          if (!processedDocuments.has("footer")) {
            footerData.links = links || [];
            processedDocuments.add("footer");
            console.log(
              `🦶 Collected footer navigation data (${links?.length || 0} links)`
            );
          }
          break;

        case "footer bottom":
          if (!processedDocuments.has("footer bottom")) {
            footerData.bottomLinks = links || [];
            processedDocuments.add("footer bottom");
            console.log(
              `📍 Collected footer bottom data (${links?.length || 0} bottom links)`
            );
          }
          break;

        default:
          console.log(`⏭️ Skipping navigation with title: ${title}`);
          return;
      }

      // For the first document of each type, create the corresponding singleton
      // For all matching documents, delete them
      const operations = [];

      // Create header document only once (on first "header" document)
      if (
        normalizedTitle === "header" &&
        !processedDocuments.has("header-created")
      ) {
        operations.push(
          createOrReplace({
            _id: "header",
            _type: "header",
            links: headerData.links,
            ctaLinks: headerData.ctaLinks,
          })
        );
        processedDocuments.add("header-created");
        console.log("✅ Created header document");
      }

      // Create footer document only once (on first "footer" document)
      if (
        normalizedTitle === "footer" &&
        !processedDocuments.has("footer-created")
      ) {
        operations.push(
          createOrReplace({
            _id: "footer",
            _type: "footer",
            links: footerData.links,
            bottomLinks: footerData.bottomLinks,
          })
        );
        processedDocuments.add("footer-created");
        console.log("✅ Created footer document");
      }

      // Return the operations to create new documents
      // We'll handle document deletion separately to avoid API conflicts
      return operations;
    },
  },
});
