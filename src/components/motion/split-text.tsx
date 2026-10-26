import styles from "./motion.module.css";

export function SplitText({ text }: { text: string }) {
  const words = text.split(" ");
  return words.map((word, index) => (
    <span key={`${word}-${index}`} className={styles.wordMask}>
      <span data-split-word className={styles.word}>
        {word}
      </span>
      {index < words.length - 1 ? "\u00a0" : null}
    </span>
  ));
}
