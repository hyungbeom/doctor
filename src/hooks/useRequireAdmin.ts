"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useRequireAdmin() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
        const data = (await res.json()) as { authenticated?: boolean };
        if (cancelled) return;
        if (!data.authenticated) {
          router.replace("/admin/login");
          return;
        }
        setAuthenticated(true);
      } catch {
        if (!cancelled) router.replace("/admin/login");
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return { ready, authenticated };
}
