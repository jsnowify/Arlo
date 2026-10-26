"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { DemoDialog } from "@/components/demo/demo-dialog";
import { ScrambleText } from "@/components/motion/scramble-text";
import { demoProducts, productShowcase, type DemoProduct } from "@/data/products";
import { scrambleText, settleText } from "@/lib/scramble";
import { DemoBadge } from "@/components/demo/demo-badge";
import modal from "./product-dialog.module.css";
import styles from "./products.module.css";

// Marks text that scrambles when a product comes into view or changes.
const scramble = (text: string, long = false) => ({
  "data-scramble": long ? "long" : "",
  "data-final": text,
});

// One product's gallery, file and details dialog. The home page swaps products through
// `onStep` and remounts this with a new `key`, which starts the gallery over and scrambles the
// new details; the objects page stacks one panel per product and leaves it out.
export function ProductPanel({
  product,
  index,
  onStep,
  priority = false,
}: {
  product: DemoProduct;
  index: number;
  onStep?: (direction: number) => void;
  priority?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const glide = useRef(0);
  const drag = useRef({ active: false, x: 0, left: 0, target: 0, lastX: 0, lastTime: 0, velocity: 0 });
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const showcase = productShowcase[product.id];
  const activeImage = showcase.gallery[activeImageIndex];
  const name = product.name.split(" / ")[0];

  function playScramble() {
    container.current
      ?.querySelectorAll<HTMLElement>("[data-scramble]")
      .forEach((element) =>
        scrambleText(element, element.dataset.scramble === "long" ? 1.2 : 0.7),
      );
  }

  // First time the product file scrolls into view, it scrambles once and settles.
  useEffect(() => {
    const section = container.current;
    const target = section?.querySelector("[data-product-file]");
    if (!section || !target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        playScramble();
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
      section.querySelectorAll<HTMLElement>("[data-scramble]").forEach(settleText);
    };
  }, []);

  // Mouse drag scrolls the gallery sideways. The position eases toward the pointer, and a
  // quick flick glides on after release. Touch and trackpads scroll natively, and vertical
  // wheel scrolling over the gallery is left alone so the page keeps moving.
  function stopGlide() {
    if (glide.current) cancelAnimationFrame(glide.current);
    glide.current = 0;
  }
  function glideTo() {
    const element = track.current;
    if (!element) return;
    const distance = drag.current.target - element.scrollLeft;
    if (Math.abs(distance) < 0.5 && !drag.current.active) {
      glide.current = 0;
      return;
    }
    element.scrollLeft += distance * 0.16;
    glide.current = requestAnimationFrame(glideTo);
  }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0 || !track.current) return;
    stopGlide();
    const left = track.current.scrollLeft;
    drag.current = { active: true, x: event.clientX, left, target: left, lastX: event.clientX, lastTime: event.timeStamp, velocity: 0 };
    track.current.setPointerCapture(event.pointerId);
    glide.current = requestAnimationFrame(glideTo);
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    const element = track.current;
    if (!state.active || !element) return;
    const max = element.scrollWidth - element.clientWidth;
    state.target = Math.min(max, Math.max(0, state.left - (event.clientX - state.x)));
    const elapsed = event.timeStamp - state.lastTime;
    if (elapsed > 0) {
      state.velocity = state.velocity * 0.6 + ((event.clientX - state.lastX) / elapsed) * 0.4;
      state.lastX = event.clientX;
      state.lastTime = event.timeStamp;
    }
  }
  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    const element = track.current;
    if (!state.active || !element) return;
    state.active = false;
    // A flick keeps travelling a little in the direction it was thrown.
    const stale = event.timeStamp - state.lastTime > 80;
    const max = element.scrollWidth - element.clientWidth;
    state.target = Math.min(max, Math.max(0, state.target - (stale ? 0 : state.velocity * 240)));
  }

  useEffect(() => stopGlide, []);

  // The row's dark fill and ripple start from wherever the pointer crossed its edge.
  function markPointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const row = event.currentTarget;
    const box = row.getBoundingClientRect();
    row.style.setProperty("--x", `${event.clientX - box.left}px`);
    row.style.setProperty("--y", `${event.clientY - box.top}px`);
  }

  function stepImage(direction: number) {
    const total = showcase.gallery.length;
    setActiveImageIndex((current) => (current + direction + total) % total);
  }

  function viewProduct() {
    setActiveImageIndex(0);
    dialog.current?.showModal();
    dialog.current?.scrollTo(0, 0);
  }

  return (
    <div ref={container} className={styles.panel}>
      <div
        ref={track}
        className={styles.gallery}
        role="group"
        aria-label={`${name} images`}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        {showcase.gallery.map((image, position) => (
          <div key={image.src} className={styles.shot}>
            <Image
              src={image.src}
              alt={image.alt}
              width={1254}
              height={1254}
              sizes="(max-width: 767px) 80vw, 40vw"
              draggable={false}
              priority={priority && position < 2}
            />
          </div>
        ))}
      </div>

      <div className={styles.bar} data-product-file>
        <h3 {...scramble(name.toUpperCase())}>{name.toUpperCase()}</h3>
        <div className={styles.meta}>
          <ul aria-label="Illustrative figures">
            {showcase.stats.map((stat) => (
              <li key={stat} {...scramble(stat)}>
                {stat}
              </li>
            ))}
          </ul>
          <p {...scramble(showcase.tagline.toUpperCase())}>{showcase.tagline.toUpperCase()}</p>
        </div>
        <div className={styles.controls}>
          {onStep && (
            <>
          <button type="button" className={styles.arrow}
            aria-label="Previous product"
            onClick={() => onStep?.(-1)}
            onPointerEnter={markPointer}
            onPointerLeave={markPointer}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            aria-label="Next product"
            onClick={() => onStep?.(1)}
            onPointerEnter={markPointer}
            onPointerLeave={markPointer}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
            </>
          )}
          <button
            type="button"
            className={styles.view}
            aria-haspopup="dialog"
            aria-label={`View details for ${product.name}`}
            onClick={viewProduct}
            onPointerEnter={markPointer}
            onPointerLeave={markPointer}
          >
            [ VIEW PRODUCT ]
          </button>
        </div>
        <span className={styles.srOnly} aria-live="polite">
          {product.name}, {index + 1} of {demoProducts.length}
        </span>
      </div>

      <dl className={styles.file}>
        <div className={styles.info} onPointerEnter={markPointer} onPointerLeave={markPointer}>
          <dt>Info</dt>
          <dd {...scramble(showcase.info.toUpperCase(), true)}>{showcase.info.toUpperCase()}</dd>
        </div>
        {showcase.file.map(([label, value]) => (
          <div key={label} onPointerEnter={markPointer} onPointerLeave={markPointer}>
            <dt>{label}</dt>
            <dd {...scramble(value.toUpperCase())}>{value.toUpperCase()}</dd>
          </div>
        ))}
      </dl>

      <DemoDialog
        dialogRef={dialog}
        title={product.name}
        description={product.detail}
        wide
        bare
      >
        <div className={modal.layout}>
          <div className={modal.media}>
            <div className={modal.stage}>
              <div key={activeImage.src} className={modal.frame}>
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={1254}
                  height={1254}
                  sizes="(max-width: 899px) 90vw, 560px"
                />
              </div>
              <div className={modal.counter}>
                <span>
                  {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                  {String(showcase.gallery.length).padStart(2, "0")}
                </span>
                <span className={modal.track} aria-hidden="true">
                  <span
                    style={{
                      width: `${((activeImageIndex + 1) / showcase.gallery.length) * 100}%`,
                    }}
                  />
                </span>
              </div>
              <div className={modal.stageNav}>
                <button
                  type="button"
                  className={styles.arrow}
                  aria-label="Previous view"
                  onClick={() => stepImage(-1)}
                  onPointerEnter={markPointer}
                  onPointerLeave={markPointer}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15 5l-7 7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.arrowNext}`}
                  aria-label="Next view"
                  onClick={() => stepImage(1)}
                  onPointerEnter={markPointer}
                  onPointerLeave={markPointer}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={modal.thumbs} role="group" aria-label="Product image views">
              {showcase.gallery.map((image, position) => (
                <button
                  key={image.src}
                  type="button"
                  className={modal.thumb}
                  aria-label={`Show view ${position + 1} of ${product.name}`}
                  aria-pressed={activeImageIndex === position}
                  onClick={() => setActiveImageIndex(position)}
                >
                  <Image src={image.src} alt="" width={80} height={80} sizes="72px" />
                </button>
              ))}
            </div>
          </div>

          <div className={modal.info}>
            <div className={modal.meta}>
              <span>
                <ScrambleText text={product.id} />
              </span>
              <DemoBadge />
            </div>
            <p className={modal.title} aria-hidden="true">
              <ScrambleText text={name.toUpperCase()} duration={1} />
            </p>
            <p className={modal.format}>{product.format}</p>
            <p className={modal.lead}>{product.description}</p>
            <p className={modal.detail}>{product.detail}</p>

            <p className={modal.label}>Illustrative figures</p>
            <ul className={modal.figures} aria-label="Illustrative figures">
              {showcase.stats.map((stat) => (
                <li key={stat}>{stat}</li>
              ))}
            </ul>

            <p className={modal.label}>Visual details</p>
            <ul className={modal.tags}>
              {product.designNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>

            <div className={modal.fileWrap}>
              <dl className={styles.file}>
                {showcase.file.map(([label, value]) => (
                  <div key={label} onPointerEnter={markPointer} onPointerLeave={markPointer}>
                    <dt>{label}</dt>
                    <dd>{value.toUpperCase()}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className={modal.note}>
              Images, readouts and technical markings are illustrative. They do not represent
              verified specifications or certifications.
            </p>
          </div>
        </div>
      </DemoDialog>
    </div>
  );
}
