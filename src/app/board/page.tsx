import Link from "next/link";
import SitePageLayout from "@/components/site/SitePageLayout";
import styles from "@/app/site.module.css";
import { boardPostUrl } from "@/data/boardData";
import { getPublicCms } from "@/lib/cms/public";

type BoardPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function BoardPage({ searchParams }: BoardPageProps) {
  const { tab = "notice" } = await searchParams;
  const activeTab = tab === "news" || tab === "faq" ? tab : "notice";
  const { siteNotices, news, boardFaqItems } = await getPublicCms();

  return (
    <SitePageLayout
      title="게시판"
      description="공지사항, 뉴스, 자주 묻는 질문을 확인하세요. 항목을 클릭하면 상세 내용을 볼 수 있습니다."
    >
      <nav className={styles.tabs} aria-label="게시판 분류">
        <Link
          href="/board?tab=notice"
          className={activeTab === "notice" ? styles.tabActive : styles.tab}
        >
          공지사항
        </Link>
        <Link
          href="/board?tab=news"
          className={activeTab === "news" ? styles.tabActive : styles.tab}
        >
          뉴스
        </Link>
        <Link
          href="/board?tab=faq"
          className={activeTab === "faq" ? styles.tabActive : styles.tab}
        >
          FAQ
        </Link>
      </nav>

      {activeTab === "notice" && (
        <ul className={styles.list}>
          {siteNotices.map((item) => (
            <li key={item.id} className={styles.listItem}>
              <Link href={boardPostUrl(item.id)} className={styles.listLink}>
                <span className={styles.listTitle}>{item.title}</span>
                <span className={styles.listDate}>{item.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {activeTab === "news" && (
        <ul className={styles.list}>
          {news.map((item) => (
            <li key={item.id} className={styles.listItem}>
              <Link href={boardPostUrl(item.id)} className={styles.listLink}>
                <span className={styles.listTitle}>{item.title}</span>
                <span className={styles.listDate}>
                  {item.source} · {item.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {activeTab === "faq" && (
        <ul className={styles.list}>
          {boardFaqItems.map((item) => (
            <li key={item.id} className={styles.listItem}>
              <Link href={boardPostUrl(item.id)} className={styles.listLink}>
                <span className={styles.listTitle}>Q. {item.question}</span>
                <span className={styles.listDate}>자세히 보기</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </SitePageLayout>
  );
}
