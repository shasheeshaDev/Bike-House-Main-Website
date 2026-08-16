import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import Preloader from "@/components/preloader";
import JsonLd from "@/components/json-ld";
import { getServices } from "@/lib/data";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Service names feed `knowsAbout` — a strong topical signal for both search
  // and answer engines, and the reason this sits in the layout rather than on
  // one page.
  const services = await getServices();

  return (
    <>
      <JsonLd data={[organizationSchema(services.map((s) => s.title)), websiteSchema()]} />
      <Preloader />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
