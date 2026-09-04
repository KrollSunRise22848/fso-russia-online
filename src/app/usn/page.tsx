"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, SectionTitle } from "@/components/site/Card";
import {
  Crown,
  Car,
  Building2,
  ShieldAlert,
  Radio,
  ArrowLeftRight,
  AlertTriangle,
  CheckCircle2,
  Ban,
  IdCard,
  Users,
  MapPin,
  ListChecks,
  Scale,
  Crosshair,
  Gavel,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Обзор" },
  { id: "sbp", label: "СБП" },
  { id: "oos", label: "ООС" },
  { id: "kk", label: "КК" },
  { id: "radio", label: "Радиокоды" },
  { id: "sub", label: "Взаимозамещение" },
  { id: "legal", label: "Правовая основа" },
];

export default function UsnPage() {
  const [tab, setTab] = useState("overview");

  return (
    <SiteLayout
      title="Управление Специального Назначения"
      subtitle="Силовое подразделение ФСО — физическая безопасность первых лиц и государственных объектов"
      breadcrumbs={[{ label: "Главная", href: "/" }, { label: "УСН" }]}
    >
      {/* Tabs */}
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
        {tab === "sbp" && <SbpTab />}
        {tab === "oos" && <OosTab />}
        {tab === "kk" && <KkTab />}
        {tab === "radio" && <RadioTab />}
        {tab === "sub" && <SubTab />}
        {tab === "legal" && <LegalTab />}
      </div>
    </SiteLayout>
  );
}

function OverviewTab() {
  const depts = [
    {
      icon: Crown,
      name: "СБП — Служба Безопасности Президента",
      desc: "Непосредственная физическая охрана Президента РФ на всех локациях и мероприятиях.",
      color: "rose" as const,
    },
    {
      icon: Car,
      name: "ООС — Отдел Организации Спецсопровождений",
      desc: "Организация безопасного передвижения охраняемых лиц по территории РФ.",
      color: "sky" as const,
    },
    {
      icon: Building2,
      name: "КК — Комендатура Кремля",
      desc: "Охрана территории Московского Кремля, пропускной режим, патрулирование.",
      color: "amber" as const,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Intro */}
      <div className="grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-full bg-gold/10 blur-2xl" />
            <img
              src="/images/usn-emblem.png"
              alt="Эмблема УСН"
              className="relative h-56 w-56 object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <h2 className="font-serif-display text-2xl md:text-3xl font-bold text-gold-light mb-4">
            О подразделении
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-3">
            <span className="text-gold font-semibold">УСН</span> — Управление Специального
            Назначения — силовое подразделение ФСО, отвечающее за охрану объектов
            государственной важности, физическую защиту первых лиц государства и
            проведение специальных операций.
          </p>
          <p className="text-base text-foreground/85 leading-relaxed mb-3">
            Если речь идёт о физической безопасности — это зона ответственности УСН.
            УСН делится на <span className="text-gold-light font-semibold">три отдела</span>,
            каждый со своей зоной ответственности.
          </p>
          <p className="text-sm text-foreground/75 italic">
            Руководство: Генерал-Лейтенант / Зам. Начальника ФСО (УСН) → Начальник УСН →
            Зам. Начальника УСН.
          </p>
        </div>
      </div>

      <SectionTitle title="Три отдела УСН" align="center" />
      <div className="grid md:grid-cols-3 gap-4">
        {depts.map(({ icon: Icon, name, desc, color }) => (
          <Card key={name} border={color} icon={<Icon className="h-5 w-5" />} title={name}>
            <p className="text-sm text-foreground/85 leading-relaxed">{desc}</p>
          </Card>
        ))}
      </div>

      <Card border="gold" icon={<ArrowLeftRight className="h-5 w-5" />} title="Взаимозамещение">
        <p className="text-sm text-foreground/85 leading-relaxed">
          Подразделения вправе временно выполнять обязанности друг друга при нехватке
          кадров или по распоряжению начальника УСН. Это единое Управление — не три
          отдельные структуры.
        </p>
      </Card>
    </div>
  );
}

