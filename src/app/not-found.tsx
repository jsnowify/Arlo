import type { Metadata } from "next";
import { PageFrame } from "@/components/brand/page-frame";
import styles from "@/components/pages/not-found.module.css";
import { RippleButton } from "@/components/ui/ripple-button";
import { site } from "@/config/site";

// Shown for any address that doesn't exist. It is kept out of search results.
export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist on Arlo, a fictional wearable concept showcase.",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/objects", label: "The objects" },
  { href: "/thinking", label: "The thinking" },
  { href: "/technology", label: "Technology" },
  { href: "/good-to-know", label: "FAQs" },
];

export default function NotFound() {
  return (
    <PageFrame>
      <section className={styles.notFound} aria-labelledby="not-found-title">
        {/* Tells the intro and the page transition to skip their animations for this page. */}
        <span data-not-found hidden />
        <h1 id="not-found-title">404</h1>
        <p className={styles.lead}>This page doesn&rsquo;t exist.</p>
        <p className={styles.note}>
          {site.name} is a small, fictional showcase and an upskilling project by{" "}
          {site.author.name}, so there are only a few pages. Try one of these instead.
        </p>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <RippleButton href={link.href}>{link.label}</RippleButton>
            </li>
          ))}
        </ul>
      </section>
    </PageFrame>
  );
}
