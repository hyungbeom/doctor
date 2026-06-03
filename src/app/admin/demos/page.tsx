"use client";

import AdminShell from "@/components/admin/AdminShell";
import { useAdminCms } from "@/hooks/useAdminCms";
import type { CmsDemo } from "@/types/cms";
import styles from "../admin.module.css";

const STATUSES: CmsDemo["status"][] = ["조율 중", "데모 진행 중", "데모 종료"];

export default function AdminDemosPage() {
  const { store, loading, error, save } = useAdminCms();

  if (loading || !store) {
    return (
      <AdminShell title="데모">
        <p className={styles.loading}>{loading ? "로딩 중…" : error}</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="데모 관리">
      <section className={styles.panel}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>제품</th>
              <th>일정</th>
              <th>엔지니어</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {store.demos.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.productName}</td>
                <td>{d.scheduleLabel ?? "—"}</td>
                <td>
                  {d.engineerName} ({d.engineerPhone})
                </td>
                <td>
                  <select
                    className={styles.select}
                    value={d.status}
                    onChange={(e) => {
                      const demos = store.demos.map((row) =>
                        row.id === d.id ? { ...row, status: e.target.value as CmsDemo["status"] } : row,
                      );
                      void save({ demos });
                    }}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminShell>
  );
}
