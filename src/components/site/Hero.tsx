"use client";

import Link from "next/link";
import { ShieldCheck, Swords, ScrollText, Star, GraduationCap, Scale, ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  {
    href: "/usn",
    title: "Управление Специального Назначения",
    desc: "СБП, ООС, КК — силовое подразделение ФСО",
    icon: Swords,
    color: "border-rose-500/40 hover:border-rose-500/70 text-rose-300",
  },
  {
    href: "/upp",
    title: "Управление Подготовки",
    desc: "УПП — приём и подготовка новых сотрудников",
    icon: GraduationCap,
    color: "border-emerald-500/40 hover:border-emerald-500/70 text-emerald-300",
  },
  {
    href: "/ethics",
    title: "Кодекс этики",
    desc: "Свод обязательных норм поведения сотрудников ФСО",
    icon: Scale,
    color: "border-violet-500/40 hover:border-violet-500/70 text-violet-300",
  },
  {
    href: "/leaders",
    title: "Состав руководства",
    desc: "Дирекция ФСО, начальники управлений и отделов",
    icon: ShieldCheck,
    color: "border-gold/40 hover:border-gold/70 text-gold",
  },
  {
    href: "/orders",
    title: "Приказы",
    desc: "Официальные приказы Директора ФСО",
    icon: ScrollText,
    color: "border-sky-500/40 hover:border-sky-500/70 text-sky-300",
  },
  {
    href: "/news",
    title: "Новости",
    desc: "События и объявления Службы",
    icon: Star,
    color: "border-amber-500/40 hover:border-amber-500/70 text-amber-300",
  },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(8,16,38,0.85) 0%, rgba(8,16,38,0.65) 40%, rgba(8,16,38,0.95) 100%), url(/images/hero-bg.png)`,
        }}
      />
      <div className="absolute top-20 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,16,38,0.7)_100%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-24 text-center flex flex-col items-center">
        {/* Emblem */}
        <div className="relative mb-6 animate-fade-up">
          <div className="absolute inset-0 -m-8 rounded-full bg-gold/10 blur-3xl pulse-gold" />
          <img
            src="/images/fso-coat-of-arms.png"
            alt="Герб Федеральной Службы Охраны"
            className="relative h-32 w-32 md:h-44 md:w-44 object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]"
          />
        </div>

        <p
          className="text-xs md:text-sm uppercase tracking-[0.4em] text-gold/90 mb-3 animate-fade-up font-semibold"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          Федеральная Служба Охраны
        </p>
        <h1
          className="font-serif-display text-4xl sm:text-5xl md:text-7xl font-bold gold-text-gradient text-shadow-gold mb-4 animate-fade-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Россия Онлайн
        </h1>
        <p
          className="font-cyrillic text-base md:text-xl text-foreground/85 italic max-w-2xl mb-10 animate-fade-up leading-relaxed"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          «Верность. Честь. Отвага.» — девиз, объединяющий тех, кто стоит на страже
          законности и порядка в Государстве.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <Link
            href="/usn"
            className="px-8 py-3 rounded-md gold-gradient text-navy-dark font-semibold uppercase tracking-wider text-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all"
          >
            О Службе
          </Link>
          <Link
            href="/orders"
            className="px-8 py-3 rounded-md border border-gold/50 text-gold uppercase tracking-wider text-sm hover:bg-gold/10 transition-all"
          >
            Приказы
          </Link>
        </div>

        {/* Quick navigation cards */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-4xl animate-fade-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          {QUICK_LINKS.map(({ href, title, desc, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className={`group rounded-xl border bg-navy-light/40 p-4 md:p-5 transition-all hover:-translate-y-1 ${color}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="h-6 w-6 shrink-0 mt-1" />
                <div className="flex-1 min-w-0 text-left">
                  <h3 className="font-serif-display text-sm md:text-base font-semibold text-foreground mb-1 leading-tight">
                    {title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-snug hidden md:block">
                    {desc}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider opacity-70 group-hover:opacity-100">
                    Открыть <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
