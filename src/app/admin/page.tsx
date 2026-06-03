"use client";

import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { countCatalogProducts } from "@/lib/cms/catalogOps";
import { useAdminCms } from "@/hooks/useAdminCms";
import styles from "./admin.module.css";

export default function AdminDashboardPage() {
  const { store, loading, error } = useAdminCms();

  if (loading) {
    return (
      <AdminShell title="대시보드">
        <p className={styles.loading}>데이터 로딩 중…</p>
      </AdminShell>
    );
  }

  if (error || !store) {
    return (
      <AdminShell title="대시보드">
        <div className={styles.error}>{error ?? "데이터 없음"}</div>
      </AdminShell>
    );
  }

  const pendingInquiries = store.inquiries.filter((i) => i.status === "답변대기").length;
  const activeQuotes = store.quotes.filter((q) => q.status !== "계약완료").length;
  const activeDemos = store.demos.filter((d) => d.status !== "데모 종료").length;

  return (
    <AdminShell title="대시보드">
      <p className={styles.meta}>마지막 저장: {new Date(store.updatedAt).toLocaleString("ko-KR")}</p>

      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>등록 제품</p>
          <p className={styles.kpiValue}>{countCatalogProducts(store.productCatalog)}</p>
        </div>
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>게시글</p>
          <p className={styles.kpiValue}>{store.boardPosts.length}</p>
        </div>
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>회원</p>
          <p className={styles.kpiValue}>{store.members.length}</p>
        </div>
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>진행 견적</p>
          <p className={styles.kpiValue}>{activeQuotes}</p>
        </div>
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>진행 데모</p>
          <p className={styles.kpiValue}>{activeDemos}</p>
        </div>
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>답변 대기 문의</p>
          <p className={styles.kpiValue}>{pendingInquiries}</p>
        </div>
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>알림 발송</p>
          <p className={styles.kpiValue}>{store.notificationLogs.length}</p>
        </div>
      </div>

      <section className={styles.panel}>
        <h2>빠른 작업</h2>
        <div className={styles.quickLinks}>
          <Link href="/admin/products/new" className={styles.quickLink}>
            제품 등록
          </Link>
          <Link href="/admin/board" className={styles.quickLink}>
            게시판 글 작성
          </Link>
          <Link href="/admin/notifications" className={styles.quickLink}>
            이메일·SMS·카카오 발송
          </Link>
          <Link href="/admin/quotes" className={styles.quickLink}>
            견적 상태 변경
          </Link>
          <Link href="/admin/content" className={styles.quickLink}>
            메인 배너·GNB 수정
          </Link>
          <Link href="/" className={styles.quickLink} target="_blank" rel="noopener noreferrer">
            사이트 미리보기 ↗
          </Link>
        </div>
      </section>

      <section className={styles.panel}>
        <h2>최근 알림 발송</h2>
        {store.notificationLogs.length === 0 ? (
          <p className={styles.meta}>발송 이력이 없습니다.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>일시</th>
                <th>채널</th>
                <th>수신자</th>
                <th>제목</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {store.notificationLogs.slice(0, 5).map((log) => (
                <tr key={log.id}>
                  <td>{log.sentAt}</td>
                  <td>{log.channel}</td>
                  <td>{log.recipient}</td>
                  <td>{log.subject || "(본문만)"}</td>
                  <td>{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </AdminShell>
  );
}
