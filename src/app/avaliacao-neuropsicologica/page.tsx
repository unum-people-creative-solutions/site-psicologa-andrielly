import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Hero } from "@/components/landing/Hero";
import { TriggerSection } from "@/components/landing/TriggerSection";
import { Differential } from "@/components/landing/Differential";
import { Deliverable } from "@/components/landing/Deliverable";
import { Process } from "@/components/landing/Process";
import { EvaluationTypes } from "@/components/landing/EvaluationTypes";
import { AboutProfessional } from "@/components/landing/AboutProfessional";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Avaliação Neuropsicológica em Curitiba | Andrielly Oliveira",
  description:
    "Avaliação psicológica e neuropsicológica com Andrielly Oliveira, psicóloga (CRP 08/35504), no Centro Cívico, Curitiba.",
  alternates: {
    canonical: "/avaliacao-neuropsicologica",
  },
};

export default function AvaliacaoNeuropsicologicaPage() {
  return (
    <>
      <LandingHeader />
      <main>
        <Hero />
        <TriggerSection />
        <Differential />
        <Deliverable />
        <Process />
        <EvaluationTypes />
        <AboutProfessional />
        <Faq />
        <FinalCta />
      </main>
      <LandingFooter />
      <WhatsAppButton origem="LP Avaliação - Flutuante" />
    </>
  );
}
