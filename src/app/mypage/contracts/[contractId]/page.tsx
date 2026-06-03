"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getContractDetailFlow } from "@/data/mypageFlow";
import { getContractById } from "@/data/mypageData";
import { mypageHome } from "@/lib/mypageRoutes";

type Props = { params: Promise<{ contractId: string }> };

export default function MypageContractPage({ params }: Props) {
  const { contractId } = use(params);
  const id = decodeURIComponent(contractId);
  const contract = getContractById(id);

  if (!contract) {
    notFound();
  }

  const flow = getContractDetailFlow(id);

  return (
    <MypageShell
      title="온라인 계약서"
      description={contract.productName}
      backHref={`${mypageHome()}#quotes`}
      backLabel="견적·계약"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      <div className={sub.panel}>
        <ul className={sub.metaList}>
          <li>
            <span>계약 번호</span>
            <strong>{contract.id}</strong>
          </li>
          <li>
            <span>장비명</span>
            <strong>{contract.productName}</strong>
          </li>
          <li>
            <span>계약일</span>
            <strong>{contract.signedAt}</strong>
          </li>
          <li>
            <span>상태</span>
            <strong>{contract.status}</strong>
          </li>
        </ul>
      </div>

      <div className={sub.panel}>
        <h2 className={sub.panelTitle}>계약 조항</h2>
        <p className={sub.hint}>
          장비 공급·설치·A/S·결제 조건 등 계약서 전문이 이 영역에 표시됩니다.
        </p>
        <div className={sub.pdfPreview}>
          {contract.productName} 온라인 계약서
          <br />
          (데모 · 전자서명 연동 예정)
        </div>
        <div className={sub.actions}>
          <button type="button" className={sub.btnPrimary}>
            계약서 PDF 저장
          </button>
          <button type="button" className={sub.btnOutline}>
            전자서명 이력
          </button>
        </div>
      </div>
    </MypageShell>
  );
}
