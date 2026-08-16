/**
 * Renders a JSON-LD structured-data script. Data comes only from the site's
 * own trusted content; we still escape "<" to prevent any chance of breaking
 * out of the <script> element.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
