"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getEquipmentAsFlow } from "@/data/mypageFlow";
import { getEquipmentById } from "@/data/mypageData";
import { mypageHome } from "@/lib/mypageRoutes";

type Props = { params: Promise<{ equipmentId: string }> };

export default function MypageAsPage({ params }: Props) {
  const router = useRouter();
  const { equipmentId } = use(params);
  const id = decodeURIComponent(equipmentId);
  const equipment = getEquipmentById(id);

  if (!equipment) {
    notFound();
  }

  const flow = getEquipmentAsFlow(id, equipment.productName);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`${mypageHome()}#equipment`);
  };

  return (
    <MypageShell
      title="A/S · 기술 지원 접수"
      description={equipment.productName}
      backHref={`${mypageHome()}#equipment`}
      backLabel="보유 장비"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      <p className={sub.notice}>
        시리얼 <strong>{equipment.serialNumber}</strong> · 도입일 {equipment.installedAt}
      </p>

      <form className={sub.form} onSubmit={handleSubmit}>
        <div className={sub.panel}>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="as-symptom">
              증상 설명
            </label>
            <textarea
              id="as-symptom"
              className={sub.textarea}
              placeholder="증상, 발생 시점, 에러 메시지 등을 입력해 주세요."
              required
            />
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="as-files">
              사진·동영상 첨부
            </label>
            <input id="as-files" type="file" className={sub.input} accept="image/*,video/*" multiple />
            <p className={sub.hint}>최대 5개 · 장비 전면·에러 화면 촬영을 권장합니다.</p>
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="as-visit">
              희망 방문일
            </label>
            <input id="as-visit" type="date" className={sub.input} />
          </div>
        </div>
        <div className={sub.actions}>
          <button type="submit" className={sub.btnPrimary}>
            A/S 접수 완료
          </button>
          <Link href={`${mypageHome()}#equipment`} className={sub.btnOutline}>
            취소
          </Link>
        </div>
      </form>
    </MypageShell>
  );
}
