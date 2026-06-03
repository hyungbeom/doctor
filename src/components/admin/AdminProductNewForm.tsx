"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAdminCms } from "@/hooks/useAdminCms";
import { addCatalogProduct } from "@/lib/cms/catalogOps";
import type { CatalogProduct } from "@/data/productCatalog";
import styles from "@/app/admin/admin.module.css";

function createInitialDraft(store: NonNullable<ReturnType<typeof useAdminCms>["store"]>) {
  const cat = store.productCatalog.categories[0];
  const type = cat?.equipmentTypes[0];
  const brand = type?.brands[0];
  return {
    productId: `P${Date.now().toString(36).toUpperCase()}`,
    productName: "",
    searchKeywords: "",
    hidden: false,
    categoryId: cat?.categoryId ?? "",
    typeId: type?.typeId ?? "",
    brandId: brand?.brandId ?? "",
  };
}

export default function AdminProductNewForm() {
  const router = useRouter();
  const { store, loading, error, save } = useAdminCms();
  const [draft, setDraft] = useState<ReturnType<typeof createInitialDraft> | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const categories = store?.productCatalog.categories ?? [];

  const typesForCategory = useMemo(
    () => categories.find((c) => c.categoryId === draft?.categoryId)?.equipmentTypes ?? [],
    [categories, draft?.categoryId],
  );

  const brandsForType = useMemo(
    () => typesForCategory.find((t) => t.typeId === draft?.typeId)?.brands ?? [],
    [typesForCategory, draft?.typeId],
  );

  if (loading || !store) {
    return <p className={styles.loading}>{loading ? "로딩 중…" : error}</p>;
  }

  const form = draft ?? createInitialDraft(store);

  async function handleSubmit() {
    if (!store) return;
    const keywords = form.searchKeywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    const product: CatalogProduct = {
      productId: form.productId.trim(),
      productName: form.productName.trim(),
      searchKeywords: keywords,
      hidden: form.hidden,
    };

    if (!product.productId || !product.productName) {
      setMessage("제품 ID와 제품명은 필수입니다.");
      return;
    }
    if (!form.categoryId || !form.typeId || !form.brandId) {
      setMessage("카테고리·유형·브랜드를 선택해 주세요.");
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const catalog = addCatalogProduct(store.productCatalog, {
        categoryId: form.categoryId,
        typeId: form.typeId,
        brandId: form.brandId,
        product,
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
        <div className={styles.formGrid}>
          <div>
            <label className={styles.label}>카테고리</label>
            <select
              className={styles.select}
              value={form.categoryId}
              onChange={(e) => {
                const cat = categories.find((c) => c.categoryId === e.target.value);
                const type = cat?.equipmentTypes[0];
                const brand = type?.brands[0];
                setDraft({
                  ...form,
                  categoryId: e.target.value,
                  typeId: type?.typeId ?? "",
                  brandId: brand?.brandId ?? "",
                });
              }}
            >
              {categories.map((c) => (
                <option key={c.categoryId} value={c.categoryId}>
                  {c.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>장비 유형</label>
            <select
              className={styles.select}
              value={form.typeId}
              onChange={(e) => {
                const type = typesForCategory.find((t) => t.typeId === e.target.value);
                const brand = type?.brands[0];
                setDraft({
                  ...form,
                  typeId: e.target.value,
                  brandId: brand?.brandId ?? "",
                });
              }}
            >
              {typesForCategory.map((t) => (
                <option key={t.typeId} value={t.typeId}>
                  {t.typeName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>브랜드</label>
            <select
              className={styles.select}
              value={form.brandId}
              onChange={(e) => setDraft({ ...form, brandId: e.target.value })}
            >
              {brandsForType.map((b) => (
                <option key={b.brandId} value={b.brandId}>
                  {b.brandName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>제품 ID</label>
            <input
              className={styles.input}
              value={form.productId}
              onChange={(e) => setDraft({ ...form, productId: e.target.value })}
            />
          </div>
          <div>
            <label className={styles.label}>제품명</label>
            <input
              className={styles.input}
              value={form.productName}
              onChange={(e) => setDraft({ ...form, productName: e.target.value })}
            />
          </div>
          <div>
            <label className={styles.label}>검색 키워드 (쉼표 구분)</label>
            <input
              className={styles.input}
              value={form.searchKeywords}
              onChange={(e) => setDraft({ ...form, searchKeywords: e.target.value })}
            />
          </div>
          <div>
            <label className={styles.label}>
              <input
                type="checkbox"
                checked={form.hidden}
                onChange={(e) => setDraft({ ...form, hidden: e.target.checked })}
              />{" "}
              비노출 (목록·검색에서 숨김)
            </label>
          </div>
          <div className={styles.rowActions}>
            <button type="button" className={styles.btn} disabled={saving} onClick={() => void handleSubmit()}>
              {saving ? "저장 중…" : "등록"}
            </button>
            <Link href="/admin/products" className={styles.btnSecondary}>
              취소
            </Link>
          </div>
        </div>
      </section>

      <p className={styles.meta}>
        카테고리·브랜드·유형은 기존 카탈로그 분류에서 선택합니다.
      </p>
    </>
  );
}
