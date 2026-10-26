import { DemoBadge } from "@/components/demo/demo-badge";
import { ZigzagReveal } from "@/components/motion/zigzag-reveal";
import styles from "./pages.module.css";

export function PageIntro({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.intro}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 id={id}>
          <ZigzagReveal afterIntro>{title}</ZigzagReveal>
        </h1>
      </div>
      <div className={styles.introCopy}>
        <DemoBadge />
        <p>{description}</p>
      </div>
    </div>
  );
}
