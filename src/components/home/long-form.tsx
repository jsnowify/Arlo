import Image from "next/image";
import { ScrambleText } from "@/components/motion/scramble-text";
import { ZigzagReveal } from "@/components/motion/zigzag-reveal";
import pages from "@/components/pages/pages.module.css";
import { detailsData, makerData, shiftData } from "@/data/story";
import styles from "./long-form.module.css";

export function Shift() {
  return (
    <section
      id="shift"
      className={`${pages.section} ${pages.sectionDark}`}
      aria-labelledby="shift-title"
    >
      <h2 id="shift-title" className={pages.heading}>
        <ZigzagReveal>{shiftData.title}</ZigzagReveal>
      </h2>
      <p className={`${pages.muted} ${pages.languageIntro}`}>{shiftData.description}</p>
      <ol className={styles.shift}>
        {shiftData.moments.map((moment) => (
          <li key={moment.time}>
            <div className={styles.moment}>
              <p className={styles.momentTime}>{moment.time}</p>
              <h3 className={styles.momentTitle}>
                <ScrambleText text={moment.title} />
              </h3>
              <div className={styles.momentBody}>
                <small>{moment.object}</small>
                <p>{moment.copy}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Details() {
  return (
    <section id="details" className={pages.section} aria-labelledby="details-title">
      <h2 id="details-title" className={pages.heading}>
        <ZigzagReveal>{detailsData.title}</ZigzagReveal>
      </h2>
      <div>
        <ul className={styles.detailGrid}>
          {detailsData.items.map((item) => (
            <li key={item.src}>
              <figure>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1254}
                  height={1254}
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
                <figcaption>
                  <small>{item.object}</small>
                  <h3>
                    <ZigzagReveal>{item.title}</ZigzagReveal>
                  </h3>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Maker() {
  return (
    <section id="maker" className={pages.section} aria-labelledby="maker-title">
      <div className={styles.maker}>
        <div>
          <h2 id="maker-title" className={pages.heading}>
            <ZigzagReveal>{makerData.title}</ZigzagReveal>
          </h2>
        </div>
        <div className={styles.makerCopy}>
          {makerData.copy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl className={styles.credit}>
            {makerData.credit.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
