"use client";

import { useState, useMemo } from "react";
import { OrnateHeading, SectionWrapper } from "./OrnateHeading";
import { useFetch } from "@/hooks/use-fetch";
import { ScrollText, Calendar, Signature, Filter, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";

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

export function OrdersSection() {
  const { data, loading } = useFetch<{ orders: Order[] }>("/api/orders");
  const [selected, setSelected] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (!data?.orders) return [];
    if (statusFilter === "all") return data.orders;
    return data.orders.filter((o) => o.status === statusFilter);
  }, [data, statusFilter]);

  return (
    <SectionWrapper id="orders" className="bg-navy-dark border-t border-gold/20">
      <OrnateHeading
        title="Приказы"
        subtitle="Официальные приказы Директора Федеральной Службы Охраны"
      />

      <div className="flex items-center justify-center gap-2 mb-8">
        <Filter className="h-4 w-4 text-gold/70" />
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Фильтр:</span>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] h-8 bg-navy-light border-gold/30 text-xs">
            <SelectValue placeholder="Все приказы" />
          </SelectTrigger>
          <SelectContent className="bg-navy-light border-gold/30">
            <SelectItem value="all" className="text-xs">Все приказы</SelectItem>
            {ORDER_STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl bg-navy-light" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">Приказов не найдено.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelected(order)}
              className="group relative cursor-pointer rounded-xl border border-gold/25 bg-navy-light/40 hover:border-gold/60 hover:bg-navy-light/60 transition-all p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-5"
            >
              {/* Number block */}
              <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-1 md:w-32 shrink-0">
                <div className="h-11 w-11 rounded-lg bg-gold/10 border border-gold/40 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <ScrollText className="h-5 w-5 text-gold" />
                </div>
                <span className="font-serif-display text-sm font-bold text-gold-light tracking-wider whitespace-nowrap">
                  {order.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] uppercase tracking-wider border",
                      CATEGORY_COLOR[order.category] || CATEGORY_COLOR.Общий
                    )}
                  >
                    {order.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] uppercase tracking-wider border",
                      STATUS_COLOR[order.status] || STATUS_COLOR.Действует
                    )}
                  >
                    {order.status}
                  </Badge>
                </div>
                <h3 className="font-serif-display text-base md:text-lg font-semibold text-foreground mb-1 leading-snug group-hover:text-gold-light transition-colors">
                  {order.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{order.summary}</p>
              </div>

              {/* Meta */}
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
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] uppercase tracking-wider border",
                  CATEGORY_COLOR[selected?.category || ""] || CATEGORY_COLOR.Общий
                )}
              >
                {selected?.category}
              </Badge>
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] uppercase tracking-wider border",
                  STATUS_COLOR[selected?.status || ""] || STATUS_COLOR.Действует
                )}
              >
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
    </SectionWrapper>
  );
}
