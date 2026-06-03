import { Suspense } from "react";
import ProductListPage from "@/components/products/ProductListPage";
import styles from "./products.module.css";

export const metadata = {
  title: "의료장비 목록 | Alpexmedi",
  description: "카테고리·브랜드별 의료장비를 검색하고 비교 견적을 받아보세요.",
};

function ProductsLoading() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p style={{ padding: "48px 0", textAlign: "center", color: "var(--gray-40)" }}>
          장비 목록을 불러오는 중입니다…
        </p>
      </main>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductListPage />
    </Suspense>
  );
}
