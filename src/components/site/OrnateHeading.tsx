"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OrnateHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  id?: string;
  className?: string;
  emblem?: boolean;
}

export function OrnateHeading({
  title,
  subtitle,
  align = "center",
  id,
  className,
  emblem = true,
}: OrnateHeadingProps) {
  return (
    <div
      id={id}
      className={cn(
        "flex flex-col gap-3 mb-10",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {emblem && (
        <div className="flex items-center gap-3 mb-1 opacity-90">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="currentColor" aria-hidden>
            <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.4-6.3-4.6L5.7 21.2 8 14 2 9.4h7.6z" />
          </svg>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
        </div>
      )}
      <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide gold-text-gradient text-shadow-gold uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base text-muted-foreground font-cyrillic italic max-w-2xl tracking-wide">
          {subtitle}
        </p>
      )}
      <div className="ornament-divider w-32 mt-2">
        <span className="text-gold text-lg">✦</span>
      </div>
    </div>
  );
}

export function SectionWrapper({
  children,
  className,
  id,
  bgImage,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bgImage?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-24 px-4 md:px-8 scroll-mt-20",
        className
      )}
      style={
        bgImage
          ? {
              backgroundImage: `linear-gradient(180deg, rgba(10,20,45,0.92), rgba(10,20,45,0.96)), url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }
          : undefined
      }
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
