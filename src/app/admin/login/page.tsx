"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import styles from "../admin.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [id, setId] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d: { authenticated?: boolean }) => {
        if (d.authenticated) router.replace("/admin");
      })
      .catch(() => {});
  }, [router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "로그인에 실패했습니다.");
        return;
      }
      router.replace("/admin");
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginWrap}>
      <form className={styles.loginCard} onSubmit={onSubmit}>
        <h1 className={styles.loginTitle}>관리자 로그인</h1>
        <p className={styles.loginSub}>
          /admin 영역 · 기본 계정 admin / alpexmedi2026 (환경변수 ADMIN_ID, ADMIN_PASSWORD로 변경 가능)
        </p>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.formGrid}>
          <div>
            <label className={styles.label} htmlFor="admin-id">
              아이디
            </label>
            <input
              id="admin-id"
              className={styles.input}
              value={id}
              onChange={(e) => setId(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="admin-pw">
              비밀번호
            </label>
            <input
              id="admin-pw"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "로그인 중…" : "로그인"}
          </button>
        </div>
      </form>
    </div>
  );
}
