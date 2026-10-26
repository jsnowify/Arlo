export const motion = {
  ease: "power3.out",
  duration: 0.8,
  stagger: 0.09,
  scrub: 0.8,
  revealStart: "top 88%",
  enabled: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  pointer:
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
} as const;
