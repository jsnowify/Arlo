import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { jetBrainsMono, spaceGrotesk } from "@/config/fonts";
import { site } from "@/config/site";
import "lenis/dist/lenis.css";
import "@/styles/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  icons: {
    icon: [{ url: site.logo, type: "image/svg+xml", sizes: "any" }],
    shortcut: site.logo,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
