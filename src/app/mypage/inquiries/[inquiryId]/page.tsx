"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getInquiryDetailFlow } from "@/data/mypageFlow";
import { getInquiryById } from "@/data/mypageData";
import { mypageInquiries, mypageInquiryNew } from "@/lib/mypageRoutes";

type Props = { params: Promise<{ inquiryId: string }> };

export default function MypageInquiryDetailPage({ params }: Props) {
  const { inquiryId } = use(params);
  const id = decodeURIComponent(inquiryId);
  const inquiry = getInquiryById(id);

  if (!inquiry) {
    notFound();
  }

  const flow = getInquiryDetailFlow(id);

  return (
    <MypageShell
      title="문의 상세"
      description={inquiry.subject}
      backHref={mypageInquiries()}
      backLabel="문의 목록"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      <div className={sub.panel}>
        <ul className={sub.metaList}>
          <li>
            <span>문의 번호</span>
            <strong>{inquiry.id}</strong>
          </li>
          <li>
            <span>대상</span>
            <strong>{inquiry.target}</strong>
          </li>
          <li>
            <span>작성일</span>
            <strong>{inquiry.createdAt}</strong>
          </li>
          <li>
            <span>상태</span>
            <strong>{inquiry.status}</strong>
          </li>
        </ul>
      </div>

      <div className={sub.panel}>
        <h2 className={sub.panelTitle}>문의 내용</h2>
        <p className={sub.hint}>{inquiry.subject}</p>
      </div>

      {inquiry.status === "답변완료" && (
        <div className={sub.panel}>
          <h2 className={sub.panelTitle}>답변</h2>
          <p className={`${sub.notice} ${sub.noticeSuccess}`}>
            안녕하세요, Alpexmedi입니다. 문의 주신 내용 확인하였으며, 전담 담당자가 연락드리겠습니다.
          </p>
        </div>
      )}

      <Link href={mypageInquiryNew()} className={sub.btnOutline}>
        추가 문의 작성
      </Link>
    </MypageShell>
  );
}
