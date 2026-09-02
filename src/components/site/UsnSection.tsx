"use client";

import { OrnateHeading, SectionWrapper } from "./OrnateHeading";
import {
  ShieldCheck,
  ScrollText,
  Gavel,
  Crosshair,
  Building2,
  Car,
  Crown,
  ArrowRight,
} from "lucide-react";

const DEPARTMENTS = [
  {
    id: "kk",
    icon: Building2,
    name: "Комендатура Кремля",
    abbr: "КК",
    color: "from-amber-500/20 to-amber-700/10",
    border: "border-amber-500/40",
    text: "text-amber-300",
    desc: "Охрана территории Московского Кремля, пропускной режим, патрулирование и реагирование на нарушения.",
    head: "Комендант Кремля",
    deputies: "3 заместителя",
  },
  {
    id: "oos",
    icon: Car,
    name: "Отдел Организации Спецсопровождений",
    abbr: "ООС",
    color: "from-sky-500/20 to-sky-700/10",
    border: "border-sky-500/40",
    text: "text-sky-300",
    desc: "Организация безопасного передвижения охраняемых лиц по территории РФ, формирование и сопровождение кортежа.",
    head: "Начальник ООС",
    deputies: "3 заместителя",
  },
  {
    id: "sbp",
    icon: Crown,
    name: "Служба Безопасности Президента",
    abbr: "СБП",
    color: "from-rose-500/20 to-rose-700/10",
    border: "border-rose-500/40",
    text: "text-rose-300",
    desc: "Непосредственная физическая охрана Президента РФ, личная безопасность на всех мероприятиях.",
    head: "Начальник СБП",
    deputies: "3 заместителя",
  },
];

const LEGAL_BASE = [
  {
    icon: ScrollText,
    title: "Правовая основа действий УСН",
    text: "Процессуальный кодекс (Гл. IX, Гл. II, ст. 5.1, 6.3) и Закон «О государственных документах» (Гл. 6).",
  },
  {
    icon: Gavel,
    title: "Полномочия на территориях",
    text: "ФЗ «О статусе территорий и особых объектах РФ» — беспрепятственный доступ, обыски и задержания при наличии ордера.",
  },
  {
    icon: Crosshair,
    title: "Оружие и спецсредства",
    text: "Закон «Об обороте оружия и спецсредств РФ» — открытое ношение, любое оружие ведомств, спецсредства ограниченного применения.",
  },
  {
    icon: ShieldCheck,
    title: "Базовые полномочия ФСО",
    text: "ФЗ «О Федеральной Службе Охраны РФ» — задержание, досмотр, открытие огня при прямой угрозе первым лицам.",
  },
];

export function UsnSection() {
  return (
    <SectionWrapper id="usn" className="bg-navy relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <OrnateHeading
        title="Управление Специального Назначения"
        subtitle="Силовое подразделение ФСО — физическая безопасность первых лиц и государственных объектов"
      />

      {/* Overview */}
      <div className="grid md:grid-cols-12 gap-8 items-center mb-14">
        <div className="md:col-span-5 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-full bg-gold/10 blur-2xl" />
            <img
              src="/images/usn-emblem.png"
              alt="Эмблема УСН"
              className="relative h-56 w-56 md:h-72 md:w-72 object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-gold-light mb-4">
            О подразделении
          </h3>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-4">
            <span className="text-gold font-semibold">УСН</span> — Управление Специального
            Назначения — силовое подразделение ФСО, отвечающее за охрану объектов
            государственной важности, физическую защиту первых лиц государства и
            проведение специальных операций. Если речь идёт о физической
            безопасности — это зона ответственности УСН.
          </p>
          <p className="text-base text-foreground/85 leading-relaxed mb-4">
            УСН делится на <span className="text-gold-light font-semibold">три отдела</span>,
            каждый со своей зоной ответственности. Подразделения вправе
            временно выполнять обязанности друг друга при нехватке кадров или
            по распоряжению начальника УСН.
          </p>
          <p className="text-sm text-foreground/75 italic">
            Руководство: Генерал-Лейтенант / Зам. Начальника ФСО (УСН) → Начальник УСН →
            Зам. Начальника УСН.
          </p>
        </div>
      </div>

      {/* Three departments */}
      <div className="mb-14">
        <div className="ornament-divider w-32 mb-8">
          <span className="text-gold">❖</span>
        </div>
        <h3 className="text-center font-serif-display text-2xl text-gold-light mb-8 uppercase tracking-wide">
          Три отдела УСН
        </h3>
        <div className="grid md:grid-cols-3 gap-5">
          {DEPARTMENTS.map(({ id, icon: Icon, name, abbr, color, border, text, desc, head, deputies }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`group relative rounded-xl border ${border} bg-gradient-to-br ${color} p-6 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden block`}
            >
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gold/5 group-hover:bg-gold/10 transition-colors" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-14 w-14 rounded-lg bg-navy-dark/60 border ${border} flex items-center justify-center`}>
                    <Icon className={`h-7 w-7 ${text}`} />
                  </div>
                  <span className={`font-serif-display text-3xl font-bold ${text} opacity-80`}>{abbr}</span>
                </div>
                <h4 className={`font-serif-display text-lg font-semibold ${text} mb-2 leading-tight`}>
                  {name}
                </h4>
                <p className="text-sm text-foreground/90 leading-relaxed mb-4">{desc}</p>
                <div className="pt-3 border-t border-gold/10 space-y-1">
                  <p className="text-xs text-foreground/70">
                    <span className="text-muted-foreground">Руководство:</span>{" "}
                    <span className="text-gold-light">{head}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{deputies}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs uppercase tracking-wider text-gold/80 group-hover:text-gold transition-colors">
                  Подробнее <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Legal basis */}
      <div className="mb-6">
        <div className="ornament-divider w-32 mb-8">
          <span className="text-gold">❖</span>
        </div>
        <h3 className="text-center font-serif-display text-2xl text-gold-light mb-8 uppercase tracking-wide">
          Правовая основа
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {LEGAL_BASE.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-xl border border-gold/20 bg-navy-light/40 p-5 hover:border-gold/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-gold-light mb-1.5">{title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom note: substitution + radio codes */}
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <a
          href="#radio-codes"
          className="group rounded-xl border border-sky-500/30 bg-sky-900/15 p-5 hover:border-sky-500/60 transition-all flex items-center gap-4"
        >
          <ScrollText className="h-8 w-8 text-sky-300 shrink-0" />
          <div>
            <p className="font-serif-display text-lg text-sky-300 group-hover:text-sky-200 transition-colors">
              Единая система радиокодов
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Формат /f [код] | [отдел] | [кол-во] | [место] | [инфо]
            </p>
          </div>
        </a>
        <a
          href="#substitution"
          className="group rounded-xl border border-rose-500/30 bg-rose-900/15 p-5 hover:border-rose-500/60 transition-all flex items-center gap-4"
        >
          <ShieldCheck className="h-8 w-8 text-rose-300 shrink-0" />
          <div>
            <p className="font-serif-display text-lg text-rose-300 group-hover:text-rose-200 transition-colors">
              Взаимозамещение СБП / ООС / КК
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Единое Управление специального назначения — усилении друг друга
            </p>
          </div>
        </a>
      </div>
    </SectionWrapper>
  );
}
