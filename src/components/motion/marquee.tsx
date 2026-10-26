"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import styles from "./motion.module.css";

export function SignalMarquee() {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motion.enabled, () => {
        let tween: gsap.core.Tween | null = null;
        let trigger: ReturnType<typeof ScrollTrigger.create> | null = null;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            tween = gsap.to(track.current, {
              xPercent: -50,
              duration: 28,
              ease: "none",
              repeat: -1,
              onReverseComplete: () => {
                if (tween) tween.totalTime(tween.duration() * 100);
              },
            });
            trigger = ScrollTrigger.create({
              trigger: container.current,
              start: "top bottom",
              end: "bottom top",
              onUpdate: (self) => {
                if (!tween) return;
                tween.timeScale(
                  self.direction *
                    (1 + Math.min(Math.abs(self.getVelocity()) / 1800, 2)),
                );
                gsap.to(tween, {
                  timeScale: self.direction,
                  duration: 1,
                  ease: motion.ease,
                  overwrite: true,
                });
              },
            });
            observer.disconnect();
          },
          { rootMargin: "150px" },
        );
        observer.observe(container.current!);
        return () => {
          observer.disconnect();
          trigger?.kill();
          if (tween) {
            gsap.killTweensOf(tween);
            tween.revert();
          }
        };
      });
      return () => media.revert();
    },
    { scope: container },
  );
  return (
    <div ref={container} className={styles.marquee} aria-hidden="true">
      <div ref={track} className={styles.marqueeTrack}>
        {[0, 1].map((set) => (
          <div key={set} className={styles.marqueeSet}>
            <span>Sense.</span>
            <i>✳</i>
            <span>Alert.</span>
            <i>✳</i>
            <span>Respond.</span>
            <i>✳</i>
          </div>
        ))}
      </div>
    </div>
  );
}
