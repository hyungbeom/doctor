import Image from "next/image";
import Link from "next/link";
import styles from "@/app/chutcha.module.css";
import type { MedicalProduct } from "@/data/homeData";
import { getMedicalProductHref } from "@/lib/medicalProductUrl";

type ThemeSectionProps = {
  title: string;
  products: MedicalProduct[];
  className?: string;
  /** 모바일(≤767px)에서만 표시할 최대 카드 수 */
  mobileMaxItems?: number;
};

export default function ThemeSection({
  title,
  products,
  className,
  mobileMaxItems,
}: ThemeSectionProps) {
  return (
    <section
      className={`${styles.section} ${styles.productSection} ${className ?? ""}`}
      {...(mobileMaxItems != null ? { "data-mobile-max": mobileMaxItems } : {})}
    >
      <h2 className={styles.sectionTitle}>{title}</h2>
      <ul className={styles.productGrid}>
        {products.map((product) => (
          <li key={product.id} className={styles.productCard}>
            <Link href={getMedicalProductHref(product)} className={styles.productCardLink}>
              <div className={styles.productCardInner}>
                <div className={styles.productPhoto}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1200px) 260px, (min-width: 768px) 33vw, 88px"
                    className={styles.productPhotoImg}
                  />
                </div>
                <div className={styles.productCardBody}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
