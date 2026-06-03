import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { updateCmsStore } from "@/lib/cms/store";
import type { NotificationChannel, NotificationLog } from "@/types/cms";

type SendBody = {
  channel: NotificationChannel;
  recipient: string;
  subject: string;
  body: string;
  relatedType?: string;
  relatedId?: string;
};

function newLogId() {
  return `N-${Date.now()}`;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as SendBody;
  const { channel, recipient, subject, body: messageBody } = body;

  if (!channel || !recipient?.trim() || !messageBody?.trim()) {
    return NextResponse.json({ error: "채널, 수신자, 내용은 필수입니다." }, { status: 400 });
  }

  const sentAt = new Date().toLocaleString("ko-KR", { hour12: false });
  const log: NotificationLog = {
    id: newLogId(),
    channel,
    recipient: recipient.trim(),
    subject: subject?.trim() ?? "",
    body: messageBody.trim(),
    status: "성공",
    sentAt,
    relatedType: body.relatedType,
    relatedId: body.relatedId,
  };

  const store = await updateCmsStore((current) => ({
    ...current,
    notificationLogs: [log, ...current.notificationLogs].slice(0, 200),
  }));

  return NextResponse.json({ ok: true, log, store });
}
