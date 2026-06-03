"use client";

import { FormEvent, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAdminCms } from "@/hooks/useAdminCms";
import type { NotificationChannel } from "@/types/cms";
import styles from "../admin.module.css";

export default function AdminNotificationsPage() {
  const { store, loading, error, reload } = useAdminCms();
  const [channel, setChannel] = useState<NotificationChannel>("kakao");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  function applyTemplate(templateId: string) {
    const tpl = store?.notificationTemplates.find((t) => t.id === templateId);
    if (!tpl) return;
    setChannel(tpl.channel);
    setSubject(tpl.subject);
    setBody(tpl.body);
  }

  async function onSend(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/notifications/send", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, recipient, subject, body }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setMessage(data.error ?? "발송 실패");
        return;
      }
      setMessage(
        `[${channel}] ${recipient} 로 발송되었습니다. (실제 연동 전까지는 CMS 발송 이력에만 기록됩니다.)`,
      );
      setRecipient("");
      void reload();
    } catch {
      setMessage("발송 중 오류가 발생했습니다.");
    } finally {
      setSending(false);
    }
  }

  if (loading || !store) {
    return (
      <AdminShell title="알림 발송">
        <p className={styles.loading}>{loading ? "로딩 중…" : error}</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="알림 발송">
      {message && (
        <div className={message.includes("실패") || message.includes("오류") ? styles.error : styles.success}>
          {message}
        </div>
      )}

      <section className={styles.panel}>
        <h2>템플릿</h2>
        <div className={styles.rowActions}>
          {store.notificationTemplates.map((tpl) => (
            <button key={tpl.id} type="button" className={styles.btnSecondary} onClick={() => applyTemplate(tpl.id)}>
              {tpl.name}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.panel}>
        <h2>발송 작성</h2>
        <form className={styles.formGrid} onSubmit={onSend}>
          <div>
            <label className={styles.label}>채널</label>
            <select className={styles.select} value={channel} onChange={(e) => setChannel(e.target.value as NotificationChannel)}>
              <option value="email">이메일</option>
              <option value="sms">SMS</option>
              <option value="kakao">카카오 알림톡</option>
            </select>
          </div>
          <div>
            <label className={styles.label}>
              수신자 {channel === "email" ? "(이메일)" : "(휴대폰 번호)"}
            </label>
            <input
              className={styles.input}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={channel === "email" ? "user@hospital.kr" : "010-0000-0000"}
              required
            />
          </div>
          {(channel === "email" || channel === "kakao") && (
            <div>
              <label className={styles.label}>제목</label>
              <input className={styles.input} value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
          )}
          <div>
            <label className={styles.label}>본문</label>
            <textarea className={styles.textarea} value={body} onChange={(e) => setBody(e.target.value)} required />
          </div>
          <p className={styles.meta}>
            변수 예: {"{hospitalName}"}, {"{productName}"}, {"{scheduleLabel}"} — 실제 치환은 메일/SMS/카카오 API 연동 시 적용
          </p>
          <button type="submit" className={styles.btn} disabled={sending}>
            {sending ? "발송 중…" : "발송"}
          </button>
        </form>
      </section>

      <section className={styles.panel}>
        <h2>회원 빠른 선택</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>병원</th>
              <th>이름</th>
              <th>이메일</th>
              <th>전화</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {store.members.map((m) => (
              <tr key={m.id}>
                <td>{m.hospitalName}</td>
                <td>{m.memberName}</td>
                <td>{m.email ?? "—"}</td>
                <td>{m.phone ?? "—"}</td>
                <td>
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={() => {
                      if (channel === "email" && m.email) setRecipient(m.email);
                      else if (m.phone) setRecipient(m.phone);
                    }}
                  >
                    수신자 지정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminShell>
  );
}
