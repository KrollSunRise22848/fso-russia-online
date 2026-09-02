"use client";

import { OrnateHeading, SectionWrapper } from "./OrnateHeading";
import { Radio, ArrowRight } from "lucide-react";

const CODES = [
  {
    code: "01",
    name: "Пост / Охрана",
    color: "from-sky-500/20 to-sky-700/10",
    border: "border-sky-500/40",
    text: "text-sky-300",
    desc: "При заступлении сотрудников на пост, объект или охрану определённой зоны.",
    examples: [
      "/f 01 | КК | 2 чел. | Главный КПП | Пост заняли.",
      "/f 01 | СБП | 3 чел. | Кабинет Президента | Охрана выставлена.",
      "/f 01 | ООС | 2 чел. | Точка сбора | Ожидаем начало сопровождения.",
    ],
  },
  {
    code: "02",
    name: "Патруль",
    color: "from-emerald-500/20 to-emerald-700/10",
    border: "border-emerald-500/40",
    text: "text-emerald-300",
    desc: "При пешем или автомобильном патрулировании территории.",
    examples: [
      "/f 02 | КК | 3 чел. | Территория Кремля | Патруль начали.",
      "/f 02 | СБП | 2 чел. | Периметр Правительства | Проверяем территорию.",
      "/f 02 | КК | 3 чел. | Кремль | Патруль завершён.",
    ],
  },
  {
    code: "03",
    name: "Сопровождение",
    color: "from-amber-500/20 to-amber-700/10",
    border: "border-amber-500/40",
    text: "text-amber-300",
    desc: "Универсальный код для сопровождения охраняемых лиц и движения кортежа.",
    examples: [
      "/f 03 | СБП | 4 чел. | Президент | Сопровождение начато.",
      "/f 03 | ООС | 6 чел. / 4 авто | Кремль → Правительство | Кортеж выдвинулся.",
      "/f 03 | ООС | 8 чел. / 5 авто | Правительство | Сопровождение завершено.",
    ],
  },
  {
    code: "04",
    name: "Усиление",
    color: "from-rose-500/20 to-rose-700/10",
    border: "border-rose-500/40",
    text: "text-rose-300",
    desc: "Когда требуется дополнительное количество сотрудников или экипажей.",
    examples: [
      "/f 04 | КК | +2 чел. | КПП №1 | Требуется усиление.",
      "/f 04 | СБП | +3 чел. | Президент | Требуется усиление охраны.",
      "/f 04 | ООС | +1 экипаж | Кремль | Требуется машина сопровождения.",
    ],
  },
  {
    code: "05",
    name: "Инцидент / Угроза",
    color: "from-red-500/20 to-red-700/10",
    border: "border-red-500/40",
    text: "text-red-300",
    desc: "При нарушении режима, подозрительном лице, проникновении, нападении или иной угрозе.",
    examples: [
      "/f 05 | КК | 2 чел. | КПП №2 | Задержано подозрительное лицо.",
      "/f 05 | СБП | 4 чел. | Президент | Обнаружена угроза, охрана усилена.",
      "/f 05 | ООС | 5 авто | Маршрут | Посторонний автомобиль у кортежа.",
    ],
  },
  {
    code: "06",
    name: "Смена / Освобождение",
    color: "from-violet-500/20 to-violet-700/10",
    border: "border-violet-500/40",
    text: "text-violet-300",
    desc: "При снятии с поста, завершении задачи или освобождении сотрудников.",
    examples: [
      "/f 06 | КК | 2 чел. | КПП Кремля | Пост сдали.",
      "/f 06 | СБП | 4 чел. | Президент | Охрана завершена.",
      "/f 06 | ООС | 6 чел. / 4 авто | Кремль | Сопровождение завершено, сотрудники свободны.",
    ],
  },
];

export function RadioCodesSection() {
  return (
    <SectionWrapper id="radio-codes" className="bg-navy relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <OrnateHeading
        title="Единая система радиокодов УСН"
        subtitle="СБП | ООС | КК — единый протокол радиопереговоров"
        emblem={false}
      />

      {/* Format banner */}
      <div className="rounded-xl border border-sky-500/30 bg-gradient-to-r from-sky-900/20 to-transparent p-5 mb-8">
        <div className="flex items-start gap-3 mb-3">
          <Radio className="h-6 w-6 text-sky-300 shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-wider text-sky-300 mb-1">Формат сообщения</p>
            <code className="block font-mono text-sm md:text-base text-gold-light bg-navy-dark/60 border border-gold/20 rounded px-3 py-2 break-all">
              /f [КОД] | [ОТДЕЛ] | [КОЛ-ВО] | [МЕСТО / ОБЪЕКТ] | [ИНФОРМАЦИЯ]
            </code>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-sky-500/20">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Пример:</p>
          <code className="block font-mono text-xs text-foreground/80 bg-navy-dark/60 border border-gold/20 rounded px-3 py-2">
            /f 01 | КК | 2 чел. | КПП Кремля | Пост заняли.
          </code>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Infographic */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="rounded-xl border border-gold/25 bg-navy-light/40 p-3 overflow-hidden">
            <img
              src="/images/usn/radio-codes.png"
              alt="Единая система радиокодов УСН"
              className="w-full h-auto rounded-lg"
            />
            <p className="text-xs text-center text-muted-foreground italic mt-2">
              Шпаргалка по радиокодам для подразделений СБП, ООС и КК
            </p>
          </div>
        </div>

        {/* Codes list */}
        <div className="lg:col-span-7 space-y-3">
          {CODES.map(({ code, name, color, border, text, desc, examples }) => (
            <div
              key={code}
              className={`group rounded-xl border ${border} bg-gradient-to-br ${color} p-4 hover:border-gold/50 transition-all`}
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <div className={`h-14 w-14 rounded-lg bg-navy-dark/60 border ${border} flex items-center justify-center`}>
                    <span className={`font-serif-display text-2xl font-bold ${text}`}>{code}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-serif-display text-lg font-semibold ${text} mb-1`}>
                    {name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">{desc}</p>
                  <div className="space-y-1">
                    {examples.map((ex, i) => (
                      <code
                        key={i}
                        className="block font-mono text-[11px] text-foreground/75 bg-navy-dark/60 border border-gold/15 rounded px-2 py-1 break-all"
                      >
                        {ex}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules */}
      <div className="mt-10 rounded-xl border border-gold/30 bg-navy-light/40 p-6">
        <h3 className="text-center font-serif-display text-xl text-gold-light uppercase tracking-wide mb-6">
          Как правильно писать в рацию
        </h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-semibold text-gold-light mb-2">Всегда указываем:</p>
            <ol className="space-y-1 text-sm text-foreground/85">
              {[
                "Код действия",
                "Подразделение",
                "Количество сотрудников",
                "Место / объект / охраняемое лицо",
                "Краткий статус",
              ].map((t, i) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="h-5 w-5 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-sm font-semibold text-gold-light mb-2">Главное правило:</p>
            <p className="text-sm text-foreground/85 mb-3">
              Сообщение должно отвечать на четыре вопроса:
            </p>
            <div className="flex flex-wrap gap-2">
              {["Кто?", "Сколько?", "Где?", "Что делает?"].map((q) => (
                <span key={q} className="px-3 py-1.5 rounded-full text-sm border border-gold/40 bg-gold/10 text-gold-light font-semibold">
                  {q}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic mt-3">
              По одной строке руководство сразу понимает, что, например, 4 сотрудника
              СБП сейчас заняты сопровождением Президента.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
