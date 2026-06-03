import { NextResponse } from "next/server";
import { getMypageCmsSnapshot } from "@/lib/cms/public";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const memberId = searchParams.get("memberId") ?? undefined;
  const data = await getMypageCmsSnapshot(memberId);
  return NextResponse.json(data);
}
