import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { sobre } from "@/content/avaliacao";
import { LandingFooter } from "./LandingFooter";

describe("LandingFooter — T06: credencial visível", () => {
  it("declara 'psicóloga' e 'CRP 08/35504'", () => {
    render(<LandingFooter />);

    expect(screen.getByText(/psicóloga clínica/i)).toBeInTheDocument();
    expect(screen.getByText(/CRP 08\/35504/)).toBeInTheDocument();
  });

  it("usa o mesmo endereço da fonte única de conteúdo (consistente com FinalCta)", () => {
    render(<LandingFooter />);
    expect(screen.getByText(sobre.enderecoCompleto)).toBeInTheDocument();
  });

  it("contém um link para a política de privacidade", () => {
    render(<LandingFooter />);

    const link = screen.getByRole("link", { name: /política de privacidade/i });
    expect(link).toHaveAttribute("href", "/politica-de-privacidade");
  });
});
