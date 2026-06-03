import { NextResponse } from "next/server";
import { flattenCatalog } from "@/lib/cms/catalogOps";
import { getCmsProductCatalog } from "@/lib/cms/resolveCatalog";

export async function GET() {
  const catalog = await getCmsProductCatalog();
  const products = flattenCatalog(catalog);
  return NextResponse.json({ catalog, products });
}
