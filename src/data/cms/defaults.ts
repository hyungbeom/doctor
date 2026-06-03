import { boardPosts } from "@/data/boardData";
import { gnbItems, heroBanner } from "@/data/homeData";
import { demoRequests, inquiries, quoteRequests } from "@/data/mypageData";
import { productCatalog as defaultProductCatalog } from "@/data/productCatalog";
import type { CmsStore, NotificationTemplate } from "@/types/cms";

const defaultTemplates: NotificationTemplate[] = [
  {
    id: "tpl-quote-ready",
    name: "견적서 도착 (카카오)",
    channel: "kakao",
    subject: "견적서 도착 안내",
    body: "[Alpexmedi] {hospitalName} 담당자님, {productName} 견적서가 도착했습니다. 마이페이지에서 PDF를 확인해 주세요.",
  },
  {
    id: "tpl-demo-schedule",
    name: "데모 일정 확정 (SMS)",
    channel: "sms",
    subject: "데모 일정 안내",
    body: "[Alpexmedi] {productName} 데모 일정: {scheduleLabel}. 담당 엔지니어 {engineerName} ({engineerPhone})",
  },
  {
    id: "tpl-inquiry-reply",
    name: "문의 답변 (이메일)",
    channel: "email",
    subject: "[Alpexmedi] 문의 답변 — {subject}",
    body: "안녕하세요, {hospitalName} 담당자님.\n\n문의하신 내용에 대한 답변을 드립니다.\n\n{replyBody}\n\n감사합니다.\nAlpexmedi 고객지원",
  },
];

export function buildDefaultCmsStore(): CmsStore {
  const now = new Date().toISOString();
  return {
    version: 1,
    updatedAt: now,
    hero: {
      headline: heroBanner.headline,
      subline: heroBanner.subline,
      subline2: heroBanner.subline2,
      englishLine: heroBanner.englishLine,
      brandTag: heroBanner.brandTag,
      image: heroBanner.image,
    },
    gnb: gnbItems.map((item) => ({ ...item })),
    productCatalog: JSON.parse(JSON.stringify(defaultProductCatalog)),
    boardPosts: boardPosts.map((post) => ({ ...post })),
    members: [
      {
        id: "member-demo",
        hospitalName: "알펙스피부과",
        memberName: "홍길동",
        role: "원장",
        email: "demo@alpexmedi.co.kr",
        phone: "010-0000-0000",
      },
      {
        id: "member-2",
        hospitalName: "서울메디클리닉",
        memberName: "김영희",
        role: "실장",
        email: "contact@seoulmedi.kr",
        phone: "010-1111-2222",
      },
    ],
    quotes: quoteRequests.map((q) => ({ ...q, memberId: "member-demo" })),
    demos: demoRequests.map((d) => ({ ...d, memberId: "member-demo" })),
    inquiries: inquiries.map((i) => ({ ...i, memberId: "member-demo" })),
    notificationTemplates: defaultTemplates,
    notificationLogs: [],
  };
}
