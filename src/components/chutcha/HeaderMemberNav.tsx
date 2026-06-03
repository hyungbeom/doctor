"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/app/chutcha.module.css";
import { useMemberSession } from "@/hooks/useMemberSession";

type HeaderMemberNavProps = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

export default function HeaderMemberNav({ variant, onNavigate }: HeaderMemberNavProps) {
  const router = useRouter();
  const { isLoggedIn, ready, logout } = useMemberSession();

  const handleLogout = () => {
    logout();
    onNavigate?.();
    router.push("/login?loggedOut=1");
  };

  const navClass =
    variant === "desktop" ? styles.memberNavDesktop : styles.memberNavMobile;

  if (!ready) {
    return (
      <nav className={navClass} aria-label="회원 메뉴" aria-hidden>
        <span className={styles.memberLinkMuted}>LOGIN</span>
      </nav>
    );
  }

  if (variant === "mobile") {
    return (
      <div className={styles.mobileMemberBlock}>
        <p className={styles.mobileMemberLabel}>회원</p>
        <nav className={navClass} aria-label="회원 메뉴">
          {isLoggedIn ? (
            <ul className={styles.mobileMemberList}>
              <li>
                <Link href="/mypage" className={styles.mobileMemberLink} onClick={onNavigate}>
                  MYPAGE
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.mobileMemberLink}
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </li>
            </ul>
          ) : (
            <ul className={styles.mobileMemberList}>
              <li>
                <Link href="/login" className={styles.mobileMemberLink} onClick={onNavigate}>
                  LOGIN
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    );
  }

  return (
    <nav className={navClass} aria-label="회원 메뉴">
      {isLoggedIn ? (
        <>
          <Link href="/mypage" className={styles.memberLink}>
            MYPAGE
          </Link>
          <span className={styles.memberDivider} aria-hidden />
          <button type="button" className={styles.memberLinkBtn} onClick={handleLogout}>
            LOGOUT
          </button>
        </>
      ) : (
        <Link href="/login" className={styles.memberLink}>
          LOGIN
        </Link>
      )}
    </nav>
  );
}
