import Link from "next/link";
import SitePageLayout from "@/components/site/SitePageLayout";
import styles from "./guide.module.css";
import {
  mypageDemoApply,
  mypageHome,
  mypageInquiries,
} from "@/lib/mypageRoutes";

const STEPS = [
  { num: "01", title: "장비 검색 · 비교", desc: "카테고리·브랜드별 스펙을 한곳에서 확인" },
  { num: "02", title: "견적 · 데모 신청", desc: "맞춤 견적과 병원 내 데모 테스트" },
  { num: "03", title: "도입 결정", desc: "비교 후 확신 있는 장비 도입" },
] as const;

export default function GuidePage() {
  return (
    <SitePageLayout
      title="견적·데모"
      description="장비 도입 전 비교 견적과 병원 내 데모 테스트 절차를 안내합니다."
    >
      <div className={styles.guideWrap}>
        <ol className={styles.stepStrip}>
          {STEPS.map((step) => (
            <li key={step.num} className={styles.stepItem}>
              <span className={styles.stepNum}>{step.num}</span>
              <div className={styles.stepText}>
                <strong>{step.title}</strong>
                <span>{step.desc}</span>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.cardGrid}>
          <article className={`${styles.card} ${styles.cardQuote}`}>
            <div className={styles.cardHead}>
              <span className={styles.cardIcon}>견적</span>
              <h2 className={styles.cardTitle}>비교 견적 요청</h2>
            </div>
            <p className={styles.cardText}>
              관심 장비를 선택해 견적을 요청하시면 전담 담당자가 맞춤 조건을 정리해 드립니다.
            </p>
            <ul className={styles.cardList}>
              <li>여러 모델 스펙·가격 한눈에 비교</li>
              <li>견적서 PDF 마이페이지에서 확인</li>
              <li>도입 예산에 맞는 패키지 제안</li>
            </ul>
            <div className={styles.cardActions}>
              <Link href="/quote/request" className={styles.btnPrimary}>
                견적 요청하기
              </Link>
              <Link href="/products" className={styles.btnOutline}>
                제품리스트
              </Link>
            </div>
          </article>

          <article className={`${styles.card} ${styles.cardDemo}`}>
            <div className={styles.cardHead}>
              <span className={styles.cardIcon}>데모</span>
              <h2 className={styles.cardTitle}>데모 장비 신청</h2>
            </div>
            <p className={styles.cardText}>
              도입 전 실제 병원 환경에서 장비를 테스트해 보세요. 일정 조율 후 엔지니어가 방문·설치를
              지원합니다.
            </p>
            <ul className={styles.cardList}>
              <li>병원 환경 맞춤 설치·시연</li>
              <li>데모 일정·진행 상태 실시간 확인</li>
              <li>도입 전 성능·운영 검증</li>
            </ul>
            <div className={styles.cardActions}>
              <Link href={mypageDemoApply()} className={styles.btnPrimary}>
                데모 신청하기
              </Link>
              <Link href="/mypage#demo" className={styles.btnOutline}>
                신청 현황
              </Link>
            </div>
          </article>
        </div>

        <aside className={styles.helpBox}>
          <p>
            접수 후 진행 상황은 <Link href={mypageHome()}>마이페이지</Link>에서 확인하고, 궁금한
            점은 <Link href={mypageInquiries()}>문의 목록</Link>으로 이어서 남기실 수 있습니다.
          </p>
        </aside>
      </div>
    </SitePageLayout>
  );
}
