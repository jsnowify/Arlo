"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import styles from "./motion.module.css";

export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const container = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motion.pointer, () => {
        const element = container.current!;
        const xTo = gsap.quickTo(element, "x", {
          duration: 0.6,
          ease: motion.ease,
        });
        const yTo = gsap.quickTo(element, "y", {
          duration: 0.6,
          ease: motion.ease,
        });
        const move = (event: PointerEvent) => {
          const bounds = element.getBoundingClientRect();
          xTo((event.clientX - bounds.left - bounds.width / 2) * 0.18);
          yTo((event.clientY - bounds.top - bounds.height / 2) * 0.18);
        };
        const reset = () => {
          xTo(0);
          yTo(0);
        };
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", reset);
        return () => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", reset);
        };
      });
      return () => media.revert();
    },
    { scope: container },
  );

  return (
    <span ref={container} className={`${styles.magnetic} ${className}`}>
      {children}
    </span>
  );
}
