"use client";

import AdminShell from "@/components/admin/AdminShell";
import { useAdminCms } from "@/hooks/useAdminCms";
import styles from "../../admin.module.css";

function channelClass(channel: string) {
  if (channel === "email") return styles.channelEmail;
  if (channel === "sms") return styles.channelSms;
  return styles.channelKakao;
}

export default function AdminNotificationHistoryPage() {
  const { store, loading, error } = useAdminCms();

  if (loading || !store) {
    return (
      <AdminShell title="발송 이력">
        <p className={styles.loading}>{loading ? "로딩 중…" : error}</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="발송 이력">
      <section className={styles.panel}>
        {store.notificationLogs.length === 0 ? (
          <p className={styles.meta}>아직 발송 이력이 없습니다.</p>
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
              {store.notificationLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.sentAt}</td>
                  <td>
                    <span className={channelClass(log.channel)}>{log.channel}</span>
                  </td>
                  <td>{log.recipient}</td>
                  <td>{log.subject || log.body.slice(0, 40)}</td>
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
