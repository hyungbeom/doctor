"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Header from "@/components/chutcha/Header";
import { companyInfo } from "@/data/homeData";
import {
  getSavedMemberId,
  saveMemberId,
  useMemberSession,
} from "@/hooks/useMemberSession";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, ready, login } = useMemberSession();

  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberId, setRememberId] = useState(false);
  const [loggedOutNotice, setLoggedOutNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!ready) return;
    const savedId = getSavedMemberId();
    if (savedId) {
      setMemberId(savedId);
      setRememberId(true);
    }
  }, [ready]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("loggedOut") === "1") {
      setLoggedOutNotice(true);
      window.history.replaceState(null, "", "/login");
    }
  }, []);

  useEffect(() => {
    if (ready && isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, ready, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const id = memberId.trim();
    const pw = password.trim();

    if (!id) {
      setErrorMessage("아이디를 입력해 주세요.");
      return;
    }
    if (!pw) {
      setErrorMessage("비밀번호를 입력해 주세요.");
      return;
    }

    if (rememberId) {
      saveMemberId(id);
    } else {
      saveMemberId(null);
    }

    login(id);
    router.push("/");
  };

  if (!ready || isLoggedIn) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <p className={styles.brandDesc}>확인 중…</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <aside className={styles.brand}>
            <Link href="/" className={styles.logoLink} title="Alpexmedi 홈">
              <Image
                src="/images/alpexmedi-logo.png"
                alt="Alpexmedi"
                width={200}
                height={56}
                className={styles.logoImg}
                priority
              />
            </Link>
            <p className={styles.brandTagline}>Medical Equipment Platform</p>
            <p className={styles.brandDesc}>
              클리닉·병원 의료장비 비교·견적
              <br />
              Alpexmedi 회원 전용 서비스
            </p>
          </aside>

          <section className={styles.formPanel} aria-labelledby="login-heading">
            <h1 id="login-heading" className="sr-only">
              로그인
            </h1>

            {loggedOutNotice && (
              <p className={styles.alertSuccess} role="status">
                로그아웃되었습니다.
              </p>
            )}

            {errorMessage && (
              <p className={styles.alertError} role="alert">
                {errorMessage}
              </p>
            )}

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="member-id" className={styles.label}>
                  아이디
                </label>
                <input
                  id="member-id"
                  name="memberId"
                  type="text"
                  autoComplete="username"
                  className={styles.input}
                  value={memberId}
                  onChange={(event) => setMemberId(event.target.value)}
                  placeholder="아이디를 입력해 주세요"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="member-password" className={styles.label}>
                  비밀번호
                </label>
                <input
                  id="member-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className={styles.input}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="비밀번호를 입력해주세요"
                />
              </div>

              <div className={styles.optionsRow}>
                <label className={styles.remember}>
                  <input
                    type="checkbox"
                    checked={rememberId}
                    onChange={(event) => setRememberId(event.target.checked)}
                  />
                  아이디 저장하기
                </label>
                <Link href="/login/find-account" className={styles.findLink}>
                  아이디 / 비밀번호 찾기
                </Link>
              </div>

              <button type="submit" className={styles.submitBtn}>
                확인
              </button>
            </form>

            <p className={styles.formHint}>회원 계정으로 로그인해 주세요.</p>
          </section>
        </div>

        <footer className={styles.pageFooter}>
          <p className={styles.footerLead}>
            회원 가입 후 승인이 지연될 경우 아래 연락처로 문의해 주세요.
          </p>
          <p className={styles.footerContact}>
            Alpexmedi 장비 상담팀{" "}
            <a href={`tel:${companyInfo.phone.replace(/-/g, "")}`}>{companyInfo.phone}</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
