import catalogData from "./alpexmedi_comprehensive_products.json";

export type CatalogProduct = {
  productId: string;
  productName: string;
  searchKeywords?: string[];
  /** 관리자에서 비노출 처리 시 공개 목록·검색에서 제외 */
  hidden?: boolean;
};

export type CatalogBrand = {
  brandId: string;
  brandName: string;
  products?: CatalogProduct[];
};

export type CatalogEquipmentType = {
  typeId: string;
  typeName: string;
  brands: CatalogBrand[];
};

export type CatalogCategory = {
  categoryId: string;
  categoryName: string;
  equipmentTypes: CatalogEquipmentType[];
};

export type ProductCatalog = {
  categories: CatalogCategory[];
};

export type FlatProduct = {
  productId: string;
  productName: string;
  searchKeywords: string[];
  categoryId: string;
  categoryName: string;
  typeId: string;
  typeName: string;
  brandId: string;
  brandName: string;
};

export type SearchFilters = {
  categoryId?: string;
  typeId?: string;
  brandId?: string;
  query?: string;
};

export const productCatalog = catalogData as ProductCatalog;

export function shortLabel(name: string): string {
  const idx = name.indexOf(" (");
  return idx > 0 ? name.slice(0, idx) : name;
}

function flattenProducts(catalog: ProductCatalog): FlatProduct[] {
  const result: FlatProduct[] = [];

  for (const category of catalog.categories) {
    for (const equipmentType of category.equipmentTypes) {
      for (const brand of equipmentType.brands) {
        for (const product of brand.products ?? []) {
          if (product.hidden) continue;
          result.push({
            productId: product.productId,
            productName: product.productName,
            searchKeywords: product.searchKeywords ?? [],
            categoryId: category.categoryId,
            categoryName: category.categoryName,
            typeId: equipmentType.typeId,
            typeName: equipmentType.typeName,
            brandId: brand.brandId,
            brandName: brand.brandName,
          });
        }
      }
    }
  }

  return result;
}

export const allProducts = flattenProducts(productCatalog);

export function getProductById(productId: string): FlatProduct | undefined {
  return allProducts.find((product) => product.productId === productId);
}

function normalizeProductKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
}

export function findCatalogProductByDisplayName(displayName: string): FlatProduct | undefined {
  const key = normalizeProductKey(displayName);
  if (!key) {
    return undefined;
  }

  return allProducts.find((product) => {
    const candidates = [
      normalizeProductKey(product.productName),
      normalizeProductKey(shortLabel(product.brandName)),
      ...product.searchKeywords.map(normalizeProductKey),
    ];

    return candidates.some(
      (candidate) =>
        candidate.length >= 3 &&
        (candidate.includes(key) || key.includes(candidate)),
    );
  });
}

export function getRelatedProducts(product: FlatProduct, limit = 3): FlatProduct[] {
  return allProducts
    .filter(
      (item) =>
        item.productId !== product.productId &&
        item.typeId === product.typeId &&
        item.brandId === product.brandId,
    )
    .slice(0, limit);
}

/** 같은 장비 유형의 다른 제품 */
export function getSimilarProducts(product: FlatProduct, limit = 4): FlatProduct[] {
  const sameType = allProducts.filter(
    (item) => item.productId !== product.productId && item.typeId === product.typeId,
  );

  if (sameType.length >= limit) {
    return sameType.slice(0, limit);
  }

  const sameCategory = allProducts.filter(
    (item) =>
      item.productId !== product.productId &&
      item.categoryId === product.categoryId &&
      item.typeId !== product.typeId,
  );

  const merged = [...sameType];
  for (const item of sameCategory) {
    if (merged.length >= limit) {
      break;
    }
    if (!merged.some((entry) => entry.productId === item.productId)) {
      merged.push(item);
    }
  }

  return merged.slice(0, limit);
}

