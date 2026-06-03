import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SitePageLayout from "@/components/site/SitePageLayout";
import styles from "@/app/site.module.css";
import { boardListUrl, getBoardTabLabel, type BoardPostType } from "@/data/boardData";
import { getBoardPostFromCms } from "@/lib/cms/public";

type BoardDetailPageProps = {
  params: Promise<{ postId: string }>;
};

function formatContent(content: string): string[] {
  return content.split("\n").filter((line) => line.length > 0);
}

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { postId } = await params;
  const post = await getBoardPostFromCms(decodeURIComponent(postId));

  if (!post) {
    notFound();
  }

  const tab = post.type as BoardPostType;
  const lines = formatContent(post.content);

  return (
    <SitePageLayout title={post.title} description={`${getBoardTabLabel(tab)} · ${post.date}`}>
      <nav className={styles.detailBreadcrumb} aria-label="breadcrumb">
        <Link href="/board">게시판</Link>
        <span aria-hidden>/</span>
        <Link href={boardListUrl(tab)}>{getBoardTabLabel(tab)}</Link>
        <span aria-hidden>/</span>
        <strong>상세</strong>
      </nav>

      <article className={styles.detailArticle}>
        <header className={styles.detailHead}>
          <span className={styles.detailBadge}>{getBoardTabLabel(tab)}</span>
          <h2 className={styles.detailTitle}>{post.title}</h2>
          <p className={styles.detailMeta}>
            {post.source && <span>{post.source} · </span>}
            {post.date}
          </p>
        </header>

        {post.image && (
          <div className={styles.detailImage}>
            <Image src={post.image} alt="" width={720} height={400} style={{ width: "100%", height: "auto" }} />
          </div>
        )}

        <div className={styles.detailBody}>
          {post.type === "faq" ? (
            <>
              <p className={styles.faqQ}>Q. {post.title}</p>
              <p className={styles.faqA}>A. {post.content}</p>
            </>
          ) : (
            lines.map((line) =>
              line.startsWith("■") ? (
                <p key={line} className={styles.detailHeading}>
                  {line}
                </p>
              ) : (
                <p key={line}>{line}</p>
              ),
            )
          )}
        </div>
      </article>

      <div className={styles.detailActions}>
        <Link href={boardListUrl(tab)} className={styles.btnOutline}>
          목록으로
        </Link>
        <Link href="/board" className={styles.btnOutline}>
          게시판 홈
        </Link>
      </div>
    </SitePageLayout>
  );
}
