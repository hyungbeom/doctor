"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getDemoDetailFlow } from "@/data/mypageFlow";
import { getDemoById } from "@/data/mypageData";
import { mypageHome, quoteRequest } from "@/lib/mypageRoutes";
import { buildProductDetailUrl } from "@/lib/productListUrl";

type Props = { params: Promise<{ demoId: string }> };

export default function MypageDemoDetailPage({ params }: Props) {
  const { demoId } = use(params);
  const id = decodeURIComponent(demoId);
  const demo = getDemoById(id);

  if (!demo) {
    notFound();
  }

  const flow = getDemoDetailFlow(id);

  return (
    <MypageShell
      title="데모 신청 상세"
      description={demo.id}
      backHref={`${mypageHome()}#demo`}
      backLabel="데모 신청"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      <div className={sub.panel}>
        <ul className={sub.metaList}>
          <li>
            <span>신청 번호</span>
            <strong>{demo.id}</strong>
          </li>
          <li>
            <span>장비</span>
            <strong>
              {demo.productId ? (
                <Link href={buildProductDetailUrl(demo.productId)}>{demo.productName}</Link>
              ) : (
                demo.productName
              )}
            </strong>
          </li>
          <li>
            <span>일정</span>
            <strong>{demo.scheduleLabel ?? "—"}</strong>
          </li>
          <li>
            <span>상태</span>
            <strong>{demo.status}</strong>
          </li>
          <li>
            <span>담당</span>
            <strong>
              {demo.engineerName} · {demo.engineerPhone}
            </strong>
          </li>
        </ul>
      </div>

      {demo.status === "데모 종료" && (
        <div className={sub.actions}>
          <Link href={quoteRequest(demo.productId)} className={sub.btnPrimary}>
            이 장비 견적 요청하기
          </Link>
        </div>
      )}
    </MypageShell>
  );
}
