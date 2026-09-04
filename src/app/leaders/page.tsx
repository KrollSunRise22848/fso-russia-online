"use client";

import { useState, useMemo } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/site/Card";
import { useFetch } from "@/hooks/use-fetch";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Award,
  Building2,
  Search,
  Users,
  Shield,
} from "lucide-react";
import { DEPARTMENTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Leader {
  id: string;
  fullName: string;
  rank: string;
  position: string;
  department: string;
  orderNumber: number;
  bio: string | null;
  awards: string | null;
  imageUrl: string | null;
  isActive: boolean;
}

const DEPT_COLOR: Record<string, string> = {
  ФСО: "bg-gold/15 text-gold border-gold/40",
  УСН: "bg-violet-900/30 text-violet-300 border-violet-500/40",
  СБП: "bg-rose-900/30 text-rose-300 border-rose-500/40",
  ООС: "bg-sky-900/30 text-sky-300 border-sky-500/40",
  КК: "bg-amber-900/30 text-amber-300 border-amber-500/40",
  УПП: "bg-emerald-900/30 text-emerald-300 border-emerald-500/40",
  ОПП: "bg-teal-900/30 text-teal-300 border-teal-500/40",
  Штаб: "bg-blue-900/30 text-blue-300 border-blue-500/40",
  "Кадровый аппарат": "bg-cyan-900/30 text-cyan-300 border-cyan-500/40",
};

export default function LeadersPage() {
  const { data, loading } = useFetch<{ leaders: Leader[] }>("/api/leaders");
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (!data?.leaders) return [];
    return data.leaders.filter((l) => {
      const matchesQuery =
        !query ||
        l.fullName.toLowerCase().includes(query.toLowerCase()) ||
        l.position.toLowerCase().includes(query.toLowerCase()) ||
        l.rank.toLowerCase().includes(query.toLowerCase());
      const matchesDept = deptFilter === "all" || l.department === deptFilter;
      return matchesQuery && matchesDept;
    });
  }, [data, query, deptFilter]);

  const stats = useMemo(() => {
    const byDept: Record<string, number> = {};
    data?.leaders?.forEach((l) => {
      byDept[l.department] = (byDept[l.department] || 0) + 1;
    });
    return byDept;
  }, [data]);

  return (
    <SiteLayout
      title="Состав руководства"
      subtitle="Руководящий состав Федеральной Службы Охраны — Дирекция, начальники управлений и отделов"
      breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Руководство" }]}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <Card border="gold">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-gold" />
              <div>
                <p className="font-serif-display text-2xl font-bold gold-text-gradient">
                  {data?.leaders?.length ?? 0}
                </p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Всего</p>
              </div>
            </div>
          </Card>
          {Object.entries(stats).slice(0, 3).map(([dept, count]) => (
            <Card key={dept} border="gold">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-gold/70" />
                <div>
                  <p className="font-serif-display text-2xl font-bold text-foreground/90">{count}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{dept}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по ФИО, должности или званию..."
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-navy-light/60 border border-gold/30 focus:border-gold text-foreground placeholder:text-muted-foreground/70"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-thin">
            <button
              onClick={() => setDeptFilter("all")}
              className={cn(
                "px-3 py-2 rounded-md text-xs uppercase tracking-wider whitespace-nowrap transition-all",
                deptFilter === "all"
                  ? "bg-gold/20 text-gold border border-gold/40"
                  : "border border-gold/20 text-muted-foreground hover:text-gold"
              )}
            >
              Все
            </button>
            {DEPARTMENTS.map((d) => (
              <button
                key={d}
                onClick={() => setDeptFilter(d)}
                className={cn(
                  "px-3 py-2 rounded-md text-xs uppercase tracking-wider whitespace-nowrap transition-all",
                  deptFilter === d
                    ? "bg-gold/20 text-gold border border-gold/40"
                    : "border border-gold/20 text-muted-foreground hover:text-gold"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl bg-navy-light" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            {query || deptFilter !== "all"
              ? "По заданным фильтрам ничего не найдено."
              : "Руководителей пока нет."}
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((leader, i) => (
              <div
                key={leader.id}
                className="group relative rounded-xl border border-gold/25 bg-navy-light/50 p-5 hover:border-gold/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {i === 0 && (
                  <div className="absolute top-0 right-0 px-2 py-1 text-[10px] uppercase tracking-wider bg-gold text-navy-dark font-bold">
                    Руководитель
                  </div>
                )}

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-16 w-16 rounded-full border-2 border-gold/50 overflow-hidden bg-gradient-to-br from-navy to-navy-dark flex items-center justify-center shrink-0">
                    {leader.imageUrl ? (
                      <img src={leader.imageUrl} alt={leader.fullName} className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-serif-display text-2xl font-bold text-gold">
                        {leader.fullName
                          .split(" ")
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif-display text-lg font-semibold text-foreground leading-tight">
                      {leader.fullName}
                    </h3>
                    <p className="text-xs text-gold-light uppercase tracking-wider mt-1">
                      {leader.rank}
                    </p>
                  </div>
                </div>

                {/* Position */}
                <div className="flex items-start gap-2 mb-3">
                  <Crown className="h-4 w-4 text-gold/70 mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground/90 leading-snug">{leader.position}</p>
                </div>

                {/* Department badge */}
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-4 w-4 text-gold/70 shrink-0" />
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] uppercase tracking-wider font-medium border",
                      DEPT_COLOR[leader.department] || "bg-gold/10 text-gold border-gold/30"
                    )}
                  >
                    {leader.department}
                  </Badge>
                </div>

                {/* Bio */}
                {leader.bio && (
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                    {leader.bio}
                  </p>
                )}

                {/* Awards */}
                {leader.awards && (
                  <div className="pt-3 border-t border-gold/15 flex items-start gap-2">
                    <Award className="h-4 w-4 text-gold/70 mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground italic">{leader.awards}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
