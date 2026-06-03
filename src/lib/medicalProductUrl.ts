import type { MedicalProduct } from "@/data/homeData";
import { findCatalogProductByDisplayName } from "@/data/productCatalog";
import { buildProductDetailUrl, buildProductListUrl } from "@/lib/productListUrl";

export function getMedicalProductHref(product: MedicalProduct): string {
  if (product.catalogProductId) {
    return buildProductDetailUrl(product.catalogProductId);
  }

  const matched = findCatalogProductByDisplayName(product.name);
  if (matched) {
    return buildProductDetailUrl(matched.productId);
  }

  return buildProductListUrl({ q: product.name });
}
