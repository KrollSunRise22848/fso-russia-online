"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  border?: "gold" | "rose" | "sky" | "amber" | "emerald" | "violet";
  title?: string;
  icon?: ReactNode;
}

const BORDER_MAP = {
  gold: "border-gold/30 hover:border-gold/50",
  rose: "border-rose-500/30 hover:border-rose-500/50",
  sky: "border-sky-500/30 hover:border-sky-500/50",
  amber: "border-amber-500/30 hover:border-amber-500/50",
  emerald: "border-emerald-500/30 hover:border-emerald-500/50",
  violet: "border-violet-500/30 hover:border-violet-500/50",
};

export function Card({ children, className, border = "gold", title, icon }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-navy-light/40 p-5 md:p-6 transition-all hover:-translate-y-0.5",
        BORDER_MAP[border],
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-3 mb-3">
          {icon && (
            <div
              className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                border === "gold" && "bg-gold/10 border border-gold/30",
                border === "rose" && "bg-rose-500/10 border border-rose-500/30",
                border === "sky" && "bg-sky-500/10 border border-sky-500/30",
                border === "amber" && "bg-amber-500/10 border border-amber-500/30",
                border === "emerald" && "bg-emerald-500/10 border border-emerald-500/30",
                border === "violet" && "bg-violet-500/10 border border-violet-500/30"
              )}
            >
              {icon}
            </div>
          )}
          <h3
            className={cn(
              "font-serif-display text-lg font-semibold tracking-wide",
              border === "gold" && "text-gold-light",
              border === "rose" && "text-rose-300",
              border === "sky" && "text-sky-300",
              border === "amber" && "text-amber-300",
              border === "emerald" && "text-emerald-300",
              border === "violet" && "text-violet-300"
            )}
          >
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  align = "left",
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 mb-6",
        align === "center" && "items-center text-center"
      )}
    >
      <div className="flex items-center gap-3 opacity-90">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
        <svg viewBox="0 0 24 24" className="h-3 w-3 text-gold" fill="currentColor" aria-hidden>
          <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.4-6.3-4.6L5.7 21.2 8 14 2 9.4h7.6z" />
        </svg>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
      </div>
      <h2 className="font-serif-display text-2xl md:text-3xl font-bold gold-text-gradient uppercase tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-foreground/75 italic max-w-2xl font-cyrillic">{subtitle}</p>
      )}
    </div>
  );
}
