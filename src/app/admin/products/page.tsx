"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAdminCms } from "@/hooks/useAdminCms";
import {
  flattenCatalogAll,
  getCatalogProduct,
  removeCatalogProduct,
} from "@/lib/cms/catalogOps";
import type { ProductCatalog } from "@/data/productCatalog";
import { buildProductDetailUrl } from "@/lib/productListUrl";
import styles from "../admin.module.css";

function adminProductEditUrl(productId: string) {
  return `/admin/products/${encodeURIComponent(productId)}/edit`;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const { store, loading, error, save } = useAdminCms();
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const flatList = useMemo(
    () => (store ? flattenCatalogAll(store.productCatalog) : []),
    [store],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return flatList.filter((p) => {
      if (categoryFilter && p.categoryId !== categoryFilter) return false;
      if (!q) return true;
      const hay = `${p.productId} ${p.productName} ${p.brandName} ${p.searchKeywords.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [flatList, query, categoryFilter]);

  const categories = store?.productCatalog.categories ?? [];

  async function persistCatalog(catalog: ProductCatalog) {
    await save({ productCatalog: catalog });
    setMessage("제품 카탈로그가 저장되었습니다.");
  }

  function stopRowNavigate(e: React.MouseEvent) {
    e.stopPropagation();
  }

  if (loading || !store) {
    return (
      <AdminShell title="제품">
        <p className={styles.loading}>{loading ? "로딩 중…" : error}</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title="제품 관리"
      actions={
        <Link href="/admin/products/new" className={styles.btn}>
          제품 추가
        </Link>
      }
    >
      {message && <div className={styles.success}>{message}</div>}

      <section className={styles.panel}>
        <div className={styles.rowActions} style={{ marginBottom: 16 }}>
          <input
            className={styles.input}
            style={{ maxWidth: 280 }}
            placeholder="제품명·ID·브랜드 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className={styles.select}
            style={{ maxWidth: 200 }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">전체 카테고리</option>
            {categories.map((c) => (
              <option key={c.categoryId} value={c.categoryId}>
                {c.categoryName}
              </option>
            ))}
          </select>
          <span className={styles.meta}>
            총 {flatList.length}건 · 표시 {filtered.length}건 · 행 클릭 시 수정
          </span>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>제품명</th>
              <th>카테고리</th>
              <th>브랜드</th>
              <th>노출</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const raw = getCatalogProduct(store.productCatalog, p.productId);
              return (
                <tr
                  key={p.productId}
                  className={styles.tableRowClickable}
                  onClick={() => router.push(adminProductEditUrl(p.productId))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(adminProductEditUrl(p.productId));
                    }
                  }}
                  tabIndex={0}
                  role="link"
                  aria-label={`${p.productName} 수정`}
                >
                  <td>{p.productId}</td>
                  <td>{p.productName}</td>
                  <td>{p.categoryName}</td>
                  <td>{p.brandName}</td>
                  <td>{raw?.hidden ? "숨김" : "노출"}</td>
                  <td className={styles.rowActions} onClick={stopRowNavigate}>
                    <Link
                      href={buildProductDetailUrl(p.productId)}
                      className={styles.btnSecondary}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      미리보기
                    </Link>
                    <button
                      type="button"
                      className={styles.btnDanger}
                      onClick={() => {
                        if (!confirm(`「${p.productName}」을(를) 삭제할까요?`)) return;
                        void persistCatalog(removeCatalogProduct(store.productCatalog, p.productId));
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </AdminShell>
  );
}
