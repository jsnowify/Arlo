import Link from "next/link";
import { ScrambleLabel } from "@/components/motion/scramble-label";
import styles from "./pages.module.css";

export function NextPage({ href, label }: { href: string; label: string }) {
  return (
    <div className={styles.next}>
      <span>Next</span>
      <Link href={href}>
        <ScrambleLabel text={label} />
      </Link>
    </div>
  );
}
