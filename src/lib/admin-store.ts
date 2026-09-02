"use client";

import { create } from "zustand";

interface AdminUser {
  id: string;
  username: string;
  name: string | null;
  role: string;
}

interface AdminStore {
  admin: AdminUser | null;
  loading: boolean;
  panelOpen: boolean;
  loginOpen: boolean;
  loginLoading: boolean;
  loginError: string | null;
  setAdmin: (a: AdminUser | null) => void;
  setLoading: (l: boolean) => void;
  openLogin: () => void;
  closeLogin: () => void;
  openPanel: () => void;
  closePanel: () => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAdmin = create<AdminStore>((set, get) => ({
  admin: null,
  loading: true,
  panelOpen: false,
  loginOpen: false,
  loginLoading: false,
  loginError: null,
  setAdmin: (a) => set({ admin: a }),
  setLoading: (l) => set({ loading: l }),
  openLogin: () => set({ loginOpen: true, loginError: null }),
  closeLogin: () => set({ loginOpen: false, loginError: null }),
  openPanel: () => set({ panelOpen: true }),
  closePanel: () => set({ panelOpen: false }),
  login: async (username, password) => {
    set({ loginLoading: true, loginError: null });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        set({ loginLoading: false, loginError: data.error || "Ошибка входа" });
        return false;
      }
      set({
        admin: data.admin,
        loginLoading: false,
        loginOpen: false,
        loginError: null,
      });
      return true;
    } catch (e) {
      console.error(e);
      set({ loginLoading: false, loginError: "Ошибка сети" });
      return false;
    }
  },
  logout: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    set({ admin: null, panelOpen: false });
  },
  checkSession: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      set({ admin: data.ok ? data.admin : null, loading: false });
    } catch {
      set({ admin: null, loading: false });
    }
  },
}));
