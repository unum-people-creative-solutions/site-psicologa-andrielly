import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Hero } from "@/components/landing/Hero";
import { TriggerSection } from "@/components/landing/TriggerSection";
import { EvaluatedConditions } from "@/components/landing/EvaluatedConditions";
import { Differential } from "@/components/landing/Differential";
import { Deliverable } from "@/components/landing/Deliverable";
import { Process } from "@/components/landing/Process";
import { AboutProfessional } from "@/components/landing/AboutProfessional";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { LeadCta } from "@/components/landing/LeadCta";
import {
  metadados,
  hero,
  gatilhos,
  condicoes,
  participacao,
  entregavel,
  ctaFinal,
  origem,
  origemFlutuante,
  conversionLabel,
} from "@/content/avaliacao-infantil";
import { faqInfantil } from "@/content/avaliacao-infantil-faq";

const PAGE_URL = "https://psiandriellyoliveira.com.br/avaliacao-neuropsicologica-infantil";

export const metadata: Metadata = {
  title: metadados.title,
  description: metadados.description,
  alternates: {
    canonical: "/avaliacao-neuropsicologica-infantil",
  },
  openGraph: {
    title: metadados.title,
    description: metadados.description,
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

/** Derivado de avaliacao-infantil-faq.ts — nunca escrito à mão. */
function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqInfantil.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.resposta,
      },
    })),
  };
}

/** Sem nenhum campo de preço (offers/price/priceRange) — Art. 20. */
function buildServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Avaliação Neuropsicológica Infantil",
    areaServed: "Curitiba",
    provider: {
      "@type": "Psychologist",
      name: "Andrielly Oliveira - Psicóloga",
      url: "https://psiandriellyoliveira.com.br",
    },
  };
}

export default function AvaliacaoNeuropsicologicaInfantilPage() {
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
      <LandingHeader origem={origem} conversionLabel={conversionLabel} />
      <main>
        <Hero {...hero} origem={origem} conversionLabel={conversionLabel} />
        <TriggerSection gatilhos={gatilhos} />
        <EvaluatedConditions {...condicoes} />
        <Differential {...participacao} />
        <Deliverable {...entregavel} />
        <Process />
        <AboutProfessional />
        <Faq items={faqInfantil} />
        <FinalCta {...ctaFinal} origem={origem} conversionLabel={conversionLabel} />
      </main>
      <LandingFooter />
      <LeadCta
        label="Contato via WhatsApp"
        variant="floating"
        origem={origemFlutuante}
        conversionLabel={conversionLabel}
      />
    </>
  );
}
