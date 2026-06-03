import Link from "next/link";
import SitePageLayout from "@/components/site/SitePageLayout";
import styles from "@/app/site.module.css";
import {
  mypageDemoApply,
  mypageHome,
  mypageInquiries,
  quoteRequest,
} from "@/lib/mypageRoutes";

export default function GuidePage() {
  return (
    <SitePageLayout
      title="견적·데모"
      description="장비 도입 전 비교 견적과 병원 내 데모 테스트 절차를 안내합니다."
    >
      <div className={styles.cardGrid}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>비교 견적 요청</h2>
          <p className={styles.cardText}>
            관심 장비를 선택해 견적을 요청하시면 전담 담당자가 맞춤 조건을 정리해 드립니다. 견적서는
            마이페이지에서 PDF로 확인할 수 있습니다.
          </p>
          <div className={styles.cardActions}>
            <Link href="/quote/request" className={styles.btnPrimary}>
              견적 요청하기
            </Link>
            <Link href="/products" className={styles.btnOutline}>
              제품리스트
            </Link>
          </div>
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>데모 장비 신청</h2>
          <p className={styles.cardText}>
            도입 전 실제 병원 환경에서 장비를 테스트해 보세요. 일정 조율 후 엔지니어가 방문·설치를
            지원합니다.
          </p>
          <div className={styles.cardActions}>
            <Link href={mypageDemoApply()} className={styles.btnPrimary}>
              데모 신청하기
            </Link>
            <Link href="/mypage#demo" className={styles.btnOutline}>
              신청 현황 (마이페이지)
            </Link>
          </div>
        </article>
      </div>

      <p className={styles.desc} style={{ marginTop: 24 }}>
        접수 후 진행 상황은{" "}
        <Link href={mypageHome()}>마이페이지</Link>
        에서 확인하고, 궁금한 점은{" "}
        <Link href={mypageInquiries()}>문의 목록</Link>
        으로 이어서 남기실 수 있습니다.
      </p>
    </SitePageLayout>
  );
}
