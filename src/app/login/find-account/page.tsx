"use client";

import Link from "next/link";
import { FormEvent } from "react";
import Header from "@/components/chutcha/Header";
import FlowPageShell from "@/components/mypage/FlowPageShell";
import styles from "../login.module.css";
import sub from "@/app/mypage/mypageSub.module.css";
import { getFindAccountFlow } from "@/data/mypageFlow";

export default function FindAccountPage() {
  const flow = getFindAccountFlow();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("등록된 연락처로 안내 메시지를 발송했습니다. (데모)");
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card} style={{ maxWidth: 520, gridTemplateColumns: "1fr", width: "100%" }}>
          <section className={styles.formPanel}>
            <FlowPageShell
              title="아이디 / 비밀번호 찾기"
              description="가입 시 등록한 이메일 또는 휴대전화로 안내드립니다."
              breadcrumbs={flow.breadcrumbs}
              relatedLinks={flow.related}
              backHref="/login"
              backLabel="로그인"
              showQuickNav={false}
              maxWidth={480}
            >
              <form className={sub.form} onSubmit={handleSubmit}>
                <div className={sub.field}>
                  <label className={sub.label} htmlFor="find-type">
                    찾기 유형
                  </label>
                  <select id="find-type" className={sub.select}>
                    <option value="id">아이디 찾기</option>
                    <option value="pw">비밀번호 찾기</option>
                  </select>
                </div>
                <div className={sub.field}>
                  <label className={sub.label} htmlFor="find-name">
                    담당자명
                  </label>
                  <input id="find-name" className={sub.input} required />
                </div>
                <div className={sub.field}>
                  <label className={sub.label} htmlFor="find-contact">
                    이메일 또는 휴대전화
                  </label>
                  <input id="find-contact" className={sub.input} required />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  확인
                </button>
              </form>
            </FlowPageShell>
          </section>
        </div>
      </main>
    </div>
  );
}
