import { productCatalog } from "./productCatalog";
import { buildProductListUrl } from "@/lib/productListUrl";

export const IMG = "https://img.chutcha.kr";
export const IMGSC = "https://imgsc.chutcha.kr";

export type GnbItem = {
  id: string;
  label: string;
  href: string;
};

export const keywords = [
  { label: "레이저", href: "#" },
  { label: "INDIBA", href: "#" },
  { label: "Ulthera", href: "#" },
  { label: "피코슈어", href: "#" },
  { label: "써마지", href: "#" },
  { label: "쿨스컬프팅", href: "#" },
  { label: "HIFU", href: "#" },
];

export const heroBanner = {
  headline: "비교하고, 데모하고, 확신으로 도입하세요.",
  subline: "부담 없는 데모 신청과 맞춤형 견적",
  subline2: "피부과 의료기기 플랫폼의 새로운 기준",
  englishLine:
    "Find the perfect fit for your clinic. Risk-free device adoption starts with Alpexmedi.",
  brandTag: "Alpexmedi",
  image: "/images/hero-bg-gold.png",
};

export const heroSearchSteps = [
  { label: "카테고리 선택", disabled: false },
  { label: "장비 유형 선택", disabled: true },
  { label: "브랜드 선택", disabled: true },
];

export const heroCategoryItems = [
  { label: "원자 램프", href: "#" },
  { label: "의료", href: "#" },
  { label: "리프팅, 케어 장비", href: "#" },
  { label: "줄기세포", href: "#" },
  { label: "초음파 진단기", href: "#" },
];

/** 상단 GNB — 사이트 메뉴 (카테고리는 제품리스트·검색에서 선택) */
export const gnbItems: GnbItem[] = [
  { id: "products", label: "제품리스트", href: "/products" },
  { id: "board", label: "게시판", href: "/board" },
  { id: "guide", label: "견적·데모", href: "/guide" },
  { id: "resources", label: "자료실", href: "/resources" },
  { id: "support", label: "고객센터", href: "/support" },
];

/** 제품 카테고리 빠른 이동 (제품리스트 필터·푸터 등) */
export const productCategoryNav: GnbItem[] = productCatalog.categories.map((category) => ({
  id: category.categoryId,
  label: category.categoryName,
  href: buildProductListUrl({ category: category.categoryId }),
}));

/** @deprecated categoryMenuItems → productCategoryNav */
export const categoryMenuItems = productCategoryNav;

/** @deprecated medicalProducts 사용 */
export const themes = [] as const;

/** @deprecated medicalProducts 사용 */
export const cars = [] as const;

export type MedicalProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  /** @deprecated getMedicalProductHref() 사용 */
  href: string;
  /** 카탈로그 productId (있으면 상세 페이지로 연결) */
  catalogProductId?: string;
};

export const medicalProducts: MedicalProduct[] = [
  {
    id: "plazion",
    name: "PLAZION",
    description: "4th Generation Portable Plasma Innovated Across Generations",
    image: "/images/products/plazion.png",
    href: "/products/P102-010",
    catalogProductId: "P102-010",
  },
  {
    id: "coolsoniq",
    name: "CoolSoniq",
    description: "Perfect Harmony of Ultrasound Energy and Cooling Technology",
    image: "/images/products/coolsoniq.png",
    href: "/products/P201-001",
    catalogProductId: "P201-001",
  },
  {
    id: "coolfase",
    name: "COOLFASE",
    description: "Monopolar RF with Patented Cooling System",
    image: "/images/products/coolfase.png",
    href: "/products/P202-005",
    catalogProductId: "P202-005",
  },
  {
    id: "liftera2",
    name: "LIFTERA 2",
    description: "Next-Generation Lifting Solution, More Precise and Powerful",
    image: "/images/products/liftera2.png",
    href: "/products/P201-011",
    catalogProductId: "P201-011",
  },
  {
    id: "ultline",
    name: "ULTLINE",
    description: "Ideal Body Line Completed with Ultrasonic Line Therapy",
    image: "/images/products/ultline.png",
    href: "/products/P201-009",
    catalogProductId: "P201-009",
  },
  {
    id: "gentlemax-pro-plus",
    name: "GentleMax Pro Plus",
    description: "Global Dual-Wavelength Laser System",
    image: "/images/products/gentlemax-pro-plus.png",
    href: "/products/P103-002",
    catalogProductId: "P103-002",
  },
  {
    id: "cellvibe",
    name: "CELLVIBE",
    description: "Elasticity and Lifting Simultaneously with RF and EMS",
    image: "/images/products/cellvibe.png",
    href: "/products/P203-007",
    catalogProductId: "P203-007",
  },
  {
    id: "winnage",
    name: "WINNAGE",
    description: "Differentiated Anti-Aging Total Solution",
    image: "/images/products/winnage.png",
    href: "/products/P203-006",
    catalogProductId: "P203-006",
  },
];