/** 같은 카테고리의 다른 유형 제품 */
export function getSuggestedProducts(product: FlatProduct, limit = 4): FlatProduct[] {
  const picked = allProducts.filter(
    (item) =>
      item.productId !== product.productId &&
      item.categoryId === product.categoryId &&
      item.typeId !== product.typeId,
  );

  if (picked.length >= limit) {
    return picked.slice(0, limit);
  }

  const others = allProducts.filter(
    (item) =>
      item.productId !== product.productId &&
      item.categoryId !== product.categoryId,
  );

  const merged = [...picked];
  for (const item of others) {
    if (merged.length >= limit) {
      break;
    }
    if (!merged.some((entry) => entry.productId === item.productId)) {
      merged.push(item);
    }
  }

  return merged.slice(0, limit);
}

export function getGalleryProducts(product: FlatProduct): FlatProduct[] {
  const related = getRelatedProducts(product, 3);
  if (related.length >= 2) {
    return [product, ...related.slice(0, 2)];
  }
  const sameType = allProducts
    .filter((item) => item.productId !== product.productId && item.typeId === product.typeId)
    .slice(0, 2);
  return [product, ...sameType];
}

function buildSearchHaystack(product: FlatProduct): string {
  return [
    product.productName,
    product.brandName,
    product.typeName,
    shortLabel(product.categoryName),
    ...product.searchKeywords,
  ]
    .join(" ")
    .toLowerCase();
}

function matchesQuery(haystack: string, query: string): boolean {
  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (tokens.length === 0) {
    return true;
  }

  return tokens.every((token) => haystack.includes(token));
}

export function searchProducts(filters: SearchFilters): FlatProduct[] {
  const query = filters.query?.trim().toLowerCase() ?? "";

  return allProducts.filter((product) => {
    if (filters.categoryId && product.categoryId !== filters.categoryId) {
      return false;
    }
    if (filters.typeId && product.typeId !== filters.typeId) {
      return false;
    }
    if (filters.brandId && product.brandId !== filters.brandId) {
      return false;
    }

    if (!query) {
      return true;
    }

    return matchesQuery(buildSearchHaystack(product), query);
  });
}

export function hasActiveSearch(filters: SearchFilters): boolean {
  return Boolean(
    filters.categoryId ||
      filters.typeId ||
      filters.brandId ||
      filters.query?.trim(),
  );
}

export function getCategoryById(categoryId: string) {
  return productCatalog.categories.find((category) => category.categoryId === categoryId);
}

export type ProductListFilterState = {
  categoryId?: string;
  typeIds?: string[];
  brandIds?: string[];
  query?: string;
};

export function filterProductList(
  products: FlatProduct[],
  filters: ProductListFilterState,
): FlatProduct[] {
  const query = filters.query?.trim().toLowerCase() ?? "";

  return products.filter((product) => {
    if (filters.categoryId && product.categoryId !== filters.categoryId) {
      return false;
    }
    if (filters.typeIds?.length && !filters.typeIds.includes(product.typeId)) {
      return false;
    }
    if (filters.brandIds?.length && !filters.brandIds.includes(product.brandId)) {
      return false;
    }
    if (query && !matchesQuery(buildSearchHaystack(product), query)) {
      return false;
    }
    return true;
  });
}

export type ProductListSortKey = "default" | "name" | "brand";

export function sortProducts(products: FlatProduct[], sort: ProductListSortKey): FlatProduct[] {
  const list = [...products];

  if (sort === "name") {
    return list.sort((a, b) => a.productName.localeCompare(b.productName, "ko"));
  }
  if (sort === "brand") {
    return list.sort((a, b) => a.brandName.localeCompare(b.brandName, "ko"));
  }

  return list.sort((a, b) => {
    const category = a.categoryName.localeCompare(b.categoryName, "ko");
    if (category !== 0) {
      return category;
    }
    const type = a.typeName.localeCompare(b.typeName, "ko");
    if (type !== 0) {
      return type;
    }
    return a.productName.localeCompare(b.productName, "ko");
  });
}
