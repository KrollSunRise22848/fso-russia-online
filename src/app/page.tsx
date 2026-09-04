"use client";

import Link from "next/link";
import { Hero } from "@/components/site/Hero";
import { Card } from "@/components/site/Card";
import { Footer } from "@/components/site/Footer";
import { LoginDialog } from "@/components/admin/LoginDialog";
import { useFetch } from "@/hooks/use-fetch";
import { Newspaper, ScrollText, Users, ArrowRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  isPinned: boolean;
  published: boolean;
  createdAt: string;
}

interface Order {
  id: string;
  number: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
}

interface Leader {
  id: string;
  fullName: string;
  position: string;
  department: string;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function Home() {
  const { data: newsData } = useFetch<{ news: NewsItem[] }>("/api/news?limit=4");
  const { data: ordersData } = useFetch<{ orders: Order[] }>("/api/orders?limit=4");
  const { data: leadersData } = useFetch<{ leaders: Leader[] }>("/api/leaders");

  const stats = [
    {
      label: "Руководителей",
      value: leadersData?.leaders?.length ?? 0,
      icon: Users,
      href: "/leaders",
    },
    {
      label: "Приказов",
      value: ordersData?.orders?.length ?? 0,
      icon: ScrollText,
      href: "/orders",
    },
    {
      label: "Новостей",
      value: newsData?.news?.length ?? 0,
      icon: Newspaper,
      href: "/news",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Hero />

      {/* Stats strip */}
      <section className="bg-navy-dark border-y border-gold/20 py-8">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="group flex flex-col items-center text-center gap-1 p-4 rounded-lg hover:bg-gold/5 transition-colors"
            >
              <s.icon className="h-6 w-6 md:h-8 md:w-8 text-gold mb-1" />
              <p className="font-serif-display text-2xl md:text-4xl font-bold gold-text-gradient">
                {s.value}
              </p>
              <p className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* About banner */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="ornament-divider w-24 mb-6">
            <span className="text-gold">❖</span>
          </div>
          <h2 className="font-serif-display text-2xl md:text-4xl font-bold gold-text-gradient uppercase tracking-wide mb-4">
            Федеральная Служба Охраны
          </h2>
          <p className="font-cyrillic text-base md:text-xl text-foreground/85 italic max-w-3xl mx-auto leading-relaxed mb-6">
            Служба обеспечивает безопасность государства, охрану важнейших государственных
            объектов и защиту высших должностных лиц. В её состав входят силовое
            подразделение УСН, подготовительное подразделение УПП и подразделение
            собственной безопасности.
          </p>
          <div className="ornament-divider w-24 mb-6">
            <span className="text-gold">❖</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link
              href="/usn"
              className="px-6 py-2.5 rounded-md border border-gold/40 bg-gold/5 text-gold hover:bg-gold/15 transition-all text-sm uppercase tracking-wider"
            >
              О Службе
            </Link>
            <Link
              href="/ethics"
              className="px-6 py-2.5 rounded-md border border-violet-500/40 bg-violet-500/5 text-violet-300 hover:bg-violet-500/15 transition-all text-sm uppercase tracking-wider"
            >
              Кодекс этики
            </Link>
          </div>
        </div>
      </section>

      {/* Latest news preview */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-navy-dark border-t border-gold/15">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif-display text-2xl md:text-3xl font-bold gold-text-gradient uppercase">
                Последние новости
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Актуальные события Службы</p>
            </div>
            <Link
              href="/news"
              className="flex items-center gap-1 text-sm text-gold hover:text-gold-light transition-colors uppercase tracking-wider"
            >
              Все <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {newsData?.news?.slice(0, 4).map((item) => (
              <Card key={item.id} border={item.isPinned ? "gold" : "sky"}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border border-gold/30 bg-gold/10 text-gold">
                    {item.category}
                  </span>
                  {item.isPinned && (
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border border-rose-500/30 bg-rose-500/10 text-rose-300">
                      Закреплено
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground ml-auto">{formatDate(item.createdAt)}</span>
                </div>
                <h3 className="font-serif-display text-base md:text-lg font-semibold text-foreground leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {item.summary}
                </p>
              </Card>
            ))}
            {!newsData?.news?.length && (
              <p className="text-sm text-muted-foreground col-span-2 text-center py-6">
                Новостей пока нет
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Latest orders preview */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif-display text-2xl md:text-3xl font-bold gold-text-gradient uppercase">
                Последние приказы
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Официальные документы Директора ФСО
              </p>
            </div>
            <Link
              href="/orders"
              className="flex items-center gap-1 text-sm text-gold hover:text-gold-light transition-colors uppercase tracking-wider"
            >
              Все <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-2">
            {ordersData?.orders?.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="rounded-lg border border-gold/20 bg-navy-light/40 p-4 flex items-center gap-4 hover:border-gold/40 transition-all"
              >
                <div className="h-10 w-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                  <ScrollText className="h-5 w-5 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif-display text-sm font-bold text-gold-light tracking-wider">
                      {order.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider border border-gold/20 bg-gold/5 text-gold px-1.5 py-0.5 rounded">
                      {order.category}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90 truncate">{order.title}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 hidden md:block">
                  {formatDate(order.createdAt)}
                </span>
              </div>
            ))}
            {!ordersData?.orders?.length && (
              <p className="text-sm text-muted-foreground text-center py-6">Приказов пока нет</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <LoginDialog />
    </div>
  );
}
