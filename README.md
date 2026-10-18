# Arlo

Next.js App Router, TypeScript, GSAP, and Lenis. Styles use plain CSS and CSS Modules.

## Commands

```powershell
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- `npm run lint` checks the code with ESLint.
- `npm run build` builds the production app and checks TypeScript.
- `npm start` serves the production build.

## Project structure

```text
public/
  ARLO.svg                       Shared logo and browser icon
src/
  app/
    globals.css                  Global styles and typography
    layout.tsx                   Metadata and app providers
    page.tsx                     Homepage route
  components/
    brand/
      logo.tsx                   Reusable logo component
      logo.module.css            Logo sizing and light variant
    home/
      hero.tsx                   Homepage content and entrance animation
      hero.module.css            Homepage styles
    providers/
      smooth-scroll.tsx          Lenis lifecycle and GSAP ticker integration
  config/
    fonts.ts                     Space Grotesk and JetBrains Mono
    site.ts                      Shared site name, description, and asset paths
  lib/
    gsap.ts                      GSAP plugin registration and shared setup
  styles/
    tokens.css                   Brand palette and semantic theme tokens
```

## Branding

`public/ARLO.svg` is the single source for the site logo and browser icon. Site metadata and asset paths live in `src/config/site.ts`.

## Theme and typography

The theme uses the supplied palette reference: near-black and charcoal surfaces, off-white text, and electric-blue accents. The swatches were matched visually because the reference did not include hex values. Edit the palette and semantic color tokens in `src/styles/tokens.css`.

Space Grotesk is the default font for headings and body text. JetBrains Mono is available through `--font-mono` and the `.font-mono` utility, and is applied to code, keyboard, sample, and preformatted text. Both fonts use Next.js font optimization and are served by the app; Google Fonts is contacted during the build.

Use `<Logo tone="light" />` on dark surfaces and the default `<Logo />` on light surfaces. Both variants use the original SVG asset.

## Animation and scrolling

Import the registered `gsap`, `useGSAP`, and `ScrollTrigger` from `@/lib/gsap` in client components. Keep animations scoped to a component and let `useGSAP` handle cleanup.

The root smooth-scroll provider drives Lenis from GSAP's ticker, keeps ScrollTrigger synchronized, supports anchor links, and cleans up on unmount. Lenis and the homepage animation respect reduced-motion preferences. Native touch scrolling remains enabled.

See the [Next.js docs](https://nextjs.org/docs), [GSAP React guide](https://gsap.com/resources/React/), and [Lenis docs](https://github.com/darkroomengineering/lenis).
# Arlo
