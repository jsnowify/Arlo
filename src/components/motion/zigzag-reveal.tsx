"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { introDoneEvent, isIntroDone } from "@/lib/intro";
import { motion } from "@/lib/motion";
import { depth, lag, uncovering } from "@/lib/zigzag";
import styles from "./motion.module.css";

type Layer = { element: HTMLElement; edge: number };

// Two covers sit over the text. When it scrolls into view their zigzag edges sweep across,
// blue first and ink just behind, the same wipe as the page transition. With `afterIntro` it
// also waits for the first-load intro to finish, so it plays once the page is fully in view.
export function ZigzagReveal({
  children,
  afterIntro = false,
}: {
  children: ReactNode;
  afterIntro?: boolean;
}) {
  const wrap = useRef<HTMLSpanElement>(null);
  const ink = useRef<HTMLSpanElement>(null);
  const signal = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motion.enabled, () => {
        const layers: Layer[] = [
          { element: signal.current!, edge: -depth },
          { element: ink.current!, edge: -depth },
        ];
        layers.forEach((layer) => {
          layer.element.style.clipPath = uncovering(layer.edge);
        });
        let entered = false;
        let ready = !afterIntro || isIntroDone();
        const timeline = gsap.timeline({
          paused: true,
          onComplete: () => {
            wrap.current!.dataset.done = "true";
          },
        });
        layers.forEach((layer, order) => {
          timeline.to(
            layer,
            {
              edge: 100,
              duration: 0.65,
              ease: "power2.inOut",
              onUpdate: () => {
                layer.element.style.clipPath = uncovering(layer.edge);
              },
            },
            order * lag,
          );
        });
        const play = () => {
          if (entered && ready) timeline.play();
        };
        const onIntroDone = () => {
          ready = true;
          play();
        };
        if (!ready) window.addEventListener(introDoneEvent, onIntroDone);
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
          trigger.kill();
          timeline.kill();
          layers.forEach(({ element }) => element.style.removeProperty("clip-path"));
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
      <span ref={ink} className={`${styles.zigzagLayer} ${styles.zigzagInk}`} aria-hidden="true" />
      <span ref={signal} className={`${styles.zigzagLayer} ${styles.zigzagSignal}`} aria-hidden="true" />
    </span>
  );
}
