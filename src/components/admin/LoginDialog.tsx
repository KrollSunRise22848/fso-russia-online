"use client";

import { useState } from "react";
import { Lock, User, KeyRound, Shield, AlertCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAdmin } from "@/lib/admin-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginDialog() {
  const { loginOpen, closeLogin, login, loginLoading, loginError } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    if (loginLoading) return;
    const ok = await login(username, password);
    if (ok) {
      setUsername("");
      setPassword("");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <Dialog open={loginOpen} onOpenChange={(o) => !o && closeLogin()}>
      <DialogContent className="max-w-md bg-navy-dark border-gold/40">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 -m-3 rounded-full bg-gold/20 blur-xl" />
              <div className="relative h-16 w-16 rounded-full border-2 border-gold/50 bg-navy flex items-center justify-center">
                <Shield className="h-8 w-8 text-gold" />
              </div>
            </div>
          </div>
          <DialogTitle className="text-center font-serif-display text-2xl gold-text-gradient">
            Вход в панель администратора
          </DialogTitle>
          <DialogDescription className="text-center text-xs uppercase tracking-wider text-muted-foreground">
            Доступ только для уполномоченных сотрудников
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-username" className="text-xs uppercase tracking-wider text-gold-light">
              Логин
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/60" />
              <Input
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Введите логин"
                autoComplete="username"
                className="pl-10 bg-navy-light/60 border-gold/30 focus:border-gold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password" className="text-xs uppercase tracking-wider text-gold-light">
              Пароль
            </Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/60" />
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Введите пароль"
                autoComplete="current-password"
                className="pl-10 bg-navy-light/60 border-gold/30 focus:border-gold"
              />
            </div>
          </div>

          {loginError && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-red-900/30 border border-red-500/40 text-sm text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {loginError}
            </div>
          )}

          <button
            type="button"
            onClick={onSubmit}
            disabled={loginLoading}
            className="w-full py-2.5 rounded-md gold-gradient text-navy-dark font-semibold uppercase tracking-wider text-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loginLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Войти
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
