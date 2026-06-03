import Image from "next/image";
import Link from "next/link";
import Header from "@/components/chutcha/Header";
import HeroSection from "@/components/chutcha/HeroSection";
import ThemeSection from "@/components/chutcha/ThemeSection";
import SalesGuideCarousel from "@/components/chutcha/SalesGuideCarousel";
import WeeklyHotBanner from "@/components/chutcha/WeeklyHotBanner";
import QuoteSideBanner from "@/components/chutcha/QuoteSideBanner";
import PromoSideBanner from "@/components/chutcha/PromoSideBanner";
import PagePopups from "@/components/PagePopups";
import styles from "./chutcha.module.css";
import {
  IMG,
  medicalProducts,
  monthlyPickProducts,
  reviews,
  footerBanner,
  companyInfo,
} from "@/data/homeData";
import { getPublicCms } from "@/lib/cms/public";

export default async function Home() {
  const { hero, gnb, news, siteNotices } = await getPublicCms();

  return (
    <div className={styles.page}>
      <PagePopups />
      <Header gnbItems={gnb} />

      <div className={styles.floatLeft}>
        <WeeklyHotBanner />
      </div>
      <div className={styles.floatRight}>
        <PromoSideBanner />
        <QuoteSideBanner />
      </div>

      <main>
        <HeroSection hero={hero}>
          <ThemeSection title="추천 의료장비" products={medicalProducts} mobileMaxItems={5} />

          <SalesGuideCarousel />

          <ThemeSection
            title="이달의 추천장비"
            products={monthlyPickProducts}
            className={styles.monthlyPickSection}
          />
        </HeroSection>

        <div className={styles.reviewWrap}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>리얼 도입후기를 확인하세요.</h2>
            <a href="#" className={styles.viewAll}>
              전체보기
            </a>
            <ul className={styles.reviewList}>
              {reviews.map((review) => (
                <li key={review.user + review.product} className={styles.reviewItem}>
                  <a href="#">
                    <dl className={styles.reviewDl}>
                      <dt className={styles.reviewDt}>
                        <span className={styles.reviewBadge}>도입</span>
                        <span>{review.product}</span>
                      </dt>
                      <dd>
                        <p className={styles.reviewText}>{review.text}</p>
                        <p className={styles.reviewInfo}>
                          <span className={styles.reviewScore}>5.0</span>
                          <span className={styles.reviewUser}>
                            <strong>{review.user}님</strong> · {review.date}
                          </span>
                        </p>
                      </dd>
                      <dd
                        className={styles.reviewPhoto}
                        style={{ backgroundImage: `url(${review.image})` }}
                      />
                    </dl>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className={styles.newsWrap}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>따끈 따끈, Alpexmedi 소식</h2>
            <a href="/board?tab=news" className={styles.viewAll}>
              전체보기
            </a>
            <ul className={styles.newsList}>
              {news.map((item) => (
                <li key={item.id}>
                  <Link href={item.href}>
                    <dl>
                      <dd className={styles.newsThumb}>
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="(min-width: 1200px) 272px, 25vw"
                          className={styles.newsThumbImg}
                        />
                      </dd>
                      <dt className={styles.newsTitle}>{item.title}</dt>
                      <dd className={styles.newsMeta}>
                        <strong>{item.source}</strong> · {item.date}
                      </dd>
                    </dl>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.notice}>
              <h3>공지</h3>
              <ul className={styles.noticeList}>
                {siteNotices.map((notice) => (
                  <li key={notice.id}>
                    <Link href={notice.href}>
                      <dl>
                        <dt>{notice.title}</dt>
                        <dd>{notice.date}</dd>
                      </dl>
                    </Link>
                  </li>
                ))}
              </ul>
              <a href="/board?tab=notice" className={`${styles.viewAll} ${styles.viewAllBlue}`}>
                전체보기
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <section className={styles.appBanner}>
          <div className={styles.appBannerInner}>
            <div className={styles.appBannerText}>
              <div className={styles.appLogo}>
                <Image
                  src={footerBanner.logo}
                  alt="Alpexmedi"
                  width={64}
                  height={64}
                  className={styles.appLogoImg}
                />
              </div>
              <div>
                <p className={styles.appTitle}>{footerBanner.title}</p>
                <span className={styles.appSub}>{footerBanner.subtitle}</span>
              </div>
            </div>
            <div className={styles.footerCtas}>
              <a href={footerBanner.primaryCta.href} className={styles.footerCtaPrimary}>
                {footerBanner.primaryCta.label}
              </a>
              <a href={footerBanner.secondaryCta.href} className={styles.footerCtaSecondary}>
                {footerBanner.secondaryCta.label}
              </a>
            </div>
          </div>
        </section>
        <section className={styles.companyInfo}>
          <div className={styles.companyRow}>
            <address className={styles.companyAddress} style={{ fontStyle: "normal" }}>
              <p className={styles.companyName}>{companyInfo.name}</p>
              <ul className={styles.companyList}>
                <li>주소 : {companyInfo.address}</li>
                <li>
                  이메일 :{" "}
                  <a href={`mailto:${companyInfo.email}`} className={styles.companyLink}>
                    {companyInfo.email}
                  </a>
                </li>
                <li>대표전화 : {companyInfo.phone}</li>
              </ul>
            </address>
            <div className={styles.footerAside}>
              <a
                href={`tel:${companyInfo.phone.replace(/-/g, "")}`}
                className={styles.footerPhoneBtn}
              >
                <svg
                  className={styles.footerPhoneIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 015 6a2 2 0 012-2z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {companyInfo.phone}
              </a>
              <ul className={styles.sns}>
                <li>
                  <a href="#" title="인스타그램">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${IMG}/files/website/chutcha_web/common/ic_ft_sns_insta.svg`}
                      alt="Alpexmedi 인스타그램"
                    />
                  </a>
                </li>
                <li>
                  <a href="#" title="유튜브">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${IMG}/files/website/chutcha_web/common/ic_ft_sns_youtube.svg`}
                      alt="Alpexmedi 유튜브"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className={styles.linkGroup}>
            <li>
              <a href="#">서비스 이용약관</a>
            </li>
            <li>
              <a href="#">개인정보 처리방침</a>
            </li>
            <li>
              <a href="/quote/request" className={styles.linkBlue}>
                견적 요청
              </a>
            </li>
            <li>
              <a href="/resources">자료실</a>
            </li>
          </ul>
          <div className={styles.copyright}>
            <p>{companyInfo.disclaimer}</p>
            <p>{companyInfo.copyright}</p>
          </div>
        </section>
      </footer>
    </div>
  );
}
