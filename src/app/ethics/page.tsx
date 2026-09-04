"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, SectionTitle } from "@/components/site/Card";
import {
  Scale,
  CheckCircle2,
  Ban,
  Users,
  AlertTriangle,
  Shirt,
  Gavel,
  Crown,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "intro", label: "О Кодексе" },
  { id: "duties", label: "Обязанности" },
  { id: "prohibitions", label: "Запреты" },
  { id: "leaders", label: "Для руководителей" },
  { id: "dress", label: "Дресс-код" },
  { id: "penalties", label: "Ответственность" },
];

export default function EthicsPage() {
  const [tab, setTab] = useState("intro");

  return (
    <SiteLayout
      title="Кодекс этики и служебного поведения"
      subtitle="Свод обязательных норм поведения, которые распространяются на каждого сотрудника ФСО независимо от звания и должности"
      breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Кодекс этики" }]}
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
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                    : "text-muted-foreground hover:text-violet-300 hover:bg-violet-500/5 border border-transparent"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {tab === "intro" && <IntroTab />}
        {tab === "duties" && <DutiesTab />}
        {tab === "prohibitions" && <ProhibitionsTab />}
        {tab === "leaders" && <LeadersTab />}
        {tab === "dress" && <DressTab />}
        {tab === "penalties" && <PenaltiesTab />}
      </div>
    </SiteLayout>
  );
}

function IntroTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-full bg-violet-500/10 blur-2xl" />
            <div className="relative h-56 w-56 rounded-full border-2 border-violet-500/40 bg-navy-light/40 flex items-center justify-center">
              <Scale className="h-28 w-28 text-violet-300" />
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          <h2 className="font-serif-display text-2xl md:text-3xl font-bold text-gold-light mb-4">
            О Кодексе
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-3">
            <span className="text-gold font-semibold">Кодекс этики</span> — свод обязательных
            норм поведения, которые распространяются на каждого сотрудника ФСО независимо
            от звания и должности.
          </p>
          <p className="text-base text-foreground/85 leading-relaxed mb-3">
            <span className="text-rose-300 font-semibold">Незнание Кодекса не освобождает от ответственности</span> —
            ознакомление обязательно при поступлении на службу.
          </p>
          <p className="text-sm text-foreground/75 italic">
            Соблюдение Кодекса учитывается при аттестациях, формировании кадрового резерва
            и наложении дисциплинарных взысканий.
          </p>
        </div>
      </div>

      <Card border="violet" icon={<BookOpen className="h-5 w-5" />} title="Структура Кодекса">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: "Основные обязанности", icon: CheckCircle2 },
            { label: "Запреты в поведении", icon: Ban },
            { label: "Для руководящего состава", icon: Crown },
            { label: "Дресс-код (Раздел IV)", icon: Shirt },
            { label: "Ответственность (Ст. 36)", icon: Gavel },
            { label: "Учёт при аттестациях", icon: Scale },
          ].map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2 rounded-lg border border-violet-500/20 bg-navy-dark/40 p-2.5">
              <Icon className="h-5 w-5 text-violet-300/80 shrink-0" />
              <span className="text-sm text-foreground/90">{label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function DutiesTab() {
  const duties = [
    { title: "Добросовестно исполнять обязанности", text: "Профессионально и качественно исполнять должностные обязанности." },
    { title: "Действовать в пределах полномочий", text: "Строго в пределах своих полномочий — не выходить за рамки." },
    { title: "Быть беспристрастным", text: "Не отдавать предпочтения каким-либо лицам или группам." },
    { title: "Соблюдать ограничения и запреты", text: "Соблюдать установленные законом ограничения и запреты." },
    { title: "Сообщать о коррупции", text: "Уведомлять руководство или прокуратуру о попытках склонить к коррупции." },
    { title: "Корректность в общении", text: "Быть корректным и внимательным в обращении с гражданами и коллегами." },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="Основные обязанности сотрудника" align="center" />
      <div className="grid md:grid-cols-2 gap-4">
        {duties.map((d, i) => (
          <Card key={d.title} border="gold">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-gold/20 border border-gold/40 text-gold text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <h4 className="font-serif-display text-base font-semibold text-gold-light mb-1">{d.title}</h4>
                <p className="text-sm text-foreground/85 leading-relaxed">{d.text}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProhibitionsTab() {
  const prohibitions = [
    "Любые высказывания и действия дискриминационного характера (по полу, возрасту, расе, национальности, языку, соц. положению, политическим/религиозным взглядам)",
    "Грубость, пренебрежительный тон, заносчивость, необоснованные обвинения",
    "Угрозы, оскорбления, действия, провоцирующие конфликт",
    "Курение и парение при исполнении служебных обязанностей",
    "Получение вознаграждений от физических/юридических лиц в связи с исполнением обязанностей",
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="В служебном поведении запрещено" align="center" />
      <Card border="rose" icon={<Ban className="h-5 w-5" />} title="Запреты">
        <ul className="space-y-3">
          {prohibitions.map((p, i) => (
            <li key={i} className="flex items-start gap-3 rounded-lg border border-rose-500/20 bg-rose-900/10 p-3">
              <Ban className="h-5 w-5 text-rose-300 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90">{p}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function LeadersTab() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Для руководящего состава" subtitle="Ст. 21–24 Кодекса этики" align="center" />

      <Card border="gold" icon={<Crown className="h-5 w-5" />} title="Обязанности руководителя">
        <p className="text-base text-foreground/90 leading-relaxed mb-4">
          Руководитель обязан быть{" "}
          <span className="text-gold-light font-semibold">примером профессионализма и честности</span> для
          подчинённых, а также:
        </p>
        <ul className="space-y-2">
          {[
            "Принимать меры по предотвращению конфликта интересов",
            "Принимать меры по предупреждению коррупции в подразделении",
            "Не допускать принуждения сотрудников к участию в политической деятельности",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm text-foreground/90">
              <CheckCircle2 className="h-4 w-4 text-gold/70 mt-0.5 shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </Card>

      <Card border="rose" icon={<AlertTriangle className="h-5 w-5" />} title="Ответственность руководителя">
        <p className="text-sm text-foreground/90 leading-relaxed">
          Руководитель{" "}
          <span className="text-rose-300 font-semibold">несёт ответственность за нарушения этики со стороны подчинённых</span>,
          если не принял меры по их недопущению.
        </p>
      </Card>
    </div>
  );
}

function DressTab() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Дресс-код" subtitle="Раздел IV Кодекса этики" align="center" />

      <div className="grid md:grid-cols-2 gap-4">
        <Card border="emerald" icon={<CheckCircle2 className="h-5 w-5" />} title="Разрешено">
          <ul className="space-y-2 text-sm text-foreground/90">
            {[
              "Форма/одежда, доступная в гардеробе организации",
              "Классический деловой стиль",
              "Неброские перчатки",
              "Часы",
              "Обручальные кольца",
              "Серьги",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300/80 mt-0.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </Card>

        <Card border="rose" icon={<Ban className="h-5 w-5" />} title="Запрещено">
          <ul className="space-y-2 text-sm text-foreground/90">
            {[
              "Одежда, не предусмотренная гардеробом организации",
              "Цветные/неестественные линзы",
              "Татуировки на кистях рук, лице, шее",
              "Окраска волос в неестественный цвет",
              "Неаккуратные/неофициальные причёски",
              "Яркий макияж, меняющий естественный облик",
              "Пирсинг и неодобренная бижутерия",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Ban className="h-4 w-4 text-rose-300/80 mt-0.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function PenaltiesTab() {
  const penalties = [
    { violation: "Неуважение/оскорбление гражданина", fine: "5.000₽", extra: "" },
    { violation: "Неуважение/оскорбление госслужащего", fine: "10.000₽", extra: "" },
    { violation: "Создание конфликтной ситуации в организации", fine: "8.000₽", extra: "+ выговор" },
    { violation: "Самовольная демонстрация власти в ущерб подчинённым", fine: "10.000₽", extra: "+ выговор" },
    { violation: "Нарушение дресс-кода", fine: "7.500₽", extra: "+ выговор" },
    { violation: "Нарушение поведения в общественных местах/зданиях", fine: "7.000₽", extra: "+ выговор" },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="Ответственность за нарушение" subtitle="Ст. 36 Кодекса этики" align="center" />

      <div className="overflow-x-auto rounded-xl border border-gold/20">
        <table className="w-full text-sm">
          <thead className="bg-navy-light/60">
            <tr className="border-b border-gold/20 text-left">
              <th className="px-4 py-3 font-serif-display text-gold-light uppercase tracking-wider text-xs">Нарушение</th>
              <th className="px-4 py-3 font-serif-display text-gold-light uppercase tracking-wider text-xs">Штраф</th>
              <th className="px-4 py-3 font-serif-display text-gold-light uppercase tracking-wider text-xs">Дополнительно</th>
            </tr>
          </thead>
          <tbody>
            {penalties.map((p, i) => (
              <tr key={i} className="border-b border-gold/10 hover:bg-gold/5">
                <td className="px-4 py-3 text-foreground/90">{p.violation}</td>
                <td className="px-4 py-3 text-rose-300 font-semibold whitespace-nowrap">{p.fine}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.extra || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card border="amber" icon={<AlertTriangle className="h-5 w-5" />} title="Срок оплаты штрафа">
          <p className="text-sm text-foreground/90 leading-relaxed">
            Штраф оплачивается в казну Правительства в течение{" "}
            <span className="text-amber-300 font-semibold">24 часов</span> с момента наложения
            взыскания.
          </p>
          <p className="text-sm text-rose-300 mt-2">
            Отказ от оплаты влечёт увольнение.
          </p>
        </Card>

        <Card border="rose" icon={<Gavel className="h-5 w-5" />} title="Немедленное увольнение">
          <p className="text-sm text-foreground/90 leading-relaxed mb-2">
            Основания для немедленного увольнения и/или уголовной/административной ответственности:
          </p>
          <ul className="space-y-1 text-xs text-foreground/85">
            <li>• Обман руководства</li>
            <li>• Действия, повлёкшие уголовное преследование</li>
            <li>• Отказ исполнять приказы</li>
          </ul>
        </Card>
      </div>

      <Card border="violet" icon={<Scale className="h-5 w-5" />} title="Учёт соблюдения Кодекса">
        <p className="text-sm text-foreground/90 leading-relaxed">
          Соблюдение Кодекса этики учитывается при{" "}
          <span className="text-violet-300 font-semibold">аттестациях</span>, формировании{" "}
          <span className="text-violet-300 font-semibold">кадрового резерва</span> и наложении{" "}
          <span className="text-violet-300 font-semibold">дисциплинарных взысканий</span>.
        </p>
      </Card>
    </div>
  );
}
