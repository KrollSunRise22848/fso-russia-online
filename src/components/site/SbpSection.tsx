"use client";

import { OrnateHeading, SectionWrapper } from "./OrnateHeading";
import { Crown, Users, MapPin, ShieldAlert, AlertTriangle, Radio, CheckCircle2 } from "lucide-react";

export function SbpSection() {
  return (
    <SectionWrapper id="sbp" className="bg-navy-dark border-t border-gold/20">
      <OrnateHeading
        title="Служба Безопасности Президента"
        subtitle="СБП — непосредственная физическая охрана Президента РФ"
        emblem={false}
      />

      {/* Header bar */}
      <div className="rounded-xl border border-rose-500/30 bg-rose-900/15 p-5 mb-8 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
            <Crown className="h-7 w-7 text-rose-300" />
          </div>
          <div>
            <h3 className="font-serif-display text-2xl font-bold text-rose-300">СБП</h3>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Служба Безопасности Президента
            </p>
          </div>
        </div>
        <p className="text-base text-foreground/85 md:ml-auto md:text-right max-w-md leading-relaxed">
          Главная задача — защита Президента, недопущение посторонних лиц и
          немедленная эвакуация при возникновении угрозы.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Infographic */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-gold/25 bg-navy-light/40 p-3 overflow-hidden">
            <img
              src="/images/usn/sbp-scheme.png"
              alt="Схема охраны Президента — СБП"
              className="w-full h-auto rounded-lg"
            />
            <p className="text-xs text-center text-muted-foreground italic mt-2">
              Схема построения охраны СБП: ближний круг, внешний периметр, действия при нападении
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Leadership */}
          <div className="rounded-xl border border-gold/20 bg-navy-light/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-gold" />
              <h4 className="font-serif-display text-lg font-semibold text-gold-light">
                Руководство охраной
              </h4>
            </div>
            <p className="text-sm text-foreground/90 mb-3">
              Руководство осуществляет начальник СБП, его заместители, а при их
              отсутствии — назначенный старший группы.
            </p>
            <p className="text-sm text-foreground/80 mb-3">Перед мероприятием старший группы обязан:</p>
            <ul className="space-y-1.5 text-sm text-foreground/90">
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
            <p className="text-xs text-rose-300 italic mt-3">
              Все сотрудники выполняют команды старшего группы. Самовольное оставление позиции запрещено.
            </p>
          </div>

          {/* Formation */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gold/20 bg-navy-light/40 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="h-5 w-5 text-gold" />
                <h4 className="font-semibold text-gold-light">Ближний круг</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Начальник СБП, заместители и назначенные сотрудники.
              </p>
              <ul className="space-y-1 text-xs text-foreground/80">
                <li>• находиться рядом с Президентом</li>
                <li>• контролировать ближайшее окружение</li>
                <li>• не допускать посторонних</li>
                <li>• прикрыть Президента при нападении</li>
                <li>• провести эвакуацию</li>
              </ul>
              <p className="text-[11px] text-rose-300/80 italic mt-2">
                Не покидает Президента для преследования.
              </p>
            </div>
            <div className="rounded-xl border border-gold/20 bg-navy-light/40 p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-gold" />
                <h4 className="font-semibold text-gold-light">Внешний периметр</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Формируется из офицеров ФСО.
              </p>
              <ul className="space-y-1 text-xs text-foreground/80">
                <li>• наблюдать за территорией</li>
                <li>• выявлять подозрительных лиц</li>
                <li>• ограничивать доступ к Президенту</li>
                <li>• прикрывать маршрут эвакуации</li>
                <li>• пресекать нападение</li>
              </ul>
            </div>
          </div>

          {/* Actions during attack */}
          <div className="rounded-xl border border-rose-500/30 bg-rose-900/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="h-5 w-5 text-rose-300" />
              <h4 className="font-serif-display text-lg font-semibold text-rose-300">
                Действия при нападении
              </h4>
            </div>
            <ol className="space-y-2 text-sm text-foreground/85">
              <li>
                <span className="text-gold font-semibold">1. Прикрытие и эвакуация.</span> Ближний
                круг закрывает Президента от угрозы, выводит из зоны поражения в укрытие.
              </li>
              <li>
                <span className="text-gold font-semibold">2. Охрана укрытия.</span> Возле Президента
                остаются четыре сотрудника. Президент не должен оставаться без охраны.
              </li>
              <li>
                <span className="text-gold font-semibold">3. Отражение нападения.</span> Внешний
                периметр занимает позиции, блокирует нападавших, прикрывает эвакуационную группу.
              </li>
            </ol>
          </div>

          {/* Mass disturbances */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-900/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-300" />
              <h4 className="font-serif-display text-lg font-semibold text-amber-300">
                При массовых беспорядках
              </h4>
            </div>
            <ul className="space-y-1 text-xs text-foreground/85">
              <li>• Президент немедленно эвакуируется в безопасное помещение</li>
              <li>• В укрытии остаются четыре сотрудника охраны</li>
              <li>• Внешний периметр блокирует доступ к Президенту</li>
              <li>• Нарушителям выдвигается требование прекратить действия</li>
              <li>• Применяются разрешённые спецсредства: наручники, тайзер, дубинка</li>
              <li>• При невозможности урегулирования — полная эвакуация</li>
            </ul>
          </div>

          {/* Main rules */}
          <div className="rounded-xl border border-gold/30 bg-navy-light/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Radio className="h-5 w-5 text-gold" />
              <h4 className="font-serif-display text-lg font-semibold text-gold-light">
                Главные правила
              </h4>
            </div>
            <ul className="grid sm:grid-cols-2 gap-1.5 text-xs text-foreground/85">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-gold/70 mt-0.5 shrink-0" />Приоритет — жизнь Президента</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-gold/70 mt-0.5 shrink-0" />Команды старшего группы</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-gold/70 mt-0.5 shrink-0" />Ближний круг — прикрытие</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-gold/70 mt-0.5 shrink-0" />Внешний периметр — сдерживание</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-gold/70 mt-0.5 shrink-0" />ООС — готовность транспорта</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-gold/70 mt-0.5 shrink-0" />Запрет покидать позицию</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
