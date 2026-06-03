"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAdminCms } from "@/hooks/useAdminCms";
import type { CmsMember } from "@/types/cms";
import styles from "../admin.module.css";

function newMember(): CmsMember {
  return {
    id: `member-${Date.now()}`,
    hospitalName: "",
    memberName: "",
    role: "",
    email: "",
    phone: "",
  };
}

export default function AdminMembersPage() {
  const { store, loading, error, save } = useAdminCms();
  const [editing, setEditing] = useState<CmsMember | null>(null);

  if (loading || !store) {
    return (
      <AdminShell title="회원">
        <p className={styles.loading}>{loading ? "로딩 중…" : error}</p>
      </AdminShell>
    );
  }

  const draft = editing ?? newMember();

  return (
    <AdminShell title="회원 관리">
      <section className={styles.panel}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>병원</th>
              <th>이름</th>
              <th>직책</th>
              <th>연락처</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {store.members.map((m) => (
              <tr key={m.id}>
                <td>{m.hospitalName}</td>
                <td>{m.memberName}</td>
                <td>{m.role}</td>
                <td>{m.phone ?? m.email ?? "—"}</td>
                <td className={styles.rowActions}>
                  <button type="button" className={styles.btnSecondary} onClick={() => setEditing(m)}>
                    수정
                  </button>
                  <button
                    type="button"
                    className={styles.btnDanger}
                    onClick={() => void save({ members: store.members.filter((x) => x.id !== m.id) })}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className={styles.btn} style={{ marginTop: 12 }} onClick={() => setEditing(newMember())}>
          회원 추가
        </button>
      </section>

      {editing && (
        <section className={styles.panel}>
          <h2>회원 편집</h2>
          <div className={styles.formGrid}>
            {(["hospitalName", "memberName", "role", "email", "phone"] as const).map((field) => (
              <div key={field}>
                <label className={styles.label}>{field}</label>
                <input
                  className={styles.input}
                  value={draft[field] ?? ""}
                  onChange={(e) => setEditing({ ...draft, [field]: e.target.value })}
                />
              </div>
            ))}
            <div className={styles.rowActions}>
              <button
                type="button"
                className={styles.btn}
                onClick={() => {
                  const exists = store.members.some((m) => m.id === draft.id);
                  const members = exists
                    ? store.members.map((m) => (m.id === draft.id ? draft : m))
                    : [...store.members, draft];
                  void save({ members }).then(() => setEditing(null));
                }}
              >
                저장
              </button>
              <button type="button" className={styles.btnSecondary} onClick={() => setEditing(null)}>
                취소
              </button>
            </div>
          </div>
        </section>
      )}
    </AdminShell>
  );
}
