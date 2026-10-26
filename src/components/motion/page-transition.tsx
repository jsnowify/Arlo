"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import { covering, depth, lag, uncovering } from "@/lib/zigzag";
import styles from "./motion.module.css";

// One toothed edge sweeps left to right: first it covers the old page, then, once the new
// route has rendered underneath, the same edge keeps going and uncovers it.
const duration = { cover: 0.8, reveal: 1 };
// If the route never changes (a failed navigation), uncover anyway.
const giveUp = 4000;

type Layer = { element: HTMLElement; edge: number };

export function PageTransition({ children }: { children: ReactNode }) {
  const ink = useRef<HTMLDivElement>(null);
  const signal = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const phase = useRef<"idle" | "covering" | "covered">("idle");
  const reveal = useRef<() => void>(() => {});
  const previousPath = useRef(pathname);

  // Intercepts internal link clicks so the cover is already down before the route changes.
  useEffect(() => {
    const layers: Layer[] = [
      { element: signal.current!, edge: -depth },
      { element: ink.current!, edge: -depth },
    ];
    let timeline: gsap.core.Timeline | undefined;

    // `shape` draws a layer for the current phase; delays keep the blue edge leading.
    function sweep(shape: (edge: number) => string, seconds: number, done: () => void) {
      layers.forEach((layer) => {
        layer.edge = -depth;
        gsap.set(layer.element, { autoAlpha: 1, clipPath: shape(layer.edge) });
      });
      timeline = gsap.timeline({ onComplete: done });
      layers.forEach((layer, order) => {
        timeline!.to(
          layer,
          {
            edge: 100,
            duration: seconds,
            ease: "sine.inOut",
            onUpdate: () => {
              layer.element.style.clipPath = shape(layer.edge);
            },
          },
          order * lag,
        );
      });
    }

    reveal.current = () => {
      sweep(uncovering, duration.reveal, () => {
        layers.forEach(({ element }) => gsap.set(element, { autoAlpha: 0 }));
        phase.current = "idle";
      });
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest("a");
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      // Same-page anchors and external links are left to the browser.
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (!window.matchMedia(motion.enabled).matches) return;
      event.preventDefault();
      if (phase.current !== "idle") return;
      phase.current = "covering";
      sweep(covering, duration.cover, () => {
        phase.current = "covered";
        router.push(url.pathname + url.search + url.hash);
        window.setTimeout(() => {
          if (phase.current === "covered") reveal.current();
        }, giveUp);
      });
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      timeline?.kill();
      layers.forEach(({ element }) => gsap.set(element, { autoAlpha: 0 }));
      phase.current = "idle";
    };
  }, [router]);

  // The new page has rendered under the cover: uncover it once it has painted.
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (phase.current !== "covered") return;
    phase.current = "covering";
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => reveal.current());
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <>
      {children}
      <div ref={ink} className={`${styles.wipe} ${styles.wipeInk}`} aria-hidden="true" />
      <div ref={signal} className={`${styles.wipe} ${styles.wipeSignal}`} aria-hidden="true" />
    </>
  );
}
