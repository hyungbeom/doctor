"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/chutcha/Header";
import styles from "@/app/products/products.module.css";
import { getProductImage } from "@/lib/productImage";
import {
  buildProductDetailUrl,
  buildProductListUrl,
  parseProductListSearchParams,
  type ProductListSort,
} from "@/lib/productListUrl";
import {
  allProducts,
  filterProductList,
  getCategoryById,
  productCatalog,
  shortLabel,
  sortProducts,
  type FlatProduct,
} from "@/data/productCatalog";

const MOBILE_FILTER_MQ = "(max-width: 767px)";

export default function ProductListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const params = useMemo(
    () => parseProductListSearchParams(Object.fromEntries(searchParams.entries())),
    [searchParams],
  );

  const navigate = useCallback(
    (next: Parameters<typeof buildProductListUrl>[0]) => {
      router.push(buildProductListUrl(next));
    },
    [router],
  );

  const selectedCategory = params.category ? getCategoryById(params.category) : undefined;

  const filteredProducts = useMemo(() => {
    const list = filterProductList(allProducts, {
      categoryId: params.category,
      typeIds: params.type,
      brandIds: params.brand,
      query: params.q,
    });
    return sortProducts(list, params.sort);
  }, [params.brand, params.category, params.q, params.sort, params.type]);

  const activeChips = useMemo(() => {
    const chips: { key: string; label: string; remove: () => void }[] = [];

    if (params.category && selectedCategory) {
      chips.push({
        key: "category",
        label: shortLabel(selectedCategory.categoryName),
        remove: () =>
          navigate({
            q: params.q,
            sort: params.sort,
          }),
      });
    }

    params.type?.forEach((typeId) => {
      const type = selectedCategory?.equipmentTypes.find((item) => item.typeId === typeId);
      if (type) {
        chips.push({
          key: `type-${typeId}`,
          label: shortLabel(type.typeName),
          remove: () =>
            navigate({
              category: params.category,
              type: params.type?.filter((id) => id !== typeId),
              brand: params.brand,
              q: params.q,
              sort: params.sort,
            }),
        });
      }
    });

    params.brand?.forEach((brandId) => {
      const brand = selectedCategory?.equipmentTypes
        .flatMap((type) => type.brands)
        .find((item) => item.brandId === brandId);
      if (brand) {
        chips.push({
          key: `brand-${brandId}`,
          label: shortLabel(brand.brandName),
          remove: () =>
            navigate({
              category: params.category,
              type: params.type,
              brand: params.brand?.filter((id) => id !== brandId),
              q: params.q,
              sort: params.sort,
            }),
        });
      }
    });

    if (params.q) {
      chips.push({
        key: "q",
        label: `"${params.q}"`,
        remove: () =>
          navigate({
            category: params.category,
            type: params.type,
            brand: params.brand,
            sort: params.sort,
          }),
      });
    }

    return chips;
  }, [navigate, params, selectedCategory]);

  const pageTitle = selectedCategory
    ? shortLabel(selectedCategory.categoryName)
    : "전체 의료장비";

  const filterSummary = useMemo(() => {
    if (activeChips.length === 0) {
      return "전체 장비";
    }
    if (activeChips.length === 1) {
      return activeChips[0].label;
    }
    return `${activeChips.length}개 조건 적용`;
  }, [activeChips]);

  const closeFilterOnMobile = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia(MOBILE_FILTER_MQ).matches) {
      setFilterOpen(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_FILTER_MQ);
    const handleChange = () => {
      if (!media.matches) {
        setFilterOpen(false);
      }
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleType = (typeId: string) => {
    const current = params.type ?? [];
    const next = current.includes(typeId)
      ? current.filter((id) => id !== typeId)
      : [...current, typeId];
    navigate({
      category: params.category,
      type: next.length ? next : undefined,
      brand: params.brand,
      q: params.q,
      sort: params.sort,
    });
    closeFilterOnMobile();
  };

  const toggleBrand = (brandId: string) => {
    const current = params.brand ?? [];
    const next = current.includes(brandId)
      ? current.filter((id) => id !== brandId)
      : [...current, brandId];
    navigate({
      category: params.category,
      type: params.type,
      brand: next.length ? next : undefined,
      q: params.q,
      sort: params.sort,
    });
    closeFilterOnMobile();
  };

  const setSort = (sort: ProductListSort) => {
    navigate({ ...params, sort });
  };

  const resetFilters = () => {
    router.push("/products");
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.layout}>
          <aside
            className={`${styles.sidebar} ${filterOpen ? styles.sidebarOpen : styles.sidebarCollapsed}`}
          >
            <button
              type="button"
              className={styles.sidebarToggle}
              aria-expanded={filterOpen}
              aria-controls="product-filters"
              onClick={() => setFilterOpen((open) => !open)}
            >
              <span className={styles.sidebarToggleLabel}>필터</span>
              <span className={styles.sidebarToggleSummary}>{filterSummary}</span>
              <span className={styles.sidebarToggleIcon} aria-hidden />
            </button>

            <div id="product-filters" className={styles.sidebarBody}>
              <section className={styles.sidebarSection}>
                <h2 className={styles.sidebarHead}>카테고리</h2>
                <ul className={styles.filterList}>
                  <li className={styles.filterItem}>
                    <Link
                      href="/products"
                      className={`${styles.filterLink} ${!params.category ? styles.filterLinkActive : ""}`}
                      onClick={closeFilterOnMobile}
                    >
                      전체 장비
                    </Link>
                  </li>
                  {productCatalog.categories.map((category) => (
                    <li key={category.categoryId} className={styles.filterItem}>
                      <Link
                        href={buildProductListUrl({ category: category.categoryId })}
                        className={`${styles.filterLink} ${
                          params.category === category.categoryId ? styles.filterLinkActive : ""
                        }`}
                        onClick={closeFilterOnMobile}
                      >
                        {shortLabel(category.categoryName)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              {selectedCategory && (
                <>
                  <section className={styles.sidebarSection}>
                    <h2 className={styles.sidebarHead}>장비 유형</h2>
                    <ul className={styles.filterList}>
                      {selectedCategory.equipmentTypes.map((type) => (
                        <li key={type.typeId} className={styles.filterItem}>
                          <label
                            className={`${styles.filterLabel} ${
                              params.type?.includes(type.typeId) ? styles.filterLabelActive : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={params.type?.includes(type.typeId) ?? false}
                              onChange={() => toggleType(type.typeId)}
                            />
                            <span>{shortLabel(type.typeName)}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className={styles.sidebarSection}>
                    <h2 className={styles.sidebarHead}>브랜드</h2>
                    {selectedCategory.equipmentTypes.map((type) => (
                      <div key={type.typeId} className={styles.typeGroup}>
                        <p className={styles.typeGroupTitle}>{shortLabel(type.typeName)}</p>
                        <ul className={styles.filterList}>
                          {type.brands.map((brand) => (
                            <li key={brand.brandId} className={styles.filterItem}>
                              <label
                                className={`${styles.filterLabel} ${
                                  params.brand?.includes(brand.brandId)
                                    ? styles.filterLabelActive
                                    : ""
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={params.brand?.includes(brand.brandId) ?? false}
                                  onChange={() => toggleBrand(brand.brandId)}
                                />
                                <span>{shortLabel(brand.brandName)}</span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </section>
                </>
              )}
            </div>
          </aside>

          <div className={styles.content}>
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                <h1 className={styles.pageTitle}>{pageTitle}</h1>
                <span className={styles.count}>총 {filteredProducts.length}건</span>
                {activeChips.length > 0 && (
                  <div className={styles.chips}>
                    {activeChips.map((chip) => (
                      <span key={chip.key} className={styles.chip}>
                        {chip.label}
                        <button type="button" aria-label={`${chip.label} 필터 제거`} onClick={chip.remove}>
                          ×
                        </button>
                      </span>
                    ))}
                    <button type="button" className={styles.resetBtn} onClick={resetFilters}>
                      초기화
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.sort} role="group" aria-label="정렬">
                {(
                  [
                    ["default", "기본 정렬"],
                    ["name", "제품명순"],
                    ["brand", "브랜드순"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={`${styles.sortBtn} ${params.sort === value ? styles.sortBtnActive : ""}`}
                    onClick={() => setSort(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <ul className={styles.grid}>
              {filteredProducts.length === 0 ? (
                <li className={styles.empty}>조건에 맞는 장비가 없습니다. 필터를 변경해 보세요.</li>
              ) : (
                filteredProducts.map((product) => (
                  <ProductCard key={product.productId} product={product} />
                ))
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProductCard({ product }: { product: FlatProduct }) {
  return (
    <li className={styles.card}>
      <Link href={buildProductDetailUrl(product.productId)} className={styles.cardLink}>
        <div className={styles.cardPhoto}>
          <Image
            src={getProductImage(product.productId)}
            alt={product.productName}
            fill
            sizes="(min-width: 1200px) 220px, 25vw"
            className={styles.cardPhotoImg}
          />
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{product.productName}</h3>
          <p className={styles.cardMeta}>
            {shortLabel(product.brandName)} · {shortLabel(product.typeName)}
          </p>
          <p className={styles.cardPrice}>견적 문의</p>
          <span className={styles.cardCta}>비교견적 받기 →</span>
        </div>
      </Link>
    </li>
  );
}
