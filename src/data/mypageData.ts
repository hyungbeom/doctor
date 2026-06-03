export type PipelineStep = {
  id: string;
  label: string;
  count: number;
};

export type MemberProfile = {
  hospitalName: string;
  memberName: string;
  role: string;
  memberId: string;
};

export type AccountManager = {
  name: string;
  title: string;
  phone: string;
  email: string;
};

export type QuoteRequest = {
  id: string;
  productName: string;
  productId?: string;
  requestedAt: string;
  status: "상담중" | "견적완료" | "계약완료";
  hasQuotePdf: boolean;
};

export type Contract = {
  id: string;
  productName: string;
  signedAt: string;
  status: "서명완료" | "검토중";
};

export type DemoRequest = {
  id: string;
  productName: string;
  productId?: string;
  status: "조율 중" | "데모 진행 중" | "데모 종료";
  scheduleLabel?: string;
  engineerName: string;
  engineerPhone: string;
};

export type OwnedEquipment = {
  id: string;
  productName: string;
  serialNumber: string;
  installedAt: string;
  warrantyEnd: string;
  warrantyDaysLeft: number;
};

export type AsTicket = {
  id: string;
  productName: string;
  symptom: string;
  status: "접수" | "방문예정" | "완료";
  visitDate?: string;
  updatedAt: string;
};

export type TaxDocument = {
  id: string;
  type: string;
  issuedAt: string;
  amount: string;
};

export type CredentialDoc = {
  id: string;
  name: string;
  status: "유효" | "만료임박" | "갱신필요";
  expiresAt: string;
};

export type WishlistItem = {
  id: string;
  productId: string;
  productName: string;
  brandName: string;
};

export type RecentProduct = {
  id: string;
  productId: string;
  productName: string;
  viewedAt: string;
};

export type Inquiry = {
  id: string;
  subject: string;
  target: string;
  status: "답변대기" | "답변완료";
  createdAt: string;
};

export type HospitalAddress = {
  label: string;
  address: string;
  isDefault: boolean;
};

export const mypageMemberProfile: MemberProfile = {
  hospitalName: "알펙스피부과",
  memberName: "홍길동",
  role: "원장",
  memberId: "",
};

export const mypageAccountManager: AccountManager = {
  name: "김서연",
  title: "팀장",
  phone: "010-4821-9073",
  email: "sales@alpexmedi.co.kr",
};

export const quotePipeline: PipelineStep[] = [
  { id: "requested", label: "견적 요청", count: 2 },
  { id: "received", label: "견적서 도착", count: 1 },
  { id: "contracted", label: "계약 완료", count: 1 },
];

export const demoPipeline: PipelineStep[] = [
  { id: "coordinating", label: "조율 중", count: 1 },
  { id: "ongoing", label: "데모 진행 중", count: 1 },
  { id: "ended", label: "데모 종료", count: 2 },
];

export const quoteRequests: QuoteRequest[] = [
  {
    id: "Q-2026-0412",
    productName: "GentleMax Pro Plus",
    productId: "P103-002",
    requestedAt: "2026-05-28",
    status: "견적완료",
    hasQuotePdf: true,
  },
  {
    id: "Q-2026-0388",
    productName: "LIFTERA 2",
    productId: "P201-011",
    requestedAt: "2026-05-15",
    status: "상담중",
    hasQuotePdf: false,
  },
  {
    id: "Q-2026-0310",
    productName: "CO2 Laser System",
    productId: "P101-004",
    requestedAt: "2026-04-02",
    status: "계약완료",
    hasQuotePdf: true,
  },
];

export const contracts: Contract[] = [
  {
    id: "C-2026-0310",
    productName: "CO2 Laser System",
    signedAt: "2026-04-18",
    status: "서명완료",
  },
];

export const demoRequests: DemoRequest[] = [
  {
    id: "D-2026-0520",
    productName: "LIFTERA 2",
    productId: "P201-011",
    status: "데모 진행 중",
    scheduleLabel: "2026-06-10 ~ 06-13 (3박 4일)",
    engineerName: "박준호",
    engineerPhone: "010-2211-3344",
  },
  {
    id: "D-2026-0488",
    productName: "GentleMax Pro Plus",
    productId: "P103-002",
    status: "조율 중",
    scheduleLabel: "희망: 2026-06-20 ~ 06-22",
    engineerName: "이민재",
    engineerPhone: "010-9988-1122",
  },
  {
    id: "D-2026-0401",
    productName: "HydraFacial MD",
    productId: "P301-002",
    status: "데모 종료",
    scheduleLabel: "2026-05-02 ~ 05-05",
    engineerName: "최유진",
    engineerPhone: "010-5544-7788",
  },
  {
    id: "D-2026-0355",
    productName: "Ultherapy Prime",
    status: "데모 종료",
    scheduleLabel: "2026-04-10 ~ 04-12",
    engineerName: "김서연",
    engineerPhone: "010-4821-9073",
  },
];

