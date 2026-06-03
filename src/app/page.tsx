import Image from "next/image";
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
  news,
  siteNotices,
  footerBanner,
  companyInfo,
} from "@/data/homeData";

export default function Home() {
  return (
    <div className={styles.page}>
      <PagePopups />
      <Header />

      <div className={styles.floatLeft}>
        <WeeklyHotBanner />
      </div>
      <div className={styles.floatRight}>
        <PromoSideBanner />
        <QuoteSideBanner />
      </div>

      <main>
        <HeroSection>
          <ThemeSection title="추천 의료장비" products={medicalProducts} />

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
            <a href="#" className={styles.viewAll}>
              전체보기
            </a>
            <ul className={styles.newsList}>
              {news.map((item) => (
                <li key={item.title}>
                  <a href={item.href}>
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
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.notice}>
              <h3>공지</h3>
              <ul className={styles.noticeList}>
                {siteNotices.map((notice) => (
                  <li key={notice.title}>
                    <a href={notice.href}>
                      <dl>
                        <dt>{notice.title}</dt>
                        <dd>{notice.date}</dd>
                      </dl>
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#" className={`${styles.viewAll} ${styles.viewAllBlue}`}>
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
            <div className={styles.appVisual}>
              <Image
                src={footerBanner.visual}
                alt=""
                fill
                sizes="280px"
                className={styles.appVisualImg}
              />
            </div>
          </div>
        </section>
        <section className={styles.companyInfo}>
          <div className={styles.companyRow}>
            <address style={{ fontStyle: "normal" }}>
              <ul className={styles.companyList}>
                <li>{companyInfo.name}</li>
                <li>{companyInfo.ceo}</li>
                <li>{companyInfo.address}</li>
                <li>대표전화 : {companyInfo.phone}</li>
              </ul>
              <ul className={styles.companyList}>
                <li>
                  제휴문의 : <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
                </li>
                <li>사업자 등록번호 : {companyInfo.businessNumber}</li>
                <li>통신판매업 신고번호 : {companyInfo.salesNumber}</li>
              </ul>
            </address>
            <ul className={styles.linkGroup}>
              <li>
                <a href="#">서비스 이용약관</a>
              </li>
              <li>
                <a href="#">개인정보 처리방침</a>
              </li>
              <li>
                <a href="#" className={styles.linkBlue}>
                  견적 요청
                </a>
              </li>
              <li>
                <a href="#">자료실</a>
              </li>
            </ul>
          </div>
          <div className={styles.footerBottom}>
            <ul className={styles.sns}>
              <li>
                <a href="#" title="인스타그램">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${IMG}/files/website/chutcha_web/common/ic_ft_sns_insta.svg`}
                    alt="첫차 인스타그램"
                  />
                </a>
              </li>
              <li>
                <a href="#" title="유튜브">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${IMG}/files/website/chutcha_web/common/ic_ft_sns_youtube.svg`}
                    alt="첫차 유튜브"
                  />
                </a>
              </li>
              <li>
                <a href="#" title="블로그">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${IMG}/files/website/chutcha_web/common/ic_ft_sns_blog.svg`}
                    alt="첫차 블로그"
                  />
                </a>
              </li>
            </ul>
            <ul className={styles.certMarks}>
              <li>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${IMG}/files/website/chutcha_pc/common/footer/img_download_mark_app.png`}
                  alt="앱스토어 다운로드"
                />
              </li>
              <li>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${IMG}/files/website/chutcha_pc/common/footer/img_certification_mark_hiseoul.png`}
                  alt="서울산업진흥원"
                />
              </li>
              <li>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${IMG}/files/website/chutcha_pc/common/footer/img_certification_mark_goodcontents.png`}
                  alt="굿 콘텐츠 서비스"
                />
              </li>
            </ul>
          </div>
          <div className={styles.copyright}>
            <p>{companyInfo.disclaimer}</p>
            <p>{companyInfo.copyright}</p>
          </div>
        </section>
      </footer>
    </div>
  );
}
