"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import type { HeroPanel } from "@/data/home";
import { menuPages } from "@/data/pages";
import styles from "./navigation.module.css";

const accessLabel = "GET EARLY ACCESS";
const scrambleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function MenuLabel({ children }: { children: string }) {
  return (
    <span className={styles.itemLabel}>
      <span className={styles.itemLabelTrack}>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}

export function Navigation({
  onOpenPanel,
}: {
  onOpenPanel: (panel: HeroPanel) => void;
}) {
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const accessText = useRef<HTMLSpanElement>(null);
  const scramble = useRef<ReturnType<typeof gsap.to> | null>(null);

  useGSAP(
    () => {
      const content = menu.current?.querySelector<HTMLElement>("[data-menu-content]");
      const resize = new ResizeObserver(() => {
        if (content && content.scrollHeight > 0) {
          menu.current?.style.setProperty("--panel-height", `${content.scrollHeight}px`);
        }
      });
      if (content) resize.observe(content);
      return () => {
        resize.disconnect();
        scramble.current?.kill();
      };
    },
    { scope: header },
  );

  function resetAccessText() {
    scramble.current?.kill();
    if (accessText.current) accessText.current.textContent = accessLabel;
  }

  function scrambleAccessText() {
    resetAccessText();
    if (!window.matchMedia(motion.enabled).matches) return;
    const counter = { value: 0 };
    scramble.current = gsap.to(counter, {
      value: accessLabel.length,
      delay: 0.14,
      duration: 0.7,
      ease: "power2.inOut",
      onUpdate: () => {
        if (!accessText.current) return;
        const revealed = Math.floor(counter.value);
        accessText.current.textContent = Array.from(accessLabel, (letter, index) =>
          letter === " " || index < revealed
            ? letter
            : scrambleCharacters[Math.floor(Math.random() * scrambleCharacters.length)],
        ).join("");
      },
      onComplete: () => {
        if (accessText.current) accessText.current.textContent = accessLabel;
      },
    });
  }

  function settleAccessText() {
    scramble.current?.kill();
    const text = accessText.current;
    if (!text) return;
    if (!window.matchMedia(motion.enabled).matches) {
      text.textContent = accessLabel;
      return;
    }
    const current = text.textContent || accessLabel;
    const counter = { value: 0 };
    scramble.current = gsap.to(counter, {
      value: accessLabel.length,
      duration: 0.3,
      ease: "power2.out",
      onUpdate: () => {
        const revealed = Math.floor(counter.value);
        text.textContent = accessLabel.slice(0, revealed) + current.slice(revealed);
      },
      onComplete: () => { text.textContent = accessLabel; },
    });
  }

  function closeMenu() {
    menu.current?.hidePopover();
    menuButton.current?.focus({ preventScroll: true });
  }

  function openFromMenu(panel: HeroPanel) {
    closeMenu();
    onOpenPanel(panel);
  }

  return (
    <>
      <header
        ref={header}
        className={styles.header}
      >
        <Link href="/" className={styles.brand} aria-label="Arlo home">
          <Logo width={64} tone="light" priority />
        </Link>
        <div className={styles.actions}>
          <button
            className={styles.explore}
            type="button"
            aria-haspopup="dialog"
            aria-label="Get early access"
            onMouseEnter={scrambleAccessText}
            onMouseLeave={settleAccessText}
            onFocus={scrambleAccessText}
            onBlur={settleAccessText}
            onClick={() => onOpenPanel("earlyAccess")}
          >
            <span className={styles.bracket} aria-hidden="true">[</span>
            <span ref={accessText} className={styles.accessText} aria-hidden="true">{accessLabel}</span>
            <span className={styles.bracket} aria-hidden="true">]</span>
          </button>
            <button
              ref={menuButton}
              type="button"
              className={styles.menuButton}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              popoverTarget={menuId}
            >
              <span />
              <span />
            </button>
        </div>
      </header>

      <div
        ref={menu}
        id={menuId}
        popover="auto"
        role="dialog"
        className={styles.menu}
        aria-label="Site menu"
        data-lenis-prevent
        onToggle={(event) => {
          const isOpen = event.newState === "open";
          if (isOpen) {
            const element = event.currentTarget;
            const content = element.querySelector<HTMLElement>("[data-menu-content]");
            if (content) element.style.setProperty("--panel-height", `${content.scrollHeight}px`);
          }
          setMenuOpen(isOpen);
        }}
      >
        <button
          type="button"
          data-menu-close
          className={`${styles.menuButton} ${styles.panelClose}`}
          aria-label="Close menu"
          aria-expanded="true"
          popoverTarget={menuId}
          popoverTargetAction="hide"
        >
          <span />
          <span />
        </button>
        <div data-menu-content className={styles.menuContent}>
        <nav
          aria-label="Expanded navigation"
          className={styles.menuLinks}
        >
          {menuPages.map((page) => (
            <div key={page.href}>
              <Link data-menu-item href={page.href} onClick={closeMenu}>
                <MenuLabel>{page.label}</MenuLabel>
                {"index" in page && <span>{page.index}</span>}
              </Link>
            </div>
          ))}
          <div className={styles.mobileAccess}>
            <button
              data-menu-item
              type="button"
              aria-haspopup="dialog"
              onClick={() => openFromMenu("earlyAccess")}
            >
              <MenuLabel>Get early access</MenuLabel>
            </button>
          </div>
        </nav>
        <div className={styles.menuFooter}>
          <span>Fictional objects. Real curiosity.</span>
          <span>For demo only / Not for sale</span>
        </div>
        </div>
      </div>
    </>
  );
}
