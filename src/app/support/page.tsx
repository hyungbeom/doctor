import Link from "next/link";
import SitePageLayout from "@/components/site/SitePageLayout";
import { companyInfo } from "@/data/homeData";
import {
  mypageDemoApply,
  mypageHome,
  mypageInquiries,
  mypageInquiryNew,
  quoteRequest,
} from "@/lib/mypageRoutes";
import styles from "./support.module.css";

const QUICK_LINKS = [
  { label: "견적 요청", href: quoteRequest() },
  { label: "데모 신청", href: mypageDemoApply() },
  { label: "견적·데모 안내", href: "/guide" },
  { label: "마이페이지", href: mypageHome() },
] as const;

export default function SupportPage() {
  const telHref = `tel:${companyInfo.phone.replace(/-/g, "")}`;

  return (
    <SitePageLayout title="고객센터" description="문의·상담·운영 시간 안내입니다.">
      <div className={styles.supportWrap}>
        <ul className={styles.infoStrip}>
          <li className={styles.infoItem}>
            <span className={styles.infoLabel}>운영 시간</span>
            <span className={styles.infoValue}>평일 09:00 ~ 18:00</span>
          </li>
          <li className={styles.infoItem}>
            <span className={styles.infoLabel}>점심 시간</span>
            <span className={styles.infoValue}>12:00 ~ 13:00</span>
          </li>
          <li className={styles.infoItem}>
            <span className={styles.infoLabel}>이메일</span>
            <span className={styles.infoValue}>
              <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
            </span>
          </li>
        </ul>

        <div className={styles.cardGrid}>
          <article className={`${styles.card} ${styles.cardInquiry}`}>
            <div className={styles.cardHead}>
              <span className={styles.cardIcon}>문의</span>
              <h2 className={styles.cardTitle}>1:1 문의</h2>
            </div>
            <p className={styles.cardText}>
              장비 스펙, 견적, 데모, A/S 등 궁금한 점을 남겨 주시면 담당자가 답변드립니다.
            </p>
            <ul className={styles.cardList}>
              <li>견적·데모·장비 관련 질문 접수</li>
              <li>마이페이지에서 답변 확인</li>
              <li>영업일 기준 순차 처리</li>
            </ul>
            <div className={styles.cardActions}>
              <Link href={mypageInquiryNew()} className={styles.btnPrimary}>
                문의 작성하기
              </Link>
              <Link href={mypageInquiries()} className={styles.btnOutline}>
                문의 내역
              </Link>
            </div>
          </article>

          <article className={`${styles.card} ${styles.cardPhone}`}>
            <div className={styles.cardHead}>
              <span className={styles.cardIcon}>전화</span>
              <h2 className={styles.cardTitle}>전화 상담</h2>
            </div>
            <p className={styles.cardText}>긴급하거나 바로 상담이 필요하신 경우 대표전화로 연결해 주세요.</p>
            <a href={telHref} className={styles.phoneBtn}>
              <svg
                className={styles.phoneBtnIcon}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 015 6a2 2 0 012-2z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {companyInfo.phone}
            </a>
            <div className={styles.hoursBox}>
              <strong>상담 가능 시간</strong>
              평일 09:00 ~ 18:00
              <br />
              점심 12:00 ~ 13:00 (상담 불가)
            </div>
            <div className={styles.cardActions}>
              <Link href="/board?tab=faq" className={styles.btnOutline}>
                FAQ 보기
              </Link>
            </div>
          </article>
        </div>

        <section className={styles.quickSection}>
          <h2 className={styles.quickTitle}>자주 찾는 메뉴</h2>
          <p className={styles.quickDesc}>견적·데모·마이페이지로 바로 이동할 수 있습니다.</p>
          <ul className={styles.quickLinks}>
            {QUICK_LINKS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.quickLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <aside className={styles.helpBox}>
          <p>
            장비 도입 절차는 <Link href="/guide">견적·데모 안내</Link>에서 확인하실 수 있습니다. 접수
            후 진행 상황은 <Link href={mypageHome()}>마이페이지</Link>에서 확인해 주세요.
          </p>
        </aside>
      </div>
    </SitePageLayout>
  );
}
