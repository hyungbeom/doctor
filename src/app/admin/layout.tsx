import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alpexmedi 관리자",
  robots: "noindex, nofollow",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
