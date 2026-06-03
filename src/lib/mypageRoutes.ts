export function mypageHome() {
  return "/mypage";
}

export function mypageQuote(quoteId: string) {
  return `/mypage/quotes/${encodeURIComponent(quoteId)}`;
}

export function mypageContract(contractId: string) {
  return `/mypage/contracts/${encodeURIComponent(contractId)}`;
}

export function mypageDemo(demoId: string) {
  return `/mypage/demo/${encodeURIComponent(demoId)}`;
}

export function mypageDemoApply(productId?: string) {
  const base = "/mypage/demo/apply";
  if (!productId) return base;
  return `${base}?productId=${encodeURIComponent(productId)}`;
}

export function mypageEquipmentAs(equipmentId: string) {
  return `/mypage/equipment/${encodeURIComponent(equipmentId)}/as`;
}

export function mypageEquipmentSupplies(equipmentId: string) {
  return `/mypage/equipment/${encodeURIComponent(equipmentId)}/supplies`;
}

export function mypageDocuments() {
  return "/mypage/documents";
}

export function mypageCredentialRenew(docId: string) {
  return `/mypage/documents/credentials/${encodeURIComponent(docId)}/renew`;
}

export function mypageWishlistCompare() {
  return "/mypage/wishlist/compare";
}

export function mypageInquiries() {
  return "/mypage/inquiries";
}

export function mypageInquiry(inquiryId: string) {
  return `/mypage/inquiries/${encodeURIComponent(inquiryId)}`;
}

export function mypageInquiryNew(params?: {
  productId?: string;
  quoteId?: string;
  demoId?: string;
  subject?: string;
}) {
  const search = new URLSearchParams();
  if (params?.productId) search.set("productId", params.productId);
  if (params?.quoteId) search.set("quoteId", params.quoteId);
  if (params?.demoId) search.set("demoId", params.demoId);
  if (params?.subject) search.set("subject", params.subject);
  const query = search.toString();
  return query ? `/mypage/inquiries/new?${query}` : "/mypage/inquiries/new";
}

export function mypageSettings() {
  return "/mypage/settings";
}

export function mypageRecent() {
  return "/mypage/recent";
}

export function quoteRequest(productId?: string) {
  const base = "/quote/request";
  if (!productId) return base;
  return `${base}?productId=${encodeURIComponent(productId)}`;
}

export function loginFindAccount() {
  return "/login/find-account";
}
