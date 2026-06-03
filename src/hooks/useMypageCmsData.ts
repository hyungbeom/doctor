"use client";

import { useEffect, useState } from "react";
import {
  demoRequests as defaultDemos,
  inquiries as defaultInquiries,
  quoteRequests as defaultQuotes,
  type DemoRequest,
  type Inquiry,
  type QuoteRequest,
} from "@/data/mypageData";
import { getMemberId } from "@/hooks/useMemberSession";

export function useMypageCmsData() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>(defaultQuotes);
  const [demos, setDemos] = useState<DemoRequest[]>(defaultDemos);
  const [inquiries, setInquiries] = useState<Inquiry[]>(defaultInquiries);

  useEffect(() => {
    const memberId = getMemberId() || "member-demo";
    fetch(`/api/public/mypage?memberId=${encodeURIComponent(memberId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { quotes?: QuoteRequest[]; demos?: DemoRequest[]; inquiries?: Inquiry[] } | null) => {
        if (!data) return;
        if (data.quotes?.length) setQuotes(data.quotes);
        if (data.demos?.length) setDemos(data.demos);
        if (data.inquiries?.length) setInquiries(data.inquiries);
      })
      .catch(() => {});
  }, []);

  return { quotes, demos, inquiries };
}
