"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  ScrollText,
  Users,
  ShieldCheck,
  LogOut,
  TrendingUp,
  Calendar,
  Loader2,
  Lock,
  AlertCircle,
} from "lucide-react";
import { useAdmin } from "@/lib/admin-store";
import { cn } from "@/lib/utils";
import { Card } from "@/components/site/Card";
import { NewsEditor } from "@/components/admin/NewsEditor";
import { OrdersEditor } from "@/components/admin/OrdersEditor";
import { LeadersEditor } from "@/components/admin/LeadersEditor";
import { LoginDialog } from "@/components/admin/LoginDialog";

const TABS = [
  { id: "dashboard", label: "Обзор", icon: TrendingUp },
  { id: "news", label: "Новости", icon: Newspaper },
  { id: "orders", label: "Приказы", icon: ScrollText },
  { id: "leaders", label: "Руководство", icon: Users },
];

export default function AdminPage() {
  const { admin, loading, logout, openLogin, checkSession } = useAdmin();
  const [tab, setTab] = useState("dashboard");

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 -m-3 rounded-full bg-gold/20 blur-xl" />
            <div className="relative h-20 w-20 rounded-full border-2 border-gold/50 bg-navy flex items-center justify-center mx-auto">
              <Lock className="h-10 w-10 text-gold" />
            </div>
          </div>
          <h1 className="font-serif-display text-2xl gold-text-gradient mb-3">
            Доступ только для администраторов
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Чтобы открыть панель управления, войдите под учётной записью администратора.
          </p>
          <button
            onClick={openLogin}
            className="px-6 py-2.5 rounded-md gold-gradient text-navy-dark font-semibold uppercase tracking-wider text-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
          >
            Войти
          </button>
          <div className="mt-6">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-gold uppercase tracking-wider"
            >
              ← На главную
            </Link>
          </div>
        </div>
        <LoginDialog />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin top bar */}
      <div className="sticky top-0 z-40 bg-navy-dark/95 backdrop-blur-md border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gold/10 border border-gold/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5 text-gold" />
            </div>
            <div className="min-w-0">
              <h1 className="font-serif-display text-base md:text-lg gold-text-gradient truncate">
                Панель администратора
              </h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">
                {admin?.name || admin?.username} · {admin?.role === "super" ? "Главный администратор" : "Администратор"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gold/30 text-foreground/80 hover:text-gold hover:border-gold/60 transition-all text-xs uppercase tracking-wider"
            >
              ← Сайт
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-rose-500/40 text-rose-300 hover:bg-rose-900/30 transition-all text-xs uppercase tracking-wider"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-navy-dark/95 backdrop-blur-md border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-2 md:px-8">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-thin">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "px-3 md:px-4 py-2 rounded-md text-xs md:text-sm uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2",
                  tab === t.id
                    ? "bg-gold/20 text-gold border border-gold/40"
                    : "text-muted-foreground hover:text-gold hover:bg-gold/5 border border-transparent"
                )}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {tab === "dashboard" && <Dashboard />}
        {tab === "news" && <NewsEditor />}
        {tab === "orders" && <OrdersEditor />}
        {tab === "leaders" && <LeadersEditor />}
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({
    news: 0,
    orders: 0,
    leaders: 0,
    activeOrders: 0,
    pinnedNews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState<
    { type: "news" | "orders"; title: string; date: string; id: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const [newsRes, ordersRes, leadersRes] = await Promise.all([
          fetch("/api/news?limit=100"),
          fetch("/api/orders?limit=100"),
          fetch("/api/leaders"),
        ]);
        const newsData = await newsRes.json();
        const ordersData = await ordersRes.json();
        const leadersData = await leadersRes.json();
        const news = newsData.news || [];
        const orders = ordersData.orders || [];
        const leaders = leadersData.leaders || [];
        setStats({
          news: news.length,
          orders: orders.length,
          leaders: leaders.length,
          activeOrders: orders.filter((o: { status: string }) => o.status === "Действует").length,
          pinnedNews: news.filter((n: { isPinned: boolean }) => n.isPinned).length,
        });
        // Recent activity
        const recentItems: { type: "news" | "orders"; title: string; date: string; id: string }[] = [
          ...news.map((n: { id: string; title: string; createdAt: string }) => ({
            type: "news" as const,
            title: n.title,
            date: n.createdAt,
            id: n.id,
          })),
          ...orders.map((o: { id: string; title: string; createdAt: string }) => ({
            type: "orders" as const,
            title: o.title,
            date: o.createdAt,
            id: o.id,
          })),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);
        setRecent(recentItems);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  const cards = [
    { label: "Всего новостей", value: stats.news, sub: `${stats.pinnedNews} закреплено`, icon: Newspaper, color: "text-gold", border: "border-gold/30" },
    { label: "Всего приказов", value: stats.orders, sub: `${stats.activeOrders} действует`, icon: ScrollText, color: "text-sky-300", border: "border-sky-500/30" },
    { label: "Руководителей", value: stats.leaders, sub: "записей", icon: Users, color: "text-emerald-300", border: "border-emerald-500/30" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="rounded-xl border border-gold/30 bg-gradient-to-br from-gold/10 via-transparent to-transparent p-6">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="h-8 w-8 text-gold" />
          <h2 className="font-serif-display text-xl md:text-2xl gold-text-gradient">
            Добро пожаловать в панель управления
          </h2>
        </div>
        <p className="text-sm text-foreground/80 max-w-2xl">
          Здесь вы можете управлять содержимым официального портала ФСО — добавлять и
          редактировать новости, приказы и состав руководства. Все изменения публикуются
          на сайте мгновенно.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className={cn("rounded-xl border bg-navy-light/40 p-5", c.border)}
          >
            <div className="flex items-center gap-3 mb-2">
              <c.icon className={cn("h-7 w-7", c.color)} />
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {c.label}
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="font-serif-display text-4xl font-bold text-foreground/90">{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div>
        <h3 className="font-serif-display text-lg text-gold-light mb-4 flex items-center gap-2">
          <Calendar className="h-4 w-4" /> Последняя активность
        </h3>
        <div className="space-y-2">
          {recent.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-gold/15 bg-navy-light/30 p-3 hover:border-gold/30 transition-colors"
            >
              {item.type === "news" ? (
                <Newspaper className="h-4 w-4 text-gold/70 shrink-0" />
              ) : (
                <ScrollText className="h-4 w-4 text-sky-300/70 shrink-0" />
              )}
              <p className="text-sm text-foreground/90 flex-1 min-w-0 truncate">{item.title}</p>
              <span className="text-xs text-muted-foreground shrink-0">
                {new Date(item.date).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
          ))}
          {recent.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">Активности пока нет</p>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-3">
        <Link
          href="/admin"
          onClick={(e) => {
            e.preventDefault();
            // switch to news tab — we'll use state via hash
            const event = new CustomEvent("admin-tab", { detail: "news" });
            window.dispatchEvent(event);
          }}
          className="flex items-center gap-3 rounded-lg border border-gold/30 bg-navy-light/40 p-4 hover:border-gold/50 transition-all"
        >
          <Newspaper className="h-5 w-5 text-gold" />
          <span className="text-sm text-foreground/90">Добавить новость</span>
        </Link>
        <a
          href="/orders"
          className="flex items-center gap-3 rounded-lg border border-sky-500/30 bg-navy-light/40 p-4 hover:border-sky-500/50 transition-all"
        >
          <ScrollText className="h-5 w-5 text-sky-300" />
          <span className="text-sm text-foreground/90">Открыть приказы</span>
        </a>
        <a
          href="/leaders"
          className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-navy-light/40 p-4 hover:border-emerald-500/50 transition-all"
        >
          <Users className="h-5 w-5 text-emerald-300" />
          <span className="text-sm text-foreground/90">Состав руководства</span>
        </a>
      </div>
    </div>
  );
}
