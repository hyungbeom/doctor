import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/products/ProductDetailPage";
import { getProductById } from "@/data/productCatalog";

type ProductDetailRouteProps = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: ProductDetailRouteProps) {
  const { productId } = await params;
  const product = getProductById(decodeURIComponent(productId));

  if (!product) {
    return { title: "제품을 찾을 수 없습니다 | Alpexmedi" };
  }

  return {
    title: `${product.productName} | Alpexmedi`,
    description: `${product.brandName} ${product.productName} - ${product.typeName} 비교 견적 및 상세 정보`,
  };
}

export default async function ProductDetailRoute({ params }: ProductDetailRouteProps) {
  const { productId } = await params;
  const product = getProductById(decodeURIComponent(productId));

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
