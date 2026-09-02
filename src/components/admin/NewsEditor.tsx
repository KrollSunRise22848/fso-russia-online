"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Edit, Trash2, Pin, PinOff, Eye, EyeOff, Save } from "lucide-react";
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
import { NEWS_CATEGORIES } from "@/lib/constants";
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

interface FormState {
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  isPinned: boolean;
  published: boolean;
}

const EMPTY: FormState = {
  title: "",
  summary: "",
  content: "",
  category: "Общее",
  imageUrl: "",
  isPinned: false,
  published: true,
};

export function NewsEditor() {
  const { toast } = useToast();
  const { data, loading, refetch } = useFetch<{ news: NewsItem[] }>("/api/news");
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        summary: editing.summary,
        content: editing.content,
        category: editing.category,
        imageUrl: editing.imageUrl || "",
        isPinned: editing.isPinned,
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
    if (!form.title.trim() || !form.summary.trim() || !form.content.trim()) {
      toast({ title: "Заполните все обязательные поля", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const url = editing ? `/api/news/${editing.id}` : "/api/news";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Ошибка");
      toast({ title: editing ? "Новость обновлена" : "Новость создана" });
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
    if (!confirm("Удалить новость безвозвратно?")) return;
    try {
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Ошибка удаления");
      toast({ title: "Новость удалена" });
      refetch();
    } catch (e) {
      toast({
        title: "Ошибка удаления",
        description: e instanceof Error ? e.message : "",
        variant: "destructive",
      });
    }
  };

  const togglePin = async (item: NewsItem) => {
    try {
      await fetch(`/api/news/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPinned: !item.isPinned }),
      });
      refetch();
    } catch {
      toast({ title: "Ошибка", variant: "destructive" });
    }
  };

  const togglePublish = async (item: NewsItem) => {
    try {
      await fetch(`/api/news/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !item.published }),
      });
      refetch();
    } catch {
      toast({ title: "Ошибка", variant: "destructive" });
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
      {/* Header actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm uppercase tracking-wider text-gold-light">
          Всего: {data?.news?.length || 0}
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

      {/* Form */}
      {showForm && (
        <div className="rounded-lg border border-gold/30 bg-navy-light/40 p-4 space-y-3">
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
              <Label className="text-xs uppercase tracking-wider text-gold-light">Категория</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger className="bg-navy-dark border-gold/30 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-gold/30">
                  {NEWS_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-gold-light">URL изображения</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="/images/..."
                className="bg-navy-dark border-gold/30"
              />
            </div>
          </div>
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={form.isPinned}
                onCheckedChange={(v) => setForm({ ...form, isPinned: v })}
              />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Закрепить</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.published}
                onCheckedChange={(v) => setForm({ ...form, published: v })}
              />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Опубликовать</span>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              onClick={save}
              disabled={saving}
              className="bg-gold text-navy-dark hover:bg-gold-light"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editing ? "Сохранить" : "Создать"}
            </Button>
            <Button size="sm" variant="outline" onClick={reset} className="border-gold/30 text-foreground">
              Отмена
            </Button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {data?.news?.map((item) => (
          <div
            key={item.id}
            className={cn(
              "rounded-lg border bg-navy-light/40 p-3 flex items-start gap-3",
              item.isPinned ? "border-gold/50" : "border-gold/20",
              !item.published && "opacity-60"
            )}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-[10px] uppercase border-gold/40 text-gold bg-gold/10">
                  {item.category}
                </Badge>
                {item.isPinned && (
                  <Badge variant="outline" className="text-[10px] uppercase border-gold/50 text-gold bg-gold/10">
                    <Pin className="h-3 w-3 mr-1" /> Закреплено
                  </Badge>
                )}
                {!item.published && (
                  <Badge variant="outline" className="text-[10px] uppercase border-zinc-600 text-zinc-400">
                    Скрыто
                  </Badge>
                )}
              </div>
              <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground truncate">{item.summary}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => togglePin(item)}
                className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gold/15 text-muted-foreground hover:text-gold transition-colors"
                title={item.isPinned ? "Открепить" : "Закрепить"}
              >
                {item.isPinned ? <PinOff className="h-3.5 w-3.5" /> : <Pin className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={() => togglePublish(item)}
                className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gold/15 text-muted-foreground hover:text-gold transition-colors"
                title={item.published ? "Скрыть" : "Опубликовать"}
              >
                {item.published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={() => setEditing(item)}
                className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gold/15 text-muted-foreground hover:text-gold transition-colors"
                title="Редактировать"
              >
                <Edit className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => remove(item.id)}
                className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-red-900/40 text-muted-foreground hover:text-red-300 transition-colors"
                title="Удалить"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
        {data?.news?.length === 0 && (
          <p className="text-center text-xs text-muted-foreground py-8">Новостей пока нет</p>
        )}
      </div>
    </div>
  );
}
