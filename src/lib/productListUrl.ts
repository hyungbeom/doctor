export type ProductListSort = "default" | "name" | "brand";

export type ProductListParams = {
  category?: string;
  type?: string[];
  brand?: string[];
  q?: string;
  sort?: ProductListSort;
};

export function buildProductDetailUrl(productId: string): string {
  return `/products/${encodeURIComponent(productId)}`;
}

export function buildProductListUrl(params: ProductListParams = {}): string {
  const search = new URLSearchParams();

  if (params.category) {
    search.set("category", params.category);
  }
  if (params.type?.length) {
    search.set("type", params.type.join(","));
  }
  if (params.brand?.length) {
    search.set("brand", params.brand.join(","));
  }
  if (params.q?.trim()) {
    search.set("q", params.q.trim());
  }
  if (params.sort && params.sort !== "default") {
    search.set("sort", params.sort);
  }

  const query = search.toString();
  return query ? `/products?${query}` : "/products";
}

export function parseProductListSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): Required<Pick<ProductListParams, "sort">> & ProductListParams {
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined;
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const sortRaw = typeof searchParams.sort === "string" ? searchParams.sort : "default";
  const sort: ProductListSort =
    sortRaw === "name" || sortRaw === "brand" ? sortRaw : "default";

  const type = parseListParam(searchParams.type);
  const brand = parseListParam(searchParams.brand);

  return { category, type, brand, q, sort };
}

function parseListParam(value: string | string[] | undefined): string[] | undefined {
  if (!value) {
    return undefined;
  }
  const raw = Array.isArray(value) ? value.join(",") : value;
  const items = raw.split(",").map((item) => item.trim()).filter(Boolean);
  return items.length ? items : undefined;
}
