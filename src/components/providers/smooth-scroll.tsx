"use client";

import type { ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useGSAP(() => {
    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      respectReducedMotion: true,
      stopInertiaOnNavigate: true,
    });

    const removeScrollListener = lenis.on("scroll", () => {
      ScrollTrigger.update();
    });
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      removeScrollListener();
      lenis.destroy();
    };
  });

  return <>{children}</>;
}
