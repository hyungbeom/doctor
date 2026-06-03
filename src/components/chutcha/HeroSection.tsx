import Image from "next/image";
import styles from "@/app/chutcha.module.css";
import { heroBanner } from "@/data/homeData";
import HeroSearchBar from "./HeroSearchBar";

type HeroSectionProps = {
  children: React.ReactNode;
};

export default function HeroSection({ children }: HeroSectionProps) {
  return (
    <>
      <div className={styles.kv}>
        <div className={styles.kvBanner}>
          <Image
            src={heroBanner.image}
            alt={`${heroBanner.headline} - ${heroBanner.subline} ${heroBanner.brandTag}`}
            fill
            priority
            sizes="100vw"
            className={styles.kvBannerImg}
          />
          <div className={styles.kvSrOnly}>
            <p>{heroBanner.headline}</p>
            <p>
              {heroBanner.subline} {heroBanner.brandTag}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.carWrap}>
        <HeroSearchBar />
        {children}
      </div>
    </>
  );
}
