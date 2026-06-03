import Image from "next/image";
import Link from "next/link";
import styles from "@/app/chutcha.module.css";
import type { MedicalProduct } from "@/data/homeData";
import { getMedicalProductHref } from "@/lib/medicalProductUrl";

type ThemeSectionProps = {
  title: string;
  products: MedicalProduct[];
  className?: string;
};

export default function ThemeSection({ title, products, className }: ThemeSectionProps) {
  return (
    <section className={`${styles.section} ${styles.productSection} ${className ?? ""}`}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <ul className={styles.productGrid}>
        {products.map((product) => (
          <li key={product.id} className={styles.productCard}>
            <Link href={getMedicalProductHref(product)}>
              <div className={styles.productPhoto}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1200px) 260px, (min-width: 768px) 33vw, 50vw"
                  className={styles.productPhotoImg}
                />
              </div>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDesc}>{product.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
