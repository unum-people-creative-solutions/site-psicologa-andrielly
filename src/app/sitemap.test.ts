import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("declara exatamente as três rotas do site", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url).sort();

    expect(urls).toEqual(
      [
        "https://psiandriellyoliveira.com.br",
        "https://psiandriellyoliveira.com.br/avaliacao-neuropsicologica",
        "https://psiandriellyoliveira.com.br/politica-de-privacidade",
      ].sort()
    );
  });
});
