"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "@/app/chutcha.module.css";
import { salesGuideCards, type SalesGuideTagTone } from "@/data/homeData";

const tagToneClass: Record<SalesGuideTagTone, string> = {
  blue: styles.guideCardTagBlue,
  purple: styles.guideCardTagPurple,
  orange: styles.guideCardTagOrange,
  green: styles.guideCardTagGreen,
};

export default function SalesGuideCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const firstCard = track.firstElementChild as HTMLElement | null;
    const gap = 16;
    const distance = (firstCard?.offsetWidth ?? 272) + gap;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <section className={`${styles.section} ${styles.guideSection}`}>
      <div className={styles.guideHeader}>
        <h2 className={styles.sectionTitle}>의료장비를 똑똑하게 구매하는 방법</h2>
        <div className={styles.guideNav}>
          <button
            type="button"
            className={styles.guideNavBtn}
            aria-label="이전 카드"
            onClick={() => scrollByCards(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.guideNavBtn}
            aria-label="다음 카드"
            onClick={() => scrollByCards(1)}
          >
            ›
          </button>
        </div>
      </div>

      <div ref={trackRef} className={styles.guideTrack}>
        {salesGuideCards.map((card) => (
          <a key={card.id} href={card.href} className={styles.guideCard}>
            <h3 className={styles.guideCardTitle}>{card.title}</h3>
            <div className={styles.guideCardTags}>
              {card.tags.map((tag) => (
                <span
                  key={tag.text}
                  className={`${styles.guideCardTag} ${tagToneClass[tag.tone]}`}
                >
                  {tag.text}
                </span>
              ))}
            </div>
            <div className={styles.guideCardVisual}>
              <Image
                src={card.image}
                alt=""
                fill
                sizes="140px"
                className={styles.guideCardImg}
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
