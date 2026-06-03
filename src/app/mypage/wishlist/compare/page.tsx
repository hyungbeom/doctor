"use client";

import Image from "next/image";
import Link from "next/link";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getWishlistCompareFlow } from "@/data/mypageFlow";
import { wishlistItems } from "@/data/mypageData";
import { getProductById } from "@/data/productCatalog";
import { mypageHome, quoteRequest } from "@/lib/mypageRoutes";
import { buildProductDetailUrl } from "@/lib/productListUrl";
import { getProductImage } from "@/lib/productImage";

const compareRows = [
  { key: "brand", label: "브랜드" },
  { key: "type", label: "유형" },
  { key: "category", label: "카테고리" },
] as const;

export default function WishlistComparePage() {
  const flow = getWishlistCompareFlow();
  const items = wishlistItems.slice(0, 3).map((item) => ({
    ...item,
    product: getProductById(item.productId),
  }));

  return (
    <MypageShell
      title="관심 장비 스펙 비교"
      description="최대 3개 장비를 나란히 비교합니다."
      backHref={`${mypageHome()}#activity`}
      backLabel="관심·최근"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      <div className={sub.panel} style={{ overflowX: "auto" }}>
        <table className={sub.compareTable}>
          <thead>
            <tr>
              <th>항목</th>
              {items.map((item) => (
                <td key={item.id}>
                  <div style={{ position: "relative", width: 64, height: 64, marginBottom: 8 }}>
                    <Image src={getProductImage(item.productId)} alt="" fill sizes="64px" style={{ objectFit: "contain" }} />
                  </div>
                  <strong>
                    <Link href={buildProductDetailUrl(item.productId)}>{item.productName}</Link>
                  </strong>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row) => (
              <tr key={row.key}>
                <th>{row.label}</th>
                {items.map((item) => (
                  <td key={item.id}>
                    {row.key === "brand" && item.brandName}
                    {row.key === "type" && (item.product?.typeName ?? "—")}
                    {row.key === "category" && (item.product?.categoryName ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th>견적</th>
              {items.map((item) => (
                <td key={item.id}>
                  <Link href={quoteRequest(item.productId)} className={sub.btnOutline}>
                    견적 요청
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </MypageShell>
  );
}
