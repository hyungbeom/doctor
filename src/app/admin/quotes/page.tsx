"use client";

import AdminShell from "@/components/admin/AdminShell";
import { useAdminCms } from "@/hooks/useAdminCms";
import type { CmsQuote } from "@/types/cms";
import styles from "../admin.module.css";

const STATUSES: CmsQuote["status"][] = ["상담중", "견적완료", "계약완료"];

export default function AdminQuotesPage() {
  const { store, loading, error, save } = useAdminCms();

  if (loading || !store) {
    return (
      <AdminShell title="견적">
        <p className={styles.loading}>{loading ? "로딩 중…" : error}</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="견적 관리">
      <section className={styles.panel}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>제품</th>
              <th>요청일</th>
              <th>상태</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            {store.quotes.map((q) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.productName}</td>
                <td>{q.requestedAt}</td>
                <td>
                  <select
                    className={styles.select}
                    value={q.status}
                    onChange={(e) => {
                      const quotes = store.quotes.map((row) =>
                        row.id === q.id ? { ...row, status: e.target.value as CmsQuote["status"] } : row,
                      );
                      void save({ quotes });
                    }}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={q.hasQuotePdf}
                    onChange={(e) => {
                      const quotes = store.quotes.map((row) =>
                        row.id === q.id ? { ...row, hasQuotePdf: e.target.checked } : row,
                      );
                      void save({ quotes });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.meta} style={{ marginTop: 12 }}>
          마이페이지 견적 목록은 CMS와 연동됩니다. 신규 견적은 회원 견적 요청 API 연동 시 자동 적재됩니다.
        </p>
      </section>
    </AdminShell>
  );
}
