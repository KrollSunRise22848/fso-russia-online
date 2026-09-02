"use client";

import { OrnateHeading, SectionWrapper } from "./OrnateHeading";
import { Crosshair, Shield, Target, Flag, Users, Star } from "lucide-react";

const TASKS = [
  {
    icon: Shield,
    title: "Охрана объектов",
    text: "Несение службы на постах, охрана и оборона важнейших государственных объектов и резиденций.",
  },
  {
    icon: Crosshair,
    title: "Специальные операции",
    text: "Подготовка и проведение специальных мероприятий по нейтрализации угроз безопасности.",
  },
  {
    icon: Target,
    title: "Тактическая подготовка",
    text: "Постоянное совершенствование боевой выучки, огневой и тактико-специальной подготовки.",
  },
  {
    icon: Flag,
    title: "Несение караульной службы",
    text: "Организация караульной службы, обеспечение пропускного режима и контрольно-пропускных пунктов.",
  },
  {
    icon: Users,
    title: "Личный состав",
    text: "Подбор, обучение и воспитание личного состава подразделений специального назначения.",
  },
  {
    icon: Star,
    title: "Готовность №1",
    text: "Поддержание постоянной боевой готовности к действиям по предназначению в любых условиях.",
  },
];

export function UsnSection() {
  return (
    <SectionWrapper id="usn" className="bg-navy relative">
      {/* Decorative top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <OrnateHeading
        title="Управление Специального Назначения"
        subtitle="УСН — элитное подразделение Федеральной Службы Охраны"
      />

      <div className="grid md:grid-cols-12 gap-8 items-center mb-12">
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
          <p className="text-foreground/85 leading-relaxed mb-4">
            <span className="text-gold font-semibold">УСН</span> — Управление Специального
            Назначения — является самостоятельным структурным подразделением Федеральной
            Службы Охраны, предназначенным для выполнения наиболее сложных задач по
            обеспечению безопасности охраняемых лиц и объектов.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Личный состав УСН проходит суровый отбор и многоступенчатую подготовку.
            Бойцы Управления владеют различными видами стрелкового оружия, тактикой
            боя в условиях города, навыками оказания первой помощи и психологической
            устойчивостью в экстремальных ситуациях.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Тактическая подготовка", "Огневая подготовка", "Контртеррор", "Охрана VIP"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider border border-gold/30 bg-gold/5 text-gold-light"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TASKS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="group relative rounded-xl border border-gold/20 bg-navy-light/40 p-5 hover:border-gold/50 transition-all overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gold/5 group-hover:bg-gold/10 transition-colors" />
            <div className="relative flex items-start gap-3">
              <Icon className="h-6 w-6 text-gold shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gold-light mb-1.5">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
