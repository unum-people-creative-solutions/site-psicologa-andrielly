import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { LeadProvider } from "@/context/LeadContext";
import { faqInfantil } from "@/content/avaliacao-infantil-faq";
import AvaliacaoInfantilPage, { metadata } from "./page";

function jsonLdBlocks(): Record<string, any>[] {
  render(
    <LeadProvider>
      <AvaliacaoInfantilPage />
    </LeadProvider>
  );
  return Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((s) =>
    JSON.parse(s.innerHTML)
  );
}

describe("LP infantil — T09: metadados e JSON-LD (INF-14, INF-15)", () => {
  it("title, description e canonical são os literais da spec", () => {
    expect(metadata.title).toBe("Avaliação Neuropsicológica Infantil em Curitiba");
    expect(metadata.description).toBe(
      "Avaliação neuropsicológica para crianças e adolescentes: TDAH, TEA, dislexia e dificuldades escolares. Andrielly Oliveira, psicóloga (CRP 08/35504), Curitiba."
    );
    expect(metadata.alternates?.canonical).toBe("/avaliacao-neuropsicologica-infantil");
  });

  it("FAQPage espelha faqInfantil: mesmo comprimento, mesma ordem, mesmo texto", () => {
    const faqLd = jsonLdBlocks().find((b) => b["@type"] === "FAQPage")!;
    expect(faqLd.mainEntity).toHaveLength(faqInfantil.length);
    faqInfantil.forEach((item, i) => {
      expect(faqLd.mainEntity[i].name).toBe(item.pergunta);
      expect(faqLd.mainEntity[i].acceptedAnswer.text).toBe(item.resposta);
    });
  });

  it("Service tem serviceType infantil e nenhum campo de preço", () => {
    const blocks = jsonLdBlocks();
    const service = blocks.find((b) => b["@type"] === "Service")!;
    expect(service.serviceType).toBe("Avaliação Neuropsicológica Infantil");
    const serialized = JSON.stringify(blocks);
    expect(serialized).not.toMatch(/"offers"|"price"|"priceRange"/i);
  });
});
