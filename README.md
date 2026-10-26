# Arlo — The Signal Room

A fictional wearable concept showcase built with Next.js App Router, TypeScript, GSAP, and Lenis. The creative direction treats five device concepts as objects in a design lab: chalk surfaces, graphite chambers, oxidized silver, and precise electric-blue signals.

## Run locally

```powershell
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `npm run build` creates the production app and checks TypeScript; `npm start` serves it. `npm run lint` is available for ESLint.

## Design and content

- `src/styles/tokens.css`: palette, spacing, typography, and CSS motion tokens.
- `src/config/fonts.ts`: Syne display typography, Space Grotesk body text, and JetBrains Mono for object identifiers. Syne is bundled locally from the Google Fonts project in `src/assets/fonts/`, with its SIL Open Font License. Next.js self-hosts all fonts; the existing Space Grotesk and JetBrains Mono setup contacts Google Fonts at build time.
- `src/data/products.ts`: five fictional product names, descriptions, design notes, and gallery images.
- `src/data/home.ts`: supporting hero copy, information dialogs, collection introduction, and FAQs.
- `src/config/site.ts`: metadata, logo, and the shared demo notice.
- `public/ARLO.svg`: the original brand symbol. All supplied product images remain in `public/imgs/`.

## Experience

The single homepage route and the existing `#product`, `#collection`, and `#questions` anchors are retained. A new `#approach` anchor leads to the brand story.

The hero introduces a floating ring concept inside a custom SVG signal diagram, with masked typography and layered scroll parallax. The dark Sense / Alert / Respond sequence pins on desktop and progresses through the three ideas. Its counters represent the actual five concepts, three ideas, and one design language; they are not business or performance claims.

The desktop collection pins and moves horizontally through five editorial compositions. Previous and next controls offer another way to browse. Keyboard focus moves the relevant object into view. On mobile, tablet, reduced-motion devices, and without JavaScript, the collection uses a readable vertical layout. Product imagery swaps on pointer hover, and View details opens the same accessible three-image galleries and design notes.

The header hides on downward scroll and returns on upward scroll. The full-screen menu uses a native dialog for focus containment, Escape dismissal, and background scroll locking. Technology and Explore the demo preserve the existing information-dialog features. The `/technology` page describes six fictional systems (`src/data/technology.ts`) and which objects use them; the `/objects` page stacks the same product panels as the homepage collection, and `/good-to-know` reuses the homepage FAQ section. FAQs use native expandable `details` elements. The footer has an oversized animated wordmark and links back into the experience.

## Motion architecture

`src/lib/gsap.ts` registers GSAP, ScrollTrigger, and useGSAP. `src/lib/motion.ts` centralizes easing, durations, stagger, scrub settings, and media queries. Reusable components live in `src/components/motion/`:

- `SplitText`: masked word reveals with real text content.
- `Reveal`: staggered section entrances.
- `Magnetic`: subtle pointer-responsive controls.
- `useTilt`: a small perspective response on product imagery, limited to fine pointers.
- `SiteIntro`: a branded header reveal lasting under two seconds; the hero stays visible and input is never intercepted.
- `SignalMarquee`: a continuous text strip that responds to scroll direction and velocity.
- `CustomCursor`: contextual View and Again cues on selected interactive surfaces.
- `PageTransition`: a route-change fade mounted in the shared layout. The first page paint stays visible; subsequent routes fade in.

The Lenis provider handles smooth scrolling and GSAP ticker synchronization on fine pointers. Touch devices and reduced-motion visitors use native scrolling without an additional animation loop. GSAP matchMedia contexts clean up animations and pins when breakpoints or motion preferences change. Heavy animation, the intro, cursor, desktop pinning, and hover motion are disabled for reduced motion.

## Demo-only contract

Every product presentation, card, and detail dialog displays a visible **FOR DEMO** badge. All concepts are fictional, for display only, and not for sale. No prices, checkout, payments, reservations, waitlists, contact details, or customer claims are provided. Readouts and technical markings in the original artwork are illustrative, not verified specifications or certifications.

The shared footer appears throughout the application and states: “This is a demo website. Products shown are for display purposes only and are not for sale.” The footer's email field is a display-only mock: its submit handler discards the input and nothing is stored or sent. The site does not collect personal information and needs no database or external services at runtime.

## SEO, GEO and AEO

The site says plainly that it is a fictional showcase and a personal upskilling project by Joshua “Snowi” Cambronero.

- **Metadata:** `src/app/layout.tsx` sets the title template, description, keywords, canonical, Open Graph and Twitter cards; each page uses `pageMetadata()` from `src/lib/seo.ts`. Share cards come from `src/app/opengraph-image.tsx`.
- **Crawling:** `src/app/robots.ts` (search engines and AI crawlers are allowed), `src/app/sitemap.ts`, `src/app/manifest.ts`.
- **Structured data (schema.org JSON-LD):** `src/lib/structured-data.ts`. `Person`, `WebSite`, `WebPage`, `BreadcrumbList`, `ItemList` and `FAQPage` only. There is deliberately no `Product`, `Offer` or `Organization` markup, so nothing implies that anything is for sale.
- **Answer engines:** the first FAQ is "What is this website?", and the FAQ text matches its `FAQPage` data. `/llms.txt` (`src/app/llms.txt/route.ts`) is a plain-text summary for AI assistants.
- **Site address:** set `NEXT_PUBLIC_SITE_URL` to the live address. On Vercel the production domain is used automatically; locally it falls back to `http://localhost:3000`.

## Credit

Designed and built by Joshua “Snowi” Cambronero (`site.author` in `src/config/site.ts`). The footer and the maker section link to the portfolio at https://snowi-cambronero.vercel.app/ for anyone who wants something similar made. That link is about the author, not the products: the demo still offers no way to buy, reserve or contact anyone about the objects.

## Dependencies

The overhaul reuses the installed GSAP, @gsap/react, Lenis, Next.js, and React packages. No runtime dependencies were added. CSS Modules and plain CSS remain the styling convention.
