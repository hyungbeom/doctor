import Image from "next/image";
import styles from "@/app/chutcha.module.css";
import { weeklySideBanner } from "@/data/homeData";

const WEEKLY_LETTERS = "WEEKLY".split("");

export default function WeeklyHotBanner() {
  return (
    <a href={weeklySideBanner.href} className={styles.weeklyBanner}>
      <div className={styles.weeklyBannerContent}>
        <div className={styles.weeklyFlip} aria-hidden>
          {WEEKLY_LETTERS.map((letter, index) => (
            <span key={`${letter}-${index}`} className={styles.weeklyFlipLetter}>
              {letter}
            </span>
          ))}
        </div>
        <p className={styles.weeklyHot}>{weeklySideBanner.hotLabel}</p>
        <span className={styles.weeklyCta}>{weeklySideBanner.ctaLabel}</span>
      </div>
      <div className={styles.weeklyVisual}>
        <Image
          src={weeklySideBanner.image}
          alt=""
          fill
          sizes="160px"
          className={styles.weeklyVisualImg}
        />
        <div className={styles.weeklyVisualGlow} aria-hidden />
      </div>
    </a>
  );
}
