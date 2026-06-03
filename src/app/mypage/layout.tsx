"use client";

import Header from "@/components/chutcha/Header";
import { useRequireLogin } from "@/hooks/useRequireLogin";
import styles from "./mypage.module.css";

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  const { ready, isLoggedIn } = useRequireLogin();

  if (!ready || !isLoggedIn) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <p className={styles.loading}>확인 중…</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
