"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense } from "react";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getInquiryNewFlow } from "@/data/mypageFlow";
import { getDemoById, getQuoteById } from "@/data/mypageData";
import { getProductById } from "@/data/productCatalog";
import { mypageInquiries, mypageInquiry } from "@/lib/mypageRoutes";
import { buildProductDetailUrl } from "@/lib/productListUrl";

function InquiryNewForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") ?? undefined;
  const quoteId = searchParams.get("quoteId") ?? undefined;
  const demoId = searchParams.get("demoId") ?? undefined;
  const defaultSubject = searchParams.get("subject") ?? "";

  const product = productId ? getProductById(productId) : undefined;
  const quote = quoteId ? getQuoteById(quoteId) : undefined;
  const demo = demoId ? getDemoById(demoId) : undefined;
  const flow = getInquiryNewFlow({ productId, quoteId, demoId });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(mypageInquiry("I-2026-0095"));
  };

  return (
    <MypageShell
      title="새 문의 작성"
      backHref={mypageInquiries()}
      backLabel="문의 목록"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      {(product || quote || demo) && (
        <p className={sub.notice}>
          {product && (
            <>
              관련 장비:{" "}
              <Link href={buildProductDetailUrl(product.productId)}>{product.productName}</Link>
              <br />
            </>
          )}
          {quote && <>관련 견적: {quote.id} · {quote.productName}<br /></>}
          {demo && <>관련 데모: {demo.id} · {demo.productName}</>}
        </p>
      )}

      <form className={sub.form} onSubmit={handleSubmit}>
        <div className={sub.panel}>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="inquiry-target">
              문의 대상
            </label>
            <select id="inquiry-target" className={sub.select} defaultValue="sales">
              <option value="sales">Alpexmedi 영업팀</option>
              <option value="brand">입점 브랜드사</option>
              <option value="as">A/S · 기술지원</option>
            </select>
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="inquiry-subject">
              제목
            </label>
            <input
              id="inquiry-subject"
              className={sub.input}
              defaultValue={defaultSubject || (product ? `${product.productName} 문의` : "")}
              required
            />
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="inquiry-body">
              내용
            </label>
            <textarea id="inquiry-body" className={sub.textarea} required placeholder="문의 내용을 입력해 주세요." />
          </div>
        </div>
        <div className={sub.actions}>
          <button type="submit" className={sub.btnPrimary}>
            문의 등록
          </button>
          <Link href={mypageInquiries()} className={sub.btnOutline}>
            취소
          </Link>
        </div>
      </form>
    </MypageShell>
  );
}

export default function InquiryNewPage() {
  return (
    <Suspense fallback={<p className={sub.empty}>불러오는 중…</p>}>
      <InquiryNewForm />
    </Suspense>
  );
}
