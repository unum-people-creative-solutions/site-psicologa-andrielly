import { describe, it, expect, beforeAll } from "vitest";
import nextConfig from "../../next.config.mjs";

/**
 * lp-avaliacao-infantil T10 (INF-01). A exclusão "avaliacao-neuropsicologica"
 * do redirect é um prefixo (negative lookahead), então ela já cobre
 * /avaliacao-neuropsicologica-infantil. Este teste trava esse comportamento:
 * se a lista de exclusão mudar, a página infantil não pode voltar a cair na home.
 */
function extractRedirectRegex(source: string): RegExp {
  const match = source.match(/^\/:path\((.+)\)$/);
  if (!match) throw new Error(`Unexpected redirect source shape: ${source}`);
  return new RegExp(`^${match[1]}$`);
}

describe("next.config.mjs redirect — LP infantil", () => {
  let redirectRegex: RegExp;

  beforeAll(async () => {
    const redirects = await nextConfig.redirects!();
    redirectRegex = extractRedirectRegex(redirects[0].source);
  });

  it("não captura /avaliacao-neuropsicologica-infantil", () => {
    expect(redirectRegex.test("avaliacao-neuropsicologica-infantil")).toBe(false);
  });

  it("continua capturando caminho órfão", () => {
    expect(redirectRegex.test("caminho-qualquer")).toBe(true);
  });
});
