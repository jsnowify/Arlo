import { site } from "@/config/site";
import { technologies } from "@/data/technology";
import { demoProducts } from "@/data/products";

// A plain-text summary for AI assistants and answer engines (the llms.txt convention).
// It says first and clearly what this site is, so it is never described as a real company.
const page = (path: string) => new URL(path, site.url).toString();

export function GET() {
  const body = `# ${site.name}

> ${site.description}

## What this is

- ${site.upskilling}
- Everything on the site is fictional: five wearable device concepts that do not exist. No company manufactures them, no prototypes exist, and nothing is for sale, reserved, pre-ordered or priced.
- Technical readouts, ratings and figures (for example IP68 or BT 5.3) are illustrative and are not verified specifications or certifications.
- The site collects no personal information. The email field in the footer is a display-only mock and sends nothing.

## Creator

- ${site.author.name} (also known as Snowi), designer and front-end developer.
- Portfolio and contact: ${site.author.url}
- Anyone who wants something like this built can contact them or visit the portfolio.

## The five concepts

${demoProducts.map((product) => `- ${product.name} (${product.id}): ${product.format}. ${product.description}`).join("\n")}

## The six imagined systems

${technologies.map((tech) => `- ${tech.name} (${tech.id}, ${tech.stage}): ${tech.summary}`).join("\n")}

## Pages

- [Home](${page("/")}): the concept in brief, the products, a storyboard day, the design language and FAQs.
- [The objects](${page("/objects")}): all five concepts with galleries and design notes.
- [The thinking](${page("/thinking")}): the Sense, Alert, Respond idea behind the collection.
- [Technology](${page("/technology")}): six fictional systems and which object uses them.
- [Good to know](${page("/good-to-know")}): plain answers about what the site is and is not.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
