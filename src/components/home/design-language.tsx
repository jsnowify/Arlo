import Link from "next/link";
import { ScrambleLabel } from "@/components/motion/scramble-label";
import { ZigzagReveal } from "@/components/motion/zigzag-reveal";
import styles from "@/components/pages/pages.module.css";
import { languageData } from "@/data/pages";

export function DesignLanguage() {
  return (
    <section
      id="language"
      className={styles.section}
      aria-labelledby="language-title"
    >
      <h2 id="language-title" className={styles.heading}>
        <ZigzagReveal>{languageData.title}</ZigzagReveal>
      </h2>
      <p className={`${styles.muted} ${styles.languageIntro}`}>
        {languageData.description}
      </p>
      <div>
        <ul className={styles.language}>
          {languageData.items.map((item) => (
            <li key={item.index}>
              <span>{item.index}</span>
              <h3>
                <ZigzagReveal>{item.title}</ZigzagReveal>
              </h3>
              <p>{item.copy}</p>
            </li>
          ))}
        </ul>
        <div className={styles.languageLinks}>
          {languageData.links.map((link) => (
            <Link key={link.href} href={link.href}>
              <ScrambleLabel text={link.label} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
