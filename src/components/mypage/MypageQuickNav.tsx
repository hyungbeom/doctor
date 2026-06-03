import Link from "next/link";
import styles from "@/app/mypage/mypageSub.module.css";
import {
  mypageDemoApply,
  mypageDocuments,
  mypageHome,
  mypageInquiries,
  mypageSettings,
  quoteRequest,
} from "@/lib/mypageRoutes";

const quickItems = [
  { href: mypageHome(), label: "마이페이지" },
  { href: `${mypageHome()}#quotes`, label: "견적" },
  { href: quoteRequest(), label: "견적요청" },
  { href: mypageDemoApply(), label: "데모" },
  { href: mypageInquiries(), label: "문의" },
  { href: mypageDocuments(), label: "서류" },
  { href: mypageSettings(), label: "설정" },
];

type MypageQuickNavProps = {
  currentPath?: string;
};

export default function MypageQuickNav({ currentPath }: MypageQuickNavProps) {
  return (
    <nav className={styles.quickNav} aria-label="회원 메뉴 빠른 이동">
      {quickItems.map((item) => {
        const isActive =
          currentPath &&
          (currentPath === item.href ||
            (item.href.includes("#") && currentPath.startsWith(item.href.split("#")[0] ?? "")));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={isActive ? styles.quickNavActive : styles.quickNavLink}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
