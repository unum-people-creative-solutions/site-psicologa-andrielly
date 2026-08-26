import { describe, it, expect } from "vitest";
import {
  hero,
  gatilhos,
  diferencial,
  entregavel,
  processo,
  processoResumo,
  tiposAvaliacao,
  sobre,
  ctaFinal,
} from "./avaliacao";
import { faq } from "./avaliacao-faq";

/**
 * Concatena todo texto de conteúdo da LP (exceto FAQ, testado à parte)
 * para as varreduras de conformidade — T03, T05, T08.
 */
function textoDasSecoes(): string {
  return [
    hero.title,
    hero.subtitle,
    hero.credencial,
    hero.ctaLabel,
    ...gatilhos,
    diferencial.title,
    diferencial.body,
    entregavel.title,
    ...entregavel.items.flatMap((i) => [i.title, i.body]),
    ...processo.flatMap((p) => [p.titulo, p.duracao, p.descricao]),
    processoResumo.encontros,
    processoResumo.duracaoTotal,
    tiposAvaliacao.title,
    tiposAvaliacao.neuropsicologica.title,
    tiposAvaliacao.neuropsicologica.body,
    tiposAvaliacao.psicologica.title,
    tiposAvaliacao.psicologica.body,
    tiposAvaliacao.nota,
    sobre.nome,
    sobre.credencial,
    ...sobre.bio,
    sobre.localizacao,
    ctaFinal.title,
    ctaFinal.body,
    ctaFinal.ctaLabel,
  ].join(" ");
}

describe("Conteúdo da LP de avaliação — T03: números reais do processo", () => {
  it("publica os cinco números confirmados no Discovery", () => {
    const texto = textoDasSecoes();
    expect(texto).toMatch(/8 a 12/);
    expect(texto).toMatch(/60 a 90/);
    expect(texto).toMatch(/50 minutos/);
    expect(texto).toMatch(/10 a 15/);
    expect(texto).toMatch(/3 meses e meio/);
  });
});

describe("Conteúdo da LP de avaliação — T05: guarda de conformidade ética (Art. 20)", () => {
  it("não contém previsão taxativa de resultado, superlativo ou preço", () => {
    const texto = textoDasSecoes().toLowerCase();
    expect(texto).not.toMatch(/garant/);
    expect(texto).not.toMatch(/padrão ouro/);
    expect(texto).not.toMatch(/excelência internacional/);
    expect(texto).not.toMatch(/a melhor/);
    expect(texto).not.toMatch(/resultados garantidos/);
    expect(texto).not.toMatch(/gratuit/);
    expect(texto).not.toMatch(/r\$\s*\d/);
  });

  it("não anuncia título não possuído (Dra., especialista)", () => {
    const texto = textoDasSecoes();
    expect(texto).not.toMatch(/Dra\./);
    expect(texto).not.toMatch(/[Ee]specialista/);
  });
});

describe("Conteúdo da LP de avaliação — T08: escala de classificação fora das seções de venda", () => {
  it("não contém 'muito inferior' nem 'média inferior' fora do FAQ", () => {
    const texto = textoDasSecoes().toLowerCase();
    expect(texto).not.toMatch(/muito inferior/);
    expect(texto).not.toMatch(/média inferior/);
  });
});

describe("Conteúdo da LP de avaliação — T04: instrumentos só aparecem no FAQ", () => {
  it("nenhuma sigla de instrumento aparece fora do FAQ", () => {
    const texto = textoDasSecoes();
    expect(texto).not.toMatch(/WISC/);
    expect(texto).not.toMatch(/WAIS/);
    expect(texto).not.toMatch(/RAVLT/);
    expect(texto).not.toMatch(/TAVIS/);
    expect(texto).not.toMatch(/HTP/);
  });

  it("o FAQ contém WISC, na pergunta que responde a esse termo de busca", () => {
    const textoFaq = faq.map((f) => `${f.pergunta} ${f.resposta}`).join(" ");
    expect(textoFaq).toMatch(/WISC/);
  });
});

describe("Conteúdo da LP de avaliação — credencial visível", () => {
  it("contém 'psicóloga' e 'CRP 08/35504'", () => {
    const texto = textoDasSecoes();
    expect(texto).toMatch(/psicóloga/i);
    expect(texto).toMatch(/CRP 08\/35504/);
  });
});