export const monthlyPickProducts: MedicalProduct[] = [
  {
    id: "coolfase",
    name: "COOLFASE",
    description: "Monopolar RF with Patented Cooling System",
    image: "/images/products/coolfase.png",
    href: "/products/P202-005",
    catalogProductId: "P202-005",
  },
  {
    id: "liftera2",
    name: "LIFTERA 2",
    description: "Next-Generation Lifting Solution, More Precise and Powerful",
    image: "/images/products/liftera2.png",
    href: "/products/P201-011",
    catalogProductId: "P201-011",
  },
  {
    id: "gentlemax-pro-plus",
    name: "GentleMax Pro Plus",
    description: "Global Dual-Wavelength Laser System",
    image: "/images/products/gentlemax-pro-plus.png",
    href: "/products/P103-002",
    catalogProductId: "P103-002",
  },
  {
    id: "plazion",
    name: "PLAZION",
    description: "4th Generation Portable Plasma Innovated Across Generations",
    image: "/images/products/plazion.png",
    href: "/products/P102-010",
    catalogProductId: "P102-010",
  },
];

export type SalesGuideTagTone = "blue" | "purple" | "orange" | "green";

export type SalesGuideCard = {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  inquiryHref: string;
  tags: { text: string; tone: SalesGuideTagTone }[];
};

export const salesGuideCards: SalesGuideCard[] = [
  {
    id: "laser-lease",
    title: "초기 부담 없이\n레이저 장비 도입",
    description:
      "Alpexmedi는 병원 상황에 맞춰\n렌탈·리스·구매까지 진행할 수 있는 솔루션을 제공합니다.",
    backgroundImage: "/images/sales-guide/card-bg-peach.png",
    inquiryHref: "/guide",
    tags: [
      { text: "빠른납품·맞춤구성", tone: "blue" as SalesGuideTagTone },
      { text: "렌탈·리스 가능", tone: "blue" as SalesGuideTagTone },
    ],
  },
  {
    id: "compare-quote",
    title: "비교견적으로\n최대 20% 절감",
    description:
      "동일 스펙 장비 견적을 한눈에 비교해 드립니다.\n도입 예산을 최대 20%까지 절감해 보세요.",
    backgroundImage: "/images/sales-guide/card-bg-blue.png",
    inquiryHref: "/quote/request",
    tags: [
      { text: "전 모델 비교", tone: "purple" as SalesGuideTagTone },
      { text: "특별가 적용", tone: "purple" as SalesGuideTagTone },
    ],
  },
  {
    id: "nationwide-delivery",
    title: "전국 클리닉\n납품·설치 지원",
    description:
      "전국 어디든 납품·설치 일정을 맞춰 드립니다.\n개원·증설 규모에 맞는 구성을 제안합니다.",
    backgroundImage: "/images/sales-guide/card-bg-pink.png",
    inquiryHref: "/guide",
    tags: [
      { text: "언제 어디서나", tone: "orange" as SalesGuideTagTone },
      { text: "필요한 만큼만 간단하게", tone: "orange" as SalesGuideTagTone },
    ],
  },
  {
    id: "maintenance-care",
    title: "A/S·소모품까지\n한 번에 관리",
    description:
      "정기 점검부터 소모품까지 한 번에 관리합니다.\n다운타임을 줄이는 유지보수 플랜을 받아보세요.",
    backgroundImage: "/images/sales-guide/card-bg-mint.png",
    inquiryHref: "/support",
    tags: [
      { text: "맞춤 유지보수", tone: "green" as SalesGuideTagTone },
      { text: "Alpexmedi Care", tone: "green" as SalesGuideTagTone },
    ],
  },
  {
    id: "demo-quote",
    title: "데모·견적\n무료 상담",
    description:
      "당일 견적 회신과 현장 데모를 지원합니다.\n도입 전 병원 환경에서 직접 테스트해 보세요.",
    backgroundImage: "/images/sales-guide/card-bg-blue.png",
    inquiryHref: "/guide",
    tags: [
      { text: "당일 견적 응답", tone: "blue" as SalesGuideTagTone },
      { text: "현장 데모 가능", tone: "blue" as SalesGuideTagTone },
    ],
  },
];

