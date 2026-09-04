"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, SectionTitle } from "@/components/site/Card";
import {
  GraduationCap,
  Users,
  CheckCircle2,
  Ban,
  IdCard,
  Award,
  ShieldCheck,
  ScrollText,
  ArrowRight,
  BookOpen,
  AlertTriangle,
  Crosshair,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Обзор УПП" },
  { id: "opp", label: "Отдел ОПП" },
  { id: "requirements", label: "Требования" },
  { id: "restrictions", label: "Ограничения стажёров" },
  { id: "firearms", label: "Огневая подготовка" },
  { id: "basic", label: "Базовые нормы" },
  { id: "interaction", label: "Взаимодействие" },
];

export default function UppPage() {
  const [tab, setTab] = useState("overview");

  return (
    <SiteLayout
      title="Управление Подготовительного Подразделения"
      subtitle="УПП — приём, первичную подготовку и допуск новых сотрудников. Если вы хотите вступить в ФСО — вам сюда."
      breadcrumbs={[{ label: "Главная", href: "/" }, { label: "УПП" }]}
    >
      <div className="sticky top-16 md:top-20 z-30 bg-navy-dark/95 backdrop-blur-md border-b border-gold/20">
        <div className="max-w-6xl mx-auto px-2 md:px-8">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-thin">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "px-3 md:px-4 py-2 rounded-md text-xs md:text-sm uppercase tracking-wider whitespace-nowrap transition-all",
                  tab === t.id
                    ? "bg-gold/20 text-gold border border-gold/40"
                    : "text-muted-foreground hover:text-gold hover:bg-gold/5 border border-transparent"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {tab === "overview" && <OverviewTab />}
        {tab === "opp" && <OppTab />}
        {tab === "requirements" && <RequirementsTab />}
        {tab === "restrictions" && <RestrictionsTab />}
        {tab === "firearms" && <FirearmsTab />}
        {tab === "basic" && <BasicTab />}
        {tab === "interaction" && <InteractionTab />}
      </div>
    </SiteLayout>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-full bg-emerald-500/10 blur-2xl" />
            <div className="relative h-56 w-56 rounded-full border-2 border-emerald-500/40 bg-navy-light/40 flex items-center justify-center">
              <GraduationCap className="h-28 w-28 text-emerald-300" />
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          <h2 className="font-serif-display text-2xl md:text-3xl font-bold text-gold-light mb-4">
            О подразделении
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-3">
            <span className="text-gold font-semibold">УПП</span> — Управление Подготовительного
            Подразделения — подразделение ФСО, обеспечивающее приём, первичную подготовку и
            допуск новых сотрудников.
          </p>
          <p className="text-base text-foreground/85 leading-relaxed mb-3">
            Если вы хотите вступить в ФСО — вам сюда. УПП включает в себя{" "}
            <span className="text-emerald-300 font-semibold">два подразделения</span>: основное
            Учебно-Подготовительное подразделение и Отдел Первичной Подготовки (ОПП).
          </p>
          <p className="text-sm text-foreground/75 italic">
            Руководство: Куратор УПП → Начальник УПП → Зам. Начальника УПП.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card border="emerald" icon={<GraduationCap className="h-5 w-5" />} title="Учебно-Подготовительное подразделение / УПП">
          <p className="text-xs text-muted-foreground mb-2">Руководство:</p>
          <ul className="space-y-1 text-sm text-foreground/85">
            <li>• Начальник УПП</li>
            <li>• Зам. Начальника УПП</li>
            <li>• Зам. Начальника УПП</li>
            <li>• Зам. Начальника УПП</li>
          </ul>
        </Card>
        <Card border="emerald" icon={<Users className="h-5 w-5" />} title="Отдел Первичной Подготовки / ОПП">
          <p className="text-xs text-muted-foreground mb-2">Руководство:</p>
          <ul className="space-y-1 text-sm text-foreground/85">
            <li>• Начальник ОПП</li>
            <li>• Зам. Начальника ОПП</li>
            <li>• Зам. Начальника ОПП — 3 зама</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function OppTab() {
  return (
    <div className="space-y-6">
      <Card border="emerald" icon={<Users className="h-5 w-5" />} title="ОПП — Отдел Первичной Подготовки">
        <p className="text-base text-foreground/90 leading-relaxed mb-4">
          Отдел отвечает за приём и первичную подготовку новых сотрудников ФСО. Проводит
          базовую подготовку, знакомит с уставом и принимает теоретические экзамены.
        </p>

        <SectionTitle title="Функции ОПП" />
        <ul className="space-y-2 text-sm text-foreground/90">
          {[
            "Принимает новичков, помогает адаптироваться к службе",
            "Знакомит с уставом, структурой и регламентами",
            "Проводит базовую подготовку: физическую, огневую, тактическую",
            "Проверяет знания, принимает теоретические экзамены",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300/80 mt-0.5 shrink-0" />
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-4 border-t border-gold/15">
          <h4 className="font-serif-display text-base text-gold-light mb-2 flex items-center gap-2">
            <Award className="h-4 w-4" /> Права ОПП
          </h4>
          <ul className="space-y-1.5 text-sm text-foreground/85">
            {[
              "Проводить собеседования в любом здании Правительства РФ",
              "Требовать у новоприбывших документы, необходимые для приёма",
              "Проводить обучающие лекции и публиковать учебные материалы",
              "Проводить итоговую аттестацию и направлять сотрудников на службу",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-gold/70 mt-0.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card border="gold" icon={<BookOpen className="h-5 w-5" />} title="Что входит в программу подготовки">
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-gold/20 bg-navy-dark/40 p-3 text-center">
            <Crosshair className="h-7 w-7 text-gold mx-auto mb-1" />
            <p className="text-xs text-foreground/90 font-semibold">Физическая</p>
          </div>
          <div className="rounded-lg border border-gold/20 bg-navy-dark/40 p-3 text-center">
            <ShieldCheck className="h-7 w-7 text-gold mx-auto mb-1" />
            <p className="text-xs text-foreground/90 font-semibold">Огневая</p>
          </div>
          <div className="rounded-lg border border-gold/20 bg-navy-dark/40 p-3 text-center">
            <Scale className="h-7 w-7 text-gold mx-auto mb-1" />
            <p className="text-xs text-foreground/90 font-semibold">Тактическая</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function RequirementsTab() {
  const requirements = [
    { label: "Гражданство РФ", detail: "Гражданство Российской Федерации — обязательное условие" },
    { label: "Знание языка", detail: "Владение государственным языком РФ" },
    { label: "Возраст — от 21 года", detail: "Строже общей нормы ТК РФ (18 лет, ст. 8.2 ТК); для ФСО применяется специальная норма" },
    { label: "Медицинские справки", detail: "Актуальные медицинские справки о физическом и психическом здоровье" },
    { label: "Проверка благонадёжности", detail: "Проверка на благонадёжность, включая полиграф при необходимости" },
    { label: "Лицензия на оружие", detail: "Действующая лицензия на хранение и ношение оружия" },
    { label: "Отсутствие судимостей", detail: "Отсутствие судимостей и нахождения в розыске" },
  ];

  return (
    <div className="space-y-6">
      <Card border="gold" icon={<IdCard className="h-5 w-5" />} title="Требования к кандидату">
        <p className="text-xs text-muted-foreground mb-4">
          ФЗ «О ФСО РФ», Гл. 2 ст. 1 — приоритетная норма для ФСО
        </p>
        <div className="space-y-3">
          {requirements.map((r, i) => (
            <div key={r.label} className="flex items-start gap-3 rounded-lg border border-gold/15 bg-navy-dark/40 p-3">
              <div className="h-7 w-7 rounded-full bg-gold/20 border border-gold/40 text-gold text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{r.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card border="emerald" icon={<CheckCircle2 className="h-5 w-5" />} title="Что нужно для поступления">
        <div className="flex flex-wrap gap-2">
          {["Паспорт РФ", "Мед. справка", "Лицензия на оружие", "Справка об отсутствии судимости", "Полиграф (по необходимости)"].map((d) => (
            <span key={d} className="px-3 py-1.5 rounded-full text-xs border border-emerald-500/30 bg-emerald-900/15 text-emerald-300">
              {d}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

function RestrictionsTab() {
  return (
    <div className="space-y-6">
      <Card border="rose" icon={<AlertTriangle className="h-5 w-5" />} title="Ограничение полномочий стажёров">
        <p className="text-base text-foreground/90 leading-relaxed mb-3">
          Стажёры, курсанты и сотрудники младшего состава, проходящие первичную подготовку,
          <span className="text-rose-300 font-semibold"> не имеют права</span> самостоятельно
          осуществлять задержание, арест или привлечение лица к ответственности до
          завершения обучения и итоговой аттестации в ОПП.
        </p>
        <p className="text-sm text-foreground/85">
          До получения аттестации сотрудник действует только в сопровождении аттестованного
          напарника.
        </p>
        <div className="mt-3 pt-3 border-t border-rose-500/20">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Основание:</p>
          <p className="text-sm text-gold-light font-semibold">Гл. XII Процессуального кодекса</p>
        </div>
      </Card>

      <Card border="gold" icon={<Users className="h-5 w-5" />} title="Что это значит на практике">
        <ul className="space-y-2 text-sm text-foreground/90">
          <li className="flex items-start gap-2">
            <Ban className="h-4 w-4 text-rose-300/80 mt-0.5 shrink-0" />
            Стажёр <span className="text-rose-300 font-semibold">не может</span> самостоятельно задерживать
          </li>
          <li className="flex items-start gap-2">
            <Ban className="h-4 w-4 text-rose-300/80 mt-0.5 shrink-0" />
            Стажёр <span className="text-rose-300 font-semibold">не может</span> проводить арест
          </li>
          <li className="flex items-start gap-2">
            <Ban className="h-4 w-4 text-rose-300/80 mt-0.5 shrink-0" />
            Стажёр <span className="text-rose-300 font-semibold">не может</span> привлекать лицо к ответственности
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-300/80 mt-0.5 shrink-0" />
            Стажёр <span className="text-emerald-300 font-semibold">может</span> действовать с аттестованным напарником
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-300/80 mt-0.5 shrink-0" />
            После аттестации — полные полномочия
          </li>
        </ul>
      </Card>
    </div>
  );
}

function FirearmsTab() {
  return (
    <div className="space-y-6">
      <Card border="gold" icon={<Crosshair className="h-5 w-5" />} title="Огневая подготовка в ОПП">
        <p className="text-base text-foreground/90 leading-relaxed mb-3">
          Экзамен по обороту оружия — обязательная часть подготовки. ОПП включает в
          программу изучение правил обращения со служебным оружием и спецсредствами.
        </p>
        <p className="text-xs text-muted-foreground">Основание: Закон «Об обороте оружия и спецсредств РФ»</p>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card border="gold" icon={<ScrollText className="h-5 w-5" />} title="Что изучают">
          <ul className="space-y-2 text-sm text-foreground/90">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-gold/70 mt-0.5 shrink-0" />
              <div>
                Порядок ношения (скрытое/открытое) — <span className="text-gold-light">ст. 3.4, 3.9</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-gold/70 mt-0.5 shrink-0" />
              <div>
                Условия применения — <span className="text-gold-light">ст. 3.5</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-gold/70 mt-0.5 shrink-0" />
              <div>
                Ответственность за пренебрежительное обращение — <span className="text-gold-light">ст. 3.11</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-gold/70 mt-0.5 shrink-0" />
              <div>
                Порядок учёта и сдачи оружия — <span className="text-gold-light">ст. 3.1, 3.3, 3.13</span>
              </div>
            </li>
          </ul>
        </Card>

        <Card border="emerald" icon={<ShieldCheck className="h-5 w-5" />} title="Право силовых структур">
          <p className="text-sm text-foreground/85 leading-relaxed">
            Служащие силовых структур вправе носить и применять оружие{" "}
            <span className="text-emerald-300 font-semibold">независимо от серийного номера</span>,
            но обязаны знать порядок его учёта и сдачи.
          </p>
          <p className="text-xs text-muted-foreground italic mt-3">
            Эти нормы разъясняются на этапе подготовки в ОПП.
          </p>
        </Card>
      </div>
    </div>
  );
}

function BasicTab() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Базовые нормы приёма" subtitle="ФЗ «О ФСО РФ» — статус сотрудника после зачисления" align="center" />

      <div className="grid md:grid-cols-2 gap-4">
        <Card border="gold" icon={<ShieldCheck className="h-5 w-5" />} title="Представитель власти">
          <p className="text-sm text-foreground/85 leading-relaxed">
            Сотрудник, зачисленный в ФСО, при исполнении становится{" "}
            <span className="text-gold-light font-semibold">представителем власти</span> и
            находится под защитой государства.
          </p>
          <p className="text-xs text-muted-foreground mt-2">Гл. 2 ст. 2 п. 1</p>
        </Card>

        <Card border="violet" icon={<Scale className="h-5 w-5" />} title="Этика служебного поведения">
          <p className="text-sm text-foreground/85 leading-relaxed">
            Обязан быть сдержанным и соблюдать{" "}
            <span className="text-violet-300 font-semibold">этику служебного поведения</span> в
            любой ситуации, связанной с исполнением обязанностей.
          </p>
          <p className="text-xs text-muted-foreground mt-2">Гл. 2 ст. 2 п. 5</p>
        </Card>

        <Card border="amber" icon={<Award className="h-5 w-5" />} title="Первичное звание — лейтенант">
          <p className="text-sm text-foreground/85 leading-relaxed">
            Первичное специальное звание для новых сотрудников —{" "}
            <span className="text-amber-300 font-semibold">«лейтенант»</span>.
          </p>
          <p className="text-xs text-muted-foreground mt-2">Гл. 2 ст. 3 п. 2</p>
        </Card>

        <Card border="sky" icon={<ScrollText className="h-5 w-5" />} title="Ознакомление со званиями">
          <p className="text-sm text-foreground/85 leading-relaxed">
            ОПП обязан ознакомить новобранца с системой званий и внутренним регламентом
            соответствия званий должностям.
          </p>
          <p className="text-xs text-muted-foreground mt-2">Гл. 2 ст. 3 п. 4</p>
        </Card>
      </div>
    </div>
  );
}

function InteractionTab() {
  return (
    <div className="space-y-6">
      <Card border="emerald" icon={<ArrowRight className="h-5 w-5" />} title="Взаимодействие с другими подразделениями">
        <p className="text-base text-foreground/90 leading-relaxed mb-4">
          УПП вправе временно исполнять обязанности отделов УСН и УСБ при их нехватке
          кадров или по распоряжению начальника ФСО либо его первого заместителя.
          Аналогично УСБ вправе подменять УПП.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-900/15 p-3">
            <p className="text-xs uppercase tracking-wider text-emerald-300 mb-1">УПП может подменять</p>
            <p className="text-sm text-foreground/90">Отделы УСН и УСБ при нехватке кадров</p>
          </div>
          <div className="rounded-lg border border-sky-500/30 bg-sky-900/15 p-3">
            <p className="text-xs uppercase tracking-wider text-sky-300 mb-1">УСБ может подменять</p>
            <p className="text-sm text-foreground/90">УПП — аналогичное право</p>
          </div>
        </div>
      </Card>

      <Card border="gold" icon={<Users className="h-5 w-5" />} title="Куда обращаться — иерархия">
        <div className="space-y-2">
          {[
            { level: 1, name: "Зам. отдела", color: "border-gold/20" },
            { level: 2, name: "Начальник отдела (УПП/ОПП)", color: "border-gold/30" },
            { level: 3, name: "Зам. Начальника УПП", color: "border-gold/40" },
            { level: 4, name: "Начальник УПП", color: "border-gold/50" },
            { level: 5, name: "Куратор УПП", color: "border-gold/60" },
            { level: 6, name: "Первый Зам. Начальника ФСО", color: "border-amber-500/50" },
            { level: 7, name: "Начальник ФСО", color: "border-rose-500/50" },
          ].map(({ level, name, color }) => (
            <div
              key={level}
              className={cn(
                "rounded-lg border bg-navy-dark/40 p-2.5 flex items-center gap-3",
                color
              )}
              style={{ marginLeft: `${(level - 1) * 12}px` }}
            >
              <span className="h-6 w-6 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold flex items-center justify-center shrink-0">
                {level}
              </span>
              <span className="text-sm text-foreground/90">{name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
