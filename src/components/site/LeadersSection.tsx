"use client";

import { OrnateHeading, SectionWrapper } from "./OrnateHeading";
import { useFetch } from "@/hooks/use-fetch";
import { Crown, Award, Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

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
  УСН: "bg-red-900/30 text-red-300 border-red-500/40",
  Штаб: "bg-blue-900/30 text-blue-300 border-blue-500/40",
  "Кадровый аппарат": "bg-emerald-900/30 text-emerald-300 border-emerald-500/40",
};

export function LeadersSection() {
  const { data, loading } = useFetch<{ leaders: Leader[] }>("/api/leaders");

  return (
    <SectionWrapper id="leaders" className="bg-navy-dark border-t border-gold/20">
      <OrnateHeading
        title="Состав руководства"
        subtitle="Руководящий состав Федеральной Службы Охраны"
      />

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl bg-navy-light" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.leaders?.map((leader, i) => (
            <div
              key={leader.id}
              className="group relative rounded-xl border border-gold/25 bg-navy-light/50 p-5 hover:border-gold/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Order ribbon */}
              {i === 0 && (
                <div className="absolute top-0 right-0 px-2 py-1 text-[10px] uppercase tracking-wider bg-gold text-navy-dark font-bold">
                  Директор
                </div>
              )}

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-16 w-16 rounded-full border-2 border-gold/50 overflow-hidden bg-gradient-to-br from-navy to-navy-dark flex items-center justify-center shrink-0">
                  {leader.imageUrl ? (
                    <img
                      src={leader.imageUrl}
                      alt={leader.fullName}
                      className="h-full w-full object-cover"
                    />
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
                  <h3 className="font-serif-display text-lg font-semibold text-foreground leading-tight truncate">
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
                <p className="text-sm text-foreground/85 leading-snug">{leader.position}</p>
              </div>

              {/* Department badge */}
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-4 w-4 text-gold/70 shrink-0" />
                <Badge
                  variant="outline"
                  className={`text-[10px] uppercase tracking-wider font-medium border ${DEPT_COLOR[leader.department] || "bg-gold/10 text-gold border-gold/30"}`}
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
    </SectionWrapper>
  );
}
