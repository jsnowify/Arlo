import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/objects", priority: 0.8 },
  { path: "/thinking", priority: 0.7 },
  { path: "/technology", priority: 0.7 },
  { path: "/good-to-know", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
