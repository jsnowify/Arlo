"use client";

import { useRef } from "react";
import { Logo } from "@/components/brand/logo";
import { site } from "@/config/site";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./hero.module.css";

export function HomeHero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-animate]", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
        });
      });

      return () => media.revert();
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className={styles.hero}
      aria-labelledby="home-title"
    >
      <div data-animate>
        <Logo width={80} tone="light" priority />
      </div>
      <h1 id="home-title" data-animate className={styles.title}>
        {site.name}
      </h1>
    </section>
  );
}
