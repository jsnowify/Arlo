import type { Metadata } from "next";
import { site } from "@/config/site";

// Per-page metadata: its own title and description, a canonical address, and the social cards.
// The image comes from app/opengraph-image.tsx and app/twitter-image.tsx.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      title,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
