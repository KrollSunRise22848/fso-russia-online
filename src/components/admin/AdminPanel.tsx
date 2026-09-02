"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdmin } from "@/lib/admin-store";
import { NewsEditor } from "./NewsEditor";
import { OrdersEditor } from "./OrdersEditor";
import { LeadersEditor } from "./LeadersEditor";
import { Newspaper, ScrollText, Users, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminPanel() {
  const { panelOpen, closePanel, admin } = useAdmin();

  // Only render when admin is logged in (client-side, after checkSession)
  if (!admin) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closePanel}
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          panelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!panelOpen}
      />

      {/* Slide-over panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full sm:max-w-2xl bg-navy-dark border-l border-gold/40 shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-out",
          panelOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!panelOpen}
        role="dialog"
        aria-label="Панель администратора"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gold/30 bg-navy sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gold/10 border border-gold/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-serif-display text-lg gold-text-gradient">
                Панель администратора
              </h2>
              <p className="text-xs text-muted-foreground uppercase tracking-wider truncate">
                {admin?.name || admin?.username} · {admin?.role === "super" ? "Главный администратор" : "Администратор"}
              </p>
            </div>
            <button
              onClick={closePanel}
              className="h-9 w-9 flex items-center justify-center rounded-md border border-gold/30 text-muted-foreground hover:text-gold hover:border-gold/60 transition-all shrink-0"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tabs + editors (always mounted when admin is logged in) */}
        <div className="px-6 py-5">
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="grid grid-cols-3 w-full bg-navy-light/40 border border-gold/20 h-auto p-1">
              <TabsTrigger
                value="news"
                className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold text-muted-foreground flex flex-col items-center gap-1 py-2 text-xs"
              >
                <Newspaper className="h-4 w-4" />
                Новости
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold text-muted-foreground flex flex-col items-center gap-1 py-2 text-xs"
              >
                <ScrollText className="h-4 w-4" />
                Приказы
              </TabsTrigger>
              <TabsTrigger
                value="leaders"
                className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold text-muted-foreground flex flex-col items-center gap-1 py-2 text-xs"
              >
                <Users className="h-4 w-4" />
                Руководство
              </TabsTrigger>
            </TabsList>
            <TabsContent value="news" className="mt-4">
              <NewsEditor />
            </TabsContent>
            <TabsContent value="orders" className="mt-4">
              <OrdersEditor />
            </TabsContent>
            <TabsContent value="leaders" className="mt-4">
              <LeadersEditor />
            </TabsContent>
          </Tabs>
        </div>
      </aside>
    </>
  );
}
