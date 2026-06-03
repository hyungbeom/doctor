import Link from "next/link";
import type { FlowLink } from "@/data/mypageFlow";
import styles from "@/app/mypage/mypageSub.module.css";

type MypageRelatedLinksProps = {
  title?: string;
  links: FlowLink[];
  excludeHref?: string;
};

export default function MypageRelatedLinks({
  title = "이어서 하기",
  links,
  excludeHref,
}: MypageRelatedLinksProps) {
  const items = links.filter((link) => link.href !== excludeHref && !link.hint?.includes("현재 페이지"));

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className={styles.related}>
      <h2 className={styles.relatedTitle}>{title}</h2>
      <ul className={styles.relatedList}>
        {items.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.relatedLink}>
              <span className={styles.relatedLabel}>{link.label}</span>
              {link.hint && <span className={styles.relatedHint}>{link.hint}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
