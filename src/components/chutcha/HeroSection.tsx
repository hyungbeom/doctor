import Image from "next/image";
import styles from "@/app/chutcha.module.css";
import { heroBanner } from "@/data/homeData";
import type { CmsHero } from "@/types/cms";
import HeroSearchBar from "./HeroSearchBar";

type HeroSectionProps = {
  children: React.ReactNode;
  hero?: CmsHero;
};

export default function HeroSection({ children, hero = heroBanner }: HeroSectionProps) {
  return (
    <>
      <div className={styles.kv}>
        <div className={styles.kvBanner}>
          <Image
            src={hero.image}
            alt={`${hero.headline} - ${hero.subline} ${hero.brandTag}`}
            fill
            priority
            sizes="100vw"
            className={styles.kvBannerImg}
          />
          <div className={styles.kvSrOnly}>
            <p>{hero.headline}</p>
            <p>
              {hero.subline} {hero.brandTag}
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
