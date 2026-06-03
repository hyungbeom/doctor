import { getContractById, getDemoById, getQuoteById } from "./mypageData";
import {
  mypageContract,
  mypageDemo,
  mypageDemoApply,
  mypageDocuments,
  mypageEquipmentAs,
  mypageEquipmentSupplies,
  mypageHome,
  mypageInquiries,
  mypageInquiry,
  mypageInquiryNew,
  mypageQuote,
  mypageRecent,
  mypageSettings,
  mypageWishlistCompare,
  quoteRequest,
} from "@/lib/mypageRoutes";

export type FlowCrumb = {
  label: string;
  href?: string;
};

export type FlowLink = {
  label: string;
  href: string;
  hint?: string;
};

const hub = {
  quotes: { label: "견적·계약", href: `${mypageHome()}#quotes` },
  demo: { label: "데모 신청", href: `${mypageHome()}#demo` },
  equipment: { label: "보유 장비", href: `${mypageHome()}#equipment` },
  documents: { label: "증빙 서류", href: mypageDocuments() },
  activity: { label: "관심·최근", href: `${mypageHome()}#activity` },
  account: { label: "문의·설정", href: `${mypageHome()}#account` },
};

export function baseMypageCrumbs(): FlowCrumb[] {
  return [{ label: "마이페이지", href: mypageHome() }];
}

/** 견적 완료 건 → 계약서 ID (데모 연동용) */
export function getContractIdForQuote(quoteId: string): string | undefined {
  if (quoteId === "Q-2026-0310") return "C-2026-0310";
  return undefined;
}

export function getQuoteDetailFlow(quoteId: string): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  const quote = getQuoteById(quoteId);
  const contractId = getContractIdForQuote(quoteId);
  const related: FlowLink[] = [
    {
      label: "재협상·수정 문의",
      href: mypageInquiryNew({
        quoteId,
        productId: quote?.productId,
        subject: quote ? `${quote.productName} 재협상 요청` : undefined,
      }),
      hint: "영업 담당자에게 조건 변경 요청",
    },
    {
      label: "새 견적 요청",
      href: quoteRequest(quote?.productId),
      hint: "다른 수량·조건으로 다시 요청",
    },
    {
      label: "데모 신청",
      href: mypageDemoApply(quote?.productId),
      hint: "도입 전 병원 내 테스트",
    },
    { label: "문의 목록", href: mypageInquiries() },
    { label: "증빙 서류함", href: mypageDocuments() },
  ];

  if (contractId) {
    related.unshift({
      label: "온라인 계약서",
      href: mypageContract(contractId),
      hint: "계약 완료 건 조항 확인",
    });
  }

  return {
    breadcrumbs: [
      ...baseMypageCrumbs(),
      hub.quotes,
      { label: "견적서 상세" },
    ],
    related: related.filter((item, index, arr) => arr.findIndex((x) => x.href === item.href) === index),
  };
}

export function getContractDetailFlow(contractId: string): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  const contract = getContractById(contractId);
  return {
    breadcrumbs: [
      ...baseMypageCrumbs(),
      hub.quotes,
      { label: "계약서" },
    ],
    related: [
      {
        label: "관련 견적",
        href: mypageQuote("Q-2026-0310"),
        hint: contract?.productName,
      },
      { label: "증빙·세무 서류", href: mypageDocuments() },
      {
        label: "병원·배송지",
        href: mypageSettings(),
        hint: "설치지 확인",
      },
      {
        label: "계약 문의",
        href: mypageInquiryNew({ subject: `${contract?.productName ?? "장비"} 계약 문의` }),
      },
      hub.quotes,
    ],
  };
}

