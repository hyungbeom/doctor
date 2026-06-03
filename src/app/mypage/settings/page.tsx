"use client";

import Link from "next/link";
import { FormEvent } from "react";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getSettingsFlow } from "@/data/mypageFlow";
import { hospitalAddresses, mypageMemberProfile } from "@/data/mypageData";
import { mypageHome } from "@/lib/mypageRoutes";

export default function MypageSettingsPage() {
  const flow = getSettingsFlow();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("병원 정보가 저장되었습니다. (데모)");
  };

  return (
    <MypageShell
      title="병원 정보 및 배송지 설정"
      description="장비 설치·납품 위치를 관리합니다."
      backHref={`${mypageHome()}#account`}
      backLabel="문의·설정"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      <form className={sub.form} onSubmit={handleSubmit}>
        <div className={sub.panel}>
          <h2 className={sub.panelTitle}>병원 기본 정보</h2>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="hospital-name">
              병원/의원명
            </label>
            <input
              id="hospital-name"
              className={sub.input}
              defaultValue={mypageMemberProfile.hospitalName}
              required
            />
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="member-name">
              담당자명
            </label>
            <input
              id="member-name"
              className={sub.input}
              defaultValue={mypageMemberProfile.memberName}
              required
            />
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="member-role">
              직함
            </label>
            <input id="member-role" className={sub.input} defaultValue={mypageMemberProfile.role} />
          </div>
        </div>

        <div className={sub.panel}>
          <h2 className={sub.panelTitle}>설치·배송지</h2>
          {hospitalAddresses.map((addr) => (
            <div key={addr.label} className={sub.field}>
              <label className={sub.label} htmlFor={`addr-${addr.label}`}>
                {addr.label}
                {addr.isDefault && " (기본)"}
              </label>
              <input id={`addr-${addr.label}`} className={sub.input} defaultValue={addr.address} />
            </div>
          ))}
        </div>

        <div className={sub.actions}>
          <button type="submit" className={sub.btnPrimary}>
            저장
          </button>
          <Link href={`${mypageHome()}#account`} className={sub.btnOutline}>
            취소
          </Link>
        </div>
      </form>
    </MypageShell>
  );
}
