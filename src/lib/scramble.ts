import { gsap } from "@/lib/gsap";
import { motion } from "@/lib/motion";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const running = new WeakMap<HTMLElement, gsap.core.Tween>();

// The text an element should settle on: `data-final` when set (kept current by React), otherwise what it holds.
function finalText(element: HTMLElement) {
  return element.dataset.final ?? element.textContent ?? "";
}

/** Stops any scramble on the element and puts its real text back. */
export function settleText(element: HTMLElement) {
  running.get(element)?.kill();
  running.delete(element);
  element.textContent = finalText(element);
}

/**
 * Scrambles an element's text, then settles it left to right into the real text.
 * Only letters and digits are scrambled, so spacing and punctuation never jump.
 */
export function scrambleText(element: HTMLElement, duration = 0.9) {
  settleText(element);
  const original = finalText(element);
  if (!original || !window.matchMedia(motion.enabled).matches) return;
  const counter = { value: 0 };
  running.set(
    element,
    gsap.to(counter, {
      value: original.length,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        const revealed = Math.floor(counter.value);
        element.textContent = Array.from(original, (letter, index) =>
          index < revealed || !/[A-Za-z0-9]/.test(letter)
            ? letter
            : characters[Math.floor(Math.random() * characters.length)],
        ).join("");
      },
      onComplete: () => {
        element.textContent = original;
        running.delete(element);
      },
    }),
  );
}
