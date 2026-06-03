"use client";

import Link from "next/link";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getDocumentsFlow } from "@/data/mypageFlow";
import { credentialDocs, taxDocuments } from "@/data/mypageData";
import { mypageCredentialRenew, mypageHome } from "@/lib/mypageRoutes";

export default function MypageDocumentsPage() {
  const flow = getDocumentsFlow();

  return (
    <MypageShell
      title="증빙 및 서류 관리"
      description="세무·의료기관 증빙 서류를 조회·출력합니다."
      backHref={mypageHome()}
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      <div className={sub.panel}>
        <h2 className={sub.panelTitle}>세무 증빙 서류함</h2>
        <ul className={sub.metaList}>
          {taxDocuments.map((doc) => (
            <li key={doc.id}>
              <span>
                {doc.type} · {doc.issuedAt}
              </span>
              <strong>{doc.amount}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className={sub.panel}>
        <h2 className={sub.panelTitle}>의료기관 증빙 서류</h2>
        {credentialDocs.map((doc) => (
          <div key={doc.id} className={sub.listCard} style={{ marginBottom: 10 }}>
            <p className={sub.listCardTitle}>{doc.name}</p>
            <p className={sub.listCardMeta}>
              {doc.status} · {doc.expiresAt === "—" ? "유효기간 —" : `만료 ${doc.expiresAt}`}
            </p>
            <Link href={mypageCredentialRenew(doc.id)} className={sub.btnOutline} style={{ display: "inline-block", marginTop: 10 }}>
              갱신 등록
            </Link>
          </div>
        ))}
      </div>
    </MypageShell>
  );
}
