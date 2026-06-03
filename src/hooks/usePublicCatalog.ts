"use client";

import { useEffect, useState } from "react";
import {
  allProducts as fallbackProducts,
  productCatalog as fallbackCatalog,
  type FlatProduct,
  type ProductCatalog,
} from "@/data/productCatalog";

type CatalogPayload = {
  catalog: ProductCatalog;
  products: FlatProduct[];
};

export function usePublicCatalog() {
  const [catalog, setCatalog] = useState<ProductCatalog>(fallbackCatalog);
  const [products, setProducts] = useState<FlatProduct[]>(fallbackProducts);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/public/catalog")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: CatalogPayload | null) => {
        if (data?.catalog && data.products) {
          setCatalog(data.catalog);
          setProducts(data.products);
        }
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  return { catalog, products, ready };
}
