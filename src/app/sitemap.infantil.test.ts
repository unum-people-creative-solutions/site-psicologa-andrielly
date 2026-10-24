import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";

describe("sitemap — lp-avaliacao-infantil T11 (INF-16)", () => {
  it("a LP infantil entra com prioridade 0.9 e frequência mensal", () => {
    const entry = sitemap().find(
      (e) => e.url === "https://psiandriellyoliveira.com.br/avaliacao-neuropsicologica-infantil"
    );
    expect(entry).toBeDefined();
    expect(entry!.priority).toBe(0.9);
    expect(entry!.changeFrequency).toBe("monthly");
  });
});
