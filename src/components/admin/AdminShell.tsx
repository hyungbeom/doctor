"use client";

import { useRouter } from "next/navigation";
import { useRequireAdmin } from "@/hooks/useRequireAdmin";
import styles from "@/app/admin/admin.module.css";
import AdminSidebar from "./AdminSidebar";

type AdminShellProps = {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export default function AdminShell({ title, children, actions }: AdminShellProps) {
  const router = useRouter();
  const { ready, authenticated } = useRequireAdmin();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.replace("/admin/login");
  }

  if (!ready || !authenticated) {
    return (
      <div className={styles.page}>
        <p className={styles.loading}>관리자 확인 중…</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <AdminSidebar />
        <div className={styles.main}>
          <div className={styles.topBar}>
            <div>
              <h1 className={styles.pageTitle}>{title}</h1>
            </div>
            <div className={styles.rowActions}>
              {actions}
              <button type="button" className={styles.logoutBtn} onClick={() => void handleLogout()}>
                로그아웃
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
