import { describe, it, expect, vi, afterEach } from "vitest";
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

  it("usa uma data estável, não derivada de new Date() a cada chamada", () => {
    // Se lastModified fosse `new Date()` recalculado a cada chamada, avançar
    // o relógio do sistema entre as duas chamadas mudaria o resultado.
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2020-01-01T00:00:00Z"));
    const first = sitemap()[0].lastModified;

    vi.setSystemTime(new Date("2030-01-01T00:00:00Z"));
    const second = sitemap()[0].lastModified;

    expect(first).toEqual(second);
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
