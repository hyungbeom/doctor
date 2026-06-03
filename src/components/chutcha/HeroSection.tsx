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
  const subline2 = hero.subline2 ?? "";
  const englishLine = hero.englishLine ?? "";

  return (
    <>
      <div className={styles.kv}>
        <div className={styles.kvBanner}>
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className={styles.kvBannerImg}
            aria-hidden
          />
          <div className={styles.kvBannerContent}>
            <div className={styles.kvBannerInner}>
              <div className={styles.kvBannerText}>
                <h1 className={styles.kvHeadline}>{hero.headline}</h1>
                <p className={styles.kvSubline}>{hero.subline}</p>
                {subline2 ? <p className={styles.kvSubline}>{subline2}</p> : null}
                {englishLine ? <p className={styles.kvEnglish}>{englishLine}</p> : null}
              </div>
            </div>
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
