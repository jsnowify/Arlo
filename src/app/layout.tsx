import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/brand/footer";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SiteIntro } from "@/components/motion/intro";
import { PageTransition } from "@/components/motion/page-transition";
import { JsonLd } from "@/components/seo/json-ld";
import { archivo, jetBrainsMono, spaceGrotesk } from "@/config/fonts";
import { site } from "@/config/site";
import { siteGraph } from "@/lib/structured-data";
import "lenis/dist/lenis.css";
import "@/styles/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.author.name, url: site.author.url }],
  creator: site.author.name,
  publisher: site.author.name,
  category: "design",
  // Google Search Console ownership. The matching HTML file is in public/.
  verification: { google: "iB53T08hbGrfdsAmrKTVhocsuFV5rgOwT5imiFu2Iu8" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/ARLO-white.png", type: "image/png", sizes: "32x32" },
      { url: "/ARLO-white.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/ARLO-white.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#141815",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${archivo.variable}`}
    >
      <body>
        <JsonLd data={siteGraph()} />
        <SiteIntro />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
