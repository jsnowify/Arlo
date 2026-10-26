import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Search engines and AI crawlers are all welcome: the point of this site is to be found,
// read and described correctly (a fictional upskilling project, not a shop).
const assistants = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...assistants.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
