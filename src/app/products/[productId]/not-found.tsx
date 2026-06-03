import Link from "next/link";
import Header from "@/components/chutcha/Header";
import styles from "../productDetail.module.css";

export default function ProductNotFound() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.section} style={{ textAlign: "center" }}>
          <h1 className={styles.sectionTitle}>제품을 찾을 수 없습니다</h1>
          <p style={{ color: "var(--gray-40)", marginBottom: 20 }}>
            요청하신 장비 정보가 없거나 삭제되었을 수 있습니다.
          </p>
          <Link href="/products" className={styles.featureMore}>
            의료장비 목록으로 돌아가기
          </Link>
        </section>
      </main>
    </div>
  );
}
