"use client";

import { useEffect } from "react";
import { useAdmin } from "@/lib/admin-store";

export function Footer() {
  const { checkSession } = useAdmin();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <footer className="mt-auto bg-navy-dark border-t border-gold/30 relative">
      {/* Top ornamental border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/images/fso-emblem.png"
                alt="Эмблема ФСО"
                className="h-12 w-12 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
              />
              <div>
                <p className="font-serif-display text-xl font-bold gold-text-gradient tracking-wider">
                  ФСО
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Россия Онлайн
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs font-cyrillic italic">
              «Верность. Честь. Отвага.» — девиз Службы, объединяющий тех, кто стоит на
              страже законности и порядка в Государстве.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xs uppercase tracking-[0.25em] text-gold/80 mb-2">Разделы</p>
            {[
              { href: "#about", label: "О ФСО" },
              { href: "#usn", label: "УСН" },
              { href: "#leaders", label: "Состав руководства" },
              { href: "#orders", label: "Приказы" },
              { href: "#news", label: "Новости" },
            ].map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>

          {/* Info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xs uppercase tracking-[0.25em] text-gold/80 mb-2">Информация</p>
            <p className="text-sm text-muted-foreground">
              Официальный портал структурного подразделения.
            </p>
            <p className="text-xs text-muted-foreground/70 italic">
              Сайт работает в рамках проекта «Россия Онлайн» (GTA 5) и не является
              официальным государственным ресурсом РФ.
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 pt-6 border-t border-gold/15 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ФСО — Россия Онлайн. Все права защищены.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="uppercase tracking-wider">Система активна</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
