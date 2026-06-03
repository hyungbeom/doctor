"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getQuoteDetailFlow } from "@/data/mypageFlow";
import { getQuoteById } from "@/data/mypageData";
import { mypageHome, mypageInquiryNew } from "@/lib/mypageRoutes";
import { buildProductDetailUrl } from "@/lib/productListUrl";

type Props = { params: Promise<{ quoteId: string }> };

export default function MypageQuoteDetailPage({ params }: Props) {
  const { quoteId } = use(params);
  const id = decodeURIComponent(quoteId);
  const quote = getQuoteById(id);

  if (!quote) {
    notFound();
  }

  const flow = getQuoteDetailFlow(id);

  return (
    <MypageShell
      title="견적서 상세"
      description={`${quote.productName} · ${quote.id}`}
      backHref={`${mypageHome()}#quotes`}
      backLabel="견적·계약"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
      currentPath={mypageHome()}
    >
      <div className={sub.panel}>
        <ul className={sub.metaList}>
          <li>
            <span>견적 번호</span>
            <strong>{quote.id}</strong>
          </li>
          <li>
            <span>장비명</span>
            <strong>
              {quote.productId ? (
                <Link href={buildProductDetailUrl(quote.productId)}>{quote.productName}</Link>
              ) : (
                quote.productName
              )}
            </strong>
          </li>
          <li>
            <span>요청일</span>
            <strong>{quote.requestedAt}</strong>
          </li>
          <li>
            <span>진행 상태</span>
            <strong>{quote.status}</strong>
          </li>
        </ul>
      </div>

      {quote.hasQuotePdf ? (
        <div className={sub.panel}>
          <h2 className={sub.panelTitle}>견적서 미리보기</h2>
          <div className={sub.pdfPreview}>
            {quote.productName} 최종 견적서 (PDF)
            <br />
            실제 연동 시 관리자가 업로드한 PDF가 표시됩니다.
          </div>
          <div className={sub.actions}>
            <button type="button" className={sub.btnPrimary}>
              PDF 다운로드
            </button>
            <button type="button" className={sub.btnOutline} onClick={() => window.print()}>
              인쇄
            </button>
          </div>
        </div>
      ) : (
        <p className={sub.notice}>견적서가 아직 등록되지 않았습니다. 담당자 배정 후 알림톡으로 안내됩니다.</p>
      )}

      <div className={sub.actions}>
        <Link
          href={mypageInquiryNew({
            quoteId: quote.id,
            productId: quote.productId,
            subject: `${quote.productName} 재협상 요청`,
          })}
          className={sub.btnOutline}
        >
          재협상/수정 요청
        </Link>
      </div>
    </MypageShell>
  );
}
