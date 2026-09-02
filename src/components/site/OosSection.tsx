"use client";

import { OrnateHeading, SectionWrapper } from "./OrnateHeading";
import { Car, Flag, Radio, ShieldAlert, ListChecks, Ban, CheckCircle2 } from "lucide-react";

export function OosSection() {
  return (
    <SectionWrapper id="oos" className="bg-navy relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <OrnateHeading
        title="Отдел Организации Спецсопровождений"
        subtitle="ООС — организация безопасного передвижения охраняемых лиц"
        emblem={false}
      />

      {/* Header bar */}
      <div className="rounded-xl border border-sky-500/30 bg-sky-900/15 p-5 mb-8 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center">
            <Car className="h-7 w-7 text-sky-300" />
          </div>
          <div>
            <h3 className="font-serif-display text-2xl font-bold text-sky-300">ООС</h3>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Отдел Организации Спецсопровождений
            </p>
          </div>
        </div>
        <p className="text-sm text-foreground/80 md:ml-auto md:text-right max-w-md">
          Организация безопасного передвижения охраняемого лица, формирование
          кортежа, соблюдение строя и координация экипажей.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Infographic */}
        <div className="lg:sticky lg:top-24 lg:order-2">
          <div className="rounded-xl border border-gold/25 bg-navy-light/40 p-3 overflow-hidden">
            <img
              src="/images/usn/oos-convoy.png"
              alt="Схема кортежа ООС — Aurus Senat и Komendant"
              className="w-full h-auto rounded-lg"
            />
            <p className="text-xs text-center text-muted-foreground italic mt-2">
              Схема построения кортежа: 13 автомобилей Aurus Senat и Aurus Komendant в трёх линиях
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 lg:order-1">
          {/* Convoy composition */}
          <div className="rounded-xl border border-gold/20 bg-navy-light/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Flag className="h-5 w-5 text-gold" />
              <h4 className="font-serif-display text-lg font-semibold text-gold-light">
                Состав кортежа
              </h4>
            </div>
            <p className="text-sm text-foreground/80 mb-4">
              Кортеж формируется из автомобилей{" "}
              <span className="text-gold-light font-semibold">Aurus Senat</span> и{" "}
              <span className="text-gold-light font-semibold">Aurus Komendant</span> и
              состоит из трёх линий.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-gold/25 bg-navy-dark/50 p-3 text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Левая линия</p>
                <p className="font-serif-display text-2xl text-gold-light font-bold mt-1">4</p>
                <p className="text-[10px] text-muted-foreground">3× Komendant + 1× Senat</p>
              </div>
              <div className="rounded-lg border border-gold/40 bg-gold/10 p-3 text-center">
                <p className="text-xs uppercase tracking-wider text-gold-light">Центр</p>
                <p className="font-serif-display text-2xl text-gold font-bold mt-1">5</p>
                <p className="text-[10px] text-muted-foreground">5× Senat</p>
              </div>
              <div className="rounded-lg border border-gold/25 bg-navy-dark/50 p-3 text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Правая линия</p>
                <p className="font-serif-display text-2xl text-gold-light font-bold mt-1">4</p>
                <p className="text-[10px] text-muted-foreground">3× Komendant + 1× Senat</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gold/15 text-center">
              <p className="text-sm">
                <span className="text-muted-foreground">Общее количество: </span>
                <span className="font-serif-display text-xl text-gold font-bold">13 автомобилей</span>
              </p>
            </div>
          </div>

          {/* Lead car */}
          <div className="rounded-xl border border-sky-500/30 bg-sky-900/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Car className="h-5 w-5 text-sky-300" />
              <h4 className="font-serif-display text-lg font-semibold text-sky-300">
                Ведущая машина
              </h4>
            </div>
            <p className="text-sm text-foreground/80 mb-3">
              Ведущий автомобиль располагается в начале центральной линии. Его задачи:
            </p>
            <ul className="space-y-1 text-xs text-foreground/85">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-sky-300/70 mt-0.5 shrink-0" />задавать маршрут и скорость движения</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-sky-300/70 mt-0.5 shrink-0" />контролировать темп кортежа</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-sky-300/70 mt-0.5 shrink-0" />заранее сообщать об изменении маршрута</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-sky-300/70 mt-0.5 shrink-0" />координировать прохождение перекрёстков</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-sky-300/70 mt-0.5 shrink-0" />не допускать разрыва колонны</li>
            </ul>
            <p className="text-[11px] text-rose-300/80 italic mt-2">
              Самовольная смена ведущей машины запрещена.
            </p>
          </div>

          {/* Radio exchange */}
          <div className="rounded-xl border border-gold/20 bg-navy-light/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Radio className="h-5 w-5 text-gold" />
              <h4 className="font-serif-display text-lg font-semibold text-gold-light">
                Радиообмен
              </h4>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Говорить коротко и по существу. Примеры:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["«Колонна готова»", "«Начинаем движение»", "«Поворот направо»", "«Снижаем скорость»", "«Угроза слева»", "«Колонна, держим строй»", "«Меняем маршрут»"].map((q) => (
                <span key={q} className="px-2 py-1 rounded text-[11px] border border-gold/25 bg-navy-dark/60 text-gold-light font-mono">
                  {q}
                </span>
              ))}
            </div>
          </div>

          {/* Prohibitions */}
          <div className="rounded-xl border border-rose-500/30 bg-rose-900/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Ban className="h-5 w-5 text-rose-300" />
              <h4 className="font-serif-display text-lg font-semibold text-rose-300">
                Запрещается
              </h4>
            </div>
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
          </div>

          {/* Principles */}
          <div className="rounded-xl border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-5">
            <div className="flex items-center gap-2 mb-3">
              <ListChecks className="h-5 w-5 text-gold" />
              <h4 className="font-serif-display text-lg font-semibold text-gold-light">
                Основные принципы ООС
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Дисциплина", "Связь", "Единый строй", "Скорость реакции", "Безопасность сопровождаемого лица"].map((p) => (
                <span key={p} className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider border border-gold/40 bg-gold/10 text-gold-light">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
