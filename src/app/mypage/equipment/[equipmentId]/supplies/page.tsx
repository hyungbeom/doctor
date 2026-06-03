"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getEquipmentSuppliesFlow } from "@/data/mypageFlow";
import { getEquipmentById } from "@/data/mypageData";
import { mypageHome } from "@/lib/mypageRoutes";

type Props = { params: Promise<{ equipmentId: string }> };

export default function MypageSuppliesPage({ params }: Props) {
  const router = useRouter();
  const { equipmentId } = use(params);
  const id = decodeURIComponent(equipmentId);
  const equipment = getEquipmentById(id);

  if (!equipment) {
    notFound();
  }

  const flow = getEquipmentSuppliesFlow(id, equipment.productName);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`${mypageHome()}#equipment`);
  };

  return (
    <MypageShell
      title="소모품 추가 견적 요청"
      description={equipment.productName}
      backHref={`${mypageHome()}#equipment`}
      backLabel="보유 장비"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      <form className={sub.form} onSubmit={handleSubmit}>
        <div className={sub.panel}>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="supply-type">
              소모품 종류
            </label>
            <select id="supply-type" className={sub.select} required>
              <option value="">선택</option>
              <option value="tip">팁 / 카트리지</option>
              <option value="gel">젤 / 크림</option>
              <option value="filter">필터 / 소모 부품</option>
              <option value="other">기타</option>
            </select>
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="supply-qty">
              수량
            </label>
            <input id="supply-qty" type="number" min={1} className={sub.input} defaultValue={1} required />
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="supply-note">
              요청 메모
            </label>
            <textarea id="supply-note" className={sub.textarea} placeholder="모델명, 규격 등" />
          </div>
        </div>
        <div className={sub.actions}>
          <button type="submit" className={sub.btnPrimary}>
            견적 요청 접수
          </button>
          <Link href={`${mypageHome()}#equipment`} className={sub.btnOutline}>
            취소
          </Link>
        </div>
      </form>
    </MypageShell>
  );
}
