"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAdminCms } from "@/hooks/useAdminCms";
import type { BoardPost, BoardPostType } from "@/data/boardData";
import styles from "../admin.module.css";

const emptyPost = (): BoardPost => ({
  id: `post-${Date.now()}`,
  type: "notice",
  title: "",
  date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
  content: "",
});

export default function AdminBoardPage() {
  const { store, loading, error, save } = useAdminCms();
  const [editing, setEditing] = useState<BoardPost | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function persist(posts: BoardPost[]) {
    await save({ boardPosts: posts });
    setMessage("게시판이 저장되었습니다.");
  }

  if (loading || !store) {
    return (
      <AdminShell title="게시판">
        <p className={styles.loading}>{loading ? "로딩 중…" : error}</p>
      </AdminShell>
    );
  }

  const draft = editing ?? emptyPost();

  return (
    <AdminShell title="게시판 관리">
      {message && <div className={styles.success}>{message}</div>}

      <section className={styles.panel}>
        <h2>글 목록 ({store.boardPosts.length})</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>유형</th>
              <th>제목</th>
              <th>날짜</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {store.boardPosts.map((post) => (
              <tr key={post.id}>
                <td>
                  <span className={styles.badge}>{post.type}</span>
                </td>
                <td>{post.title}</td>
                <td>{post.date}</td>
                <td className={styles.rowActions}>
                  <button type="button" className={styles.btnSecondary} onClick={() => setEditing(post)}>
                    수정
                  </button>
                  <button
                    type="button"
                    className={styles.btnDanger}
                    onClick={() => void persist(store.boardPosts.filter((p) => p.id !== post.id))}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className={styles.btn} style={{ marginTop: 12 }} onClick={() => setEditing(emptyPost())}>
          새 글
        </button>
      </section>

      {editing !== null && (
        <section className={styles.panel}>
          <h2>{editing.id.startsWith("post-") && editing.title === "" ? "새 글 작성" : "글 편집"}</h2>
          <div className={styles.formGrid}>
            <div>
              <label className={styles.label}>유형</label>
              <select
                className={styles.select}
                value={draft.type}
                onChange={(e) => setEditing({ ...draft, type: e.target.value as BoardPostType })}
              >
                <option value="notice">공지</option>
                <option value="news">뉴스</option>
                <option value="faq">FAQ</option>
              </select>
            </div>
            <div>
              <label className={styles.label}>제목</label>
              <input
                className={styles.input}
                value={draft.title}
                onChange={(e) => setEditing({ ...draft, title: e.target.value })}
              />
            </div>
            <div>
              <label className={styles.label}>날짜</label>
              <input
                className={styles.input}
                value={draft.date}
                onChange={(e) => setEditing({ ...draft, date: e.target.value })}
              />
            </div>
            {draft.type === "news" && (
              <div>
                <label className={styles.label}>출처</label>
                <input
                  className={styles.input}
                  value={draft.source ?? ""}
                  onChange={(e) => setEditing({ ...draft, source: e.target.value })}
                />
              </div>
            )}
            <div>
              <label className={styles.label}>본문</label>
              <textarea
                className={styles.textarea}
                value={draft.content}
                onChange={(e) => setEditing({ ...draft, content: e.target.value })}
              />
            </div>
            <div className={styles.rowActions}>
              <button
                type="button"
                className={styles.btn}
                onClick={() => {
                  const exists = store.boardPosts.some((p) => p.id === draft.id);
                  const posts = exists
                    ? store.boardPosts.map((p) => (p.id === draft.id ? draft : p))
                    : [...store.boardPosts, draft];
                  void persist(posts).then(() => setEditing(null));
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
