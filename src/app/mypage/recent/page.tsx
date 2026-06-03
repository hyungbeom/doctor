"use client";

import Image from "next/image";
import Link from "next/link";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getRecentFlow } from "@/data/mypageFlow";
import { recentProducts } from "@/data/mypageData";
import { mypageHome, quoteRequest } from "@/lib/mypageRoutes";
import { buildProductDetailUrl } from "@/lib/productListUrl";
import { getProductImage } from "@/lib/productImage";

export default function MypageRecentPage() {
  const flow = getRecentFlow();

  return (
    <MypageShell
      title="최근 본 상품"
      description="최근 조회한 의료장비 목록입니다."
      backHref={`${mypageHome()}#activity`}
      backLabel="관심·최근"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      {recentProducts.length === 0 ? (
        <p className={sub.empty}>최근 본 장비가 없습니다.</p>
      ) : (
        recentProducts.map((item) => (
          <article key={item.id} className={sub.listCard} style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Link href={buildProductDetailUrl(item.productId)} style={{ display: "flex", gap: 14, alignItems: "center", flex: 1 }}>
              <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
                <Image src={getProductImage(item.productId)} alt="" fill sizes="56px" style={{ objectFit: "contain" }} />
              </div>
              <div>
                <p className={sub.listCardTitle}>{item.productName}</p>
                <p className={sub.listCardMeta}>{item.viewedAt}</p>
              </div>
            </Link>
            <Link href={quoteRequest(item.productId)} className={sub.btnOutline}>
              견적
            </Link>
          </article>
        ))
      )}
    </MypageShell>
  );
}
