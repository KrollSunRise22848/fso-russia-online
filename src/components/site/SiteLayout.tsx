"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoginDialog } from "@/components/admin/LoginDialog";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface SiteLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  heroImage?: boolean;
  className?: string;
}

export function SiteLayout({
  children,
  title,
  subtitle,
  breadcrumbs,
  heroImage = true,
  className,
}: SiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Page hero / banner */}
        {(title || breadcrumbs) && (
          <div
            className={cn(
              "relative border-b border-gold/20",
              heroImage && "overflow-hidden"
            )}
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(8,16,38,0.7), rgba(8,16,38,0.95)), url(/images/hero-bg.png)",
              }}
            />
            <div className="absolute inset-0 bg-navy-dark/60" />
            <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
              {/* Breadcrumbs */}
              {breadcrumbs && breadcrumbs.length > 0 && (
                <nav
                  aria-label="Хлебные крошки"
                  className="flex items-center flex-wrap gap-1.5 text-xs text-muted-foreground mb-4"
                >
                  {breadcrumbs.map((b, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      {b.href ? (
                        <Link
                          href={b.href}
                          className="hover:text-gold transition-colors uppercase tracking-wider"
                        >
                          {b.label}
                        </Link>
                      ) : (
                        <span className="text-gold uppercase tracking-wider">{b.label}</span>
                      )}
                      {i < breadcrumbs.length - 1 && (
                        <ChevronRight className="h-3 w-3 text-gold/50" />
                      )}
                    </span>
                  ))}
                </nav>
              )}

              {/* Title */}
              {title && (
                <>
                  <div className="flex items-center gap-3 mb-3 opacity-90">
                    <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-gold"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.4-6.3-4.6L5.7 21.2 8 14 2 9.4h7.6z" />
                    </svg>
                    <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
                  </div>
                  <h1 className="font-serif-display text-3xl md:text-5xl font-bold gold-text-gradient text-shadow-gold uppercase tracking-wide mb-2">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="font-cyrillic text-base md:text-lg italic text-foreground/80 max-w-3xl leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Page content */}
        <div className={cn(className)}>{children}</div>
      </main>
      <Footer />
      <LoginDialog />
    </div>
  );
}
