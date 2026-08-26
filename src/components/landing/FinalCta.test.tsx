import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LeadProvider } from "@/context/LeadContext";
import { ctaFinal } from "@/content/avaliacao";
import { FinalCta } from "./FinalCta";

describe("FinalCta — TASK-SEC-014: título, corpo, CTA e endereço", () => {
  it("renderiza title, body, o link do CTA e o endereço do consultório", () => {
    render(
      <LeadProvider>
        <FinalCta />
      </LeadProvider>
    );

    expect(screen.getByText(ctaFinal.title)).toBeInTheDocument();
    expect(screen.getByText(ctaFinal.body)).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: ctaFinal.ctaLabel });
    expect(cta).toBeInTheDocument();

    expect(
      screen.getByText(
        "Av. Cândido de Abreu, 526 - Torre B, 6º andar sala 604 - Centro Cívico, Curitiba - PR"
      )
    ).toBeInTheDocument();
  });
});
