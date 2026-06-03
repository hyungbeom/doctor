import Image from "next/image";
import styles from "@/app/chutcha.module.css";
import { quoteSideBanner } from "@/data/homeData";

export default function QuoteSideBanner() {
  return (
    <a href={quoteSideBanner.href} className={styles.quoteSideBanner}>
      <div className={styles.quoteSideBannerVisual}>
        <Image
          src={quoteSideBanner.image}
          alt=""
          fill
          sizes="160px"
          className={styles.quoteSideBannerImg}
        />
      </div>
      <p className={styles.quoteSideBannerText}>
        {quoteSideBanner.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </a>
  );
}
