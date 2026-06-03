export type EventPopupData = {
  id: string;
  storageKey: string;
  logo: string;
  brand: string;
  headline: string;
  badge: string;
  date: string;
  note: string;
  prices: { label: string; price: string }[];
  vatNote: string;
  description: string[];
  ctaText: string;
  ctaHref: string;
  backgroundImage: string;
};

export const samplePopups: EventPopupData[] = [
  {
    id: "ev-trend-2026",
    storageKey: "popup-hide-ev-trend-2026",
    logo: "EV TREND KOREA 2026",
    brand: "EV TREND KOREA 2026",
    headline: "EV 트렌드코리아 2026\n참가업체 일반신청 OPEN!",
    badge: "일반신청 마감",
    date: "2026년 6월 30일",
    note: "* 부스가 예정된 기간보다 조기 마감될 수 있습니다.",
    prices: [
      { label: "독립 부스", price: "2,800,000" },
      { label: "조립 부스", price: "3,300,000" },
      { label: "프리미엄 부스", price: "3,700,000" },
    ],
    vatNote: "* VAT 별도",
    description: [
      "EV 트렌드코리아 2026 참가업체 일반신청이 시작되었습니다.",
      "전기차 산업의 미래를 함께할 기업 여러분의 많은 참여 바랍니다.",
    ],
    ctaText: "참가신청 바로가기",
    ctaHref: "#",
    backgroundImage: "/images/popup-layout-reference.png",
  },
  {
    id: "medical-expo-2026",
    storageKey: "popup-hide-medical-expo-2026",
    logo: "MEDICAL EXPO 2026",
    brand: "MEDICAL EXPO 2026",
    headline: "의료기기 전시회 2026\n사전등록 OPEN!",
    badge: "사전등록 마감",
    date: "2026년 7월 15일",
    note: "* 좌석 및 부스는 선착순으로 조기 마감될 수 있습니다.",
    prices: [
      { label: "스탠다드 부스", price: "1,800,000" },
      { label: "프리미엄 부스", price: "2,500,000" },
      { label: "데모존 부스", price: "3,200,000" },
    ],
    vatNote: "* VAT 별도",
    description: [
      "2026 의료기기 전시회 사전등록이 시작되었습니다.",
      "최신 의료장비와 솔루션을 만나보실 기업의 참여를 기다립니다.",
    ],
    ctaText: "사전등록 바로가기",
    ctaHref: "#",
    backgroundImage: "/images/products/coolfase.png",
  },
];

const DAY_MS = 24 * 60 * 60 * 1000;

export function isPopupHidden(storageKey: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    return false;
  }
  const expires = Number(raw);
  return !Number.isNaN(expires) && Date.now() < expires;
}

export function hidePopupForOneDay(storageKey: string): void {
  localStorage.setItem(storageKey, String(Date.now() + DAY_MS));
}
