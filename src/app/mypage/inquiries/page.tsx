"use client";

import Link from "next/link";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getInquiriesListFlow } from "@/data/mypageFlow";
import { inquiries } from "@/data/mypageData";
import { mypageHome, mypageInquiry, mypageInquiryNew } from "@/lib/mypageRoutes";

export default function MypageInquiriesPage() {
  const flow = getInquiriesListFlow();

  return (
    <MypageShell
      title="1:1 문의 / 장비 문의"
      description="영업팀·입점 브랜드와의 비공개 문의 내역입니다."
      backHref={`${mypageHome()}#account`}
      backLabel="문의·설정"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      <Link href={mypageInquiryNew()} className={sub.btnPrimary} style={{ display: "inline-block", textAlign: "center" }}>
        새 문의 작성
      </Link>

      {inquiries.map((item) => (
        <Link key={item.id} href={mypageInquiry(item.id)} className={sub.listCardLink}>
          <article className={sub.listCard}>
            <p className={sub.listCardTitle}>{item.subject}</p>
            <p className={sub.listCardMeta}>
              {item.target} · {item.createdAt} · {item.status}
            </p>
          </article>
        </Link>
      ))}
    </MypageShell>
  );
}
