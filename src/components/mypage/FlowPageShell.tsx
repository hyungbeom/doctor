import Link from "next/link";
import type { FlowCrumb, FlowLink } from "@/data/mypageFlow";
import styles from "@/app/mypage/mypageSub.module.css";
import MypageQuickNav from "./MypageQuickNav";
import MypageRelatedLinks from "./MypageRelatedLinks";

type FlowPageShellProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  breadcrumbs: FlowCrumb[];
  relatedLinks: FlowLink[];
  backHref?: string;
  backLabel?: string;
  showQuickNav?: boolean;
  maxWidth?: number;
};

export default function FlowPageShell({
  title,
  description,
  children,
  breadcrumbs,
  relatedLinks,
  backHref,
  backLabel = "이전",
  showQuickNav = true,
  maxWidth = 640,
}: FlowPageShellProps) {
  return (
    <div style={{ maxWidth, margin: "0 auto", padding: "24px 20px 80px" }}>
      {showQuickNav && <MypageQuickNav />}

      <nav className={styles.breadcrumb} aria-label="breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <span key={`${crumb.label}-${index}`} className={styles.breadcrumbItem}>
            {index > 0 && <span className={styles.breadcrumbSep} aria-hidden>/</span>}
            {crumb.href ? (
              <Link href={crumb.href}>{crumb.label}</Link>
            ) : (
              <strong>{crumb.label}</strong>
            )}
          </span>
        ))}
      </nav>

      <header className={styles.head}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.desc}>{description}</p>}
        </div>
        {backHref && (
          <Link href={backHref} className={styles.backLink}>
            ← {backLabel}
          </Link>
        )}
      </header>

      <div className={styles.body}>
        {children}
        <MypageRelatedLinks links={relatedLinks} />
      </div>
    </div>
  );
}