export const ownedEquipment: OwnedEquipment[] = [
  {
    id: "EQ-001",
    productName: "CO2 Laser System",
    serialNumber: "AM-CO2-2024-8831",
    installedAt: "2024-11-05",
    warrantyEnd: "2026-11-04",
    warrantyDaysLeft: 156,
  },
  {
    id: "EQ-002",
    productName: "Cryo RF Body",
    serialNumber: "AM-CRF-2025-1204",
    installedAt: "2025-03-18",
    warrantyEnd: "2027-03-17",
    warrantyDaysLeft: 289,
  },
];

export const asTickets: AsTicket[] = [
  {
    id: "AS-2026-0091",
    productName: "CO2 Laser System",
    symptom: "쿨링 팁 교체 후 출력 불안정",
    status: "방문예정",
    visitDate: "2026-06-05",
    updatedAt: "2026-06-02",
  },
];

export const taxDocuments: TaxDocument[] = [
  {
    id: "T-2026-0418",
    type: "세금계산서",
    issuedAt: "2026-04-18",
    amount: "38,400,000원",
  },
  {
    id: "T-2026-0310",
    type: "거래명세서",
    issuedAt: "2026-04-02",
    amount: "—",
  },
];

export const credentialDocs: CredentialDoc[] = [
  { id: "doc-1", name: "사업자등록증", status: "유효", expiresAt: "—" },
  { id: "doc-2", name: "의료기관 개설신고서", status: "유효", expiresAt: "2028-12-31" },
  { id: "doc-3", name: "의사면허증", status: "만료임박", expiresAt: "2026-09-30" },
];

export const wishlistItems: WishlistItem[] = [
  {
    id: "w1",
    productId: "P103-002",
    productName: "GentleMax Pro Plus",
    brandName: "Candela",
  },
  {
    id: "w2",
    productId: "P201-011",
    productName: "LIFTERA 2",
    brandName: "Doublo",
  },
  {
    id: "w3",
    productId: "P101-005",
    productName: "Alexandrite Laser",
    brandName: "Candela",
  },
];

export const recentProducts: RecentProduct[] = [
  { id: "r1", productId: "P201-011", productName: "LIFTERA 2", viewedAt: "2026-06-02 14:22" },
  { id: "r2", productId: "P103-002", productName: "GentleMax Pro Plus", viewedAt: "2026-06-02 11:05" },
  { id: "r3", productId: "P301-002", productName: "HydraFacial MD", viewedAt: "2026-06-01 09:41" },
];

export const inquiries: Inquiry[] = [
  {
    id: "I-2026-0088",
    subject: "GentleMax Pro Plus 리스 조건 문의",
    target: "Alpexmedi 영업팀",
    status: "답변완료",
    createdAt: "2026-05-29",
  },
  {
    id: "I-2026-0095",
    subject: "LIFTERA 2 데모 일정 변경 요청",
    target: "입점 브랜드 · Doublo",
    status: "답변대기",
    createdAt: "2026-06-01",
  },
];

export const hospitalAddresses: HospitalAddress[] = [
  {
    label: "본원 설치지",
    address: "서울특별시 강남구 테헤란로 123, 알펙스피부과 3층",
    isDefault: true,
  },
  {
    label: "분원 (예정)",
    address: "경기도 성남시 분당구 판교역로 240",
    isDefault: false,
  },
];

export const mypageNavItems = [
  { id: "quotes", label: "견적·계약" },
  { id: "demo", label: "데모 신청" },
  { id: "equipment", label: "보유 장비" },
  { id: "documents", label: "증빙 서류" },
  { id: "activity", label: "관심·최근" },
  { id: "account", label: "문의·설정" },
] as const;

export function getProfileDisplayName(profile: MemberProfile): string {
  return `${profile.hospitalName} ${profile.memberName} ${profile.role}님`;
}

export function getWarrantyProgress(daysLeft: number, totalDays = 730): number {
  return Math.min(100, Math.max(0, Math.round((daysLeft / totalDays) * 100)));
}

export function getQuoteById(id: string): QuoteRequest | undefined {
  return quoteRequests.find((item) => item.id === id);
}

export function getContractById(id: string): Contract | undefined {
  return contracts.find((item) => item.id === id);
}

export function getDemoById(id: string): DemoRequest | undefined {
  return demoRequests.find((item) => item.id === id);
}

export function getEquipmentById(id: string): OwnedEquipment | undefined {
  return ownedEquipment.find((item) => item.id === id);
}

export function getInquiryById(id: string): Inquiry | undefined {
  return inquiries.find((item) => item.id === id);
}

export function getCredentialDocById(id: string): CredentialDoc | undefined {
  return credentialDocs.find((item) => item.id === id);
}

export function getTaxDocumentById(id: string): TaxDocument | undefined {
  return taxDocuments.find((item) => item.id === id);
}
