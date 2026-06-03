import type { MedicalProduct } from "@/data/homeData";
import { homeProductCatalogIds } from "@/data/homeProductCatalogMap";
import { findCatalogProductByDisplayName } from "@/data/productCatalog";
import { buildProductDetailUrl, buildProductListUrl } from "@/lib/productListUrl";

export function getMedicalProductHref(product: MedicalProduct): string {
  const mappedId = product.catalogProductId ?? homeProductCatalogIds[product.id];
  if (mappedId) {
    return buildProductDetailUrl(mappedId);
  }

  const matched = findCatalogProductByDisplayName(product.name);
  if (matched) {
    return buildProductDetailUrl(matched.productId);
  }

  return buildProductListUrl({ q: product.name });
}
