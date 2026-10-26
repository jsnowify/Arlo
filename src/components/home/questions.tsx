"use client";

import { useRef, type MouseEvent } from "react";
import { homeData } from "@/data/home";
import { ZigzagReveal } from "@/components/motion/zigzag-reveal";
import { gsap } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import styles from "./collection.module.css";

// Native <details> keeps the no-JS and keyboard behaviour; GSAP only drives the height.
export function Question({ question, answer }: { question: string; answer: string }) {
  const details = useRef<HTMLDetailsElement>(null);
  const body = useRef<HTMLDivElement>(null);

  function toggle(event: MouseEvent) {
    event.preventDefault();
    const element = details.current!;
    const panel = body.current!;
    // data-open flips at once, while `open` stays on until the close animation ends.
    const opening = element.dataset.open !== "true";
    const animate = window.matchMedia(motion.enabled).matches;
    element.dataset.open = String(opening);
    gsap.killTweensOf(panel);

    if (opening) {
      element.open = true;
      if (!animate) return;
      // Overshoots the natural height, then settles like a spring.
      gsap.fromTo(
        panel,
        { height: 0 },
        { height: "auto", duration: 1.1, ease: "elastic.out(1, 0.55)", clearProps: "height" },
      );
      return;
    }
    const finish = () => {
      element.open = false;
      gsap.set(panel, { clearProps: "height" });
    };
    if (!animate) return finish();
    gsap.to(panel, { height: 0, duration: 0.6, ease: "back.in(2.4)", onComplete: finish });
  }

  return (
    <details ref={details} className={styles.question}>
      <summary onClick={toggle}>
        {question}
        <span className={styles.questionIcon} aria-hidden="true" />
      </summary>
      <div ref={body} className={styles.questionBody}>
        <p>{answer}</p>
      </div>
    </details>
  );
}

type Item = { question: string; answer: string };

// The big title with the question pills beside it. The home page and the good-to-know page
// share it; the page version is the one h1 on its route.
export function FaqSection({
  id,
  title,
  items,
  level = 2,
}: {
  id: string;
  title: string;
  items: readonly Item[];
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <section
      id={id}
      className={level === 1 ? `${styles.questions} ${styles.questionsPage}` : styles.questions}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.questionsIntro}>
        <Heading id={`${id}-title`}>
          <ZigzagReveal afterIntro={level === 1}>{title}</ZigzagReveal>
        </Heading>
      </div>
      <div className={styles.questionList}>
        {items.map((item) => (
          <Question key={item.question} {...item} />
        ))}
      </div>
    </section>
  );
}

export function HomeQuestions() {
  return <FaqSection id="questions" title={homeData.questions.title} items={homeData.questions.items} />;
}
