import catalogData from "@/data/alpexmedi_comprehensive_products.json";
import type { FlatProduct, ProductCatalog, SearchFilters } from "@/data/productCatalog";
import { shortLabel } from "@/data/productCatalog";
import { readCmsStore } from "@/lib/cms/store";
import { flattenCatalog } from "@/lib/cms/catalogOps";

const defaultCatalog = catalogData as ProductCatalog;

export async function getCmsProductCatalog(): Promise<ProductCatalog> {
  const store = await readCmsStore();
  return store.productCatalog ?? defaultCatalog;
}

export async function getCmsAllProducts(): Promise<FlatProduct[]> {
  return flattenCatalog(await getCmsProductCatalog());
}

export async function getCmsProductById(productId: string): Promise<FlatProduct | undefined> {
  const products = await getCmsAllProducts();
  return products.find((product) => product.productId === productId);
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
  if (tokens.length === 0) return true;
  return tokens.every((token) => haystack.includes(token));
}

export async function searchCmsProducts(filters: SearchFilters): Promise<FlatProduct[]> {
  const query = filters.query?.trim().toLowerCase() ?? "";
  const allProducts = await getCmsAllProducts();

  return allProducts.filter((product) => {
    if (filters.categoryId && product.categoryId !== filters.categoryId) return false;
    if (filters.typeId && product.typeId !== filters.typeId) return false;
    if (filters.brandId && product.brandId !== filters.brandId) return false;
    if (!query) return true;
    return matchesQuery(buildSearchHaystack(product), query);
  });
}
