"use client";

import { useId, type ReactNode, type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import { DemoBadge } from "./demo-badge";
import styles from "./demo.module.css";

type DemoDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  title: string;
  description: string;
  children: ReactNode;
  wide?: boolean;
  // The children draw the whole dialog; title and description stay available to screen readers.
  bare?: boolean;
};

export function DemoDialog({
  dialogRef,
  title,
  description,
  children,
  wide = false,
  bare = false,
}: DemoDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  useGSAP((context, contextSafe) => {
    const element = dialogRef.current;
    if (!element || !contextSafe) return;
    const animate = contextSafe(() => {
      if (element.open && window.matchMedia(motion.enabled).matches) {
        gsap.fromTo(
          element,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: motion.ease,
            clearProps: "transform,opacity",
            overwrite: true,
          },
        );
      }
    });
    element.addEventListener("toggle", animate);
    return () => element.removeEventListener("toggle", animate);
  });

  return (
    <dialog
      ref={dialogRef}
      className={wide ? `${styles.dialog} ${styles.wideDialog}` : styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      data-lenis-prevent
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;

        const bounds = event.currentTarget.getBoundingClientRect();
        const outside =
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom;

        if (outside) event.currentTarget.close();
      }}
    >
      {bare ? (
        <>
          <button
            type="button"
            className={styles.closeFloating}
            aria-label="Close dialog"
            onClick={() => dialogRef.current?.close()}
          >
            &times;
          </button>
          <h2 id={titleId} className={styles.srOnly}>
            {title}
          </h2>
          <p id={descriptionId} className={styles.srOnly}>
            {description}
          </p>
          {children}
        </>
      ) : (
        <>
          <div className={styles.dialogControls}>
            <button
              type="button"
              className={styles.closeDialog}
              aria-label="Close dialog"
              onClick={() => dialogRef.current?.close()}
            >
              &times;
            </button>
          </div>
          <div className={styles.dialogContent}>
            <DemoBadge />
            <h2 id={titleId} className={styles.dialogTitle}>
              {title}
            </h2>
            <p id={descriptionId} className={styles.dialogDescription}>
              {description}
            </p>
            {children}
          </div>
        </>
      )}
    </dialog>
  );
}
