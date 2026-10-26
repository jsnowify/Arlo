"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, PointerEvent, ReactNode } from "react";
import products from "@/components/home/products.module.css";
import styles from "./ripple-button.module.css";

type Props = {
  children: ReactNode;
  tone?: "dark" | "light";
  compact?: boolean;
  pressed?: boolean;
  className?: string;
};

// The product button from the home page, reusable: its fill and ring start from wherever the
// pointer crossed the edge. Pass `href` for a link, otherwise it is a button.
export function RippleButton({
  children,
  tone = "dark",
  compact = false,
  pressed,
  className,
  href,
  ...rest
}: Props & { href?: string } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Props>) {
  const classes = [
    products.view,
    styles.root,
    tone === "light" ? styles.light : "",
    compact ? styles.compact : "",
    className ?? "",
  ].join(" ");

  function markPointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const element = event.currentTarget;
    const box = element.getBoundingClientRect();
    element.style.setProperty("--x", `${event.clientX - box.left}px`);
    element.style.setProperty("--y", `${event.clientY - box.top}px`);
  }

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        data-pressed={pressed}
        onPointerEnter={markPointer}
        onPointerLeave={markPointer}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      {...rest}
      className={classes}
      data-pressed={pressed}
      aria-pressed={pressed}
      onPointerEnter={markPointer}
      onPointerLeave={markPointer}
    >
      {children}
    </button>
  );
}
