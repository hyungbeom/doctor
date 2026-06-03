"use client";

import Link from "next/link";
import Header from "@/components/chutcha/Header";
import styles from "@/app/products/productDetail.module.css";
import {
  formatManwon,
  getEstimatedQuoteRange,
  getProductFeatures,
  getProductHighlights,
  getProductSpecs,
} from "@/data/productDetail";
import {
  getGalleryProducts,
  shortLabel,
  type FlatProduct,
} from "@/data/productCatalog";
import { buildProductListUrl } from "@/lib/productListUrl";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductRecommendSections from "./ProductRecommendSections";

type ProductDetailPageProps = {
  product: FlatProduct;
};

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const galleryItems = getGalleryProducts(product);

  const highlights = getProductHighlights(product);
  const specs = getProductSpecs(product);
  const features = getProductFeatures(product);
  const quoteRange = getEstimatedQuoteRange(product);
  const monthlyEstimate = Math.round(quoteRange.min * 0.018);

  const listUrl = buildProductListUrl({
    category: product.categoryId,
    type: [product.typeId],
    brand: [product.brandId],
  });

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          <Link href="/">홈</Link>
          <span>/</span>
          <Link href="/products">의료장비</Link>
          <span>/</span>
          <Link href={listUrl}>{shortLabel(product.categoryName)}</Link>
          <span>/</span>
          <strong>{product.productName}</strong>
        </nav>

        <div className={styles.layout}>
          <div className={styles.content}>
            <ProductImageCarousel items={galleryItems} />

            <section className={styles.highlights} aria-label="핵심 정보">
              {highlights.map((item) => (
                <article key={item.id} className={styles.highlightCard}>
                  <p className={styles.highlightLabel}>{item.label}</p>
                  <p className={styles.highlightValue}>{item.value}</p>
                  {item.sub && <p className={styles.highlightSub}>{item.sub}</p>}
                  {item.hrefLabel && (
                    <span className={styles.highlightLink}>{item.hrefLabel}</span>
                  )}
                </article>
              ))}
            </section>

            <section className={styles.titleBlock}>
              <h1 className={styles.productTitle}>
                {product.productName}
                <span className={styles.productTitleSub}>
                  {shortLabel(product.brandName)} · {shortLabel(product.typeName)}
                </span>
              </h1>
              <div className={styles.priceRow}>
                <p className={styles.priceMain}>견적 문의</p>
                <p className={styles.priceSub}>최저가 비교 견적 · 월 {monthlyEstimate}만원대 (리스 기준)</p>
              </div>
              <div className={styles.marketBar}>
                <p className={styles.marketLabel}>시장 예상 견적 대비 적정 구간</p>
                <div className={styles.marketTrack}>
                  <div className={styles.marketFill} />
                </div>
                <div className={styles.marketRange}>
                  <span>{formatManwon(quoteRange.min)}</span>
                  <span>{formatManwon(quoteRange.max)}</span>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>이 장비의 기본정보를 확인하세요</h2>
              <div className={styles.specGrid}>
                {specs.map((spec) => (
                  <div key={spec.label} className={styles.specRow}>
                    <span className={styles.specLabel}>{spec.label}</span>
                    <span className={styles.specValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>이 장비의 주요 옵션·기능을 확인하세요</h2>
              <div className={styles.featureGrid}>
                {features.map((feature) => (
                  <div key={feature.id} className={styles.featureItem}>
                    <span className={styles.featureIcon} aria-hidden>
                      {feature.icon}
                    </span>
                    <span className={styles.featureLabel}>{feature.label}</span>
                  </div>
                ))}
              </div>
              <Link href="#" className={styles.featureMore}>
                옵션 전체보기
              </Link>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.dealerCard}>
              <div className={styles.dealerProfile}>
                <div className={styles.dealerAvatar} aria-hidden>
                  AM
                </div>
                <div>
                  <p className={styles.dealerName}>Alpexmedi 장비 상담</p>
                  <p className={styles.dealerRating}>
                    <strong>5.0</strong> · 후기 128건
                  </p>
                </div>
              </div>
              <button type="button" className={styles.inquiryBtn}>
                장비 문의
              </button>
            </div>

            <div className={styles.quoteCard}>
              <p className={styles.quoteHead}>현금 구매 시 (견적 예상)</p>
              <p className={styles.quoteMonthly}>
                리스·렌탈 최소 월 납입
                <strong>월 {monthlyEstimate}만원~</strong>
              </p>
              <ul className={styles.quoteList}>
                <li>
                  <span>장비가</span>
                  <span>견적 후 확정</span>
                </li>
                <li>
                  <span>설치·세팅</span>
                  <span>약 80~150만원</span>
                </li>
                <li>
                  <span>교육·인수인계</span>
                  <span>약 40~80만원</span>
                </li>
                <li>
                  <span>총 예상 견적</span>
                  <span>
                    {formatManwon(quoteRange.min)} ~ {formatManwon(quoteRange.max)}
                  </span>
                </li>
              </ul>
              <div className={styles.quoteActions}>
                <button type="button" className={styles.quoteActionBtn}>
                  구매 계산기
                </button>
                <button type="button" className={styles.quoteActionBtn}>
                  공유하기
                </button>
              </div>
            </div>

            <div className={styles.promoMini}>
              비교견적 받고 최적가로 장비 구매
              <br />
              Alpexmedi 전문 상담팀이 도와드립니다.
            </div>
          </aside>
        </div>

        <ProductRecommendSections product={product} />
      </main>
    </div>
  );
}
