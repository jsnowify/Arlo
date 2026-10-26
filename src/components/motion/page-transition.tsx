"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import { lag, makeBand, type Band } from "@/lib/zigzag";
import styles from "./motion.module.css";

// One toothed edge sweeps left to right: first it covers the old page, then, once the new
// route has rendered underneath, the same band keeps going and uncovers it.
//
// It is kept quick on purpose. The route is prefetched the moment the link is clicked, so it
// loads while the cover is still sweeping in, and the two sweeps meet at full speed (the cover
// accelerates into the seam and the reveal leaves it fast) instead of stopping in the middle.
const duration = { cover: 0.4, reveal: 0.48 };
// A phone gets a shorter, lighter wipe with fewer, deeper teeth.
const phone = "(max-width: 767px)";
// If the route never changes (a failed navigation), uncover anyway.
const giveUp = 4000;

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
    const layers = [signal.current!, ink.current!];
    let timeline: gsap.core.Timeline | undefined;

    // Builds the band for the screen as it is right now and gives each layer its shape.
    function layout(): Band {
      const small = window.matchMedia(phone).matches;
      const width = window.innerWidth;
      // A little taller than the screen, so a phone's collapsing toolbar never shows a gap.
      const height = Math.ceil(window.innerHeight * 1.15);
      const band = makeBand(width, height, small ? 8 : 10, width * (small ? 0.16 : 0.1));
      layers.forEach((layer) => {
        gsap.set(layer, { width: band.bandWidth, height, clipPath: band.clip });
      });
      return band;
    }

    // Moves the band from one x to another; the ink layer follows just behind the blue one.
    function sweep(from: number, to: number, seconds: number, ease: string, done: () => void) {
      layers.forEach((layer) => gsap.set(layer, { autoAlpha: 1, x: from }));
      timeline = gsap.timeline({ onComplete: done });
      layers.forEach((layer, order) => {
        timeline!.to(layer, { x: to, duration: seconds, ease }, order * lag);
      });
    }

    const hide = () => layers.forEach((layer) => gsap.set(layer, { autoAlpha: 0 }));
    const time = (seconds: number) => (window.matchMedia(phone).matches ? seconds * 0.8 : seconds);

    reveal.current = () => {
      // A missing page should simply be there: no wipe, just lift the cover.
      if (document.querySelector("[data-not-found]")) {
        hide();
        phase.current = "idle";
        return;
      }
      const band = layout();
      sweep(band.rest, band.end, time(duration.reveal), "power2.out", () => {
        hide();
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
      // Start loading the next page now, while the cover is still sweeping in.
      router.prefetch(url.pathname + url.search);
      const band = layout();
      sweep(band.start, band.rest, time(duration.cover), "power2.in", () => {
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
      hide();
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
