"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMemberSession } from "@/hooks/useMemberSession";

export function useRequireLogin(redirectTo = "/login") {
  const router = useRouter();
  const { isLoggedIn, ready } = useMemberSession();

  useEffect(() => {
    if (ready && !isLoggedIn) {
      router.replace(redirectTo);
    }
  }, [isLoggedIn, ready, redirectTo, router]);

  return { isLoggedIn, ready };
}
