// Set NEXT_PUBLIC_SITE_URL to the live address. On Vercel, the production domain is picked up
// automatically; locally it falls back to localhost.
const url =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "Arlo",
  url,
  title: "Arlo: a fictional wearable concept showcase",
  description:
    "Arlo is a fictional collection of five wearable device concepts and a personal upskilling project by Joshua “Snowi” Cambronero. A design demonstration for display only; nothing is for sale.",
  // Said plainly wherever it helps people, search engines and AI assistants understand the site.
  upskilling:
    "Arlo is an upskilling project by Joshua “Snowi” Cambronero, built to practise design, motion and front-end development. It is not a real company or product.",
  keywords: [
    "Arlo",
    "fictional wearable concepts",
    "wearable design concept",
    "design study",
    "upskilling project",
    "Next.js portfolio project",
    "GSAP animation",
    "Joshua Snowi Cambronero",
  ],
  demoNotice:
    "This is a demo website. Products shown are for display purposes only and are not for sale.",
  logo: "/ARLO.svg",
  author: {
    name: "Joshua “Snowi” Cambronero",
    url: "https://snowi-cambronero.vercel.app/",
  },
} as const;
