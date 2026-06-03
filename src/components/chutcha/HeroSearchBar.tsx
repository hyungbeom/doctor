"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildProductDetailUrl, buildProductListUrl } from "@/lib/productListUrl";
import styles from "@/app/chutcha.module.css";
import { IMG, keywords } from "@/data/homeData";
import {
  hasActiveSearch,
  productCatalog,
  searchProducts,
  shortLabel,
  type FlatProduct,
  type SearchFilters,
} from "@/data/productCatalog";
import SearchFilterDropdown, { type DropdownOption } from "./SearchFilterDropdown";

const MAX_RESULTS = 12;
const QUERY_SUGGESTIONS = 8;
const SEARCH_DEBOUNCE_MS = 200;

type OpenFilter = "category" | "type" | "brand" | null;

export default function HeroSearchBar() {
  const router = useRouter();
  const searchRef = useRef<HTMLElement>(null);
  const queryInputRef = useRef<HTMLInputElement>(null);
  const [openFilter, setOpenFilter] = useState<OpenFilter>(null);
  const [category, setCategory] = useState<DropdownOption | null>(null);
  const [equipmentType, setEquipmentType] = useState<DropdownOption | null>(null);
  const [brand, setBrand] = useState<DropdownOption | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FlatProduct[]>([]);
  const [queryResults, setQueryResults] = useState<FlatProduct[]>([]);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [queryDropdownOpen, setQueryDropdownOpen] = useState(false);
  const [searchMessage, setSearchMessage] = useState<string | null>(null);

  const filters = useMemo<SearchFilters>(
    () => ({
      categoryId: category?.id,
      typeId: equipmentType?.id,
      brandId: brand?.id,
      query,
    }),
    [category?.id, equipmentType?.id, brand?.id, query],
  );

  const categoryOptions = useMemo<DropdownOption[]>(
    () =>
      productCatalog.categories.map((item) => ({
        id: item.categoryId,
        label: item.categoryName,
      })),
    [],
  );

  const typeOptions = useMemo<DropdownOption[]>(() => {
    if (!category) {
      return [];
    }
    const found = productCatalog.categories.find((item) => item.categoryId === category.id);
    return (
      found?.equipmentTypes.map((item) => ({
        id: item.typeId,
        label: item.typeName,
      })) ?? []
    );
  }, [category]);

  const brandOptions = useMemo<DropdownOption[]>(() => {
    if (!category || !equipmentType) {
      return [];
    }
    const foundCategory = productCatalog.categories.find((item) => item.categoryId === category.id);
    const foundType = foundCategory?.equipmentTypes.find((item) => item.typeId === equipmentType.id);
    return (
      foundType?.brands.map((item) => ({
        id: item.brandId,
        label: item.brandName,
      })) ?? []
    );
  }, [category, equipmentType]);

  const applySearchResults = useCallback((matched: FlatProduct[], showMainPanel: boolean) => {
    setResults(matched.slice(0, MAX_RESULTS));
    setQueryResults(matched.slice(0, QUERY_SUGGESTIONS));
    setResultsVisible(showMainPanel);
    setSearchMessage(
      matched.length === 0
        ? "조건에 맞는 장비가 없습니다. 검색어를 확인해 주세요."
        : matched.length > MAX_RESULTS
          ? `총 ${matched.length}건 중 ${MAX_RESULTS}건을 표시합니다.`
          : `총 ${matched.length}건의 장비를 찾았습니다.`,
    );
  }, []);

  const runSearch = useCallback(
    (nextFilters: SearchFilters, options?: { showMainPanel?: boolean; showQueryDropdown?: boolean }) => {
      const showMainPanel = options?.showMainPanel ?? true;
      const showQueryDropdown = options?.showQueryDropdown ?? Boolean(nextFilters.query?.trim());

      if (!hasActiveSearch(nextFilters)) {
        setResults([]);
        setQueryResults([]);
        setResultsVisible(false);
        setQueryDropdownOpen(false);
        setSearchMessage(null);
        return;
      }

      const matched = searchProducts(nextFilters);
      applySearchResults(matched, showMainPanel);
      setQueryDropdownOpen(showQueryDropdown && Boolean(nextFilters.query?.trim()));
    },
    [applySearchResults],
  );

  const runQuerySearch = useCallback(
    (value: string) => {
      runSearch(
        {
          categoryId: category?.id,
          typeId: equipmentType?.id,
          brandId: brand?.id,
          query: value,
        },
        { showMainPanel: false, showQueryDropdown: true },
      );
    },
    [brand?.id, category?.id, equipmentType?.id, runSearch],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpenFilter(null);
        setQueryDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenFilter(null);
        setQueryDropdownOpen(false);
        queryInputRef.current?.blur();
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setQueryResults([]);
      setQueryDropdownOpen(false);
      return;
    }

    const timer = window.setTimeout(() => {
      runQuerySearch(trimmed);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query, category?.id, equipmentType?.id, brand?.id, runQuerySearch]);

  const handleCategorySelect = (option: DropdownOption) => {
    setCategory(option);
    setEquipmentType(null);
    setBrand(null);
    setOpenFilter(null);
    runSearch({ categoryId: option.id, query }, { showMainPanel: true, showQueryDropdown: Boolean(query.trim()) });
  };

  const handleTypeSelect = (option: DropdownOption) => {
    setEquipmentType(option);
    setBrand(null);
    setOpenFilter(null);
    runSearch(
      {
        categoryId: category?.id,
        typeId: option.id,
        query,
      },
      { showMainPanel: true, showQueryDropdown: Boolean(query.trim()) },
    );
  };

  const handleBrandSelect = (option: DropdownOption) => {
    setBrand(option);
    setOpenFilter(null);
    runSearch(
      {
        categoryId: category?.id,
        typeId: equipmentType?.id,
        brandId: option.id,
        query,
      },
      { showMainPanel: true, showQueryDropdown: Boolean(query.trim()) },
    );
  };

  const handleKeywordClick = (label: string) => {
    setQuery(label);
    runSearch({ ...filters, query: label }, { showMainPanel: true, showQueryDropdown: true });
    queryInputRef.current?.focus();
  };

  const goToProductList = useCallback(() => {
    router.push(
      buildProductListUrl({
        category: category?.id,
        type: equipmentType ? [equipmentType.id] : undefined,
        brand: brand ? [brand.id] : undefined,
        q: query.trim() || undefined,
      }),
    );
  }, [brand, category, equipmentType, query, router]);

  const handleSubmit = () => {
    setOpenFilter(null);
    const trimmed = query.trim();
    if (!trimmed && !category && !equipmentType && !brand) {
      setSearchMessage("카테고리를 선택하거나 장비명을 입력해 주세요.");
      setResultsVisible(true);
      setQueryDropdownOpen(false);
      return;
    }
    goToProductList();
  };

  const handleQuerySubmit = () => {
    const trimmed = query.trim();
    if (!trimmed && !category && !equipmentType && !brand) {
      setSearchMessage("검색할 장비명을 입력해 주세요.");
      setQueryDropdownOpen(true);
      queryInputRef.current?.focus();
      return;
    }
    goToProductList();
  };

  const handleQueryKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleQuerySubmit();
    }
  };

  const handleQueryFocus = () => {
    const trimmed = query.trim();
    if (trimmed) {
      runQuerySearch(trimmed);
    }
  };

  const handleProductPick = (product: FlatProduct) => {
    setQueryDropdownOpen(false);
    router.push(buildProductDetailUrl(product.productId));
  };

  return (
    <section ref={searchRef} className={styles.searchCard}>
      <div className={styles.searchRow}>
        <div className={styles.treeBtns}>
          <SearchFilterDropdown
            placeholder="카테고리 선택"
            value={category}
            options={categoryOptions}
            isOpen={openFilter === "category"}
            showCategoryIcon
            onToggle={() => setOpenFilter((current) => (current === "category" ? null : "category"))}
            onSelect={handleCategorySelect}
          />
          <SearchFilterDropdown
            placeholder="장비 유형 선택"
            value={equipmentType}
            options={typeOptions}
            disabled={!category}
            isOpen={openFilter === "type"}
            onToggle={() => setOpenFilter((current) => (current === "type" ? null : "type"))}
            onSelect={handleTypeSelect}
          />
          <SearchFilterDropdown
            placeholder="브랜드 선택"
            value={brand}
            options={brandOptions}
            disabled={!equipmentType}
            isOpen={openFilter === "brand"}
            onToggle={() => setOpenFilter((current) => (current === "brand" ? null : "brand"))}
            onSelect={handleBrandSelect}
          />
        </div>
        <button type="button" className={styles.searchSubmit} title="검색" onClick={handleSubmit}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMG}/files/website/chutcha_pc/common/icon/ic_search_line_white.svg`}
            alt="검색"
            width={26}
            height={26}
          />
        </button>
      </div>

      {resultsVisible && (
        <div className={styles.searchResults} role="region" aria-live="polite" aria-label="검색 결과">
          {searchMessage && <p className={styles.searchResultsMeta}>{searchMessage}</p>}
          {results.length > 0 ? (
            <ul className={styles.searchResultList}>
              {results.map((product) => (
                <li key={product.productId}>
                  <button
                    type="button"
                    className={styles.searchResultItem}
                    onClick={() => handleProductPick(product)}
                  >
                    <strong className={styles.searchResultName}>{product.productName}</strong>
                    <span className={styles.searchResultPath}>
                      {shortLabel(product.categoryName)} · {shortLabel(product.typeName)} ·{" "}
                      {shortLabel(product.brandName)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}

      <div className={styles.extSearch}>
        <nav className={styles.keywords}>
          {keywords.map((kw) => (
            <button
              key={kw.label}
              type="button"
              className={styles.keyword}
              onClick={() => handleKeywordClick(kw.label)}
            >
              #{kw.label}
            </button>
          ))}
        </nav>
        <div className={styles.modelSearchWrap}>
          <div className={styles.modelSearch}>
            <button
              type="button"
              className={styles.modelSearchIconBtn}
              title="장비명 검색"
              aria-label="장비명 검색"
              onClick={handleQuerySubmit}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${IMG}/files/website/chutcha_web/common/ic_search_line_black.svg`}
                alt=""
                width={20}
                height={20}
              />
            </button>
            <input
              ref={queryInputRef}
              type="search"
              value={query}
              placeholder="장비명을 입력하세요"
              aria-label="장비명 검색"
              aria-expanded={queryDropdownOpen}
              aria-controls="equipment-query-results"
              onChange={(event) => setQuery(event.target.value)}
              onFocus={handleQueryFocus}
              onKeyDown={handleQueryKeyDown}
            />
          </div>

          {queryDropdownOpen && query.trim() && (
            <div
              id="equipment-query-results"
              className={styles.modelSearchDropdown}
              role="listbox"
              aria-label="장비명 검색 결과"
              onMouseDown={(event) => event.preventDefault()}
            >
              {queryResults.length > 0 ? (
                <ul className={styles.modelSearchResultList}>
                  {queryResults.map((product) => (
                    <li key={product.productId} role="option">
                      <button
                        type="button"
                        className={styles.modelSearchResultItem}
                        onClick={() => handleProductPick(product)}
                      >
                        <strong>{product.productName}</strong>
                        <span>
                          {shortLabel(product.brandName)} · {shortLabel(product.typeName)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.modelSearchEmpty}>일치하는 장비가 없습니다.</p>
              )}
              <button type="button" className={styles.modelSearchMore} onClick={handleQuerySubmit}>
                &quot;{query.trim()}&quot; 전체 검색 결과 보기
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
