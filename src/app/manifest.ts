import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#f0f1ed",
    theme_color: "#141815",
    icons: [
      { src: "/ARLO-white.png", sizes: "32x32", type: "image/png" },
      { src: "/ARLO-white.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
