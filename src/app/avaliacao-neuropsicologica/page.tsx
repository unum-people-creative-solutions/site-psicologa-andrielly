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
import { LeadCta } from "@/components/landing/LeadCta";
import { faq } from "@/content/avaliacao-faq";

const PAGE_URL = "https://psiandriellyoliveira.com.br/avaliacao-neuropsicologica";
const PAGE_TITLE = "Avaliação Neuropsicológica em Curitiba | Andrielly Oliveira";
const PAGE_DESCRIPTION =
  "Avaliação psicológica e neuropsicológica com Andrielly Oliveira, psicóloga (CRP 08/35504), no Centro Cívico, Curitiba.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/avaliacao-neuropsicologica",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Andrielly Oliveira Psicologia",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/psiandriellyoliveira-20250319_153010.jpg",
        width: 1200,
        height: 630,
        alt: "Andrielly Oliveira - Psicóloga Clínica",
      },
    ],
  },
};

/**
 * Derivado de src/content/avaliacao-faq.ts — nunca escrito à mão. Uma
 * pergunta editada ali sem editar aqui seria uma divergência entre o que
 * o usuário vê e o que o Google indexa, o tipo de coisa que pode gerar
 * penalização de rich result. TASK-LAUNCH-001.
 */
function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.resposta,
      },
    })),
  };
}

/**
 * Sem nenhum campo de preço (offers/price/priceRange) — Art. 20 do
 * Código de Ética veda preço como propaganda, e isso vale para dado
 * estruturado tanto quanto para o texto visível. TASK-LAUNCH-002.
 */
function buildServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Avaliação Neuropsicológica e Psicológica",
    areaServed: "Curitiba",
    provider: {
      "@type": "Psychologist",
      name: "Andrielly Oliveira - Psicóloga",
      url: "https://psiandriellyoliveira.com.br",
    },
  };
}

export default function AvaliacaoNeuropsicologicaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceJsonLd()) }}
      />
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
      <LeadCta
        label="Contato via WhatsApp"
        variant="floating"
        origem="LP Avaliação - Flutuante"
      />
    </>
  );
}
