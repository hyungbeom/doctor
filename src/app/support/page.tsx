import Link from "next/link";
import SitePageLayout from "@/components/site/SitePageLayout";
import styles from "@/app/site.module.css";
import { companyInfo } from "@/data/homeData";
import {
  mypageDemoApply,
  mypageHome,
  mypageInquiries,
  mypageInquiryNew,
  quoteRequest,
} from "@/lib/mypageRoutes";

export default function SupportPage() {
  return (
    <SitePageLayout
      title="고객센터"
      description="문의·상담·운영 시간 안내입니다."
    >
      <div className={styles.cardGrid}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>1:1 문의</h2>
          <p className={styles.cardText}>
            장비 스펙, 견적, 데모, A/S 등 궁금한 점을 남겨 주시면 담당자가 답변드립니다.
          </p>
          <div className={styles.cardActions}>
            <Link href={mypageInquiryNew()} className={styles.btnPrimary}>
              문의 작성
            </Link>
            <Link href={mypageInquiries()} className={styles.btnOutline}>
              문의 내역
            </Link>
          </div>
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>전화 상담</h2>
          <p className={styles.cardText}>
            긴급 문의는 대표전화로 연결해 주세요.
            <br />
            <strong>
              <a href={`tel:${companyInfo.phone.replace(/-/g, "")}`}>{companyInfo.phone}</a>
            </strong>
            <br />
            평일 09:00 ~ 18:00 (점심 12:00~13:00)
          </p>
          <div className={styles.cardActions}>
            <Link href="/board?tab=faq" className={styles.btnOutline}>
              FAQ 보기
            </Link>
          </div>
        </article>
      </div>

      <div className={styles.cardGrid} style={{ marginTop: 8 }}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>바로가기</h2>
          <div className={styles.cardActions}>
            <Link href={quoteRequest()} className={styles.btnOutline}>
              견적 요청
            </Link>
            <Link href={mypageDemoApply()} className={styles.btnOutline}>
              데모 신청
            </Link>
            <Link href={mypageHome()} className={styles.btnOutline}>
              마이페이지
            </Link>
          </div>
        </article>
      </div>
    </SitePageLayout>
  );
}
