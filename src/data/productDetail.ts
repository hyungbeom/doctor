import type { FlatProduct } from "./productCatalog";
import { shortLabel } from "./productCatalog";

export type DetailHighlight = {
  id: string;
  label: string;
  value: string;
  sub?: string;
  hrefLabel?: string;
};

export type DetailSpec = {
  label: string;
  value: string;
};

export type DetailFeature = {
  id: string;
  label: string;
  icon: string;
};

const CATEGORY_FEATURES: Record<string, DetailFeature[]> = {
  C100: [
    { id: "wavelength", label: "듀얼 파장", icon: "◈" },
    { id: "cooling", label: "냉각 시스템", icon: "❄" },
    { id: "ui", label: "터치 UI", icon: "▣" },
    { id: "mobile", label: "이동형 설계", icon: "◎" },
    { id: "handpiece", label: "핸드피스", icon: "✦" },
    { id: "cert", label: "KFDA 인증", icon: "✓" },
  ],
  C200: [
    { id: "hifu", label: "HIFU/RF", icon: "↑" },
    { id: "depth", label: "심부 리프팅", icon: "◉" },
    { id: "cooling", label: "냉각", icon: "❄" },
    { id: "preset", label: "프리셋", icon: "▣" },
    { id: "handpiece", label: "핸드피스", icon: "✦" },
    { id: "cert", label: "안전 인증", icon: "✓" },
  ],
  C300: [
    { id: "hydration", label: "수분 공급", icon: "≋" },
    { id: "ultrasound", label: "초음파", icon: "〰" },
    { id: "ion", label: "이온토", icon: "±" },
    { id: "cryo", label: "크라이오", icon: "❄" },
    { id: "preset", label: "프로그램", icon: "▣" },
    { id: "cert", label: "KC 인증", icon: "✓" },
  ],
  C400: [
    { id: "inject", label: "오토 인젝터", icon: "↓" },
    { id: "needle", label: "무바늘 옵션", icon: "○" },
    { id: "prp", label: "PRP 분리", icon: "◌" },
    { id: "preset", label: "용량 프리셋", icon: "▣" },
    { id: "sterile", label: "멸균 설계", icon: "✦" },
    { id: "cert", label: "의료기기", icon: "✓" },
  ],
  C500: [
    { id: "scan", label: "고해상도", icon: "▣" },
    { id: "analysis", label: "AI 분석", icon: "◎" },
    { id: "portable", label: "휴대형", icon: "↗" },
    { id: "dicom", label: "DICOM", icon: "◈" },
    { id: "probe", label: "프로브", icon: "✦" },
    { id: "cert", label: "진단 인증", icon: "✓" },
  ],
  C600: [
    { id: "cryo", label: "냉각지방", icon: "❄" },
    { id: "ems", label: "EMS", icon: "⚡" },
    { id: "shock", label: "체외충격파", icon: "〰" },
    { id: "rf", label: "RF 지방", icon: "◉" },
    { id: "preset", label: "바디 프리셋", icon: "▣" },
    { id: "cert", label: "안전 인증", icon: "✓" },
  ],
};

const DEFAULT_FEATURES: DetailFeature[] = [
  { id: "cert", label: "인증 완료", icon: "✓" },
  { id: "install", label: "설치 지원", icon: "◎" },
  { id: "as", label: "A/S 연계", icon: "✦" },
  { id: "training", label: "교육 제공", icon: "▣" },
  { id: "quote", label: "비교 견적", icon: "≋" },
  { id: "demo", label: "데모 상담", icon: "◈" },
];

export function getProductHighlights(product: FlatProduct): DetailHighlight[] {
  const popularity = 4 + (product.productId.charCodeAt(product.productId.length - 1) % 2);
  const savings = 28 + (product.productId.length % 15);

  return [
    {
      id: "category",
      label: "카테고리",
      value: shortLabel(product.categoryName),
      sub: "전문 장비군",
      hrefLabel: "카테고리 >",
    },
    {
      id: "quote",
      label: "견적 비교",
      value: `${savings}%`,
      sub: "동급 장비 대비 절감 가능",
      hrefLabel: "비교견적 >",
    },
    {
      id: "as",
      label: "A/S 지원",
      value: "전국",
      sub: "설치·점검 연계",
      hrefLabel: "A/S 안내 >",
    },
    {
      id: "install",
      label: "납품·설치",
      value: `${popularity}주`,
      sub: "평균 납기 (견적 후 확정)",
      hrefLabel: "납기 안내 >",
    },
  ];
}

export function getProductSpecs(product: FlatProduct): DetailSpec[] {
  return [
    { label: "카테고리", value: product.categoryName },
    { label: "장비 유형", value: product.typeName },
    { label: "브랜드", value: product.brandName },
    { label: "제품명", value: product.productName },
    { label: "제품 코드", value: product.productId },
    {
      label: "검색 키워드",
      value: product.searchKeywords.length ? product.searchKeywords.join(", ") : "-",
    },
    { label: "납품 방식", value: "전국 클리닉 납품·설치 지원" },
    { label: "인증·허가", value: "제조사·모델별 의료기기 인증 확인 필요" },
    { label: "A/S", value: "Alpexmedi Care 연계 (견적 후 확정)" },
    { label: "담당", value: "Alpexmedi 장비 상담팀" },
  ];
}

export function getProductFeatures(product: FlatProduct): DetailFeature[] {
  return CATEGORY_FEATURES[product.categoryId] ?? DEFAULT_FEATURES;
}

export function getEstimatedQuoteRange(product: FlatProduct): { min: number; max: number } {
  const base = 2800 + (product.productId.charCodeAt(2) % 12) * 150;
  const spread = 600 + (product.productId.length % 5) * 80;
  return { min: base, max: base + spread };
}

export function formatManwon(value: number): string {
  return `${value.toLocaleString("ko-KR")}만원`;
}
