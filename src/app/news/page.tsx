"use client";

import { useState, useMemo } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/site/Card";
import { useFetch } from "@/hooks/use-fetch";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Pin,
  Newspaper,
  Search,
  X,
  ArrowRight,
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
import { NEWS_CATEGORIES } from "@/lib/constants";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string | null;
  isPinned: boolean;
  published: boolean;
  createdAt: string;
}

const CATEGORY_COLOR: Record<string, string> = {
  Важно: "bg-red-900/30 text-red-300 border-red-500/40",
  События: "bg-emerald-900/30 text-emerald-300 border-emerald-500/40",
  Назначения: "bg-purple-900/30 text-purple-300 border-purple-500/40",
  "Учебные мероприятия": "bg-blue-900/30 text-blue-300 border-blue-500/40",
  Общее: "bg-gold/15 text-gold border-gold/40",
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

export default function NewsPage() {
  const { data, loading } = useFetch<{ news: NewsItem[] }>("/api/news?limit=100");
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!data?.news) return [];
    return data.news.filter((n) => {
      const matchesCategory = categoryFilter === "all" || n.category === categoryFilter;
      const matchesQuery =
        !query ||
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.summary.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [data, categoryFilter, query]);

  // Pinned first, then by date
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filtered]);

  return (
    <SiteLayout
      title="Новости"
      subtitle="Информация о служебной деятельности и событиях Федеральной Службы Охраны"
      breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Новости" }]}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по заголовку или описанию..."
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-navy-light/60 border border-gold/30 focus:border-gold text-foreground placeholder:text-muted-foreground/70"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[240px] bg-navy-light/60 border-gold/30 text-sm">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent className="bg-navy-light border-gold/30">
              <SelectItem value="all">Все категории</SelectItem>
              {NEWS_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* News list */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-44 rounded-xl bg-navy-light" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            {query || categoryFilter !== "all"
              ? "По заданным фильтрам новостей не найдено."
              : "Новостей пока нет."}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {sorted.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelected(item)}
                className={cn(
                  "group relative cursor-pointer rounded-xl border bg-navy-light/50 p-5 hover:border-gold/60 hover:-translate-y-1 transition-all duration-300",
                  item.isPinned ? "border-gold/50 ring-1 ring-gold/30" : "border-gold/25"
                )}
              >
                {item.isPinned && (
                  <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gold text-navy-dark flex items-center justify-center shadow-lg">
                    <Pin className="h-3.5 w-3.5" />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] uppercase tracking-wider border",
                      CATEGORY_COLOR[item.category] || CATEGORY_COLOR.Общее
                    )}
                  >
                    {item.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                    <Calendar className="h-3 w-3" />
                    {formatDate(item.createdAt)}
                  </div>
                </div>
                <h3 className="font-serif-display text-lg font-semibold text-gold-light mb-2 leading-snug group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-gold uppercase tracking-wider">
                  <Newspaper className="h-3.5 w-3.5" />
                  Читать далее
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl bg-navy-dark border-gold/40 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] uppercase tracking-wider border",
                  CATEGORY_COLOR[selected?.category || ""] || CATEGORY_COLOR.Общее
                )}
              >
                {selected?.category}
              </Badge>
              {selected?.isPinned && (
                <Badge variant="outline" className="text-[10px] uppercase border-gold/50 text-gold bg-gold/10">
                  <Pin className="h-3 w-3 mr-1" /> Закреплено
                </Badge>
              )}
              <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {selected && formatDate(selected.createdAt)}
              </span>
              <button
                onClick={() => setSelected(null)}
                className="h-7 w-7 rounded-md hover:bg-gold/10 flex items-center justify-center text-muted-foreground hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <DialogTitle className="font-serif-display text-2xl text-gold-light">
              {selected?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-base text-foreground/80 italic font-cyrillic mb-4 pb-4 border-b border-gold/20">
              {selected?.summary}
            </p>
            <div className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
              {selected?.content}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
