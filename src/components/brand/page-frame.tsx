"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { Navigation } from "@/components/brand/navigation";
import { ScrambleLabel } from "@/components/motion/scramble-label";
import { DemoDialog } from "@/components/demo/demo-dialog";
import { homeData, type HeroPanel } from "@/data/home";
import styles from "@/components/pages/pages.module.css";

export function PageFrame({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [activePanel, setActivePanel] = useState<HeroPanel>("earlyAccess");
  const panel = homeData.panels[activePanel];

  function openPanel(target: HeroPanel) {
    setActivePanel(target);
    dialog.current?.showModal();
    dialog.current?.scrollTo(0, 0);
  }

  return (
    <>
      <Navigation onOpenPanel={openPanel} />
      <main id="main-content" tabIndex={-1} className={styles.main}>
        {children}
      </main>
      <DemoDialog dialogRef={dialog} title={panel.title} description={panel.description}>
        <p className={styles.dialogNote}>{panel.note}</p>
        <Link
          href="/objects"
          className={styles.dialogLink}
          onClick={() => dialog.current?.close()}
        >
          <ScrambleLabel text="View the objects" />
        </Link>
      </DemoDialog>
    </>
  );
}
