import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import path from "path";

/**
 * Guarda estrutural da ADR-0002 (RSC-first com ilhas client): garante que
 * a lista de exceções não cresce por acidente conforme a página evolui.
 * Antes isso só era conferido manualmente via `grep` — nenhum teste
 * automatizado provava a regra.
 */
describe("Arquitetura da LP — SEC-7: Server Components por padrão", () => {
  const dir = path.resolve(__dirname);
  const componentFiles = readdirSync(dir).filter(
    (f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx")
  );

  it("exatamente LeadCta, Faq e LandingHeader têm 'use client'", () => {
    const clientFiles = componentFiles.filter((f) => {
      const content = readFileSync(path.join(dir, f), "utf-8");
      return content.includes('"use client"');
    });

    expect(clientFiles.sort()).toEqual(
      ["Faq.tsx", "LandingHeader.tsx", "LeadCta.tsx"].sort()
    );
  });

  it("nenhum componente da LP importa framer-motion", () => {
    const withFramerMotion = componentFiles.filter((f) => {
      const content = readFileSync(path.join(dir, f), "utf-8");
      return content.includes("framer-motion");
    });

    expect(withFramerMotion).toEqual([]);
  });
});