export function getDemoApplyFlow(productId?: string): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  return {
    breadcrumbs: [
      ...baseMypageCrumbs(),
      hub.demo,
      { label: "데모 신청" },
    ],
    related: [
      {
        label: "견적 요청",
        href: quoteRequest(productId),
        hint: "데모 후 구매 견적",
      },
      { label: "데모 현황", href: `${mypageHome()}#demo` },
      { label: "문의 작성", href: mypageInquiryNew({ productId, subject: "데모 일정 문의" }) },
      { label: "관심 장비 비교", href: mypageWishlistCompare() },
      { label: "제품리스트", href: "/products" },
    ],
  };
}

export function getDemoDetailFlow(demoId: string): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  const demo = getDemoById(demoId);
  const related: FlowLink[] = [
    { label: "데모 목록", href: `${mypageHome()}#demo` },
    {
      label: "담당자 문의",
      href: mypageInquiryNew({
        demoId,
        productId: demo?.productId,
        subject: demo ? `${demo.productName} 데모 문의` : undefined,
      }),
    },
    {
      label: "데모 다시 신청",
      href: mypageDemoApply(demo?.productId),
    },
  ];

  if (demo?.status === "데모 종료") {
    related.unshift({
      label: "이 장비 견적 요청",
      href: quoteRequest(demo.productId),
      hint: "데모 종료 → 계약 전환",
    });
  }

  return {
    breadcrumbs: [
      ...baseMypageCrumbs(),
      hub.demo,
      { label: "데모 상세" },
    ],
    related,
  };
}

export function getEquipmentAsFlow(equipmentId: string, productName?: string): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  return {
    breadcrumbs: [
      ...baseMypageCrumbs(),
      hub.equipment,
      { label: "A/S 접수" },
    ],
    related: [
      {
        label: "소모품 견적",
        href: mypageEquipmentSupplies(equipmentId),
        hint: productName,
      },
      { label: "보유 장비 목록", href: `${mypageHome()}#equipment` },
      {
        label: "A/S 문의",
        href: mypageInquiryNew({ subject: `${productName ?? "장비"} A/S 문의` }),
      },
      { label: "증빙·보증 서류", href: mypageDocuments() },
      { label: "고객센터", href: "/support" },
    ],
  };
}

export function getEquipmentSuppliesFlow(equipmentId: string, productName?: string): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  return {
    breadcrumbs: [
      ...baseMypageCrumbs(),
      hub.equipment,
      { label: "소모품 견적" },
    ],
    related: [
      {
        label: "A/S 접수",
        href: mypageEquipmentAs(equipmentId),
        hint: productName,
      },
      {
        label: "견적 요청",
        href: quoteRequest(),
        hint: "추가 장비 견적",
      },
      { label: "보유 장비", href: `${mypageHome()}#equipment` },
      hub.documents,
    ],
  };
}

export function getDocumentsFlow(): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  return {
    breadcrumbs: [...baseMypageCrumbs(), { label: "증빙 서류함" }],
    related: [
      hub.quotes,
      { label: "병원·증빙 설정", href: mypageSettings() },
      { label: "견적·계약", href: `${mypageHome()}#quotes` },
      { label: "자료실", href: "/resources", hint: "카탈로그·안내 PDF" },
      { label: "문의하기", href: mypageInquiryNew({ subject: "증빙 서류 문의" }) },
    ],
  };
}

export function getCredentialRenewFlow(docId: string, docName?: string): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  return {
    breadcrumbs: [
      ...baseMypageCrumbs(),
      { label: "증빙 서류함", href: mypageDocuments() },
      { label: "서류 갱신" },
    ],
    related: [
      { label: "서류함으로", href: mypageDocuments() },
      { label: "병원 정보 수정", href: mypageSettings() },
      {
        label: "갱신 문의",
        href: mypageInquiryNew({ subject: `${docName ?? "증빙"} 서류 갱신 문의` }),
      },
    ],
  };
}

export function getWishlistCompareFlow(): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  return {
    breadcrumbs: [
      ...baseMypageCrumbs(),
      hub.activity,
      { label: "스펙 비교" },
    ],
    related: [
      { label: "최근 본 상품", href: mypageRecent() },
      { label: "견적 요청", href: quoteRequest() },
      { label: "데모 신청", href: mypageDemoApply() },
      { label: "제품리스트", href: "/products" },
      hub.activity,
    ],
  };
}

