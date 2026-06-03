"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAdminCms } from "@/hooks/useAdminCms";
import { flattenCatalogAll, getCatalogProduct, updateCatalogProduct } from "@/lib/cms/catalogOps";
import styles from "@/app/admin/admin.module.css";

type AdminProductEditFormProps = {
  productId: string;
};

export default function AdminProductEditForm({ productId }: AdminProductEditFormProps) {
  const router = useRouter();
  const { store, loading, error, save } = useAdminCms();
  const [productName, setProductName] = useState("");
  const [searchKeywords, setSearchKeywords] = useState("");
  const [hidden, setHidden] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const flatRow = useMemo(() => {
    if (!store) return undefined;
    return flattenCatalogAll(store.productCatalog).find((p) => p.productId === productId);
  }, [store, productId]);

  useEffect(() => {
    if (!store || initialized) return;
    const raw = getCatalogProduct(store.productCatalog, productId);
    const row = flattenCatalogAll(store.productCatalog).find((p) => p.productId === productId);
    if (!raw || !row) return;
    setProductName(row.productName);
    setSearchKeywords(row.searchKeywords.join(", "));
    setHidden(Boolean(raw.hidden));
    setInitialized(true);
  }, [store, productId, initialized]);

  if (loading || !store) {
    return <p className={styles.loading}>{loading ? "로딩 중…" : error}</p>;
  }

  if (!flatRow) {
    return (
      <div className={styles.error}>
        제품을 찾을 수 없습니다.{" "}
        <Link href="/admin/products">목록으로</Link>
      </div>
    );
  }

  async function handleSubmit() {
    if (!store) return;
    const name = productName.trim();
    if (!name) {
      setMessage("제품명은 필수입니다.");
      return;
    }
    const keywords = searchKeywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    setSaving(true);
    setMessage(null);
    try {
      const catalog = updateCatalogProduct(store.productCatalog, productId, {
        productName: name,
        searchKeywords: keywords,
        hidden,
      });
      await save({ productCatalog: catalog });
      router.push("/admin/products");
      router.refresh();
    } catch {
      setMessage("저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {message && <div className={styles.error}>{message}</div>}

      <section className={styles.panel}>
        <p className={styles.meta} style={{ marginBottom: 16 }}>
          {flatRow.categoryName} · {flatRow.typeName} · {flatRow.brandName}
        </p>
        <div className={styles.formGrid}>
          <div>
            <label className={styles.label}>제품 ID</label>
            <input className={styles.input} value={productId} readOnly disabled />
          </div>
          <div>
            <label className={styles.label}>제품명</label>
            <input className={styles.input} value={productName} onChange={(e) => setProductName(e.target.value)} />
          </div>
          <div>
            <label className={styles.label}>검색 키워드 (쉼표 구분)</label>
            <input
              className={styles.input}
              value={searchKeywords}
              onChange={(e) => setSearchKeywords(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label}>
              <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} /> 비노출
              (목록·검색에서 숨김)
            </label>
          </div>
          <div className={styles.rowActions}>
            <button type="button" className={styles.btn} disabled={saving} onClick={() => void handleSubmit()}>
              {saving ? "저장 중…" : "저장"}
            </button>
            <Link href="/admin/products" className={styles.btnSecondary}>
              취소
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
