"use client";

import { useState, useMemo } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/site/Card";
import { useFetch } from "@/hooks/use-fetch";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  ScrollText,
  Calendar,
  Signature,
  Filter,
  Search,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ORDER_STATUSES, ORDER_CATEGORIES } from "@/lib/constants";

interface Order {
  id: string;
  number: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  signedBy: string;
  signedRole: string;
  status: string;
  published: boolean;
  createdAt: string;
}

const STATUS_COLOR: Record<string, string> = {
  Действует: "bg-emerald-900/30 text-emerald-300 border-emerald-500/40",
  Отменён: "bg-red-900/30 text-red-300 border-red-500/40",
  "Утратил силу": "bg-zinc-800/50 text-zinc-400 border-zinc-600/40",
  "В разработке": "bg-blue-900/30 text-blue-300 border-blue-500/40",
};

const CATEGORY_COLOR: Record<string, string> = {
  Общий: "bg-gold/15 text-gold border-gold/40",
  "По личному составу": "bg-purple-900/30 text-purple-300 border-purple-500/40",
  "По строевой части": "bg-blue-900/30 text-blue-300 border-blue-500/40",
  Дисциплинарный: "bg-red-900/30 text-red-300 border-red-500/40",
  "По боевой подготовке": "bg-emerald-900/30 text-emerald-300 border-emerald-500/40",
};

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

export default function OrdersPage() {
  const { data, loading } = useFetch<{ orders: Order[] }>("/api/orders");
  const [selected, setSelected] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!data?.orders) return [];
    return data.orders.filter((o) => {
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || o.category === categoryFilter;
      const matchesQuery =
        !query ||
        o.title.toLowerCase().includes(query.toLowerCase()) ||
        o.number.toLowerCase().includes(query.toLowerCase()) ||
        o.summary.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesCategory && matchesQuery;
    });
  }, [data, statusFilter, categoryFilter, query]);

  const stats = useMemo(() => {
    if (!data?.orders) return { total: 0, active: 0, archived: 0 };
    return {
      total: data.orders.length,
      active: data.orders.filter((o) => o.status === "Действует").length,
      archived: data.orders.filter((o) => o.status !== "Действует").length,
    };
  }, [data]);

  return (
    <SiteLayout
      title="Приказы"
      subtitle="Официальные приказы Директора Федеральной Службы Охраны"
      breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Приказы" }]}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Card border="gold">
            <div className="flex items-center gap-3">
              <ScrollText className="h-8 w-8 text-gold" />
              <div>
                <p className="font-serif-display text-2xl font-bold gold-text-gradient">{stats.total}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Всего</p>
              </div>
            </div>
          </Card>
          <Card border="emerald">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <span className="text-emerald-300 text-xs">✓</span>
              </div>
              <div>
                <p className="font-serif-display text-2xl font-bold text-emerald-300">{stats.active}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Действует</p>
              </div>
            </div>
          </Card>
          <Card border="rose">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                <span className="text-rose-300 text-xs">×</span>
              </div>
              <div>
                <p className="font-serif-display text-2xl font-bold text-rose-300">{stats.archived}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Архив</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по номеру, названию или содержанию..."
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-navy-light/60 border border-gold/30 focus:border-gold text-foreground placeholder:text-muted-foreground/70"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-navy-light/60 border-gold/30 text-sm">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent className="bg-navy-light border-gold/30">
              <SelectItem value="all">Все статусы</SelectItem>
              {ORDER_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[220px] bg-navy-light/60 border-gold/30 text-sm">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent className="bg-navy-light border-gold/30">
              <SelectItem value="all">Все категории</SelectItem>
              {ORDER_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl bg-navy-light" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            {query || statusFilter !== "all" || categoryFilter !== "all"
              ? "По заданным фильтрам приказов не найдено."
              : "Приказов пока нет."}
          </p>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelected(order)}
                className="group relative cursor-pointer rounded-xl border border-gold/25 bg-navy-light/40 hover:border-gold/60 hover:bg-navy-light/60 transition-all p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-5"
              >
                <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-1 md:w-32 shrink-0">
                  <div className="h-11 w-11 rounded-lg bg-gold/10 border border-gold/40 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <ScrollText className="h-5 w-5 text-gold" />
                  </div>
                  <span className="font-serif-display text-sm font-bold text-gold-light tracking-wider whitespace-nowrap">
                    {order.number}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Badge variant="outline" className={cn("text-[10px] uppercase tracking-wider border", CATEGORY_COLOR[order.category] || "bg-gold/15 text-gold border-gold/40")}>
                      {order.category}
                    </Badge>
                    <Badge variant="outline" className={cn("text-[10px] uppercase tracking-wider border", STATUS_COLOR[order.status] || STATUS_COLOR.Действует)}>
                      {order.status}
                    </Badge>
                  </div>
                  <h3 className="font-serif-display text-base md:text-lg font-semibold text-foreground mb-1 leading-snug group-hover:text-gold-light transition-colors">
                    {order.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{order.summary}</p>
                </div>
                <div className="md:text-right text-xs text-muted-foreground md:w-36 shrink-0">
                  <div className="flex md:justify-end items-center gap-1 mb-0.5">
                    <Calendar className="h-3 w-3" />
                    {formatDate(order.createdAt)}
                  </div>
                  <div className="flex md:justify-end items-center gap-1 italic">
                    <Signature className="h-3 w-3" />
                    {order.signedBy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl bg-navy-dark border-gold/40 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-lg bg-gold/10 border border-gold/40 flex items-center justify-center shrink-0">
                <ScrollText className="h-6 w-6 text-gold" />
              </div>
              <div>
                <div className="font-serif-display text-2xl font-bold text-gold-light tracking-wider">
                  {selected?.number}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  от {selected && formatDate(selected.createdAt)}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="ml-auto h-8 w-8 rounded-md hover:bg-gold/10 flex items-center justify-center text-muted-foreground hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={cn("text-[10px] uppercase tracking-wider border", CATEGORY_COLOR[selected?.category || ""] || "bg-gold/15 text-gold border-gold/40")}>
                {selected?.category}
              </Badge>
              <Badge variant="outline" className={cn("text-[10px] uppercase tracking-wider border", STATUS_COLOR[selected?.status || ""] || STATUS_COLOR.Действует)}>
                {selected?.status}
              </Badge>
            </div>
            <DialogTitle className="font-serif-display text-xl text-foreground mt-3">
              {selected?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="italic text-sm text-foreground/80 font-cyrillic mb-4 pb-4 border-b border-gold/20">
              {selected?.summary}
            </p>
            <div className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
              {selected?.content}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gold/20">
            <div className="text-right">
              <p className="text-sm text-foreground font-serif-display italic">{selected?.signedBy}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{selected?.signedRole}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
