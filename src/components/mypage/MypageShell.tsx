import Link from "next/link";
import type { FlowCrumb, FlowLink } from "@/data/mypageFlow";
import styles from "@/app/mypage/mypageSub.module.css";
import { mypageHome } from "@/lib/mypageRoutes";
import MypageQuickNav from "./MypageQuickNav";
import MypageRelatedLinks from "./MypageRelatedLinks";

type MypageShellProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  breadcrumbs?: FlowCrumb[];
  relatedLinks?: FlowLink[];
  currentPath?: string;
  showQuickNav?: boolean;
};

export default function MypageShell({
  title,
  description,
  children,
  backHref = mypageHome(),
  backLabel = "마이페이지",
  breadcrumbs,
  relatedLinks,
  currentPath,
  showQuickNav = true,
}: MypageShellProps) {
  const crumbs = breadcrumbs ?? [{ label: "마이페이지", href: mypageHome() }, { label: title }];

  return (
    <div className={styles.shell}>
      {showQuickNav && <MypageQuickNav currentPath={currentPath} />}

      <nav className={styles.breadcrumb} aria-label="breadcrumb">
        {crumbs.map((crumb, index) => (
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
        <Link href={backHref} className={styles.backLink}>
          ← {backLabel}
        </Link>
      </header>

      <div className={styles.body}>
        {children}
        {relatedLinks && relatedLinks.length > 0 && (
          <MypageRelatedLinks links={relatedLinks} />
        )}
      </div>
    </div>
  );
}
