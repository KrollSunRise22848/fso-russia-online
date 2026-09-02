"use client";

import { OrnateHeading, SectionWrapper } from "./OrnateHeading";
import { Building2, ShieldCheck, Users, IdCard, Ban, CheckCircle2, AlertTriangle } from "lucide-react";

export function KkSection() {
  return (
    <SectionWrapper id="kk" className="bg-navy-dark border-t border-gold/20">
      <OrnateHeading
        title="Комендатура Кремля"
        subtitle="КК — структурное подразделение УСН ФСО: пропускной режим и охрана Кремля"
        emblem={false}
      />

      {/* Header bar */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-900/15 p-5 mb-8 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
            <Building2 className="h-7 w-7 text-amber-300" />
          </div>
          <div>
            <h3 className="font-serif-display text-2xl font-bold text-amber-300">КК</h3>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Комендатура Кремля
            </p>
          </div>
        </div>
        <p className="text-sm text-foreground/80 md:ml-auto md:text-right max-w-md">
          Структурное подразделение УСН ФСО — отвечает за пропускной режим,
          охрану объектов Московского Кремля, патрулирование и реагирование
          на нарушения установленного режима.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Infographic */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-gold/25 bg-navy-light/40 p-3 overflow-hidden">
            <img
              src="/images/usn/kk-posts.png"
              alt="Памятка для личного состава Комендатуры Кремля"
              className="w-full h-auto rounded-lg"
            />
            <p className="text-xs text-center text-muted-foreground italic mt-2">
              Памятка КК: основные посты, задачи, действия сотрудника, запреты
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Main tasks */}
          <div className="rounded-xl border border-gold/20 bg-navy-light/40 p-5">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-gold" />
              <h4 className="font-serif-display text-lg font-semibold text-gold-light">
                Основные задачи КК
              </h4>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gold-light mb-1">Пропускной режим</p>
                <ul className="space-y-0.5 text-xs text-foreground/80">
                  <li>• Контроль входа и выхода граждан</li>
                  <li>• Проверка документов и оснований для нахождения</li>
                  <li>• Контроль въезда и выезда транспортных средств</li>
                  <li>• Проверка перемещения материальных ценностей</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold-light mb-1">Охрана объектов</p>
                <ul className="space-y-0.5 text-xs text-foreground/80">
                  <li>• Несение службы на установленных постах</li>
                  <li>• Охрана входов, КПП и важных объектов</li>
                  <li>• Контроль внутренней и прилегающей территории</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold-light mb-1">Патрулирование</p>
                <ul className="space-y-0.5 text-xs text-foreground/80">
                  <li>• Регулярный обход закреплённого сектора</li>
                  <li>• Наблюдение за периметром</li>
                  <li>• Выявление подозрительных лиц и действий</li>
                  <li>• Контроль соблюдения установленного режима</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-900/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-amber-300" />
              <h4 className="font-serif-display text-lg font-semibold text-amber-300">
                Основные посты
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {["КПП и входные группы", "Входы в охраняемые здания", "Стационарные посты охраны", "Пеший патруль", "Контроль транспортного въезда"].map((p) => (
                <span key={p} className="px-2.5 py-1 rounded text-xs border border-amber-500/30 bg-amber-900/20 text-amber-200">
                  {p}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground italic mt-3">
              После получения поста сотрудник обязан находиться в закреплённом секторе до смены либо распоряжения руководства.
            </p>
          </div>

          {/* Citizen check */}
          <div className="rounded-xl border border-gold/20 bg-navy-light/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <IdCard className="h-5 w-5 text-gold" />
              <h4 className="font-serif-display text-lg font-semibold text-gold-light">
                Проверка граждан и транспорта
              </h4>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Алгоритм действий сотрудника:</p>
            <ol className="space-y-1.5 text-sm text-foreground/85">
              {[
                "Останавливает гражданина",
                "Проверяет документы",
                "Устанавливает основание для прохода",
                "При необходимости проводит досмотр",
                "Разрешает проход либо отказывает в допуске",
              ].map((t, i) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="h-5 w-5 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
            <p className="text-[11px] text-amber-300 italic mt-3">
              При возникновении сомнений сотрудник обязан связаться со старшим смены или руководством КК.
            </p>
          </div>

          {/* Prohibitions */}
          <div className="rounded-xl border border-rose-500/30 bg-rose-900/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Ban className="h-5 w-5 text-rose-300" />
              <h4 className="font-serif-display text-lg font-semibold text-rose-300">
                Сотруднику запрещается
              </h4>
            </div>
            <ul className="grid sm:grid-cols-2 gap-1.5 text-xs text-foreground/85">
              {[
                "Самовольно покидать пост",
                "Пропускать граждан без проверки",
                "Пропускать транспорт без основания",
                "Игнорировать подозрительные действия",
                "Оставлять пост без связи",
                "Изменять порядок допуска",
                "Использовать полномочия в личных целях",
              ].map((t) => (
                <li key={t} className="flex items-start gap-1.5">
                  <Ban className="h-3.5 w-3.5 text-rose-300/70 mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Main principle */}
          <div className="rounded-xl border border-gold/40 bg-gradient-to-br from-gold/15 to-transparent p-5 text-center">
            <h4 className="font-serif-display text-lg text-gold-light uppercase tracking-wide mb-3">
              Главный принцип КК
            </h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Увидел нарушение — </span><span className="text-gold font-semibold">останови.</span></p>
              <p><span className="text-muted-foreground">Обнаружил угрозу — </span><span className="text-gold font-semibold">доложи.</span></p>
              <p><span className="text-muted-foreground">Получил приказ — </span><span className="text-gold font-semibold">выполни.</span></p>
              <p><span className="text-muted-foreground">Заступил на пост — </span><span className="text-gold font-semibold">отвечай за сектор.</span></p>
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-gold/80">
              КК — контроль, порядок, безопасность Кремля
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
