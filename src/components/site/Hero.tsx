"use client";

import { ShieldCheck, Swords, ScrollText, Star } from "lucide-react";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(8,16,38,0.85) 0%, rgba(8,16,38,0.65) 40%, rgba(8,16,38,0.95) 100%), url(/images/hero-bg.png)`,
        }}
      />
      {/* Gold ornamental top border */}
      <div className="absolute top-20 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,16,38,0.7)_100%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-32 text-center flex flex-col items-center">
        {/* Emblem */}
        <div className="relative mb-8 animate-fade-up">
          <div className="absolute inset-0 -m-8 rounded-full bg-gold/10 blur-3xl pulse-gold" />
          <img
            src="/images/fso-emblem.png"
            alt="Герб Федеральной Службы Охраны"
            className="relative h-32 w-32 md:h-48 md:w-48 object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]"
          />
        </div>

        <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-gold/80 mb-3 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          Федеральная Служба Охраны
        </p>
        <h1
          className="font-serif-display text-4xl sm:text-5xl md:text-7xl font-bold gold-text-gradient text-shadow-gold mb-4 animate-fade-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Россия Онлайн
        </h1>
        <p
          className="font-cyrillic text-base md:text-xl text-foreground/80 italic max-w-2xl mb-10 animate-fade-up"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          «Верность. Честь. Отвага.» — девиз, объединяющий тех, кто стоит на страже
          законности и порядка в Государстве.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <a
            href="#about"
            className="px-8 py-3 rounded-md gold-gradient text-navy-dark font-semibold uppercase tracking-wider text-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all"
          >
            О Службе
          </a>
          <a
            href="#orders"
            className="px-8 py-3 rounded-md border border-gold/50 text-gold uppercase tracking-wider text-sm hover:bg-gold/10 transition-all"
          >
            Приказы
          </a>
        </div>

        {/* Stat highlights */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-3xl animate-fade-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          {[
            { icon: ShieldCheck, label: "Охрана" },
            { icon: Swords, label: "УСН" },
            { icon: ScrollText, label: "Приказы" },
            { icon: Star, label: "Честь" },
          ].map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className="glass-navy border border-gold/30 rounded-lg p-4 md:p-5 flex flex-col items-center gap-2 hover:border-gold/60 transition-colors"
            >
              <Icon className="h-6 w-6 md:h-8 md:w-8 text-gold" />
              <span className="text-xs md:text-sm uppercase tracking-wider text-foreground/80">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold/60 animate-bounce">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
