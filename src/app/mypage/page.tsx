"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/chutcha/Header";
import MypageDashboard from "@/components/mypage/MypageDashboard";
import { useMemberSession } from "@/hooks/useMemberSession";
import styles from "./mypage.module.css";

export default function MypagePage() {
  const router = useRouter();
  const { isLoggedIn, ready } = useMemberSession();

  useEffect(() => {
    if (ready && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, ready, router]);

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
      <main className={styles.main}>
        <MypageDashboard />
      </main>
    </div>
  );
}
