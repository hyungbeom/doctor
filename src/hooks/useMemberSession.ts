"use client";

import { useCallback, useEffect, useState } from "react";

const MEMBER_SESSION_KEY = "alpexmedi_member";
const MEMBER_ID_KEY = "alpexmedi_member_id";
const SAVED_ID_KEY = "alpexmedi_saved_id";

export function getSavedMemberId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SAVED_ID_KEY);
}

export function saveMemberId(id: string | null) {
  if (typeof window === "undefined") return;
  if (id) {
    localStorage.setItem(SAVED_ID_KEY, id);
  } else {
    localStorage.removeItem(SAVED_ID_KEY);
  }
}

export function getMemberId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(MEMBER_ID_KEY);
}

export function useMemberSession() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem(MEMBER_SESSION_KEY) === "1");
    setReady(true);
  }, []);

  const login = useCallback((memberId?: string) => {
    sessionStorage.setItem(MEMBER_SESSION_KEY, "1");
    if (memberId) {
      sessionStorage.setItem(MEMBER_ID_KEY, memberId);
    }
    setIsLoggedIn(true);
    window.dispatchEvent(new Event("alpexmedi-member-change"));
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(MEMBER_SESSION_KEY);
    sessionStorage.removeItem(MEMBER_ID_KEY);
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("alpexmedi-member-change"));
  }, []);

  useEffect(() => {
    const sync = () => {
      setIsLoggedIn(sessionStorage.getItem(MEMBER_SESSION_KEY) === "1");
    };
    window.addEventListener("alpexmedi-member-change", sync);
    return () => window.removeEventListener("alpexmedi-member-change", sync);
  }, []);

  return { isLoggedIn, ready, login, logout };
}
