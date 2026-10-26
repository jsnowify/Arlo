import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, webPage } from "@/lib/structured-data";
import { PageFrame } from "@/components/brand/page-frame";
import { ZigzagReveal } from "@/components/motion/zigzag-reveal";
import { NextPage } from "@/components/pages/next-page";
import { PageIntro } from "@/components/pages/page-intro";
import styles from "@/components/pages/pages.module.css";
import { thinkingPage } from "@/data/pages";

export const metadata: Metadata = pageMetadata({
  title: "The thinking: Sense, Alert, Respond",
  description:
    "The three ideas behind the Arlo collection: Sense, Alert, Respond. A creative direction for a fictional wearable family, not a working service. An upskilling project by Joshua \u201cSnowi\u201d Cambronero.",
  path: "/thinking",
});

export default function ThinkingPage() {
  const { eyebrow, title, description, chapters, principles, note } = thinkingPage;
  return (
    <PageFrame>
      <JsonLd
        data={[
          webPage({
            path: "/thinking",
            name: "The thinking",
            description: thinkingPage.description,
          }),
          breadcrumbs([{ name: "The thinking", path: "/thinking" }]),
        ]}
      />
      <PageIntro id="thinking-title" eyebrow={eyebrow} title={title} description={description} />
      <section className={`${styles.section} ${styles.sectionDark}`} aria-label="The three ideas">
        {chapters.map((chapter) => (
          <div key={chapter.word} className={styles.chapter}>
            <p className={styles.chapterWord}>
              <ZigzagReveal>{chapter.word}</ZigzagReveal>
            </p>
            <div className={styles.chapterBody}>
              <h2>
                <ZigzagReveal>{chapter.title}</ZigzagReveal>
              </h2>
              {chapter.copy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
      <section className={styles.section} aria-labelledby="principles-title">
        <p className={styles.eyebrow}>What it adds up to</p>
        <h2 id="principles-title" className={styles.heading}>
          <ZigzagReveal>Four rules we kept returning to.</ZigzagReveal>
        </h2>
        <div>
          <ul className={styles.principles}>
            {principles.map((principle) => (
              <li key={principle.title}>
                <h3>
                  <ZigzagReveal>{principle.title}</ZigzagReveal>
                </h3>
                <p>{principle.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <p className={styles.note}>{note}</p>
      <NextPage href="/technology" label="Technology" />
    </PageFrame>
  );
}
