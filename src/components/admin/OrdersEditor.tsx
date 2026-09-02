"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Edit, Trash2, Save } from "lucide-react";
import { useFetch } from "@/hooks/use-fetch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ORDER_CATEGORIES, ORDER_STATUSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

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

interface FormState {
  number: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  signedBy: string;
  signedRole: string;
  status: string;
  published: boolean;
}

const EMPTY: FormState = {
  number: "",
  title: "",
  summary: "",
  content: "",
  category: "Общий",
  signedBy: "",
  signedRole: "",
  status: "Действует",
  published: true,
};

const STATUS_COLOR: Record<string, string> = {
  Действует: "border-emerald-500/40 text-emerald-300 bg-emerald-900/20",
  Отменён: "border-red-500/40 text-red-300 bg-red-900/20",
  "Утратил силу": "border-zinc-600 text-zinc-400 bg-zinc-800/40",
  "В разработке": "border-blue-500/40 text-blue-300 bg-blue-900/20",
};

export function OrdersEditor() {
  const { toast } = useToast();
  const { data, loading, refetch } = useFetch<{ orders: Order[] }>("/api/orders");
  const [editing, setEditing] = useState<Order | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        number: editing.number,
        title: editing.title,
        summary: editing.summary,
        content: editing.content,
        category: editing.category,
        signedBy: editing.signedBy,
        signedRole: editing.signedRole,
        status: editing.status,
        published: editing.published,
      });
      setShowForm(true);
    }
  }, [editing]);

  const reset = () => {
    setForm(EMPTY);
    setEditing(null);
    setShowForm(false);
  };

  const save = async () => {
    if (!form.number.trim() || !form.title.trim() || !form.summary.trim() || !form.content.trim() || !form.signedBy.trim()) {
      toast({ title: "Заполните все обязательные поля", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const url = editing ? `/api/orders/${editing.id}` : "/api/orders";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Ошибка");
      toast({ title: editing ? "Приказ обновлён" : "Приказ создан" });
      reset();
      refetch();
    } catch (e) {
      toast({
        title: "Ошибка",
        description: e instanceof Error ? e.message : "Ошибка сервера",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Удалить приказ безвозвратно?")) return;
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Ошибка удаления");
      toast({ title: "Приказ удалён" });
      refetch();
    } catch (e) {
      toast({ title: "Ошибка", description: e instanceof Error ? e.message : "", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm uppercase tracking-wider text-gold-light">
          Всего: {data?.orders?.length || 0}
        </h3>
        <Button
          size="sm"
          onClick={() => {
            setEditing(null);
            setForm(EMPTY);
            setShowForm(true);
          }}
          className="bg-gold/15 text-gold border border-gold/40 hover:bg-gold/25"
        >
          <Plus className="h-4 w-4" /> Добавить
        </Button>
      </div>

      {showForm && (
        <div className="rounded-lg border border-gold/30 bg-navy-light/40 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-gold-light">Номер *</Label>
              <Input
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                placeholder="№ 1/2024"
                className="bg-navy-dark border-gold/30"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-gold-light">Категория</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="bg-navy-dark border-gold/30 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-gold/30">
                  {ORDER_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-gold-light">Заголовок *</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-navy-dark border-gold/30"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-gold-light">Краткое описание *</Label>
            <Textarea
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              rows={2}
              className="bg-navy-dark border-gold/30 resize-y"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-gold-light">Полный текст *</Label>
            <Textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={6}
              className="bg-navy-dark border-gold/30 resize-y"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-gold-light">Кем подписан *</Label>
              <Input
                value={form.signedBy}
                onChange={(e) => setForm({ ...form, signedBy: e.target.value })}
                placeholder="А. В. Ковалёв"
                className="bg-navy-dark border-gold/30"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-gold-light">Должность</Label>
              <Input
                value={form.signedRole}
                onChange={(e) => setForm({ ...form, signedRole: e.target.value })}
                placeholder="Директор ФСО"
                className="bg-navy-dark border-gold/30"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-gold-light">Статус</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger className="bg-navy-dark border-gold/30 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-gold/30">
                  {ORDER_STATUSES.map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2 pb-1.5">
              <Switch
                checked={form.published}
                onCheckedChange={(v) => setForm({ ...form, published: v })}
              />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Опубликовать</span>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button size="sm" onClick={save} disabled={saving} className="bg-gold text-navy-dark hover:bg-gold-light">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editing ? "Сохранить" : "Создать"}
            </Button>
            <Button size="sm" variant="outline" onClick={reset} className="border-gold/30 text-foreground">
              Отмена
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {data?.orders?.map((order) => (
          <div
            key={order.id}
            className={cn(
              "rounded-lg border bg-navy-light/40 p-3",
              !order.published ? "border-zinc-600/40 opacity-60" : "border-gold/20"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-serif-display text-sm font-bold text-gold-light tracking-wider">
                    {order.number}
                  </span>
                  <Badge variant="outline" className={cn("text-[10px] uppercase", STATUS_COLOR[order.status])}>
                    {order.status}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] uppercase border-gold/30 text-gold bg-gold/10">
                    {order.category}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-foreground truncate">{order.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {order.signedBy} · {order.signedRole}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setEditing(order)}
                  className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gold/15 text-muted-foreground hover:text-gold transition-colors"
                  title="Редактировать"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => remove(order.id)}
                  className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-red-900/40 text-muted-foreground hover:text-red-300 transition-colors"
                  title="Удалить"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {data?.orders?.length === 0 && (
          <p className="text-center text-xs text-muted-foreground py-8">Приказов пока нет</p>
        )}
      </div>
    </div>
  );
}