export const reviews = [
  {
    product: "GentleMax Pro Plus",
    text: "피부과 개원 준비 중 여러 레이저 견적을 받았는데, Alpexmedi에서 스펙 비교표와 설치 일정까지 한 번에 정리해 주셔서 도입이 훨씬 수월했습니다. A/S 응대도 빠르고 만족스럽습니다.",
    user: "김○○",
    date: "2026.06.01",
    image: "/images/products/gentlemax-pro-plus.png",
  },
  {
    product: "LIFTERA 2",
    text: "기존 장비 노후화로 교체가 필요했는데, 데모 시연 후 바로 계약했습니다. 담당자분이 임상 환경에 맞게 세팅까지 도와주셔서 직원 교육도 금방 끝났어요. 환자 만족도도 올라갔습니다.",
    user: "박○○",
    date: "2026.05.28",
    image: "/images/products/liftera2.png",
  },
  {
    product: "CELLVIBE",
    text: "리프팅·관리 프로그램을 동시에 운영하려고 비교 견적 요청했습니다. 예산에 맞는 구성안을 제안해 주셔서 무리 없이 도입했고, 소모품 주문도 사이트에서 바로 가능해 편합니다.",
    user: "이○○",
    date: "2026.05.20",
    image: "/images/products/cellvibe.png",
  },
  {
    product: "COOLFASE",
    text: "첫 의료장비 구매라 스펙 이해가 어려웠는데, 카탈로그와 데모 영상을 보내주시고 장단점을 솔직하게 설명해 주셨습니다. 설치 후에도 기술 지원이 꾸준해서 안심하고 사용 중입니다.",
    user: "최○○",
    date: "2026.05.12",
    image: "/images/products/coolfase.png",
  },
];

export { boardFaqItems, news, siteNotices } from "./boardData";

export const footerBanner = {
  title: "의료장비 구매·견적, Alpexmedi",
  subtitle: "병원·클리닉 맞춤 의료장비 플랫폼",
  logo: "/images/alpexmedi-logo.png",
  primaryCta: { label: "견적 요청", href: "/quote/request" },
  secondaryCta: { label: "제품리스트", href: "/products" },
};

export const companyInfo = {
  name: "alpexmedi",
  address: "서울 강서구 마곡중앙6로 11 보타닉파크타워 3차 315-50",
  phone: "070-8841-4143",
  email: "almed3119@naver.com",
  copyright: "© Alpexmedi. All rights reserved",
  disclaimer:
    "Alpexmedi는 의료장비 정보 및 견적 중개 서비스를 제공하며, 제품 거래에 관한 의무와 책임은 각 공급사 및 판매자에게 있습니다.",
};

export const weeklySideBanner = {
  href: "/products/P103-002",
  hotLabel: "HOT10",
  ctaLabel: "지금 확인하기",
  image: "/images/products/gentlemax-pro-plus.png",
};

export const quoteSideBanner = {
  href: "#",
  lines: ["비교견적 받고", "최적가로 장비구매"],
  image: "/images/products/cellvibe.png",
};

export const promoSideBanner = {
  href: "#",
  brand: "Alpexmedi × MEDICAL",
  lead: "견적 비교부터",
  titles: ["신속하고 정확한", "의료장비 구매"],
  tag: "BEST",
  image: "/images/products/liftera2.png",
};
