"use client";

import AdminShell from "@/components/admin/AdminShell";
import { useAdminCms } from "@/hooks/useAdminCms";
import type { CmsInquiry } from "@/types/cms";
import styles from "../admin.module.css";

export default function AdminInquiriesPage() {
  const { store, loading, error, save } = useAdminCms();

  if (loading || !store) {
    return (
      <AdminShell title="문의">
        <p className={styles.loading}>{loading ? "로딩 중…" : error}</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="문의 관리">
      <section className={styles.panel}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>제목</th>
              <th>대상</th>
              <th>등록일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {store.inquiries.map((inq) => (
              <tr key={inq.id}>
                <td>{inq.id}</td>
                <td>{inq.subject}</td>
                <td>{inq.target}</td>
                <td>{inq.createdAt}</td>
                <td>
                  <select
                    className={styles.select}
                    value={inq.status}
                    onChange={(e) => {
                      const inquiries = store.inquiries.map((row) =>
                        row.id === inq.id
                          ? { ...row, status: e.target.value as CmsInquiry["status"] }
                          : row,
                      );
                      void save({ inquiries });
                    }}
                  >
                    <option value="답변대기">답변대기</option>
                    <option value="답변완료">답변완료</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.meta} style={{ marginTop: 12 }}>
          답변 완료 후 「알림 발송」에서 이메일·SMS·카카오로 회원에게 안내할 수 있습니다.
        </p>
      </section>
    </AdminShell>
  );
}
