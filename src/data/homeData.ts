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
];

export const heroBanner = {
  headline: "의료장비 몰라도 잘샀다",
  subline: "누구나 잘 사는 의료장비.",
  brandTag: "Alpexmedi",
  image: "/images/hero-banner.png",
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
    href: "#",
  },
  {
    id: "coolsoniq",
    name: "CoolSoniq",
    description: "Perfect Harmony of Ultrasound Energy and Cooling Technology",
    image: "/images/products/coolsoniq.png",
    href: "#",
  },
  {
    id: "coolfase",
    name: "COOLFASE",
    description: "Monopolar RF with Patented Cooling System",
    image: "/images/products/coolfase.png",
    href: "#",
  },
  {
    id: "liftera2",
    name: "LIFTERA 2",
    description: "Next-Generation Lifting Solution, More Precise and Powerful",
    image: "/images/products/liftera2.png",
    href: "#",
    catalogProductId: "P201-011",
  },
  {
    id: "ultline",
    name: "ULTLINE",
    description: "Ideal Body Line Completed with Ultrasonic Line Therapy",
    image: "/images/products/ultline.png",
    href: "#",
  },
  {
    id: "gentlemax-pro-plus",
    name: "GentleMax Pro Plus",
    description: "Global Dual-Wavelength Laser System",
    image: "/images/products/gentlemax-pro-plus.png",
    href: "#",
    catalogProductId: "P103-002",
  },
  {
    id: "cellvibe",
    name: "CELLVIBE",
    description: "Elasticity and Lifting Simultaneously with RF and EMS",
    image: "/images/products/cellvibe.png",
    href: "#",
  },
  {
    id: "winnage",
    name: "WINNAGE",
    description: "Differentiated Anti-Aging Total Solution",
    image: "/images/products/winnage.png",
    href: "#",
  },
];

export const monthlyPickProducts: MedicalProduct[] = [
  {
    id: "coolfase",
    name: "COOLFASE",
    description: "Monopolar RF with Patented Cooling System",
    image: "/images/products/coolfase.png",
    href: "#",
  },
  {
    id: "liftera2",
    name: "LIFTERA 2",
    description: "Next-Generation Lifting Solution, More Precise and Powerful",
    image: "/images/products/liftera2.png",
    href: "#",
    catalogProductId: "P201-011",
  },
  {
    id: "gentlemax-pro-plus",
    name: "GentleMax Pro Plus",
    description: "Global Dual-Wavelength Laser System",
    image: "/images/products/gentlemax-pro-plus.png",
    href: "#",
    catalogProductId: "P103-002",
  },
  {
    id: "plazion",
    name: "PLAZION",
    description: "4th Generation Portable Plasma Innovated Across Generations",
    image: "/images/products/plazion.png",
    href: "#",
  },
];

export type SalesGuideTagTone = "blue" | "purple" | "orange" | "green";

export const salesGuideCards = [
  {
    id: "laser-lease",
    title: "초기 부담 없이\n레이저 장비 도입",
    tags: [
      { text: "빠른납품·맞춤구성", tone: "blue" as SalesGuideTagTone },
      { text: "렌탈·리스 가능", tone: "blue" as SalesGuideTagTone },
    ],
    image: "/images/products/gentlemax-pro-plus.png",
    href: "#",
  },
  {
    id: "compare-quote",
    title: "비교견적으로\n최대 20% 절감",
    tags: [
      { text: "전 모델 비교", tone: "purple" as SalesGuideTagTone },
      { text: "특별가 적용", tone: "purple" as SalesGuideTagTone },
    ],
    image: "/images/products/coolsoniq.png",
    href: "#",
  },
  {
    id: "nationwide-delivery",
    title: "전국 클리닉\n납품·설치 지원",
    tags: [
      { text: "언제 어디서나", tone: "orange" as SalesGuideTagTone },
      { text: "필요한 만큼만 간단하게", tone: "orange" as SalesGuideTagTone },
    ],
    image: "/images/products/plazion.png",
    href: "#",
  },
  {
    id: "maintenance-care",
    title: "A/S·소모품까지\n한 번에 관리",
    tags: [
      { text: "맞춤 유지보수", tone: "green" as SalesGuideTagTone },
      { text: "Alpexmedi Care", tone: "green" as SalesGuideTagTone },
    ],
    image: "/images/products/coolfase.png",
    href: "#",
  },
  {
    id: "demo-quote",
    title: "데모·견적\n무료 상담",
    tags: [
      { text: "당일 견적 응답", tone: "blue" as SalesGuideTagTone },
      { text: "현장 데모 가능", tone: "blue" as SalesGuideTagTone },
    ],
    image: "/images/products/liftera2.png",
    href: "#",
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
  visual: "/images/products/coolsoniq.png",
  primaryCta: { label: "견적 요청", href: "/quote/request" },
  secondaryCta: { label: "제품리스트", href: "/products" },
};

export const companyInfo = {
  name: "(주)수메디칼",
  ceo: "대표 : 수메디칼",
  address: "서울특별시 (상세 주소)",
  phone: "02-6952-9073",
  email: "design@su-medical.co.kr",
  businessNumber: "사업자 등록번호 확인 중",
  salesNumber: "통신판매업 신고번호 확인 중",
  copyright: "© Su Medical Corp. All rights reserved",
  disclaimer:
    "Alpexmedi는 의료장비 정보 및 견적 중개 서비스를 제공하며, 제품 거래에 관한 의무와 책임은 각 공급사 및 판매자에게 있습니다.",
};

export const weeklySideBanner = {
  href: "#",
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
