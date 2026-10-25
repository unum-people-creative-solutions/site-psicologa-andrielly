import { describe, it, expect } from "vitest";
import * as infantil from "./avaliacao-infantil";
import { faqInfantil } from "./avaliacao-infantil-faq";

describe("Conteúdo da LP infantil — lp-avaliacao-infantil T04 (INF-04, INF-05, A4, A5)", () => {
  it("tem o título, as contagens e as origens definidos na spec", () => {
    expect(infantil.hero.title).toBe("Avaliação Neuropsicológica Infantil em Curitiba");
    expect(infantil.gatilhos).toHaveLength(5);
    expect(infantil.condicoes.items).toHaveLength(4);
    expect(faqInfantil).toHaveLength(7);
    expect(infantil.origem).toBe("LP Avaliação Infantil");
    expect(infantil.origemFlutuante).toBe("LP Avaliação Infantil - Flutuante");
    // Ação "Contato — LP Infantil" criada no Google Ads em 2026-10-24 (spec A4).
    expect(infantil.conversionLabel).toBe("AW-17122840229/HKuICLKq0qgdEKWd5-Q_");
  });

  it("nenhum texto contém termos vedados (Art. 20) nem fala com adulto", () => {
    const texto = JSON.stringify({ ...infantil, faqInfantil }).toLowerCase();
    for (const termo of ["adulto", "garant", "a melhor", "especialista", "padrão ouro", "r$", "preço"]) {
      expect(texto).not.toContain(termo);
    }
  });
});
