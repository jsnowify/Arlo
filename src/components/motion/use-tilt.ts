"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";

export function useTilt<T extends HTMLElement>() {
  const element = useRef<T>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motion.pointer, () => {
        const target = element.current!;
        gsap.set(target, { transformPerspective: 1200 });
        const xTo = gsap.quickTo(target, "rotationX", {
          duration: motion.duration,
          ease: motion.ease,
        });
        const yTo = gsap.quickTo(target, "rotationY", {
          duration: motion.duration,
          ease: motion.ease,
        });
        const move = (event: PointerEvent) => {
          const bounds = target.getBoundingClientRect();
          xTo((0.5 - (event.clientY - bounds.top) / bounds.height) * 6);
          yTo(((event.clientX - bounds.left) / bounds.width - 0.5) * 6);
        };
        const reset = () => {
          xTo(0);
          yTo(0);
        };
        target.addEventListener("pointermove", move);
        target.addEventListener("pointerleave", reset);
        return () => {
          target.removeEventListener("pointermove", move);
          target.removeEventListener("pointerleave", reset);
        };
      });
      return () => media.revert();
    },
    { scope: element },
  );
  return element;
}
