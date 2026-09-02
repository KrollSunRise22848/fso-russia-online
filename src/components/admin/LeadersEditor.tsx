"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Edit, Trash2, Save, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
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
import { DEPARTMENTS, RANKS } from "@/lib/constants";
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

interface FormState {
  fullName: string;
  rank: string;
  position: string;
  department: string;
  orderNumber: number;
  bio: string;
  awards: string;
  imageUrl: string;
  isActive: boolean;
}

const EMPTY: FormState = {
  fullName: "",
  rank: "Полковник",
  position: "",
  department: "ФСО",
  orderNumber: 10,
  bio: "",
  awards: "",
  imageUrl: "",
  isActive: true,
};

const DEPT_COLOR: Record<string, string> = {
  ФСО: "border-gold/40 text-gold bg-gold/10",
  УСН: "border-red-500/40 text-red-300 bg-red-900/20",
  Штаб: "border-blue-500/40 text-blue-300 bg-blue-900/20",
  "Кадровый аппарат": "border-emerald-500/40 text-emerald-300 bg-emerald-900/20",
};

export function LeadersEditor() {
  const { toast } = useToast();
  const { data, loading, refetch } = useFetch<{ leaders: Leader[] }>("/api/leaders");
  const [editing, setEditing] = useState<Leader | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        fullName: editing.fullName,
        rank: editing.rank,
        position: editing.position,
        department: editing.department,
        orderNumber: editing.orderNumber,
        bio: editing.bio || "",
        awards: editing.awards || "",
        imageUrl: editing.imageUrl || "",
        isActive: editing.isActive,
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
    if (!form.fullName.trim() || !form.position.trim()) {
      toast({ title: "Заполните ФИО и должность", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const url = editing ? `/api/leaders/${editing.id}` : "/api/leaders";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Ошибка");
      toast({ title: editing ? "Запись обновлена" : "Запись создана" });
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
    if (!confirm("Удалить запись из руководства?")) return;
    try {
      const res = await fetch(`/api/leaders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Ошибка удаления");
      toast({ title: "Запись удалена" });
      refetch();
    } catch (e) {
      toast({ title: "Ошибка", description: e instanceof Error ? e.message : "", variant: "destructive" });
    }
  };

  const move = async (leader: Leader, dir: -1 | 1) => {
    const leaders = data?.leaders;
    if (!leaders) return;
    const sorted = [...leaders].sort((a, b) => a.orderNumber - b.orderNumber);
    const idx = sorted.findIndex((l) => l.id === leader.id);
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= sorted.length) return;
    const target = sorted[targetIdx];
    // Swap orderNumbers
    await Promise.all([
      fetch(`/api/leaders/${leader.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber: target.orderNumber }),
      }),
      fetch(`/api/leaders/${target.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber: leader.orderNumber }),
      }),
    ]);
    refetch();
  };

  const toggleActive = async (l: Leader) => {
    await fetch(`/api/leaders/${l.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !l.isActive }),
    });
    refetch();
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
          Всего: {data?.leaders?.length || 0}
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
              <Label className="text-xs uppercase tracking-wider text-gold-light">ФИО *</Label>
              <Input
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="bg-navy-dark border-gold/30"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-gold-light">Звание</Label>
              <Select value={form.rank} onValueChange={(v) => setForm({ ...form, rank: v })}>
                <SelectTrigger className="bg-navy-dark border-gold/30 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-gold/30 max-h-60">
                  {RANKS.map((r) => (
                    <SelectItem key={r} value={r} className="text-xs">{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-gold-light">Должность *</Label>
            <Input
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="bg-navy-dark border-gold/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-gold-light">Подразделение</Label>
              <Select value={form.department} onValueChange={(v) => setForm({ ...form, department: v })}>
                <SelectTrigger className="bg-navy-dark border-gold/30 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-gold/30">
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-gold-light">Порядок отображения</Label>
              <Input
                type="number"
                value={form.orderNumber}
                onChange={(e) => setForm({ ...form, orderNumber: Number(e.target.value) })}
                className="bg-navy-dark border-gold/30"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-gold-light">Биография</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={3}
              className="bg-navy-dark border-gold/30 resize-y"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-gold-light">Награды</Label>
            <Input
              value={form.awards}
              onChange={(e) => setForm({ ...form, awards: e.target.value })}
              className="bg-navy-dark border-gold/30"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-gold-light">URL фото</Label>
            <Input
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="/images/..."
              className="bg-navy-dark border-gold/30"
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Switch
              checked={form.isActive}
              onCheckedChange={(v) => setForm({ ...form, isActive: v })}
            />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Активен (отображается на сайте)</span>
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
        {[...(data?.leaders || [])]
          .sort((a, b) => a.orderNumber - b.orderNumber)
          .map((leader, idx, arr) => (
            <div
              key={leader.id}
              className={cn(
                "rounded-lg border bg-navy-light/40 p-3",
                leader.isActive ? "border-gold/20" : "border-zinc-600/40 opacity-60"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    onClick={() => move(leader, -1)}
                    disabled={idx === 0}
                    className="h-5 w-7 flex items-center justify-center rounded hover:bg-gold/15 text-muted-foreground hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowUp className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => move(leader, 1)}
                    disabled={idx === arr.length - 1}
                    className="h-5 w-7 flex items-center justify-center rounded hover:bg-gold/15 text-muted-foreground hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowDown className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] text-muted-foreground">#{leader.orderNumber}</span>
                    <Badge variant="outline" className={cn("text-[10px] uppercase", DEPT_COLOR[leader.department] || DEPT_COLOR["ФСО"])}>
                      {leader.department}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">{leader.fullName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {leader.rank} · {leader.position}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleActive(leader)}
                    className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gold/15 text-muted-foreground hover:text-gold transition-colors"
                    title={leader.isActive ? "Скрыть" : "Показать"}
                  >
                    {leader.isActive ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => setEditing(leader)}
                    className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gold/15 text-muted-foreground hover:text-gold transition-colors"
                    title="Редактировать"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => remove(leader.id)}
                    className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-red-900/40 text-muted-foreground hover:text-red-300 transition-colors"
                    title="Удалить"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        {data?.leaders?.length === 0 && (
          <p className="text-center text-xs text-muted-foreground py-8">Записей пока нет</p>
        )}
      </div>
    </div>
  );
}
