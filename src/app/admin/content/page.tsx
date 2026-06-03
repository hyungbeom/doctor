"use client";

import { FormEvent, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAdminCms } from "@/hooks/useAdminCms";
import type { CmsGnbItem } from "@/types/cms";
import styles from "../admin.module.css";

export default function AdminContentPage() {
  const { store, loading, error, save } = useAdminCms();
  const [message, setMessage] = useState<string | null>(null);

  async function onSaveHero(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!store) return;
    const fd = new FormData(e.currentTarget);
    await save({
      hero: {
        headline: String(fd.get("headline")),
        subline: String(fd.get("subline")),
        brandTag: String(fd.get("brandTag")),
        image: String(fd.get("image")),
      },
    });
    setMessage("히어로 배너가 저장되었습니다.");
  }

  async function onSaveGnb() {
    if (!store) return;
    await save({ gnb: store.gnb });
    setMessage("GNB 메뉴가 저장되었습니다.");
  }

  function updateGnb(index: number, field: keyof CmsGnbItem, value: string) {
    if (!store) return;
    const gnb = store.gnb.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    save({ gnb }).catch(() => setMessage("저장 실패"));
  }

  function addGnbItem() {
    if (!store) return;
    const gnb = [...store.gnb, { id: `nav-${Date.now()}`, label: "새 메뉴", href: "/" }];
    save({ gnb });
  }

  if (loading || !store) {
    return (
      <AdminShell title="홈·GNB">
        <p className={styles.loading}>{loading ? "로딩 중…" : error}</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="홈·GNB 콘텐츠">
      {message && <div className={styles.success}>{message}</div>}

      <section className={styles.panel}>
        <h2>메인 히어로 배너</h2>
        <form className={styles.formGrid} onSubmit={onSaveHero}>
          <div>
            <label className={styles.label}>헤드라인</label>
            <input name="headline" className={styles.input} defaultValue={store.hero.headline} />
          </div>
          <div>
            <label className={styles.label}>서브라인</label>
            <input name="subline" className={styles.input} defaultValue={store.hero.subline} />
          </div>
          <div>
            <label className={styles.label}>브랜드 태그</label>
            <input name="brandTag" className={styles.input} defaultValue={store.hero.brandTag} />
          </div>
          <div>
            <label className={styles.label}>이미지 경로</label>
            <input name="image" className={styles.input} defaultValue={store.hero.image} />
          </div>
          <button type="submit" className={styles.btn}>
            배너 저장
          </button>
        </form>
      </section>

      <section className={styles.panel}>
        <h2>상단 GNB</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>라벨</th>
              <th>링크</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {store.gnb.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <input
                    className={styles.input}
                    value={item.label}
                    onChange={(e) => updateGnb(index, "label", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    value={item.href}
                    onChange={(e) => updateGnb(index, "href", e.target.value)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.btnDanger}
                    onClick={() => {
                      const gnb = store.gnb.filter((_, i) => i !== index);
                      void save({ gnb });
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.rowActions} style={{ marginTop: 12 }}>
          <button type="button" className={styles.btnSecondary} onClick={addGnbItem}>
            메뉴 추가
          </button>
          <button type="button" className={styles.btn} onClick={() => void onSaveGnb()}>
            GNB 일괄 저장
          </button>
        </div>
      </section>
    </AdminShell>
  );
}
