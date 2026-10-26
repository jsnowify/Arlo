import { site } from "@/config/site";

// schema.org data for search engines and AI assistants. It describes the site honestly: a
// fictional showcase and a personal upskilling project, so there is no Product, Offer or
// Organization markup that would suggest something is for sale.
const absolute = (path = "/") => new URL(path, site.url).toString();

const authorId = absolute("/#author");
const websiteId = absolute("/#website");

type Item = { question: string; answer: string };

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": authorId,
        name: site.author.name,
        alternateName: "Snowi",
        url: site.author.url,
        sameAs: [site.author.url],
        description:
          "Designer and front-end developer. Arlo is one of their upskilling projects.",
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absolute("/"),
        name: site.name,
        description: site.description,
        abstract: site.upskilling,
        inLanguage: "en",
        author: { "@id": authorId },
        creator: { "@id": authorId },
      },
    ],
  };
}

export function webPage({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absolute(path),
    url: absolute(path),
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    author: { "@id": authorId },
  };
}

export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: site.name, path: "/" }, ...trail].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

// The answers must match what is visible on the page.
export function faqPage(items: readonly Item[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

// A list of named things on a page. Each entry is a CreativeWork, never a Product.
export function itemList(
  name: string,
  items: { name: string; description: string; image?: string; id?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        description: item.description,
        identifier: item.id,
        image: item.image ? absolute(item.image) : undefined,
        creator: { "@id": authorId },
      },
    })),
  };
}
