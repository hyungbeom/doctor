import Link from "next/link";
import SitePageLayout from "@/components/site/SitePageLayout";
import styles from "@/app/site.module.css";

const resourceItems = [
  {
    id: "r1",
    title: "Alpexmedi 의료장비 카탈로그 (PDF)",
    type: "카탈로그",
    date: "2026.05",
  },
  {
    id: "r2",
    title: "견적·계약 절차 안내서",
    type: "안내",
    date: "2026.04",
  },
  {
    id: "r3",
    title: "의료기관 증빙 서류 제출 가이드",
    type: "가이드",
    date: "2026.03",
  },
  {
    id: "r4",
    title: "A/S 접수 및 보증 정책",
    type: "정책",
    date: "2026.02",
  },
];

export default function ResourcesPage() {
  return (
    <SitePageLayout
      title="자료실"
      description="카탈로그, 안내서, 정책 문서를 내려받을 수 있습니다."
    >
      <ul className={styles.list}>
        {resourceItems.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <button type="button" className={styles.listLink} style={{ width: "100%", border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}>
              <span className={styles.listTitle}>
                [{item.type}] {item.title}
              </span>
              <span className={styles.listDate}>{item.date}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className={styles.desc} style={{ marginTop: 24, marginBottom: 0 }}>
        로그인 회원은 마이페이지에서 계약·세무 관련 서류를 추가로 확인할 수 있습니다.{" "}
        <Link href="/mypage/documents">증빙 서류함 →</Link>
      </p>
    </SitePageLayout>
  );
}
