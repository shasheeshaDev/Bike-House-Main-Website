import type { Metadata } from "next";
import { Anton, Barlow_Condensed, JetBrains_Mono, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import { baseUrl, isProduction } from "@/lib/seo";
import "./globals.css";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});
const body = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "Bike House",
    "superbike service Sri Lanka",
    "motorcycle workshop Colombo",
    "ECU diagnostics Sri Lanka",
    "performance tuning motorcycle",
    "Ducati service Sri Lanka",
    "bikes for sale Sri Lanka",
    "motorcycle parts Colombo",
  ],
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_LK",
    url: baseUrl,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  // Staging and preview deployments must never be crawlable.
  robots: isProduction
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
      }
    : { index: false, follow: false },
  category: "Automotive Repair",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // next/font variables live on <html> so the :root aliases in globals.css can
  // read them — a :root alias cannot see a variable defined on <body>.
  return (
    <html
      lang="en"
      className={`${display.variable} ${condensed.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
