"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import styles from "@/app/mypage/mypage.module.css";
import {
  asTickets,
  contracts,
  credentialDocs,
  demoPipeline,
  demoRequests,
  getProfileDisplayName,
  getWarrantyProgress,
  hospitalAddresses,
  inquiries,
  mypageAccountManager,
  mypageMemberProfile,
  mypageNavItems,
  ownedEquipment,
  quotePipeline,
  quoteRequests,
  recentProducts,
  taxDocuments,
  wishlistItems,
  type PipelineStep,
} from "@/data/mypageData";
import { getMemberId } from "@/hooks/useMemberSession";
import { buildProductDetailUrl } from "@/lib/productListUrl";
import { getProductImage } from "@/lib/productImage";

function PipelineBar({ title, steps }: { title: string; steps: PipelineStep[] }) {
  return (
    <div className={styles.pipeline}>
      <p className={styles.pipelineTitle}>{title}</p>
      <div className={styles.pipelineTrack}>
        {steps.map((step, index) => (
          <div key={step.id} className={styles.pipelineStep}>
            <div className={styles.pipelineCount}>{step.count}</div>
            <span className={styles.pipelineLabel}>{step.label}</span>
            {index < steps.length - 1 && (
              <span className={styles.pipelineArrow} aria-hidden>
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status.includes("완료") || status === "유효" || status === "답변완료"
      ? styles.badgeDone
      : status.includes("진행") || status === "방문예정" || status === "견적완료"
        ? styles.badgeActive
        : status.includes("임박") || status === "조율 중" || status === "상담중"
          ? styles.badgeWarn
          : styles.badgeMuted;

  return <span className={`${styles.badge} ${tone}`}>{status}</span>;
}

type SectionProps = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  children: React.ReactNode;
};

function Section({ id, icon, title, desc, children }: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <header className={styles.sectionHead}>
        <span className={styles.sectionIcon} aria-hidden>
          {icon}
        </span>
        <div>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <p className={styles.sectionDesc}>{desc}</p>
        </div>
      </header>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

export default function MypageDashboard() {
  const memberId = getMemberId();
  const profile = useMemo(
    () => ({ ...mypageMemberProfile, memberId: memberId ?? "guest" }),
    [memberId],
  );

  return (
    <div className={styles.dashboard}>
      <section className={styles.summary} aria-label="대시보드 요약">
        <div className={styles.summaryMain}>
          <p className={styles.summaryEyebrow}>My Dashboard</p>
          <h1 className={styles.summaryTitle}>{getProfileDisplayName(profile)}</h1>
          <p className={styles.summaryMeta}>
            회원 ID <strong>{profile.memberId}</strong>
            <span className={styles.summaryDot} aria-hidden>
              ·
            </span>
            Alpexmedi 마이페이지
          </p>
        </div>
        <div className={styles.summaryPipelines}>
          <PipelineBar title="견적 진행" steps={quotePipeline} />
          <PipelineBar title="데모 진행" steps={demoPipeline} />
        </div>
      </section>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <nav className={styles.sideNav} aria-label="마이페이지 메뉴">
            {mypageNavItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={styles.sideNavLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.managerCard}>
            <p className={styles.managerLabel}>나의 전담 담당자</p>
            <p className={styles.managerName}>
              {mypageAccountManager.name} {mypageAccountManager.title}
            </p>
            <a href={`tel:${mypageAccountManager.phone.replace(/-/g, "")}`} className={styles.managerPhone}>
              {mypageAccountManager.phone}
            </a>
            <a href={`mailto:${mypageAccountManager.email}`} className={styles.managerEmail}>
              {mypageAccountManager.email}
            </a>
            <p className={styles.managerHint}>
              견적·데모·A/S 문의 시 가장 빠른 연결 경로입니다.
            </p>
          </div>

          <div className={styles.alertCard}>
            <p className={styles.alertTitle}>견적서 도착 알림</p>
            <p className={styles.alertText}>
              관리자가 견적서를 등록하면 카카오 알림톡/SMS와 함께 마이페이지 링크가 발송됩니다.
            </p>
            <span className={styles.alertSample}>
              「알펙스메디: 요청하신 [장비명]의 견적서가 마이페이지에 도착했습니다.」
            </span>
          </div>
        </aside>

        <div className={styles.content}>
          <nav className={styles.mobileNav} aria-label="마이페이지 빠른 이동">
            {mypageNavItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={styles.mobileNavLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <Section
            id="quotes"
            icon="①"
            title="견적 및 계약 관리"
            desc="요청부터 견적서 확인, 계약까지 한곳에서 관리합니다."
          >
            <div className={styles.cardList}>
              {quoteRequests.map((item) => (
                <article key={item.id} className={styles.itemCard}>
                  <div className={styles.itemHead}>
                    <div>
                      <p className={styles.itemId}>{item.id}</p>
                      <h3 className={styles.itemTitle}>
                        {item.productId ? (
                          <Link href={buildProductDetailUrl(item.productId)}>{item.productName}</Link>
                        ) : (
                          item.productName
                        )}
                      </h3>
                      <p className={styles.itemMeta}>요청일 {item.requestedAt}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className={styles.itemActions}>
                    {item.hasQuotePdf && (
                      <button type="button" className={styles.btnPrimary}>
                        견적서 열람/다운로드
                      </button>
                    )}
                    <button type="button" className={styles.btnOutline}>
                      재협상/수정 요청
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <h3 className={styles.subTitle}>온라인 계약서 확인</h3>
            <div className={styles.cardList}>
              {contracts.map((item) => (
                <article key={item.id} className={styles.itemCardCompact}>
                  <div>
                    <p className={styles.itemTitle}>{item.productName}</p>
                    <p className={styles.itemMeta}>계약일 {item.signedAt}</p>
                  </div>
                  <div className={styles.itemActionsInline}>
                    <StatusBadge status={item.status} />
                    <button type="button" className={styles.btnGhost}>
                      계약서 보기
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="demo"
            icon="②"
            title="데모 장비 신청 관리"
            desc="도입 전 장비 대여·테스트 일정과 담당자 정보를 추적합니다."
          >
            <div className={styles.cardList}>
              {demoRequests.map((item) => (
                <article key={item.id} className={styles.itemCard}>
                  <div className={styles.itemHead}>
                    <div>
                      <p className={styles.itemId}>{item.id}</p>
                      <h3 className={styles.itemTitle}>
                        {item.productId ? (
                          <Link href={buildProductDetailUrl(item.productId)}>{item.productName}</Link>
                        ) : (
                          item.productName
                        )}
                      </h3>
                      {item.scheduleLabel && (
                        <p className={styles.itemMeta}>{item.scheduleLabel}</p>
                      )}
                      <p className={styles.itemContact}>
                        담당 {item.engineerName} · {item.engineerPhone}
                      </p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  {item.status === "데모 종료" && (
                    <div className={styles.itemActions}>
                      <button type="button" className={styles.btnPrimary}>
                        이 장비 견적 요청하기
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="equipment"
            icon="③"
            title="내 병원 장비 & 사후 관리"
            desc="구매 완료 장비 자산, A/S, 소모품 요청을 관리합니다."
          >
            <div className={styles.equipmentGrid}>
              {ownedEquipment.map((item) => {
                const progress = getWarrantyProgress(item.warrantyDaysLeft);
                return (
                  <article key={item.id} className={styles.equipmentCard}>
                    <h3 className={styles.itemTitle}>{item.productName}</h3>
                    <ul className={styles.specMini}>
                      <li>
                        <span>시리얼</span>
                        <strong>{item.serialNumber}</strong>
                      </li>
                      <li>
                        <span>도입일</span>
                        <strong>{item.installedAt}</strong>
                      </li>
                    </ul>
                    <div className={styles.warranty}>
                      <div className={styles.warrantyHead}>
                        <span>무상 A/S 보증</span>
                        <strong>D-{item.warrantyDaysLeft}</strong>
                      </div>
                      <div className={styles.warrantyBar}>
                        <div className={styles.warrantyFill} style={{ width: `${progress}%` }} />
                      </div>
                      <p className={styles.warrantyEnd}>만료 {item.warrantyEnd}</p>
                    </div>
                    <button type="button" className={styles.btnOutline}>
                      소모품 추가 견적 요청
                    </button>
                  </article>
                );
              })}
            </div>

            <h3 className={styles.subTitle}>A/S 및 기술 지원 접수</h3>
            <div className={styles.cardList}>
              {asTickets.map((item) => (
                <article key={item.id} className={styles.itemCard}>
                  <div className={styles.itemHead}>
                    <div>
                      <p className={styles.itemId}>{item.id}</p>
                      <h3 className={styles.itemTitle}>{item.productName}</h3>
                      <p className={styles.itemMeta}>{item.symptom}</p>
                      {item.visitDate && (
                        <p className={styles.itemContact}>기사 방문 예정 {item.visitDate}</p>
                      )}
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <button type="button" className={styles.btnPrimary}>
                    A/S 접수 (증상·사진 첨부)
                  </button>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="documents"
            icon="④"
            title="증빙 및 서류 관리"
            desc="세무·의료기관 증빙 서류를 한곳에서 조회합니다."
          >
            <h3 className={styles.subTitle}>세무 증빙 서류함</h3>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>종류</th>
                    <th>발행일</th>
                    <th>금액</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {taxDocuments.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.type}</td>
                      <td>{doc.issuedAt}</td>
                      <td>{doc.amount}</td>
                      <td>
                        <button type="button" className={styles.btnGhost}>
                          출력
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className={styles.subTitle}>의료기관 증빙 서류</h3>
            <div className={styles.docGrid}>
              {credentialDocs.map((doc) => (
                <article key={doc.id} className={styles.docCard}>
                  <p className={styles.docName}>{doc.name}</p>
                  <StatusBadge status={doc.status} />
                  <p className={styles.itemMeta}>
                    {doc.expiresAt === "—" ? "유효기간 —" : `만료 ${doc.expiresAt}`}
                  </p>
                  <button type="button" className={styles.btnOutline}>
                    갱신 등록
                  </button>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="activity"
            icon="⑤"
            title="쇼핑 활동 및 관심 목록"
            desc="찜한 장비와 최근 본 장비를 모아 비교·재방문합니다."
          >
            <h3 className={styles.subTitle}>관심 장비 (Wishlist)</h3>
            <div className={styles.wishGrid}>
              {wishlistItems.map((item) => (
                <article key={item.id} className={styles.wishCard}>
                  <div className={styles.wishThumb}>
                    <Image
                      src={getProductImage(item.productId)}
                      alt=""
                      fill
                      sizes="120px"
                      className={styles.wishImg}
                    />
                  </div>
                  <div>
                    <p className={styles.wishBrand}>{item.brandName}</p>
                    <h3 className={styles.wishName}>
                      <Link href={buildProductDetailUrl(item.productId)}>{item.productName}</Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
            <button type="button" className={styles.btnPrimary}>
              선택 장비 스펙 비교하기 (최대 3개)
            </button>

            <h3 className={styles.subTitle}>최근 본 상품</h3>
            <ul className={styles.recentList}>
              {recentProducts.map((item) => (
                <li key={item.id}>
                  <Link href={buildProductDetailUrl(item.productId)} className={styles.recentLink}>
                    <span className={styles.recentName}>{item.productName}</span>
                    <span className={styles.recentTime}>{item.viewedAt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            id="account"
            icon="⑥"
            title="고객 소통 및 정보 관리"
            desc="1:1 문의와 병원·설치지 정보를 관리합니다."
          >
            <h3 className={styles.subTitle}>1:1 문의 / 장비 문의</h3>
            <div className={styles.cardList}>
              {inquiries.map((item) => (
                <article key={item.id} className={styles.itemCardCompact}>
                  <div>
                    <p className={styles.itemTitle}>{item.subject}</p>
                    <p className={styles.itemMeta}>
                      {item.target} · {item.createdAt}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </article>
              ))}
            </div>
            <button type="button" className={styles.btnOutline}>
              새 문의 작성
            </button>

            <h3 className={styles.subTitle}>병원 정보 및 배송지 설정</h3>
            <div className={styles.cardList}>
              {hospitalAddresses.map((addr) => (
                <article key={addr.label} className={styles.itemCardCompact}>
                  <div>
                    <p className={styles.itemTitle}>
                      {addr.label}
                      {addr.isDefault && <span className={styles.defaultTag}>기본</span>}
                    </p>
                    <p className={styles.itemMeta}>{addr.address}</p>
                  </div>
                  <button type="button" className={styles.btnGhost}>
                    수정
                  </button>
                </article>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
