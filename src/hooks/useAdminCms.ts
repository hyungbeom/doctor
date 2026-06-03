"use client";

import { useCallback, useEffect, useState } from "react";
import type { CmsStore } from "@/types/cms";

export function useAdminCms() {
  const [store, setStore] = useState<CmsStore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/cms", { credentials: "include" });
      if (!res.ok) {
        throw new Error(res.status === 401 ? "로그인이 필요합니다." : "데이터를 불러오지 못했습니다.");
      }
      setStore((await res.json()) as CmsStore);
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류");
      setStore(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const save = useCallback(
    async (patch: Partial<CmsStore>) => {
      const res = await fetch("/api/admin/cms", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        throw new Error("저장에 실패했습니다.");
      }
      const next = (await res.json()) as CmsStore;
      setStore(next);
      return next;
    },
    [],
  );

  return { store, loading, error, reload: load, save, setStore };
}
