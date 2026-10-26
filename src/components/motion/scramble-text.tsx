"use client";

import { useEffect, useRef } from "react";
import { scrambleText, settleText } from "@/lib/scramble";

// Scrambles once, the first time the text scrolls into view, then settles on the real words.
export function ScrambleText({ text, duration = 0.8 }: { text: string; duration?: number }) {
  const element = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = element.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        scrambleText(target, duration);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
      settleText(target);
    };
  }, [text, duration]);

  return (
    <span ref={element} data-final={text}>
      {text}
    </span>
  );
}
