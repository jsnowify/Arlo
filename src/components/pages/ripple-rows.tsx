"use client";

import type { PointerEvent } from "react";

// Dashed rows like the product file on the home page. On hover a fill spreads from wherever
// the pointer crossed the row's edge, with a ring rippling out ahead of it. The pointer
// position feeds --x / --y; the rest is CSS.
export function RippleRows({ items, className }: { items: readonly string[]; className?: string }) {
  function markPointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const row = event.currentTarget;
    const box = row.getBoundingClientRect();
    row.style.setProperty("--x", `${event.clientX - box.left}px`);
    row.style.setProperty("--y", `${event.clientY - box.top}px`);
  }

  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} onPointerEnter={markPointer} onPointerLeave={markPointer}>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
