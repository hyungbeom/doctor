import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminAuthToken,
  adminCookieOptions,
  verifyAdminCredentials,
} from "@/lib/admin/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { id?: string; password?: string };
  const id = body.id?.trim() ?? "";
  const password = body.password ?? "";

  if (!verifyAdminCredentials(id, password)) {
    return NextResponse.json({ ok: false, error: "아이디 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminAuthToken(), adminCookieOptions());
  return response;
}
