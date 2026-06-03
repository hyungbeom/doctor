import type { BoardPost, BoardPostType } from "@/data/boardData";
import type { ProductCatalog } from "@/data/productCatalog";

export type { BoardPost, BoardPostType };

export type CmsGnbItem = {
  id: string;
  label: string;
  href: string;
};

export type CmsHero = {
  headline: string;
  subline: string;
  subline2?: string;
  englishLine?: string;
  brandTag: string;
  image: string;
};

export type CmsMember = {
  id: string;
  hospitalName: string;
  memberName: string;
  role: string;
  email?: string;
  phone?: string;
};

export type CmsQuote = {
  id: string;
  productName: string;
  productId?: string;
  requestedAt: string;
  status: "상담중" | "견적완료" | "계약완료";
  hasQuotePdf: boolean;
  memberId?: string;
};

export type CmsDemo = {
  id: string;
  productName: string;
  productId?: string;
  status: "조율 중" | "데모 진행 중" | "데모 종료";
  scheduleLabel?: string;
  engineerName: string;
  engineerPhone: string;
  memberId?: string;
};

export type CmsInquiry = {
  id: string;
  subject: string;
  target: string;
  status: "답변대기" | "답변완료";
  createdAt: string;
  body?: string;
  memberId?: string;
};

export type NotificationChannel = "email" | "sms" | "kakao";

export type NotificationLog = {
  id: string;
  channel: NotificationChannel;
  recipient: string;
  subject: string;
  body: string;
  status: "성공" | "실패" | "대기";
  sentAt: string;
  relatedType?: string;
  relatedId?: string;
};

export type NotificationTemplate = {
  id: string;
  name: string;
  channel: NotificationChannel;
  subject: string;
  body: string;
};

export type CmsStore = {
  version: number;
  updatedAt: string;
  hero: CmsHero;
  gnb: CmsGnbItem[];
  productCatalog: ProductCatalog;
  boardPosts: BoardPost[];
  members: CmsMember[];
  quotes: CmsQuote[];
  demos: CmsDemo[];
  inquiries: CmsInquiry[];
  notificationTemplates: NotificationTemplate[];
  notificationLogs: NotificationLog[];
};
