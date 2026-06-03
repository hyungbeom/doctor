"use client";

import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "@/app/chutcha.module.css";
import { gnbItems } from "@/data/homeData";
import HeaderMemberNav from "./HeaderMemberNav";

const TOP_BANNER_KEY = "topBannerDismissed";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState<boolean | null>(null);

  useEffect(() => {
    setBannerVisible(sessionStorage.getItem(TOP_BANNER_KEY) !== "1");
  }, []);

  const overlayRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);
  const mobileMemberRef = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLSpanElement>(null);
  const bar2Ref = useRef<HTMLSpanElement>(null);
  const bar3Ref = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const nav = navRef.current;
    if (!overlay || !nav) {
      return;
    }
    gsap.set([overlay, nav], { display: "none", opacity: 0 });
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const nav = navRef.current;
    const list = menuListRef.current;
    const items = list ? Array.from(list.children) : [];
    const memberBlock = mobileMemberRef.current;

    if (!overlay || !nav) {
      return;
    }

    timelineRef.current?.kill();

    if (menuOpen) {
      gsap.set(overlay, { display: "block", opacity: 0 });
      gsap.set(nav, { display: "flex", opacity: 0, y: -20 });
      gsap.set(items, { opacity: 0, x: -32 });
      if (memberBlock) {
        gsap.set(memberBlock, { opacity: 0, y: 16 });
      }

      const tl = gsap.timeline();
      tl.to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" })
        .to(nav, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, "-=0.12")
        .to(items, { opacity: 1, x: 0, duration: 0.35, stagger: 0.07, ease: "power2.out" }, "-=0.22");
      if (memberBlock) {
        tl.to(memberBlock, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" }, "-=0.12");
      }

      if (bar1Ref.current && bar2Ref.current && bar3Ref.current) {
        gsap.to(bar1Ref.current, { rotation: 45, y: 6, duration: 0.3, ease: "power2.inOut" });
        gsap.to(bar2Ref.current, { opacity: 0, duration: 0.18 });
        gsap.to(bar3Ref.current, { rotation: -45, y: -6, duration: 0.3, ease: "power2.inOut" });
      }

      timelineRef.current = tl;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([overlay, nav], { display: "none" });
      },
    });

    if (memberBlock) {
      tl.to(memberBlock, { opacity: 0, y: 10, duration: 0.18, ease: "power2.in" });
    }
    tl.to(items, { opacity: 0, x: -24, duration: 0.2, stagger: 0.04, ease: "power2.in" }, memberBlock ? "-=0.08" : 0)
      .to(nav, { opacity: 0, y: -12, duration: 0.28, ease: "power2.in" }, "-=0.04")
      .to(overlay, { opacity: 0, duration: 0.22, ease: "power2.in" }, "-=0.1");

    if (bar1Ref.current && bar2Ref.current && bar3Ref.current) {
      gsap.to(bar1Ref.current, { rotation: 0, y: 0, duration: 0.28, ease: "power2.inOut" });
      gsap.to(bar2Ref.current, { opacity: 1, duration: 0.22 });
      gsap.to(bar3Ref.current, { rotation: 0, y: 0, duration: 0.28, ease: "power2.inOut" });
    }

    timelineRef.current = tl;
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const dismissBanner = () => {
    setBannerVisible(false);
    sessionStorage.setItem(TOP_BANNER_KEY, "1");
  };

  return (
    <div className={styles.headerWrap}>
      {bannerVisible === true && (
        <div className={styles.topBanner}>
          <div className={styles.topBannerInner}>
            <span className={styles.liveBadge}>수다 LIVE</span>
            <p className={styles.topBannerText}>
              지금 방송 중, 라이브에서만 공개 되는 역대급 혜택을 바로 확인하세요.
            </p>
            <button
              type="button"
              className={styles.topBannerClose}
              aria-label="공지 닫기"
              onClick={dismissBanner}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      )}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logoLink} title="Alpexmedi 홈">
            <Image
              src="/images/alpexmedi-logo.png"
              alt="Alpexmedi"
              width={160}
              height={56}
              className={styles.logoImg}
              priority
            />
          </Link>

          <nav className={styles.gnb} aria-label="사이트 메뉴">
            <ul className={styles.gnbList}>
              {gnbItems.map((item) => (
                <li key={item.id} className={styles.gnbItem}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.headerRight}>
            <HeaderMemberNav variant="desktop" />
            <button type="button" className={styles.recentBtn} title="최근 본 상품">
              <span className={styles.recentLabel}>최근 본 상품</span>
              <span className={styles.recentCount}>0</span>
            </button>
            <button
              type="button"
              className={styles.menuToggle}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span ref={bar1Ref} className={styles.menuBar} />
              <span ref={bar2Ref} className={styles.menuBar} />
              <span ref={bar3Ref} className={styles.menuBar} />
            </button>
          </div>
        </div>

        <div ref={overlayRef} className={styles.mobileOverlay} onClick={closeMenu} aria-hidden={!menuOpen} />
        <nav ref={navRef} className={styles.mobileNav} aria-hidden={!menuOpen}>
          <div className={styles.mobileNavHead}>
            <span className={styles.mobileNavTitle}>메뉴</span>
          </div>
          <ul ref={menuListRef}>
            {gnbItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div ref={mobileMemberRef} className={styles.mobileMemberWrap}>
            <HeaderMemberNav variant="mobile" onNavigate={closeMenu} />
          </div>
        </nav>
      </header>
    </div>
  );
}
