"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { Navigation } from "@/components/brand/navigation";
import { ScrambleLabel } from "@/components/motion/scramble-label";
import { ZigzagReveal } from "@/components/motion/zigzag-reveal";
import { DemoDialog } from "@/components/demo/demo-dialog";
import { homeData, type HeroPanel } from "@/data/home";
import styles from "./hero.module.css";

export function HomeHero({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [activePanel, setActivePanel] = useState<HeroPanel>("technology");
  const panel = homeData.panels[activePanel];

  function openPanel(target: HeroPanel) {
    setActivePanel(target);
    dialog.current?.showModal();
    dialog.current?.scrollTo(0, 0);
  }

  return (
    <div className={styles.page}>
      <Navigation onOpenPanel={openPanel} />
      <main id="main-content" tabIndex={-1}>
        <section id="product" className={styles.hero} aria-labelledby="home-title">
          <h1 id="home-title" className={styles.wordmark}>
            <span aria-hidden="true">ARL</span>
            <Image
              src={homeData.hero.product.image}
              alt=""
              width={homeData.hero.product.width}
              height={homeData.hero.product.height}
              sizes="(max-width: 767px) 30vw, 28vw"
              loading="eager"
              fetchPriority="high"
              className={styles.ring}
            />
            <span className={styles.srOnly}>Arlo</span>
          </h1>

          <div className={styles.statement}>
            <p className={styles.tagline}>
              <ZigzagReveal afterIntro>{homeData.hero.tagline}</ZigzagReveal>
            </p>
            <p className={styles.description}>{homeData.hero.description}</p>
          </div>

          <div className={styles.cards}>
            <aside className={styles.info}>
              <p>
                ARLO
                <br />
                <span>A wearable design study</span>
              </p>
              <p className={styles.edition}>
                The collection
                <br />
                <span>01 — 05</span>
              </p>
            </aside>

            <Link href="/objects" className={styles.featured}>
              <span className={styles.featuredImage}>
                <Image
                  src="/imgs/PRODUCT-2.png"
                  alt=""
                  width={180}
                  height={180}
                  sizes="(max-width: 767px) 100px, 8vw"
                />
              </span>
              <span className={styles.featuredInfo}>
                <span className={styles.featuredLabel}>
                  <ScrambleLabel text="Explore the objects" />
                </span>
                <span>
                  Ring / 02
                  <small>Meet the family</small>
                </span>
              </span>
            </Link>
          </div>
        </section>
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
    </div>
  );
}
