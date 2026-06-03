import Image from "next/image";
import Link from "next/link";
import styles from "@/app/products/productDetail.module.css";
import { formatManwon, getEstimatedQuoteRange } from "@/data/productDetail";
import {
  getSimilarProducts,
  getSuggestedProducts,
  shortLabel,
  type FlatProduct,
} from "@/data/productCatalog";
import { getProductImage } from "@/lib/productImage";
import { buildProductDetailUrl } from "@/lib/productListUrl";

type ProductRecommendSectionsProps = {
  product: FlatProduct;
};

export default function ProductRecommendSections({ product }: ProductRecommendSectionsProps) {
  const similarProducts = getSimilarProducts(product, 4);
  const suggestedProducts = getSuggestedProducts(product, 4);

  if (similarProducts.length === 0 && suggestedProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.recommendWrap}>
      {similarProducts.length > 0 && (
        <RecommendSection title="비슷한 기기를 추천드려요" products={similarProducts} />
      )}
      {suggestedProducts.length > 0 && (
        <RecommendSection title="이 장비는 어때요?" products={suggestedProducts} />
      )}
    </div>
  );
}

function RecommendSection({ title, products }: { title: string; products: FlatProduct[] }) {
  return (
    <section className={styles.recommendSection}>
      <h2 className={styles.recommendTitle}>{title}</h2>
      <ul className={styles.recommendGrid}>
        {products.map((item) => (
          <RecommendCard key={item.productId} product={item} />
        ))}
      </ul>
    </section>
  );
}

function RecommendCard({ product }: { product: FlatProduct }) {
  const quoteRange = getEstimatedQuoteRange(product);
  const monthlyEstimate = Math.round(quoteRange.min * 0.018);

  return (
    <li className={styles.recommendCard}>
      <Link href={buildProductDetailUrl(product.productId)} className={styles.recommendLink}>
        <div className={styles.recommendPhoto}>
          <span className={styles.recommendBadge}>비교견적</span>
          <Image
            src={getProductImage(product.productId)}
            alt={product.productName}
            fill
            sizes="(min-width: 1200px) 280px, 25vw"
            className={styles.recommendPhotoImg}
          />
          <span className={styles.recommendAgent} aria-hidden>
            AM
          </span>
        </div>
        <div className={styles.recommendBody}>
          <h3 className={styles.recommendName}>{product.productName}</h3>
          <p className={styles.recommendMeta}>
            {shortLabel(product.brandName)} · {shortLabel(product.typeName)}
          </p>
          <p className={styles.recommendPrice}>
            견적 문의
            <span>
              {formatManwon(quoteRange.min)} / 월 {monthlyEstimate}만원
            </span>
          </p>
        </div>
      </Link>
    </li>
  );
}
