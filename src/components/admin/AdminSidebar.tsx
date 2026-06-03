"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/admin/admin.module.css";

const NAV = [
  { href: "/admin", label: "대시보드", exact: true },
  { href: "/admin/content", label: "홈·GNB" },
  { href: "/admin/products", label: "제품" },
  { href: "/admin/board", label: "게시판" },
  { href: "/admin/members", label: "회원" },
  { href: "/admin/quotes", label: "견적" },
  { href: "/admin/demos", label: "데모" },
  { href: "/admin/inquiries", label: "문의" },
  { href: "/admin/notifications", label: "알림 발송" },
  { href: "/admin/notifications/history", label: "발송 이력" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        Alpexmedi Admin
        <small>사이트·운영 통합 관리</small>
      </div>
      <ul className={styles.nav}>
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={active ? styles.navLinkActive : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
