"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense } from "react";
import Header from "@/components/chutcha/Header";
import FlowPageShell from "@/components/mypage/FlowPageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getQuoteRequestFlow } from "@/data/mypageFlow";
import { useRequireLogin } from "@/hooks/useRequireLogin";
import { getProductById } from "@/data/productCatalog";
import { mypageHome, mypageQuote } from "@/lib/mypageRoutes";
import { buildProductDetailUrl } from "@/lib/productListUrl";

function QuoteRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") ?? "";
  const product = productId ? getProductById(productId) : undefined;
  const flow = getQuoteRequestFlow(productId || undefined);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(mypageQuote("Q-2026-0412"));
  };

  return (
    <FlowPageShell
      title="장비 견적 요청"
      description="비교 견적을 요청하면 전담 담당자가 연락드립니다."
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
      backHref={product ? buildProductDetailUrl(product.productId) : "/products"}
      backLabel={product ? "상품 상세" : "제품리스트"}
    >
      {product && (
        <p className={sub.notice}>
          요청 장비:{" "}
          <Link href={buildProductDetailUrl(product.productId)}>{product.productName}</Link>
        </p>
      )}

      <form className={sub.form} onSubmit={handleSubmit}>
        <div className={sub.panel}>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="quote-product">
              장비명
            </label>
            <input
              id="quote-product"
              className={sub.input}
              defaultValue={product?.productName ?? ""}
              required
            />
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="quote-qty">
              수량
            </label>
            <input id="quote-qty" type="number" min={1} className={sub.input} defaultValue={1} />
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="quote-note">
              요청 사항
            </label>
            <textarea id="quote-note" className={sub.textarea} placeholder="리스/렌탈, 설치 일정 등" />
          </div>
        </div>
        <div className={sub.actions}>
          <button type="submit" className={sub.btnPrimary}>
            견적 요청 접수
          </button>
          <Link href={mypageHome()} className={sub.btnOutline}>
            마이페이지
          </Link>
        </div>
      </form>
    </FlowPageShell>
  );
}

function QuoteRequestContent() {
  const { ready, isLoggedIn } = useRequireLogin();

  if (!ready || !isLoggedIn) {
    return <p className={sub.empty}>확인 중…</p>;
  }

  return <QuoteRequestForm />;
}

export default function QuoteRequestPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <Header />
      <Suspense fallback={<p className={sub.empty}>불러오는 중…</p>}>
        <QuoteRequestContent />
      </Suspense>
    </div>
  );
}
