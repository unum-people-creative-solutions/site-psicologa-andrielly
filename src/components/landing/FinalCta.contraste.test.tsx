import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LeadProvider } from "@/context/LeadContext";
import { ctaFinal } from "@/content/avaliacao";
import { FinalCta } from "./FinalCta";
import { LeadCta } from "./LeadCta";

/**
 * Bug 2026-10-24: o FinalCta tem fundo escuro e usava a variante "primary"
 * do LeadCta, que tem a mesma cor de fundo — o botão sumia na seção.
 * Contrato: seção escura usa a variante "inverse" (feita para fundo escuro).
 */
describe("FinalCta — botão visível no fundo escuro", () => {
  it("o CTA do FinalCta usa a variante 'inverse'", () => {
    render(
      <LeadProvider>
        <FinalCta />
      </LeadProvider>
    );
    expect(screen.getByRole("link", { name: ctaFinal.ctaLabel })).toHaveAttribute(
      "data-variant",
      "inverse"
    );
  });

  it("o LeadCta expõe a variante recebida em data-variant", () => {
    render(
      <LeadProvider>
        <LeadCta label="Padrão" variant="primary" />
      </LeadProvider>
    );
    expect(screen.getByRole("link", { name: "Padrão" })).toHaveAttribute("data-variant", "primary");
  });
});
