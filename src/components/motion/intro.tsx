"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { motion } from "@/lib/motion";
import styles from "./motion.module.css";

export function SiteIntro() {
  const container = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motion.enabled, () => {
        // Landing straight on a missing page: skip the intro and show the 404 at once.
        if (document.querySelector("[data-not-found]")) {
          markIntroDone();
          return;
        }
        const counter = { value: 0 };
        gsap
          .timeline({ defaults: { ease: motion.ease } })
          .set(container.current, { display: "flex" })
          .to(
            counter,
            {
              value: 100,
              duration: 1.4,
              ease: "none",
              onUpdate: () => {
                if (count.current)
                  count.current.textContent = `${Math.round(counter.value)}%`;
              },
            },
            0,
          )
          .to(container.current, { yPercent: -100, duration: 0.9 }, 1.55)
          .set(container.current, { display: "none" })
          .call(markIntroDone);
      });
      // No intro plays with reduced motion, so anything waiting for it can go straight away.
      media.add("(prefers-reduced-motion: reduce)", markIntroDone);
      return () => media.revert();
    },
    { scope: container },
  );

  return (
    <div ref={container} className={styles.intro} aria-hidden="true">
      <span ref={count} className={styles.introCount}>0%</span>
    </div>
  );
}
