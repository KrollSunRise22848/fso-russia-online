"use client";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { AboutSection } from "@/components/site/AboutSection";
import { UsnSection } from "@/components/site/UsnSection";
import { SbpSection } from "@/components/site/SbpSection";
import { OosSection } from "@/components/site/OosSection";
import { KkSection } from "@/components/site/KkSection";
import { RadioCodesSection } from "@/components/site/RadioCodesSection";
import { MutualSubstitutionSection } from "@/components/site/MutualSubstitutionSection";
import { LeadersSection } from "@/components/site/LeadersSection";
import { NewsSection } from "@/components/site/NewsSection";
import { OrdersSection } from "@/components/site/OrdersSection";
import { Footer } from "@/components/site/Footer";
import { LoginDialog } from "@/components/admin/LoginDialog";
import { AdminPanel } from "@/components/admin/AdminPanel";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <UsnSection />
        <SbpSection />
        <OosSection />
        <KkSection />
        <RadioCodesSection />
        <MutualSubstitutionSection />
        <LeadersSection />
        <OrdersSection />
        <NewsSection />
      </main>
      <Footer />

      {/* Modals & panels */}
      <LoginDialog />
      <AdminPanel />
    </div>
  );
}
