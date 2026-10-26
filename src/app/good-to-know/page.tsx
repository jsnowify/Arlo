import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, webPage, faqPage } from "@/lib/structured-data";
import { PageFrame } from "@/components/brand/page-frame";
import { FaqSection } from "@/components/home/questions";
import { ZigzagReveal } from "@/components/motion/zigzag-reveal";
import { NextPage } from "@/components/pages/next-page";
import styles from "@/components/pages/pages.module.css";
import { RippleRows } from "@/components/pages/ripple-rows";
import { homeData } from "@/data/home";
import { goodToKnowPage } from "@/data/pages";

export const metadata: Metadata = pageMetadata({
  title: "FAQs: what Arlo is and is not",
  description:
    "Plain answers about Arlo: a fictional wearable concept showcase and upskilling project by Joshua \u201cSnowi\u201d Cambronero. Nothing is for sale, and no personal information is collected.",
  path: "/good-to-know",
});

export default function GoodToKnowPage() {
  const { description, extra, notice } = goodToKnowPage;
  const questions = [...homeData.questions.items, ...extra];
  return (
    <PageFrame>
      <JsonLd
        data={[
          webPage({
            path: "/good-to-know",
            name: "FAQs",
            description: goodToKnowPage.description,
          }),
          breadcrumbs([{ name: "FAQs", path: "/good-to-know" }]),
          faqPage(questions),
        ]}
      />
      <FaqSection
        id="good-to-know"
        level={1}
        title="FAQs"
        items={questions}
      />
      <section className={styles.section} aria-labelledby="notice-title">
        <aside className={styles.notice}>
          <h2 id="notice-title">
            <ZigzagReveal>{notice.title}</ZigzagReveal>
          </h2>
          <p className={styles.noticeLead}>{description}</p>
          <RippleRows className={styles.noticeRows} items={notice.items} />
        </aside>
      </section>
      <NextPage href="/objects" label="Back to the objects" />
    </PageFrame>
  );
}
