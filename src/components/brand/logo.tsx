import Image from "next/image";
import { site } from "@/config/site";
import styles from "./logo.module.css";

type LogoProps = {
  width?: number;
  className?: string;
  priority?: boolean;
  tone?: "dark" | "light";
};

export function Logo({
  width = 64,
  className,
  priority = false,
  tone = "dark",
}: LogoProps) {
  const classes = [styles.logo, tone === "light" ? styles.light : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Image
      src={site.logo}
      alt={`${site.name} logo`}
      width={width}
      height={Math.round((width * 319) / 365)}
      className={classes}
      priority={priority}
    />
  );
}