function SbpTab() {
  return (
    <div className="space-y-6">
      <Card border="rose" icon={<Crown className="h-5 w-5" />} title="СБП — Служба Безопасности Президента">
        <p className="text-base text-foreground/90 leading-relaxed">
          Главная задача СБП — защита Президента, недопущение посторонних лиц и
          немедленная эвакуация при возникновении угрозы.
        </p>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="rounded-xl border border-gold/25 bg-navy-light/40 p-3 overflow-hidden">
          <img
            src="/images/usn/sbp-scheme.png"
            alt="Схема охраны Президента"
            className="w-full h-auto rounded-lg"
          />
          <p className="text-xs text-center text-muted-foreground italic mt-2">
            Схема построения охраны СБП: ближний круг, внешний периметр, действия при нападении
          </p>
        </div>

        <div className="space-y-4">
          <Card border="gold" icon={<Users className="h-5 w-5" />} title="Руководство охраной">
            <p className="text-sm text-foreground/90 mb-3">
              Руководство осуществляет начальник СБП, его заместители, а при их отсутствии —
              назначенный старший группы.
            </p>
            <p className="text-sm text-foreground/80 mb-2">Перед мероприятием старший обязан:</p>
            <ul className="space-y-1 text-sm text-foreground/90">
              {[
                "распределить сотрудников по позициям",
                "назначить ответственного за эвакуацию",
                "определить основное и запасное укрытие",
                "проверить маршруты передвижения",
                "установить связь с ООС и водителями",
                "провести инструктаж личного состава",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold/70 mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </Card>

          <div className="grid sm:grid-cols-2 gap-3">
            <Card border="gold" icon={<Crown className="h-5 w-5" />} title="Ближний круг">
              <p className="text-xs text-muted-foreground mb-2">
                Начальник СБП, заместители и назначенные сотрудники.
              </p>
              <ul className="space-y-1 text-xs text-foreground/90">
                <li>• находиться рядом с Президентом</li>
                <li>• контролировать ближайшее окружение</li>
                <li>• прикрыть Президента при нападении</li>
                <li>• провести эвакуацию</li>
              </ul>
              <p className="text-[11px] text-rose-300/80 italic mt-2">
                Не покидает Президента для преследования.
              </p>
            </Card>
            <Card border="gold" icon={<MapPin className="h-5 w-5" />} title="Внешний периметр">
              <p className="text-xs text-muted-foreground mb-2">Формируется из офицеров ФСО.</p>
              <ul className="space-y-1 text-xs text-foreground/90">
                <li>• наблюдать за территорией</li>
                <li>• выявлять подозрительных лиц</li>
                <li>• ограничивать доступ к Президенту</li>
                <li>• прикрывать маршрут эвакуации</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      <Card border="rose" icon={<ShieldAlert className="h-5 w-5" />} title="Действия при нападении">
        <ol className="space-y-2 text-sm text-foreground/90">
          <li>
            <span className="text-gold font-semibold">1. Прикрытие и эвакуация.</span> Ближний
            круг закрывает Президента, выводит из зоны поражения в укрытие.
          </li>
          <li>
            <span className="text-gold font-semibold">2. Охрана укрытия.</span> Возле Президента
            остаются четыре сотрудника. Президент не должен оставаться без охраны.
          </li>
          <li>
            <span className="text-gold font-semibold">3. Отражение нападения.</span> Внешний
            периметр блокирует нападавших, прикрывает эвакуационную группу.
          </li>
        </ol>
      </Card>

      <Card border="amber" icon={<AlertTriangle className="h-5 w-5" />} title="При массовых беспорядках">
        <ul className="space-y-1 text-sm text-foreground/90">
          <li>• Президент немедленно эвакуируется в безопасное помещение</li>
          <li>• В укрытии остаются четыре сотрудника охраны</li>
          <li>• Внешний периметр блокирует доступ к Президенту</li>
          <li>• Нарушителям выдвигается требование прекратить действия</li>
          <li>• Применяются спецсредства: наручники, тайзер, дубинка</li>
          <li>• При невозможности урегулирования — полная эвакуация</li>
        </ul>
      </Card>
    </div>
  );
}

function OosTab() {
  return (
    <div className="space-y-6">
      <Card border="sky" icon={<Car className="h-5 w-5" />} title="ООС — Отдел Организации Спецсопровождений">
        <p className="text-base text-foreground/90 leading-relaxed">
          Основная задача ООС — организация безопасного передвижения охраняемого лица,
          формирование кортежа, соблюдение установленного строя и координация действий
          всех экипажей во время сопровождения.
        </p>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="rounded-xl border border-gold/25 bg-navy-light/40 p-3 overflow-hidden">
          <img
            src="/images/usn/oos-convoy.png"
            alt="Схема кортежа ООС"
            className="w-full h-auto rounded-lg"
          />
          <p className="text-xs text-center text-muted-foreground italic mt-2">
            Схема кортежа: 13 автомобилей Aurus Senat и Aurus Komendant в трёх линиях
          </p>
        </div>

        <div className="space-y-4">
          <Card border="gold" icon={<ListChecks className="h-5 w-5" />} title="Состав кортежа">
            <p className="text-sm text-foreground/90 mb-3">
              Кортеж из автомобилей <span className="text-gold-light font-semibold">Aurus Senat</span> и{" "}
              <span className="text-gold-light font-semibold">Aurus Komendant</span> — 3 линии:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-gold/25 bg-navy-dark/50 p-2 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Левая</p>
                <p className="font-serif-display text-xl text-gold-light font-bold">4</p>
                <p className="text-[9px] text-muted-foreground">3× Komendant + 1× Senat</p>
              </div>
              <div className="rounded-lg border border-gold/40 bg-gold/10 p-2 text-center">
                <p className="text-[10px] uppercase tracking-wider text-gold-light">Центр</p>
                <p className="font-serif-display text-xl text-gold font-bold">5</p>
                <p className="text-[9px] text-muted-foreground">5× Senat</p>
              </div>
              <div className="rounded-lg border border-gold/25 bg-navy-dark/50 p-2 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Правая</p>
                <p className="font-serif-display text-xl text-gold-light font-bold">4</p>
                <p className="text-[9px] text-muted-foreground">3× Komendant + 1× Senat</p>
              </div>
            </div>
            <p className="text-center mt-2 text-sm">
              <span className="text-muted-foreground">Итого: </span>
              <span className="font-serif-display text-lg text-gold font-bold">13 автомобилей</span>
            </p>
          </Card>

          <Card border="sky" icon={<Car className="h-5 w-5" />} title="Ведущая машина">
            <p className="text-sm text-foreground/90 mb-2">Задачи ведущего автомобиля:</p>
            <ul className="space-y-1 text-xs text-foreground/85">
              <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-sky-300/70 mt-0.5 shrink-0" />задавать маршрут и скорость движения</li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-sky-300/70 mt-0.5 shrink-0" />контролировать темп кортежа</li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-sky-300/70 mt-0.5 shrink-0" />сообщать об изменении маршрута</li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-sky-300/70 mt-0.5 shrink-0" />координировать перекрёстки</li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-sky-300/70 mt-0.5 shrink-0" />не допускать разрыва колонны</li>
            </ul>
          </Card>
        </div>
      </div>

      <Card border="gold" icon={<Radio className="h-5 w-5" />} title="Радиообмен">
        <p className="text-xs text-muted-foreground mb-2">Говорить коротко и по существу. Примеры:</p>
        <div className="flex flex-wrap gap-1.5">
          {["«Колонна готова»", "«Начинаем движение»", "«Поворот направо»", "«Снижаем скорость»", "«Угроза слева»", "«Колонна, держим строй»", "«Меняем маршрут»"].map((q) => (
            <span key={q} className="px-2 py-1 rounded text-[11px] border border-gold/25 bg-navy-dark/60 text-gold-light font-mono">
              {q}
            </span>
          ))}
        </div>
      </Card>

      <Card border="rose" icon={<Ban className="h-5 w-5" />} title="Запрещается">
        <ul className="grid sm:grid-cols-2 gap-1.5 text-xs text-foreground/85">
          {[
            "покидать назначенный автомобиль без команды",
            "самовольно менять позицию в кортеже",
            "нарушать дистанцию",
            "отставать от колонны",
            "опережать ведущую машину",
            "игнорировать команды старшего",
            "покидать сопровождение до завершения",
          ].map((t) => (
            <li key={t} className="flex items-start gap-1.5">
              <Ban className="h-3.5 w-3.5 text-rose-300/70 mt-0.5 shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function KkTab() {
  return (
    <div className="space-y-6">
      <Card border="amber" icon={<Building2 className="h-5 w-5" />} title="КК — Комендатура Кремля">
        <p className="text-base text-foreground/90 leading-relaxed">
          Структурное подразделение УСН ФСО — отвечает за пропускной режим, охрану
          объектов Московского Кремля, патрулирование территории и реагирование на
          нарушения установленного режима.
        </p>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="rounded-xl border border-gold/25 bg-navy-light/40 p-3 overflow-hidden">
          <img
            src="/images/usn/kk-posts.png"
            alt="Памятка Комендатуры Кремля"
            className="w-full h-auto rounded-lg"
          />
          <p className="text-xs text-center text-muted-foreground italic mt-2">
            Памятка КК: основные посты, задачи, действия сотрудника, запреты
          </p>
        </div>

        <div className="space-y-4">
          <Card border="gold" icon={<ShieldCheck className="h-5 w-5" />} title="Основные задачи КК">
            <div className="space-y-2.5 text-sm">
              <div>
                <p className="font-semibold text-gold-light mb-1 text-xs uppercase tracking-wider">Пропускной режим</p>
                <ul className="text-xs text-foreground/85 space-y-0.5">
                  <li>• Контроль входа и выхода граждан</li>
                  <li>• Проверка документов и оснований</li>
                  <li>• Контроль въезда/выезда транспорта</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gold-light mb-1 text-xs uppercase tracking-wider">Охрана объектов</p>
                <ul className="text-xs text-foreground/85 space-y-0.5">
                  <li>• Несение службы на постах</li>
                  <li>• Охрана входов, КПП и объектов</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gold-light mb-1 text-xs uppercase tracking-wider">Патрулирование</p>
                <ul className="text-xs text-foreground/85 space-y-0.5">
                  <li>• Регулярный обход сектора</li>
                  <li>• Выявление подозрительных лиц</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card border="amber" icon={<IdCard className="h-5 w-5" />} title="Проверка граждан">
            <ol className="space-y-1.5 text-sm text-foreground/90">
              {[
                "Останавливает гражданина",
                "Проверяет документы",
                "Устанавливает основание для прохода",
                "При необходимости проводит досмотр",
                "Разрешает проход либо отказывает",
              ].map((t, i) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="h-5 w-5 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </Card>

          <Card border="rose" icon={<Ban className="h-5 w-5" />} title="Сотруднику запрещается">
            <ul className="grid sm:grid-cols-2 gap-1 text-xs text-foreground/85">
              {[
                "Самовольно покидать пост",
                "Пропускать без проверки",
                "Пропускать транспорт без основания",
                "Игнорировать подозрительные действия",
                "Оставлять пост без связи",
                "Использовать полномочия в личных целях",
              ].map((t) => (
                <li key={t} className="flex items-start gap-1.5">
                  <Ban className="h-3.5 w-3.5 text-rose-300/70 mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Card border="gold">
        <h4 className="font-serif-display text-lg text-gold-light uppercase tracking-wide mb-3 text-center">
          Главный принцип КК
        </h4>
        <div className="space-y-1 text-sm text-center">
          <p><span className="text-muted-foreground">Увидел нарушение — </span><span className="text-gold font-semibold">останови.</span></p>
          <p><span className="text-muted-foreground">Обнаружил угрозу — </span><span className="text-gold font-semibold">доложи.</span></p>
          <p><span className="text-muted-foreground">Получил приказ — </span><span className="text-gold font-semibold">выполни.</span></p>
          <p><span className="text-muted-foreground">Заступил на пост — </span><span className="text-gold font-semibold">отвечай за сектор.</span></p>
        </div>
      </Card>
    </div>
  );
}

function RadioTab() {
  const codes = [
    { code: "01", name: "Пост / Охрана", color: "sky" as const, desc: "При заступлении на пост, объект или охрану зоны.", examples: ["/f 01 | КК | 2 чел. | Главный КПП | Пост заняли.", "/f 01 | СБП | 3 чел. | Кабинет Президента | Охрана выставлена."] },
    { code: "02", name: "Патруль", color: "emerald" as const, desc: "При пешем или автомобильном патрулировании.", examples: ["/f 02 | КК | 3 чел. | Территория Кремля | Патруль начали.", "/f 02 | СБП | 2 чел. | Периметр | Проверяем территорию."] },
    { code: "03", name: "Сопровождение", color: "amber" as const, desc: "Сопровождение охраняемых лиц и движение кортежа.", examples: ["/f 03 | СБП | 4 чел. | Президент | Сопровождение начато.", "/f 03 | ООС | 6 чел. / 4 авто | Кремль → Правительство | Кортеж выдвинулся."] },
    { code: "04", name: "Усиление", color: "rose" as const, desc: "Когда требуется доп. количество сотрудников.", examples: ["/f 04 | КК | +2 чел. | КПП №1 | Требуется усиление.", "/f 04 | СБП | +3 чел. | Президент | Усиление охраны."] },
    { code: "05", name: "Инцидент / Угроза", color: "violet" as const, desc: "При нарушении режима, нападении или угрозе.", examples: ["/f 05 | КК | 2 чел. | КПП №2 | Задержано подозрительное лицо.", "/f 05 | СБП | 4 чел. | Президент | Обнаружена угроза."] },
    { code: "06", name: "Смена / Освобождение", color: "gold" as const, desc: "При снятии с поста или завершении задачи.", examples: ["/f 06 | КК | 2 чел. | КПП Кремля | Пост сдали.", "/f 06 | ООС | 6 чел. / 4 авто | Кремль | Сопровождение завершено."] },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-sky-500/30 bg-gradient-to-r from-sky-900/20 to-transparent p-5">
        <div className="flex items-start gap-3">
          <Radio className="h-6 w-6 text-sky-300 shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wider text-sky-300 mb-1">Формат сообщения</p>
            <code className="block font-mono text-sm md:text-base text-gold-light bg-navy-dark/60 border border-gold/20 rounded px-3 py-2 break-all">
              /f [КОД] | [ОТДЕЛ] | [КОЛ-ВО] | [МЕСТО / ОБЪЕКТ] | [ИНФОРМАЦИЯ]
            </code>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gold/25 bg-navy-light/40 p-3 overflow-hidden">
          <img
            src="/images/usn/radio-codes.png"
            alt="Единая система радиокодов УСН"
            className="w-full h-auto rounded-lg"
          />
          <p className="text-xs text-center text-muted-foreground italic mt-2">
            Шпаргалка по радиокодам для СБП, ООС и КК
          </p>
        </div>

        <div className="space-y-3">
          {codes.map(({ code, name, color, desc, examples }) => (
            <Card key={code} border={color}>
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-navy-dark/60 border border-gold/30 flex items-center justify-center shrink-0">
                  <span className="font-serif-display text-xl font-bold text-gold">{code}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif-display text-base font-semibold text-gold-light mb-1">{name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{desc}</p>
                  <div className="space-y-1">
                    {examples.map((ex, i) => (
                      <code key={i} className="block font-mono text-[11px] text-foreground/75 bg-navy-dark/60 border border-gold/15 rounded px-2 py-1 break-all">
                        {ex}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function SubTab() {
  const subs = [
    {
      from: "КК",
      fromIcon: Building2,
      fromColor: "text-amber-300",
      fromBorder: "border-amber-500/40",
      to: [
        { name: "СБП", icon: Crown, color: "text-rose-300", border: "border-rose-500/40", tasks: ["охрана охраняемого лица", "внешний периметр", "охрана входов", "эвакуационные мероприятия"] },
        { name: "ООС", icon: Car, color: "text-sky-300", border: "border-sky-500/40", tasks: ["сопровождение", "машины сопровождения", "безопасность точки отправления", "перекрытие территории"] },
      ],
    },
    {
      from: "ООС",
      fromIcon: Car,
      fromColor: "text-sky-300",
      fromBorder: "border-sky-500/40",
      to: [
        { name: "СБП", icon: Crown, color: "text-rose-300", border: "border-rose-500/40", tasks: ["сопровождение охраняемого лица", "внешний периметр", "эвакуация", "усиление при движении"] },
        { name: "КК", icon: Building2, color: "text-amber-300", border: "border-amber-500/40", tasks: ["посты", "патрулирование", "контроль входов и КПП", "помощь при задержании"] },
      ],
    },
    {
      from: "СБП",
      fromIcon: Crown,
      fromColor: "text-rose-300",
      fromBorder: "border-rose-500/40",
      to: [
        { name: "ООС", icon: Car, color: "text-sky-300", border: "border-sky-500/40", tasks: ["позиции в сопровождении", "защита в автомобиле", "построение кортежа", "безопасность при посадке"] },
        { name: "КК", icon: Building2, color: "text-amber-300", border: "border-amber-500/40", tasks: ["охрана объектов", "усиление КПП", "патрулирование", "пресечение нарушений"] },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <Card border="gold" icon={<ArrowLeftRight className="h-5 w-5" />} title="Когда допускается взаимозамещение?">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Временное отсутствие сотрудников нужного отдела",
            "Недостаточное количество личного состава",
            "Необходимость усиления другого подразделения",
            "Прямое распоряжение Начальника УСН",
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border border-gold/20 bg-navy-dark/40 p-3">
              <CheckCircle2 className="h-5 w-5 text-gold/70 mt-0.5 shrink-0" />
              <p className="text-xs text-foreground/85">{r}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground italic mt-3">
          Взаимозамещение не означает постоянный перевод сотрудника в другое подразделение.
        </p>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gold/25 bg-navy-light/40 p-3 overflow-hidden">
          <img
            src="/images/usn/mutual-substitution.png"
            alt="Взаимозаменяемость СБП/ООС/КК"
            className="w-full h-auto rounded-lg"
          />
          <p className="text-xs text-center text-muted-foreground italic mt-2">
            Схема взаимодействия СБП, ООС и КК
          </p>
        </div>

        <div className="space-y-3">
          {subs.map((s, idx) => (
            <Card key={idx} border="gold">
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("h-10 w-10 rounded-lg bg-navy-dark/60 border flex items-center justify-center shrink-0", s.fromBorder)}>
                  <s.fromIcon className={cn("h-5 w-5", s.fromColor)} />
                </div>
                <div>
                  <p className={cn("font-serif-display text-base font-bold", s.fromColor)}>{s.from}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">может выполнять задачи</p>
                </div>
                <ArrowLeftRight className="h-4 w-4 text-gold/60 ml-auto" />
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {s.to.map((to, i) => (
                  <div key={i} className="rounded-lg border border-gold/15 bg-navy-dark/40 p-2.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <to.icon className={cn("h-4 w-4", to.color)} />
                      <span className={cn("font-serif-display text-sm font-bold", to.color)}>{to.name}</span>
                    </div>
                    <ul className="space-y-0.5">
                      {to.tasks.map((task) => (
                        <li key={task} className="text-[11px] text-muted-foreground flex items-start gap-1">
                          <span className="text-gold/50">•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card border="rose" icon={<AlertTriangle className="h-5 w-5" />} title="Приоритет при чрезвычайной ситуации">
        <p className="text-sm text-foreground/85 mb-3">
          При возникновении угрозы охраняемому лицу или объекту подразделения УСН действуют совместно:
        </p>
        <div className="grid sm:grid-cols-3 gap-2">
          <div className="rounded-lg border border-rose-500/30 bg-rose-900/20 p-3 text-center">
            <Crown className="h-7 w-7 text-rose-300 mx-auto mb-1" />
            <p className="font-serif-display text-sm text-rose-300 font-semibold">СБП</p>
            <p className="text-[11px] text-muted-foreground">Защита охраняемого лица</p>
          </div>
          <div className="rounded-lg border border-sky-500/30 bg-sky-900/20 p-3 text-center">
            <Car className="h-7 w-7 text-sky-300 mx-auto mb-1" />
            <p className="font-serif-display text-sm text-sky-300 font-semibold">ООС</p>
            <p className="text-[11px] text-muted-foreground">Транспорт, эвакуация</p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-900/20 p-3 text-center">
            <Building2 className="h-7 w-7 text-amber-300 mx-auto mb-1" />
            <p className="font-serif-display text-sm text-amber-300 font-semibold">КК</p>
            <p className="text-[11px] text-muted-foreground">Охрана объекта</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function LegalTab() {
  const legal = [
    {
      icon: ScrollText,
      title: "Правовая основа действий УСН",
      text: "Процессуальный кодекс (Гл. IX, II, ст. 5.1, 6.3) и Закон «О государственных документах» (Гл. 6) — стадии применения силы, задержание, досмотр, исполнение ордеров.",
    },
    {
      icon: Gavel,
      title: "Полномочия на территориях",
      text: "ФЗ «О статусе территорий и особых объектах РФ» — беспрепятственный доступ, обыски и задержания при наличии ордера на закрытых территориях и режимных объектах.",
    },
    {
      icon: Crosshair,
      title: "Оружие и спецсредства",
      text: "Закон «Об обороте оружия и спецсредств РФ» — открытое ношение, любое оружие ведомств, спецсредства ограниченного применения (гранаты, тазер, электодубинка).",
    },
    {
      icon: ShieldCheck,
      title: "Базовые полномочия ФСО",
      text: "ФЗ «О Федеральной Службе Охраны РФ» — задержание, досмотр, открытие огня при прямой угрозе первым лицам, пресечение полётов беспилотников.",
    },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="Правовая основа действий УСН" subtitle="Нормативные акты, регулирующие деятельность Управления" align="center" />
      <div className="grid sm:grid-cols-2 gap-4">
        {legal.map(({ icon: Icon, title, text }) => (
          <Card key={title} border="gold" icon={<Icon className="h-5 w-5" />} title={title}>
            <p className="text-sm text-foreground/85 leading-relaxed">{text}</p>
          </Card>
        ))}
      </div>

      <Card border="gold" icon={<Scale className="h-5 w-5" />} title="Стадии применения силы (Гл. IX ПК)">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {["Присутствие", "Устные требования", "Физическая сила", "Спецсредства", "Огнестрельное оружие"].map((stage, i, arr) => (
            <div key={stage} className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold-light">
                {stage}
              </span>
              {i < arr.length - 1 && <ArrowRight className="h-3 w-3 text-gold/60" />}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground italic mt-3">
          Применять последовательно, кроме случаев прямой угрозы жизни или попытки побега.
        </p>
      </Card>

      <Card border="rose" icon={<AlertTriangle className="h-5 w-5" />} title="Ограничение полномочий">
        <p className="text-sm text-foreground/85">
          УСН не вправе вести расследование в отношении Президента, Председателя
          Правительства и членов Кабинета Министров — доказательства их правонарушений
          передаются исключительно в прокуратуру или СК.
        </p>
      </Card>
    </div>
  );
}
