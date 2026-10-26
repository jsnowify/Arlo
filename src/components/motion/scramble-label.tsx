"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import styles from "./scramble-label.module.css";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// A link or button label styled and animated like the GET EARLY ACCESS button: bracketed, mono,
// upper case, in a box as wide as the text so nothing moves while the letters scramble. The
// scramble has that button's timing (a short delay, a left-to-right settle, a quick clean-up when
// the pointer leaves), and the brackets slide out and the text dims. It finds the nearest <a> or
// <button> itself, so it can sit inside any of them.
export function ScrambleLabel({ text: source }: { text: string }) {
  const text = source.toUpperCase();
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = label.current;
    const owner = element?.closest<HTMLElement>("a, button");
    if (!element || !owner) return;
    let tween: gsap.core.Tween | null = null;

    const reset = () => {
      tween?.kill();
      tween = null;
      element.textContent = text;
    };

    const start = () => {
      reset();
      if (!window.matchMedia(motion.enabled).matches) return;
      const counter = { value: 0 };
      tween = gsap.to(counter, {
        value: text.length,
        delay: 0.14,
        duration: 0.7,
        ease: "power2.inOut",
        onUpdate: () => {
          const revealed = Math.floor(counter.value);
          element.textContent = Array.from(text, (letter, index) =>
            letter === " " || index < revealed || !/[A-Z0-9]/.test(letter)
              ? letter
              : characters[Math.floor(Math.random() * characters.length)],
          ).join("");
        },
        onComplete: () => {
          element.textContent = text;
        },
      });
    };

    const stop = () => {
      tween?.kill();
      tween = null;
      if (!window.matchMedia(motion.enabled).matches) {
        element.textContent = text;
        return;
      }
      // Whatever is showing now clears quickly from left to right.
      const current = element.textContent || text;
      const counter = { value: 0 };
      tween = gsap.to(counter, {
        value: text.length,
        duration: 0.3,
        ease: "power2.out",
        onUpdate: () => {
          const revealed = Math.floor(counter.value);
          element.textContent = text.slice(0, revealed) + current.slice(revealed);
        },
        onComplete: () => {
          element.textContent = text;
        },
      });
    };

    owner.addEventListener("pointerenter", start);
    owner.addEventListener("focus", start);
    owner.addEventListener("pointerleave", stop);
    owner.addEventListener("blur", stop);
    return () => {
      owner.removeEventListener("pointerenter", start);
      owner.removeEventListener("focus", start);
      owner.removeEventListener("pointerleave", stop);
      owner.removeEventListener("blur", stop);
      reset();
    };
  }, [text]);

  return (
    <span className={styles.root}>
      <span className={styles.bracket} aria-hidden="true">
        [
      </span>
      <span ref={label} className={styles.text} style={{ width: `${text.length}ch` }}>
        {text}
      </span>
      <span className={styles.bracket} aria-hidden="true">
        ]
      </span>
    </span>
  );
}
