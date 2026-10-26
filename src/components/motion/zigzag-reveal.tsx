"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { introDoneEvent, isIntroDone } from "@/lib/intro";
import { motion } from "@/lib/motion";
import { lag, makeBand } from "@/lib/zigzag";
import styles from "./motion.module.css";

// Two covers sit over the text. When it scrolls into view their zigzag edges sweep across,
// blue first and ink just behind, the same wipe as the page transition. With `afterIntro` it
// also waits for the first-load intro to finish, so it plays once the page is fully in view.
// The shape is drawn once and only moved with a transform (see lib/zigzag.ts), so it stays
// smooth on a phone.
export function ZigzagReveal({
  children,
  afterIntro = false,
}: {
  children: ReactNode;
  afterIntro?: boolean;
}) {
  const wrap = useRef<HTMLSpanElement>(null);
  const mask = useRef<HTMLSpanElement>(null);
  const ink = useRef<HTMLSpanElement>(null);
  const signal = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motion.enabled, () => {
        const layers = [signal.current!, ink.current!];
        // Sizes the band to the text, with teeth that suit its height, and parks it covering.
        const layout = () => {
          const { width, height } = mask.current!.getBoundingClientRect();
          const band = makeBand(width, height, Math.max(3, Math.round(height / 30)), 22);
          layers.forEach((layer) =>
            gsap.set(layer, { width: band.bandWidth, height, clipPath: band.clip, x: band.rest }),
          );
          return band;
        };
        layout();

        let entered = false;
        let ready = !afterIntro || isIntroDone();
        let timeline: gsap.core.Timeline | undefined;
        const play = () => {
          if (!entered || !ready || timeline) return;
          const band = layout();
          timeline = gsap.timeline({
            onComplete: () => {
              wrap.current!.dataset.done = "true";
            },
          });
          layers.forEach((layer, order) => {
            timeline!.to(layer, { x: band.end, duration: 0.5, ease: "power2.inOut" }, order * lag);
          });
        };
        const onIntroDone = () => {
          ready = true;
          play();
        };
        if (!ready) window.addEventListener(introDoneEvent, onIntroDone);
        // If the text reflows before it plays, fit the band to its new size.
        const refit = () => {
          if (!timeline) layout();
        };
        ScrollTrigger.addEventListener("refreshInit", refit);
        const trigger = ScrollTrigger.create({
          trigger: wrap.current,
          start: "top 88%",
          once: true,
          onEnter: () => {
            entered = true;
            play();
          },
        });
        return () => {
          window.removeEventListener(introDoneEvent, onIntroDone);
          ScrollTrigger.removeEventListener("refreshInit", refit);
          trigger.kill();
          timeline?.kill();
          layers.forEach((layer) => gsap.set(layer, { clearProps: "all" }));
          delete wrap.current?.dataset.done;
        };
      });
      return () => media.revert();
    },
    { scope: wrap },
  );

  return (
    <span ref={wrap} className={styles.zigzagWrap}>
      {children}
      <span ref={mask} className={styles.zigzagMask} aria-hidden="true">
        <span ref={ink} className={`${styles.zigzagLayer} ${styles.zigzagInk}`} />
        <span ref={signal} className={`${styles.zigzagLayer} ${styles.zigzagSignal}`} />
      </span>
    </span>
  );
}
