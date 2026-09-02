"use client";

import { useState } from "react";
import { OrnateHeading, SectionWrapper } from "./OrnateHeading";
import { useFetch } from "@/hooks/use-fetch";
import { Calendar, Pin, Newspaper, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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

export function NewsSection() {
  const { data, loading } = useFetch<{ news: NewsItem[] }>("/api/news");
  const [selected, setSelected] = useState<NewsItem | null>(null);

  return (
    <SectionWrapper id="news" className="bg-navy relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <OrnateHeading
        title="Новости"
        subtitle="Информация о служебной деятельности и событиях Службы"
      />

      {loading ? (
        <div className="grid md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-xl bg-navy-light" />
          ))}
        </div>
      ) : data?.news?.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">Новостей пока нет.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {data?.news?.map((item) => (
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
              </span>
            </article>
          ))}
        </div>
      )}

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
            </div>
            <DialogTitle className="font-serif-display text-2xl text-gold-light">
              {selected?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 prose prose-invert max-w-none">
            <p className="text-base text-foreground/80 italic font-cyrillic mb-4 pb-4 border-b border-gold/20">
              {selected?.summary}
            </p>
            <div className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
              {selected?.content}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
}
