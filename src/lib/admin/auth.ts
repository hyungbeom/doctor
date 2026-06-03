import { cookies } from "next/headers";

export const ADMIN_COOKIE = "alpexmedi_admin";
const ADMIN_TOKEN = "authenticated";

const DEFAULT_ADMIN_ID = "admin";
const DEFAULT_ADMIN_PASSWORD = "1234";

export function verifyAdminCredentials(id: string, password: string): boolean {
  const envId = process.env.ADMIN_ID ?? DEFAULT_ADMIN_ID;
  const envPw = process.env.ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD;
  return id === envId && password === envPw;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === ADMIN_TOKEN;
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}

export function adminAuthToken(): string {
  return ADMIN_TOKEN;
}
