"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense } from "react";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getDemoApplyFlow } from "@/data/mypageFlow";
import { getProductById } from "@/data/productCatalog";
import { mypageDemo, mypageHome } from "@/lib/mypageRoutes";

function DemoApplyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") ?? "";
  const product = productId ? getProductById(productId) : undefined;
  const flow = getDemoApplyFlow(productId || undefined);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(mypageDemo("D-2026-0520"));
  };

  return (
    <MypageShell
      title="데모 장비 신청"
      description="도입 전 장비를 병원에서 직접 테스트해 보세요."
      backHref={`${mypageHome()}#demo`}
      backLabel="데모 신청"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      <form className={sub.form} onSubmit={handleSubmit}>
        <div className={sub.panel}>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="demo-product">
              신청 장비
            </label>
            <input
              id="demo-product"
              className={sub.input}
              defaultValue={product?.productName ?? ""}
              placeholder="장비명을 입력하거나 상품 페이지에서 신청"
              required
            />
            {product && (
              <p className={sub.hint}>
                선택된 제품: {product.brandName} {product.productName}
              </p>
            )}
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="demo-start">
              희망 시작일
            </label>
            <input id="demo-start" type="date" className={sub.input} required />
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="demo-days">
              희망 기간
            </label>
            <select id="demo-days" className={sub.select} defaultValue="3">
              <option value="2">2박 3일</option>
              <option value="3">3박 4일</option>
              <option value="4">4박 5일</option>
            </select>
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="demo-note">
              요청 사항
            </label>
            <textarea
              id="demo-note"
              className={sub.textarea}
              placeholder="설치 공간, 사용 인원, 관심 시술 등"
            />
          </div>
        </div>
        <div className={sub.actions}>
          <button type="submit" className={sub.btnPrimary}>
            데모 신청 접수
          </button>
          <Link href={`${mypageHome()}#demo`} className={sub.btnOutline}>
            취소
          </Link>
        </div>
      </form>
    </MypageShell>
  );
}

export default function DemoApplyPage() {
  return (
    <Suspense fallback={<p className={sub.empty}>불러오는 중…</p>}>
      <DemoApplyForm />
    </Suspense>
  );
}
