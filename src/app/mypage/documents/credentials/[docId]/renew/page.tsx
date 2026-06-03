"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import MypageShell from "@/components/mypage/MypageShell";
import sub from "@/app/mypage/mypageSub.module.css";
import { getCredentialRenewFlow } from "@/data/mypageFlow";
import { getCredentialDocById } from "@/data/mypageData";
import { mypageDocuments } from "@/lib/mypageRoutes";

type Props = { params: Promise<{ docId: string }> };

export default function CredentialRenewPage({ params }: Props) {
  const router = useRouter();
  const { docId } = use(params);
  const id = decodeURIComponent(docId);
  const doc = getCredentialDocById(id);

  if (!doc) {
    notFound();
  }

  const flow = getCredentialRenewFlow(id, doc.name);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(mypageDocuments());
  };

  return (
    <MypageShell
      title="증빙 서류 갱신"
      description={doc.name}
      backHref={mypageDocuments()}
      backLabel="증빙 서류함"
      breadcrumbs={flow.breadcrumbs}
      relatedLinks={flow.related}
    >
      <form className={sub.form} onSubmit={handleSubmit}>
        <div className={sub.panel}>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="doc-file">
              {doc.name} 파일 업로드
            </label>
            <input id="doc-file" type="file" className={sub.input} accept=".pdf,image/*" required />
          </div>
          <div className={sub.field}>
            <label className={sub.label} htmlFor="doc-expires">
              유효 만료일
            </label>
            <input id="doc-expires" type="date" className={sub.input} />
          </div>
          <p className={sub.hint}>병원 행정·거래 심사에 사용됩니다.</p>
        </div>
        <div className={sub.actions}>
          <button type="submit" className={sub.btnPrimary}>
            갱신 제출
          </button>
          <Link href={mypageDocuments()} className={sub.btnOutline}>
            취소
          </Link>
        </div>
      </form>
    </MypageShell>
  );
}
