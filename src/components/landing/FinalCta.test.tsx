import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LeadProvider } from "@/context/LeadContext";
import { ctaFinal, sobre } from "@/content/avaliacao";
import { FinalCta } from "./FinalCta";

describe("FinalCta — TASK-SEC-014: título, corpo, CTA e endereço", () => {
  it("renderiza title, body, o link do CTA (com origem 'LP Avaliação') e o endereço do consultório", () => {
    render(
      <LeadProvider>
        <FinalCta />
      </LeadProvider>
    );

    expect(screen.getByText(ctaFinal.title)).toBeInTheDocument();
    expect(screen.getByText(ctaFinal.body)).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: ctaFinal.ctaLabel });
    expect(cta).toBeInTheDocument();

    // Endereço vem da fonte única em avaliacao.ts — antes cada componente
    // tinha sua própria string e elas haviam divergido silenciosamente.
    expect(screen.getByText(sobre.enderecoCompleto)).toBeInTheDocument();
  });
});
