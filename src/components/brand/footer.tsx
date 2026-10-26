"use client";

import Link from "next/link";
import { useRef, type FormEvent } from "react";
import { DemoDialog } from "@/components/demo/demo-dialog";
import pages from "@/components/pages/pages.module.css";
import { ScrambleLabel } from "@/components/motion/scramble-label";
import { site } from "@/config/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import styles from "./footer.module.css";

const links = [
  { href: "/objects", label: "The objects" },
  { href: "/technology", label: "Technology" },
  { href: "/thinking", label: "The thinking" },
  { href: "/good-to-know", label: "Good to know" },
];

export function SiteFooter() {
  const container = useRef<HTMLElement>(null);
  const notice = useRef<HTMLDialogElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motion.enabled, () => {
        let animation: gsap.core.Tween | null = null;
        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          animation = gsap.from(
            container.current!.querySelectorAll("[data-footer-letter]"),
            {
              yPercent: 100,
              rotation: 4,
              stagger: 0.08,
              duration: 1.2,
              ease: motion.ease,
            },
          );
          observer.disconnect();
        });
        observer.observe(
          container.current!.querySelector("[data-footer-wordmark]")!,
        );
        return () => {
          observer.disconnect();
          animation?.revert();
        };
      });
      return () => media.revert();
    },
    { scope: container },
  );

  // Display only: nothing is read, stored or sent. The dialog says so.
  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    notice.current?.showModal();
  }

  return (
    <footer ref={container} className={styles.footer}>
      <div className={styles.panel}>
        <div className={styles.top}>
          <p className={styles.tagline}>
            Fictional objects.
            <br />
            Real curiosity.
          </p>
          <nav aria-labelledby="footer-nav-title" className={styles.navigation}>
            <p id="footer-nav-title" className={styles.label}>
              Navigation
            </p>
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <ScrambleLabel text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <form className={styles.subscribe} onSubmit={subscribe}>
            <label htmlFor="footer-email" className={styles.label}>
              Get the latest from Arlo
            </label>
            <div className={styles.field}>
              <input
                id="footer-email"
                type="email"
                placeholder="Email Address"
                autoComplete="off"
              />
              <button type="submit">Subscribe</button>
            </div>
          </form>
        </div>
        <div className={styles.bottom}>
          <p>{site.demoNotice}</p>
          <span>Arlo / The Signal Room</span>
        </div>
        <div className={styles.credit}>
          <p>
            An upskilling project designed and built by{" "}
            <a href={site.author.url} target="_blank" rel="noopener noreferrer">
              {site.author.name}
            </a>
            . Want something like this made? Contact me or visit my portfolio.
          </p>
          <a
            href={site.author.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.creditLink}
            aria-label="Visit the portfolio of Joshua Snowi Cambronero (opens in a new tab)"
          >
            <ScrambleLabel text="Visit portfolio" />
          </a>
        </div>
        <Link
          data-footer-wordmark
          href="/#product"
          className={styles.wordmark}
          aria-label="ARLO — back to the beginning"
        >
          {"ARLO".split("").map((letter, index) => (
            <span key={index} className={styles.letterMask} aria-hidden="true">
              <span data-footer-letter>{letter}</span>
            </span>
          ))}
        </Link>
      </div>
      <DemoDialog
        dialogRef={notice}
        title="This isn't a real product website."
        description="Arlo is a fictional design demonstration. There is no newsletter, no product and nothing to subscribe to."
      >
        <p className={pages.dialogNote}>
          The email address you entered was not sent, stored or read.
        </p>
        <Link
          href="/objects"
          className={pages.dialogLink}
          onClick={() => notice.current?.close()}
        >
          <ScrambleLabel text="Browse the objects" />
        </Link>
      </DemoDialog>
    </footer>
  );
}
