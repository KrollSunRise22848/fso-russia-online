"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Lock, LayoutDashboard, LogOut, Shield } from "lucide-react";
import { useAdmin } from "@/lib/admin-store";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/usn", label: "УСН" },
  { href: "/upp", label: "УПП" },
  { href: "/ethics", label: "Кодекс этики" },
  { href: "/leaders", label: "Руководство" },
  { href: "/orders", label: "Приказы" },
  { href: "/news", label: "Новости" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { admin, loading, openLogin, logout } = useAdmin();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled || pathname !== "/"
          ? "bg-navy-dark/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.4)] border-b border-gold/30"
          : "bg-navy-dark/80 backdrop-blur-sm border-b border-gold/15"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo / brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0 rounded-full overflow-hidden">
            <img
              src="/images/fso-coat-of-arms.png"
              alt="Герб ФСО"
              className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] group-hover:rotate-3 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif-display text-lg md:text-xl font-bold gold-text-gradient tracking-wider">
              ФСО
            </span>
            <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.25em]">
              Россия Онлайн
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "relative text-sm uppercase tracking-[0.1em] font-medium py-2 transition-colors group",
                isActive(n.href)
                  ? "text-gold"
                  : "text-foreground/85 hover:text-gold"
              )}
            >
              {n.label}
              <span
                className={cn(
                  "absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-gold via-gold to-transparent transition-transform origin-left",
                  isActive(n.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {loading ? (
            <div className="h-9 w-9" />
          ) : admin ? (
            <>
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 rounded-md border border-gold/40 bg-gold/10 text-gold hover:bg-gold/20 transition-all text-xs md:text-sm uppercase tracking-wider"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:inline">Панель</span>
              </Link>
              <button
                onClick={logout}
                title="Выйти"
                className="h-9 w-9 flex items-center justify-center rounded-md border border-gold/30 text-muted-foreground hover:text-gold hover:border-gold/60 transition-all"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              onClick={openLogin}
              className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-md border border-gold/40 bg-gold/5 text-gold hover:bg-gold/15 transition-all text-xs md:text-sm uppercase tracking-wider"
            >
              <Lock className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Вход</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden h-9 w-9 flex items-center justify-center rounded-md border border-gold/30 text-gold"
            aria-label="Меню"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-navy-dark/98 backdrop-blur-md border-t border-gold/20",
          mobileOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="px-4 py-3 flex flex-col gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "px-3 py-3 rounded-md text-sm uppercase tracking-wider transition-all",
                isActive(n.href)
                  ? "text-gold bg-gold/10"
                  : "text-foreground/80 hover:text-gold hover:bg-gold/10"
              )}
            >
              {n.label}
            </Link>
          ))}
          {admin && (
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-3 rounded-md text-sm uppercase tracking-wider text-gold bg-gold/10"
            >
              Открыть панель администратора
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
