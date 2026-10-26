"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import styles from "./signal-story.module.css";

const ideas = [
  {
    word: "Sense.",
    title: "Start with awareness.",
    copy: "Imagine information that belongs with you. Not another screen to check. A quieter way to stay in the picture.",
  },
  {
    word: "Alert.",
    title: "Make the important clear.",
    copy: "One line of blue. One unmistakable shape. An exploration of signals that ask for just enough attention.",
  },
  {
    word: "Respond.",
    title: "Leave room for instinct.",
    copy: "Across five forms, the same considered details. A shared design language that feels familiar before it feels complicated.",
  },
];

const stats = [
  { value: 5, label: "Wearable concepts" },
  { value: 3, label: "Shared ideas" },
  { value: 1, label: "Design language" },
];

// Two turns of 0-9, so each digit can spin a full lap before it settles.
const reelDigits = [...Array(10).keys(), ...Array(10).keys()];
const pad = (value: number) => String(value).padStart(2, "0");

// Where the drop lands, as a fraction of the section width.
const dropX = 0.17;
const bulbSize = 40;
// How far below the section edge the drop lands (center of the circle).
const landing = 44;

export function SignalStory() {
  const container = useRef<HTMLElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const dripRoot = useRef<HTMLDivElement>(null);
  const dripStalk = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motion.enabled, () => {
        const area = reveal.current!;
        // Radius needed for the circle to cover the whole section from the drop point.
        const cover = () => {
          const { width, height } = area.getBoundingClientRect();
          const x = width * dropX;
          return Math.hypot(Math.max(x, width - x), height) + 8;
        };
        gsap.set(area, { "--cx": () => `${area.clientWidth * dropX}px` });
        const stalk = dripStalk.current!;
        // The reveal box starts at the bottom edge of the hero card (one gutter above the
        // section), so a single circle can hang from the card, fall, and then fill the section.
        const gap = () => -dripRoot.current!.offsetTop;
        // The ink row clips its own background to the same circle, so it needs its offset in the section.
        const inkRow = container.current!.querySelector<HTMLElement>("[data-ink-row]")!;
        const measureRow = () => inkRow.style.setProperty("--row-top", `${inkRow.offsetTop}px`);
        measureRow();
        ScrollTrigger.addEventListener("refreshInit", measureRow);
        gsap.set(inkRow, { "--tone": 0 });
        const radius = bulbSize / 2;
        gsap.set(stalk, { height: 0, scaleX: 1, opacity: 1 });
        gsap.set(area, { "--r": "0px", "--cy": "0px", "--strip": 0 });
        // Scrubbed with scroll: the drop swells under the card, stretches on a thinning neck,
        // pinches off, lands on the section edge and spreads until it fills it.
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top 92%",
            end: "top 8%",
            scrub: motion.scrub,
            invalidateOnRefresh: true,
          },
        });
        timeline
          .to(area, { "--r": `${radius}px`, "--cy": `${radius}px`, duration: 0.5, ease: "power2.out" }, 0)
          .to(stalk, { height: radius, duration: 0.5, ease: "power2.out" }, 0)
          .to(area, { "--cy": () => `${radius + gap() * 0.5}px`, duration: 0.6, ease: "power1.in" }, 0.5)
          .to(stalk, { height: () => radius + gap() * 0.5, scaleX: 0.3, duration: 0.6, ease: "power1.in" }, 0.5)
          .to(stalk, { opacity: 0, duration: 0.15 }, 1.1)
          .to(area, { "--cy": () => `${gap() + landing}px`, duration: 0.5, ease: "power2.in" }, 1.1)
          // Once landed, the gutter between hero and section goes back to paper so the
          // section keeps a clean top edge under the hero cards.
          .to(area, { "--strip": 1, duration: 0.01 }, 1.6)
          .to(area, { "--r": () => `${cover()}px`, duration: 2.8, ease: "power2.in" }, 1.6)
          // The ink row's text flips to paper around when the circle crosses it.
          .to(inkRow, { "--tone": 1, duration: 0.8, ease: "none" }, 3.1);

        const reels = Array.from(
          container.current!.querySelectorAll<HTMLElement>("[data-reel]"),
        );
        // Start every digit at 0; each one then spins a lap and lands on its number.
        gsap.set(reels, { "--pos": 0 });
        const animations: gsap.core.Tween[] = [];
        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          reels.forEach((reel, order) => {
            const digit = Number(reel.dataset.reel);
            animations.push(
              gsap.to(reel, {
                // The reel holds 0-9 twice, so landing on digit + 10 is one full lap.
                "--pos": digit + 10,
                duration: 1.4 + (order % 2) * 0.35,
                delay: Math.floor(order / 2) * 0.18,
                ease: "power3.out",
              }),
            );
          });
          observer.disconnect();
        });
        observer.observe(reels[0].closest("[data-stats]")!);
        return () => {
          observer.disconnect();
          ScrollTrigger.removeEventListener("refreshInit", measureRow);
          gsap.set(inkRow, { clearProps: "--tone,--row-top" });
          animations.forEach((animation) => animation.kill());
          reels.forEach((reel) => gsap.set(reel, { "--pos": Number(reel.dataset.reel) }));
          gsap.set(area, { clearProps: "--cx,--cy,--r,--strip" });
          gsap.set(stalk, { clearProps: "all" });
        };
      });
      return () => media.revert();
    },
    { scope: container },
  );
  return (
    <section
      ref={container}
      id="approach"
      className={styles.story}
      aria-labelledby="story-title"
    >
      <div
        ref={dripRoot}
        className={styles.drip}
        style={{ left: `calc(${dropX * 100}% - ${bulbSize / 2}px)` }}
        aria-hidden="true"
      >
        <span ref={dripStalk} className={styles.stalk} />
      </div>
      <div ref={reveal} className={styles.reveal} data-story-reveal>
        <h2 id="story-title" className={styles.srOnly}>
          Sense. Alert. Respond.
        </h2>
        {ideas.map((idea, index) => (
          <div
            key={idea.word}
            className={styles.row}
            data-ink-row={index === 1 ? "" : undefined}
          >
            <p className={styles.word} aria-hidden="true">
              {idea.word}
            </p>
            <div className={styles.note}>
              <h3>{idea.title}</h3>
              <p>{idea.copy}</p>
            </div>
          </div>
        ))}
        <div className={styles.stats} data-stats>
          <p>
            Different objects.
            <br />
            <span>The same point of view.</span>
          </p>
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong aria-label={pad(stat.value)}>
                {pad(stat.value)
                  .split("")
                  .map((digit, position) => (
                    <span key={position} className={styles.digit} aria-hidden="true">
                      <span
                        className={styles.reel}
                        data-reel={digit}
                        style={{ "--pos": Number(digit) } as CSSProperties}
                      >
                        {reelDigits.map((value, index) => (
                          <span key={index}>{value}</span>
                        ))}
                      </span>
                    </span>
                  ))}
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
