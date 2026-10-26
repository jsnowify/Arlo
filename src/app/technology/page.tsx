import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, webPage, itemList } from "@/lib/structured-data";
import { PageFrame } from "@/components/brand/page-frame";
import { ScrambleText } from "@/components/motion/scramble-text";
import { ZigzagReveal } from "@/components/motion/zigzag-reveal";
import { NextPage } from "@/components/pages/next-page";
import { PageIntro } from "@/components/pages/page-intro";
import { RippleButton } from "@/components/ui/ripple-button";
import { TechnologyMatrix } from "@/components/pages/technology-matrix";
import pages from "@/components/pages/pages.module.css";
import styles from "@/components/pages/technology.module.css";
import { demoProducts } from "@/data/products";
import { systemAnchor, technologies, technologyPage } from "@/data/technology";

export const metadata: Metadata = pageMetadata({
  title: "Technology: six imagined systems behind the concepts",
  description:
    "Six fictional systems behind the five Arlo concepts, and which object uses them. Nothing here exists and every figure is illustrative. An upskilling project by Joshua \u201cSnowi\u201d Cambronero.",
  path: "/technology",
});

const productName = (id: string) =>
  demoProducts.find((product) => product.id === id)?.name ?? id;

export default function TechnologyPage() {
  const { eyebrow, title, description, matrixTitle, listTitle, note } = technologyPage;
  return (
    <PageFrame>
      <JsonLd
        data={[
          webPage({
            path: "/technology",
            name: "Technology",
            description: technologyPage.description,
          }),
          breadcrumbs([{ name: "Technology", path: "/technology" }]),
          itemList(
            "The six imagined systems",
            technologies.map((tech) => ({
              id: tech.id,
              name: tech.name,
              description: tech.summary,
            })),
          ),
        ]}
      />
      <PageIntro id="technology-title" eyebrow={eyebrow} title={title} description={description} />

      <section className={pages.section} aria-labelledby="matrix-title">
        <h2 id="matrix-title" className={pages.heading}>
          <ZigzagReveal>{matrixTitle}</ZigzagReveal>
        </h2>
        <TechnologyMatrix
          products={demoProducts.map(({ id, name }) => ({ id, name }))}
          systems={technologies.map(({ id, name, usedIn }) => ({ id, name, usedIn }))}
        />
      </section>

      <section
        className={`${pages.section} ${pages.sectionDark}`}
        aria-labelledby="systems-title"
      >
        <h2 id="systems-title" className={pages.heading}>
          <ZigzagReveal>{listTitle}</ZigzagReveal>
        </h2>
        <ol className={styles.list}>
          {technologies.map((tech) => (
            <li key={tech.id} id={systemAnchor(tech.id)} className={styles.tech}>
              <div className={styles.techHead}>
                <p className={styles.techMeta}>
                  <ScrambleText text={tech.id} />
                  <span>{tech.stage}</span>
                </p>
                <h3>
                  <ZigzagReveal>{tech.name}</ZigzagReveal>
                </h3>
              </div>
              <div className={styles.techBody}>
                <p className={styles.techSummary}>{tech.summary}</p>
                <p>{tech.how}</p>
                <dl className={styles.techFacts}>
                  <div>
                    <dt>Concept notes</dt>
                    <dd>
                      <ul>
                        {tech.notes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt>Used in</dt>
                    <dd>
                      <ul className={styles.chips}>
                        {tech.usedIn.map((id) => (
                          <li key={id}>
                            <RippleButton tone="light" href="/objects">
                              {productName(id)}
                            </RippleButton>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt>{tech.figure[0]}</dt>
                    <dd>{tech.figure[1]} (illustrative)</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <p className={pages.note}>{note}</p>
      <NextPage href="/good-to-know" label="Good to know" />
    </PageFrame>
  );
}