export function getInquiriesListFlow(): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  return {
    breadcrumbs: [...baseMypageCrumbs(), { label: "문의 목록" }],
    related: [
      { label: "새 문의", href: mypageInquiryNew() },
      hub.quotes,
      hub.demo,
      { label: "고객센터", href: "/support" },
      hub.account,
    ],
  };
}

export function getInquiryDetailFlow(inquiryId: string): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  return {
    breadcrumbs: [
      ...baseMypageCrumbs(),
      { label: "문의 목록", href: mypageInquiries() },
      { label: "문의 상세" },
    ],
    related: [
      { label: "문의 목록", href: mypageInquiries() },
      { label: "새 문의", href: mypageInquiryNew() },
      { label: "견적·계약", href: `${mypageHome()}#quotes` },
      { label: "데모 신청", href: mypageDemoApply() },
    ],
  };
}

export function getInquiryNewFlow(params?: {
  productId?: string;
  quoteId?: string;
  demoId?: string;
}): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  const related: FlowLink[] = [
    { label: "문의 목록", href: mypageInquiries() },
    hub.quotes,
    hub.demo,
    { label: "고객센터 FAQ", href: "/board?tab=faq" },
  ];

  if (params?.quoteId) {
    related.unshift({
      label: "관련 견적",
      href: mypageQuote(params.quoteId),
    });
  }
  if (params?.demoId) {
    related.unshift({
      label: "관련 데모",
      href: mypageDemo(params.demoId),
    });
  }
  if (params?.productId) {
    related.unshift({
      label: "견적 요청",
      href: quoteRequest(params.productId),
    });
  }

  return {
    breadcrumbs: [
      ...baseMypageCrumbs(),
      { label: "문의 목록", href: mypageInquiries() },
      { label: "새 문의" },
    ],
    related,
  };
}

export function getSettingsFlow(): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  return {
    breadcrumbs: [...baseMypageCrumbs(), { label: "병원·배송지 설정" }],
    related: [
      { label: "증빙 서류함", href: mypageDocuments() },
      hub.quotes,
      hub.demo,
      { label: "문의하기", href: mypageInquiryNew() },
      hub.account,
    ],
  };
}

export function getRecentFlow(): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  return {
    breadcrumbs: [
      ...baseMypageCrumbs(),
      hub.activity,
      { label: "최근 본 상품" },
    ],
    related: [
      { label: "스펙 비교", href: mypageWishlistCompare() },
      { label: "견적 요청", href: quoteRequest() },
      { label: "제품리스트", href: "/products" },
      hub.activity,
    ],
  };
}

export function getQuoteRequestFlow(productId?: string): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  return {
    breadcrumbs: [
      { label: "홈", href: "/" },
      { label: "견적·데모", href: "/guide" },
      { label: "견적 요청" },
    ],
    related: [
      {
        label: "견적 현황",
        href: `${mypageHome()}#quotes`,
        hint: "접수 후 마이페이지에서 확인",
      },
      {
        label: "데모 신청",
        href: mypageDemoApply(productId),
      },
      {
        label: "문의 작성",
        href: mypageInquiryNew({ productId, subject: "견적 조건 문의" }),
      },
      { label: "마이페이지", href: mypageHome() },
      { label: "제품리스트", href: "/products" },
    ],
  };
}

export function getFindAccountFlow(): {
  breadcrumbs: FlowCrumb[];
  related: FlowLink[];
} {
  return {
    breadcrumbs: [
      { label: "홈", href: "/" },
      { label: "로그인", href: "/login" },
      { label: "아이디/비밀번호 찾기" },
    ],
    related: [
      { label: "로그인", href: "/login" },
      { label: "고객센터", href: "/support" },
      { label: "FAQ", href: "/board?tab=faq" },
      { label: "견적·데모 안내", href: "/guide" },
    ],
  };
}
