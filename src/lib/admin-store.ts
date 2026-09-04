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
  loginOpen: boolean;
  loginLoading: boolean;
  loginError: string | null;
  openLogin: () => void;
  closeLogin: () => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAdmin = create<AdminStore>((set) => ({
  admin: null,
  loading: true,
  loginOpen: false,
  loginLoading: false,
  loginError: null,
  openLogin: () => set({ loginOpen: true, loginError: null }),
  closeLogin: () => set({ loginOpen: false, loginError: null }),
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
    set({ admin: null });
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
