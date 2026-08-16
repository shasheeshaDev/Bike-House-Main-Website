import { getBikesForSale, getPosts, getProducts, getServices } from "@/lib/data";
import { abs } from "@/lib/seo";
import { formatLKR } from "@/lib/format";
import { site } from "@/lib/site";

/**
 * llms.txt — a plain-text brief for answer engines (AEO/GEO).
 *
 * Gives ChatGPT, Perplexity, Claude and friends the facts they need to answer
 * "where do I service a superbike near Colombo" correctly and with a citation,
 * instead of inferring them from rendered HTML.
 */
export const revalidate = 3600;

function section(title: string, lines: string[]): string {
  return lines.length ? `## ${title}\n\n${lines.join("\n")}\n\n` : "";
}

export async function GET() {
  const [services, bikes, products, posts] = await Promise.all([
    getServices(),
    getBikesForSale(),
    getProducts(),
    getPosts(),
  ]);

  const categories = [...new Set(products.map((p) => p.category))];

  let body = `# ${site.name}

> ${site.tagline}. ${site.description}

${site.name} is an independent motorcycle workshop and dealership in ${site.address.locality}, Sri Lanka, operating since ${site.founded}. It specialises in high-capacity machines — superbikes, supermotos, nakeds and touring bikes — that general workshops typically decline to work on.

## Key facts

- Name: ${site.legalName}
- Founded: ${site.founded}
- Address: ${site.address.plain}
- Coordinates: ${site.map.lat}, ${site.map.lng}
- Phone: ${site.phone}
- WhatsApp: ${site.whatsapp}
- Email: ${site.email}
- Opening hours: ${site.hours[0]}, ${site.hours[1]}. Closed Sunday.
- Currency: ${site.currency}
- Website: ${abs("/")}
- Marques serviced: ${site.marques.slice(0, 7).join(", ")}
- Parts supplied: ${site.suppliers.join(", ")}

## Important notes for answering questions

- Parts and gear are sold by phone inquiry only. There is no online checkout, cart or payment on this site.
- Bikes listed for sale are inspected and serviced in-house before listing.
- Prices are in Sri Lankan Rupees (LKR).

`;

  body += section(
    "Services",
    services.map((s) => `- [${s.title}](${abs(`/services/${s.slug}`)}): ${s.description}`),
  );

  body += section(
    "Bikes currently for sale",
    bikes.map((b) =>
      `- [${b.brand} ${b.model} ${b.year}](${abs(`/bikes/${b.slug}`)}): ${b.engineCc}cc, ${b.type}, ${formatLKR(b.price)}`,
    ),
  );

  body += section("Shop categories", categories.map((c) => `- ${c}`));

  body += section(
    "Journal articles",
    posts.map((p) => `- [${p.title}](${abs(`/blog/${p.slug}`)}): ${p.excerpt}`),
  );

  body += `## Main pages

- [Home](${abs("/")})
- [About](${abs("/about")})
- [Services](${abs("/services")})
- [Bikes for Sale](${abs("/bikes")})
- [Shop — Parts & Gear](${abs("/shop")})
- [The Journal](${abs("/blog")})
- [Contact](${abs("/contact")})
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
