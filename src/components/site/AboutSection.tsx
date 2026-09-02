"use client";

import { OrnateHeading, SectionWrapper } from "./OrnateHeading";
import { ShieldCheck, ScrollText, Award, Users, Eye, Crown } from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Обеспечение безопасности",
    text: "Охрана и оборона важных государственных объектов, а также защита высших должностных лиц Государства.",
  },
  {
    icon: Eye,
    title: "Контроль и надзор",
    text: "Координация деятельности структурных подразделений, поддержание служебной дисциплины и порядка.",
  },
  {
    icon: Crown,
    title: "Верность присяге",
    text: "Безукоризненное соблюдение норм служебной этики, верность долгу и присяге сотрудника Службы.",
  },
  {
    icon: Users,
    title: "Единство коллектива",
    text: "Сплочённость личного состава, взаимная выручка и товарищеская поддержка в несении службы.",
  },
  {
    icon: ScrollText,
    title: "Соблюдение уставов",
    text: "Строгое выполнение требований нормативных документов, уставов и приказов руководства.",
  },
  {
    icon: Award,
    title: "Честь и достоинство",
    text: "Беречь честь и достоинство сотрудника Службы, проявлять благоразумие и выдержку.",
  },
];

export function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-navy-dark border-t border-gold/20">
      <OrnateHeading
        title="О Федеральной Службе Охраны"
        subtitle="Официальное представительство Службы в Государстве «Россия Онлайн»"
      />

      <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-12">
        {PILLARS.map(({ icon: Icon, title, text }, i) => (
          <div
            key={title}
            className="group glass-navy border border-gold/25 rounded-xl p-6 hover:border-gold/60 hover:-translate-y-1 transition-all duration-300"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-serif-display text-lg font-semibold text-gold-light tracking-wide">
                {title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      {/* Mission banner */}
      <div className="relative rounded-2xl border border-gold/30 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url(/images/section-bg.png)", backgroundSize: "cover" }}
        />
        <div className="relative bg-navy-light/70 backdrop-blur-sm px-6 py-10 md:px-12 md:py-14 text-center">
          <div className="ornament-divider w-24 mb-6">
            <span className="text-gold">❖</span>
          </div>
          <p className="font-cyrillic text-xl md:text-2xl italic text-foreground/90 max-w-3xl mx-auto leading-relaxed">
            «Цель Службы — обеспечение законности, охрана Государства и защита интересов
            его граждан. Каждый сотрудник — носитель чести и достоинства российского
            государственного служащего».
          </p>
          <div className="ornament-divider w-24 mt-6">
            <span className="text-gold">❖</span>
          </div>
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-gold/80">
            Из Положения о ФСО
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
