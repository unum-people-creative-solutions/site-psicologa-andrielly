import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LeadProvider } from "@/context/LeadContext";
import { headerCtaLabel } from "@/content/avaliacao";
import { LandingHeader } from "./LandingHeader";

describe("LandingHeader — T02: cabeçalho não oferece rota de saída", () => {
  it("não contém link para instagram, #sobre, #especialidades ou #metodologia", () => {
    render(
      <LeadProvider>
        <LandingHeader />
      </LeadProvider>
    );

    const links = screen.getAllByRole("link").map((l) => l.getAttribute("href") ?? "");
    const rotasDeSaida = links.filter(
      (href) =>
        href.includes("instagram") ||
        href.includes("#sobre") ||
        href.includes("#especialidades") ||
        href.includes("#metodologia")
    );

    expect(rotasDeSaida).toHaveLength(0);
  });

  it("expõe exatamente um CTA de conversão", () => {
    render(
      <LeadProvider>
        <LandingHeader />
      </LeadProvider>
    );

    expect(
      screen.getAllByRole("link", { name: new RegExp(headerCtaLabel, "i") })
    ).toHaveLength(1);
  });
});
