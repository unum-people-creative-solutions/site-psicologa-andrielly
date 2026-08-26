import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { LeadProvider } from "@/context/LeadContext";
import { faq } from "@/content/avaliacao-faq";
import AvaliacaoNeuropsicologicaPage, { metadata } from "./page";

function renderPage() {
  return render(
    <LeadProvider>
      <AvaliacaoNeuropsicologicaPage />
    </LeadProvider>
  );
}

function jsonLdBlocks(): Record<string, unknown>[] {
  const scripts = Array.from(
    document.querySelectorAll('script[type="application/ld+json"]')
  );
  return scripts.map((s) => JSON.parse(s.innerHTML));
}

describe("LP de avaliação — T01: JSON-LD do FAQ espelha avaliacao-faq.ts", () => {
  it("mainEntity tem o mesmo comprimento, na mesma ordem, com name/text idênticos", () => {
    renderPage();
    const faqLd = jsonLdBlocks().find((b) => b["@type"] === "FAQPage") as any;

    expect(faqLd).toBeDefined();
    expect(faqLd.mainEntity).toHaveLength(faq.length);

    faq.forEach((item, index) => {
      expect(faqLd.mainEntity[index]["@type"]).toBe("Question");
      expect(faqLd.mainEntity[index].name).toBe(item.pergunta);
      expect(faqLd.mainEntity[index].acceptedAnswer["@type"]).toBe("Answer");
      expect(faqLd.mainEntity[index].acceptedAnswer.text).toBe(item.resposta);
    });
  });
});

describe("LP de avaliação — T02: JSON-LD não publica preço", () => {
  it("nenhum bloco JSON-LD contém price, priceRange ou offers", () => {
    renderPage();
    const blocks = jsonLdBlocks();
    const serialized = JSON.stringify(blocks);

    expect(serialized).not.toMatch(/"price"/i);
    expect(serialized).not.toMatch(/"priceRange"/i);
    expect(serialized).not.toMatch(/"offers"/i);
  });

  it("o bloco Service existe, vinculado ao provider Psychologist, sem preço", () => {
    renderPage();
    const serviceLd = jsonLdBlocks().find((b) => b["@type"] === "Service") as any;

    expect(serviceLd).toBeDefined();
    expect(serviceLd.provider["@type"]).toBe("Psychologist");
    expect(serviceLd.price).toBeUndefined();
    expect(serviceLd.priceRange).toBeUndefined();
    expect(serviceLd.offers).toBeUndefined();
  });
});

describe("LP de avaliação — T03: canonical e Open Graph corretos", () => {
  it("alternates.canonical e openGraph.url apontam para a rota da LP", () => {
    expect(metadata.alternates?.canonical).toBe("/avaliacao-neuropsicologica");
    expect((metadata.openGraph as any)?.url).toBe(
      "https://psiandriellyoliveira.com.br/avaliacao-neuropsicologica"
    );
  });

  it("openGraph tem título, descrição e locale pt_BR", () => {
    const og = metadata.openGraph as any;
    expect(og.title).toBeTruthy();
    expect(og.description).toBeTruthy();
    expect(og.locale).toBe("pt_BR");
  });
});
