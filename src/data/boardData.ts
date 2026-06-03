export type BoardPostType = "notice" | "news" | "faq";

export type BoardPost = {
  id: string;
  type: BoardPostType;
  title: string;
  date: string;
  content: string;
  source?: string;
  image?: string;
};

export const boardPosts: BoardPost[] = [
  {
    id: "notice-1",
    type: "notice",
    title: "[공지] Alpexmedi 견적·상담 시스템 업데이트 안내",
    date: "2026.06.02",
    content: `안녕하세요, Alpexmedi입니다.

견적·상담 시스템이 업데이트되어 마이페이지에서 견적서 PDF 확인, 재협상 요청, 계약서 열람이 한곳에서 가능합니다.

■ 주요 변경 사항
· 견적서 도착 시 카카오 알림톡/SMS 안내
· 마이페이지 > 견적·계약 메뉴 통합
· 전담 담당자 1:1 매칭 정보 상시 노출

이용에 불편한 점이 있으시면 고객센터로 문의해 주세요.`,
  },
  {
    id: "notice-2",
    type: "notice",
    title: "[공지] 의료기관 증빙 서류 갱신 안내",
    date: "2026.05.20",
    content: `의료기관 증빙 서류(사업자등록증, 개설신고서, 의사면허증 등)의 유효기간을 확인해 주세요.

만료 임박 서류는 마이페이지 > 증빙 서류함에서 「갱신 등록」을 통해 제출하실 수 있습니다.

■ 갱신이 필요한 경우
· 거래·견적 심사 지연 방지
· 세무 증빙 발행 정보 최신화

문의: Alpexmedi 장비 상담팀`,
  },
  {
    id: "news-1",
    type: "news",
    title: "2026 상반기 피부·미용 레이저 장비 트렌드, GentleMax·Pico 계열 수요 급증",
    date: "2026.02.03",
    source: "메디컬타임즈",
    image: "/images/products/gentlemax-pro-plus.png",
    content: `2026년 상반기 피부·미용 클리닉 시장에서 듀얼 파장 레이저와 피코 계열 장비 문의가 전년 대비 크게 늘었습니다.

Alpexmedi 플랫폼에서도 GentleMax Pro Plus, Alexandrite Laser 등 관련 제품 조회와 견적 요청이 증가하고 있으며, 비교 견적·데모 신청을 통해 도입 전 검증하는 원장님 비율이 높아지고 있습니다.

■ Alpexmedi에서 확인하기
· 제품리스트에서 카테고리·브랜드별 검색
· 관심 장비 스펙 비교 (마이페이지)
· 병원 맞춤 견적·데모 신청`,
  },
  {
    id: "news-2",
    type: "news",
    title: "Alpexmedi, 클리닉 맞춤형 리프팅 장비 패키지 견적 서비스 확대",
    date: "2026.01.05",
    source: "헬스케어뉴스",
    image: "/images/products/liftera2.png",
    content: `Alpexmedi가 HIFU·RF 리프팅 장비군에 대한 패키지 견적 서비스를 확대합니다.

단일 장비 견적뿐 아니라 복수 장비 번들, 리스·렌탈 조건 비교까지 마이페이지에서 확인할 수 있도록 지원합니다.

도입을 검토 중인 클리닉은 견적·데모 메뉴 또는 제품 상세의 「견적 요청」「데모 신청」을 이용해 주세요.`,
  },
  {
    id: "news-3",
    type: "news",
    title: "초음파·냉각 복합 관리 장비, 2025년 도입 순위 TOP 10 발표",
    date: "2025.11.05",
    source: "메디칼디바이스",
    image: "/images/products/coolsoniq.png",
    content: `업계 분석에 따르면 초음파·냉각 복합 관리 장비가 2025년 클리닉 도입 순위 상위권을 차지했습니다.

체형·피부 복합 프로그램 수요와 맞물려 CoolSoniq 등 복합형 장비에 대한 Alpexmedi 견적 문의도 꾸준히 증가하고 있습니다.`,
  },
  {
    id: "news-4",
    type: "news",
    title: "AI 기반 장비 스펙 비교 기능 업데이트…견적 요청 30% 단축",
    date: "2025.08.21",
    source: "디지털헬스",
    image: "/images/products/cellvibe.png",
    content: `Alpexmedi는 관심 장비 최대 3개 스펙 비교 기능을 개선해 견적 요청까지 소요 시간을 평균 30% 단축했다고 밝혔습니다.

마이페이지 > 관심·최근 메뉴에서 찜한 장비를 비교한 뒤 바로 견적 요청으로 이어갈 수 있습니다.`,
  },
  {
    id: "faq-1",
    type: "faq",
    title: "견적은 얼마나 걸리나요?",
    date: "2026.06.01",
    content:
      "요청 접수 후 영업일 기준 1~3일 내 마이페이지에 견적서가 등록되며, 알림톡으로 안내됩니다. 긴급 문의는 고객센터 전화 상담을 이용해 주세요.",
  },
  {
    id: "faq-2",
    type: "faq",
    title: "데모 장비는 어떻게 신청하나요?",
    date: "2026.06.01",
    content:
      "상단 메뉴 「견적·데모」 또는 제품 상세 페이지에서 데모 신청이 가능합니다. 일정 조율 후 담당 엔지니어가 병원 방문·설치를 지원하며, 진행 현황은 마이페이지 > 데모 신청에서 확인합니다.",
  },
  {
    id: "faq-3",
    type: "faq",
    title: "A/S는 어디서 접수하나요?",
    date: "2026.06.01",
    content:
      "로그인 후 마이페이지 > 보유 장비에서 해당 장비를 선택해 A/S 접수(증상·사진 첨부)를 진행할 수 있습니다. 접수 후 방문 예정일·조치 결과를 동일 메뉴에서 확인합니다.",
  },
];

export function getBoardPost(id: string): BoardPost | undefined {
  return boardPosts.find((post) => post.id === id);
}

export function boardPostUrl(id: string): string {
  return `/board/${encodeURIComponent(id)}`;
}

export function boardListUrl(tab: BoardPostType = "notice"): string {
  return `/board?tab=${tab}`;
}

export const siteNotices = boardPosts
  .filter((post) => post.type === "notice")
  .map((post) => ({
    id: post.id,
    title: post.title,
    date: post.date,
    href: boardPostUrl(post.id),
  }));

export const news = boardPosts
  .filter((post) => post.type === "news")
  .map((post) => ({
    id: post.id,
    title: post.title,
    source: post.source ?? "",
    date: post.date,
    image: post.image ?? "",
    href: boardPostUrl(post.id),
  }));

export const boardFaqItems = boardPosts
  .filter((post) => post.type === "faq")
  .map((post) => ({
    id: post.id,
    question: post.title,
    answer: post.content,
    href: boardPostUrl(post.id),
  }));

export function getBoardTabLabel(type: BoardPostType): string {
  if (type === "notice") return "공지사항";
  if (type === "news") return "뉴스";
  return "FAQ";
}
