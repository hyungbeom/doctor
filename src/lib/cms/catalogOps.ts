import type {
  CatalogProduct,
  FlatProduct,
  ProductCatalog,
} from "@/data/productCatalog";

export function flattenCatalog(catalog: ProductCatalog): FlatProduct[] {
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

/** 관리자 목록용 — 숨김 제품 포함 */
export function flattenCatalogAll(catalog: ProductCatalog): FlatProduct[] {
  const result: FlatProduct[] = [];

  for (const category of catalog.categories) {
    for (const equipmentType of category.equipmentTypes) {
      for (const brand of equipmentType.brands) {
        for (const product of brand.products ?? []) {
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

export function getCatalogProduct(
  catalog: ProductCatalog,
  productId: string,
): (CatalogProduct & { categoryId: string; typeId: string; brandId: string }) | undefined {
  for (const category of catalog.categories) {
    for (const equipmentType of category.equipmentTypes) {
      for (const brand of equipmentType.brands) {
        const found = brand.products?.find((p) => p.productId === productId);
        if (found) {
          return {
            ...found,
            categoryId: category.categoryId,
            typeId: equipmentType.typeId,
            brandId: brand.brandId,
          };
        }
      }
    }
  }
  return undefined;
}

export function updateCatalogProduct(
  catalog: ProductCatalog,
  productId: string,
  patch: Partial<Pick<CatalogProduct, "productName" | "searchKeywords" | "hidden">>,
): ProductCatalog {
  return {
    categories: catalog.categories.map((category) => ({
      ...category,
      equipmentTypes: category.equipmentTypes.map((equipmentType) => ({
        ...equipmentType,
        brands: equipmentType.brands.map((brand) => ({
          ...brand,
          products: brand.products?.map((product) =>
            product.productId === productId ? { ...product, ...patch } : product,
          ),
        })),
      })),
    })),
  };
}

export function removeCatalogProduct(catalog: ProductCatalog, productId: string): ProductCatalog {
  return {
    categories: catalog.categories.map((category) => ({
      ...category,
      equipmentTypes: category.equipmentTypes.map((equipmentType) => ({
        ...equipmentType,
        brands: equipmentType.brands.map((brand) => ({
          ...brand,
          products: brand.products?.filter((product) => product.productId !== productId),
        })),
      })),
    })),
  };
}

export function addCatalogProduct(
  catalog: ProductCatalog,
  target: {
    categoryId: string;
    typeId: string;
    brandId: string;
    product: CatalogProduct;
  },
): ProductCatalog {
  return {
    categories: catalog.categories.map((category) => {
      if (category.categoryId !== target.categoryId) return category;
      return {
        ...category,
        equipmentTypes: category.equipmentTypes.map((equipmentType) => {
          if (equipmentType.typeId !== target.typeId) return equipmentType;
          return {
            ...equipmentType,
            brands: equipmentType.brands.map((brand) => {
              if (brand.brandId !== target.brandId) return brand;
              const products = brand.products ?? [];
              if (products.some((p) => p.productId === target.product.productId)) {
                return brand;
              }
              return { ...brand, products: [...products, target.product] };
            }),
          };
        }),
      };
    }),
  };
}

export function countCatalogProducts(catalog: ProductCatalog): number {
  return flattenCatalogAll(catalog).length;
}
