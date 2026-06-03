import Image from "next/image";
import styles from "@/app/chutcha.module.css";
import { promoSideBanner } from "@/data/homeData";

export default function PromoSideBanner() {
  return (
    <a href={promoSideBanner.href} className={styles.promoSideBanner}>
      <div className={styles.promoSideBannerCopy}>
        <span className={styles.promoSideBannerBrand}>{promoSideBanner.brand}</span>
        <p className={styles.promoSideBannerLines}>
          <span className={styles.promoSideBannerLead}>{promoSideBanner.lead}</span>
          {promoSideBanner.titles.map((line) => (
            <span key={line} className={styles.promoSideBannerTitle}>
              {line}
            </span>
          ))}
        </p>
      </div>
      <div className={styles.promoSideBannerVisual}>
        <Image
          src={promoSideBanner.image}
          alt=""
          fill
          sizes="160px"
          className={styles.promoSideBannerImg}
        />
        <div className={styles.promoSideBannerTunnel} aria-hidden />
        <span className={styles.promoSideBannerTag}>{promoSideBanner.tag}</span>
      </div>
    </a>
  );
}
