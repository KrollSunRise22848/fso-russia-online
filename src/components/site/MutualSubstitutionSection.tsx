"use client";

import { OrnateHeading, SectionWrapper } from "./OrnateHeading";
import { Crown, Car, Building2, ArrowLeftRight, AlertTriangle, CheckCircle2 } from "lucide-react";

const SUBSTITUTIONS = [
  {
    from: { abbr: "КК", icon: Building2, color: "text-amber-300", border: "border-amber-500/40" },
    to: [
      { abbr: "СБП", icon: Crown, color: "text-rose-300", border: "border-rose-500/40", tasks: ["охрана охраняемого лица", "внешний периметр", "охрана входов и помещений", "эвакуационные мероприятия"] },
      { abbr: "ООС", icon: Car, color: "text-sky-300", border: "border-sky-500/40", tasks: ["сопровождение", "машины сопровождения", "безопасность точки отправления", "перекрытие территории"] },
    ],
  },
  {
    from: { abbr: "ООС", icon: Car, color: "text-sky-300", border: "border-sky-500/40" },
    to: [
      { abbr: "СБП", icon: Crown, color: "text-rose-300", border: "border-rose-500/40", tasks: ["сопровождение охраняемого лица", "внешний периметр", "эвакуация", "усиление охраны при движении"] },
      { abbr: "КК", icon: Building2, color: "text-amber-300", border: "border-amber-500/40", tasks: ["посты", "патрулирование", "контроль входов и КПП", "помощь при задержании"] },
    ],
  },
  {
    from: { abbr: "СБП", icon: Crown, color: "text-rose-300", border: "border-rose-500/40" },
    to: [
      { abbr: "ООС", icon: Car, color: "text-sky-300", border: "border-sky-500/40", tasks: ["позиции в сопровождении", "защита в автомобиле", "построение кортежа", "безопасность при посадке"] },
      { abbr: "КК", icon: Building2, color: "text-amber-300", border: "border-amber-500/40", tasks: ["охрана объектов", "усиление КПП", "патрулирование", "пресечение нарушений"] },
    ],
  },
];

export function MutualSubstitutionSection() {
  return (
    <SectionWrapper id="substitution" className="bg-navy-dark border-t border-gold/20">
      <OrnateHeading
        title="Взаимозамещение подразделений УСН"
        subtitle="СБП | ООС | КК — единое Управление Специального Назначения"
        emblem={false}
      />

      {/* When allowed */}
      <div className="rounded-xl border border-gold/30 bg-navy-light/40 p-5 mb-8">
        <h3 className="text-center font-serif-display text-xl text-gold-light uppercase tracking-wide mb-4">
          Когда допускается взаимозамещение?
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            "Временное отсутствие сотрудников нужного отдела",
            "Недостаточное количество личного состава",
            "Необходимость усиления другого подразделения",
            "Прямое распоряжение Начальника УСН",
          ].map((reason, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border border-gold/20 bg-navy-dark/40 p-3">
              <CheckCircle2 className="h-5 w-5 text-gold/70 mt-0.5 shrink-0" />
              <p className="text-xs text-foreground/85">{reason}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-muted-foreground italic mt-4">
          Взаимозамещение не означает постоянный перевод сотрудника в другое подразделение.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Infographic */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="rounded-xl border border-gold/25 bg-navy-light/40 p-3 overflow-hidden">
            <img
              src="/images/usn/mutual-substitution.png"
              alt="Схема взаимозаменяемости подразделений СБП, ООС и КК"
              className="w-full h-auto rounded-lg"
            />
            <p className="text-xs text-center text-muted-foreground italic mt-2">
              Схема взаимодействия: СБП, ООС и КК в условиях взаимозаменяемости
            </p>
          </div>
        </div>

        {/* Substitution cards */}
        <div className="lg:col-span-7 space-y-4">
          {SUBSTITUTIONS.map((sub, idx) => (
            <div key={idx} className="rounded-xl border border-gold/20 bg-navy-light/40 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`h-12 w-12 rounded-lg bg-navy-dark/60 border ${sub.from.border} flex items-center justify-center shrink-0`}>
                  <sub.from.icon className={`h-6 w-6 ${sub.from.color}`} />
                </div>
                <div>
                  <p className={`font-serif-display text-xl font-bold ${sub.from.color}`}>
                    {sub.from.abbr}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    может выполнять задачи
                  </p>
                </div>
                <ArrowLeftRight className="h-5 w-5 text-gold/60 ml-auto" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {sub.to.map((to, i) => (
                  <div key={i} className="rounded-lg border border-gold/15 bg-navy-dark/40 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <to.icon className={`h-5 w-5 ${to.color}`} />
                      <span className={`font-serif-display text-base font-bold ${to.color}`}>
                        {to.abbr}
                      </span>
                    </div>
                    <ul className="space-y-0.5">
                      {to.tasks.map((task) => (
                        <li key={task} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                          <span className="text-gold/50 mt-0.5">•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency priority */}
      <div className="mt-10 rounded-xl border border-rose-500/30 bg-rose-900/15 p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-rose-300" />
          <h3 className="font-serif-display text-xl font-semibold text-rose-300 uppercase tracking-wide">
            Приоритет при чрезвычайной ситуации
          </h3>
        </div>
        <p className="text-sm text-foreground/85 mb-4">
          При возникновении угрозы охраняемому лицу или объекту подразделения УСН действуют совместно:
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-rose-500/30 bg-rose-900/20 p-3 text-center">
            <Crown className="h-7 w-7 text-rose-300 mx-auto mb-2" />
            <p className="font-serif-display text-base text-rose-300 font-semibold">СБП</p>
            <p className="text-[11px] text-muted-foreground mt-1">Защита охраняемого лица</p>
          </div>
          <div className="rounded-lg border border-sky-500/30 bg-sky-900/20 p-3 text-center">
            <Car className="h-7 w-7 text-sky-300 mx-auto mb-2" />
            <p className="font-serif-display text-base text-sky-300 font-semibold">ООС</p>
            <p className="text-[11px] text-muted-foreground mt-1">Транспорт, маршрут, эвакуация</p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-900/20 p-3 text-center">
            <Building2 className="h-7 w-7 text-amber-300 mx-auto mb-2" />
            <p className="font-serif-display text-base text-amber-300 font-semibold">КК</p>
            <p className="text-[11px] text-muted-foreground mt-1">Охрана объекта, периметра</p>
          </div>
        </div>
      </div>

      {/* Main principle */}
      <div className="mt-6 rounded-xl border border-gold/40 bg-gradient-to-br from-gold/15 to-transparent p-6 text-center">
        <h4 className="font-serif-display text-xl text-gold-light uppercase tracking-wide mb-3">
          Главный принцип
        </h4>
        <p className="text-base text-foreground/90 max-w-2xl mx-auto leading-relaxed">
          СБП, ООС и КК — не три отдельные структуры, а{" "}
          <span className="text-gold font-semibold">единое Управление Специального Назначения</span>.
          Не хватает одного подразделения — его усиливает другое.
        </p>
        <p className="mt-3 text-sm uppercase tracking-[0.25em] text-gold/80">
          Главная задача УСН — безопасность охраняемого лица и объекта
        </p>
      </div>
    </SectionWrapper>
  );
}
