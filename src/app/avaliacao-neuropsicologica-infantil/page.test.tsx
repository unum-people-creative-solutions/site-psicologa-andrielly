import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadProvider, useLead } from "@/context/LeadContext";
import { hero } from "@/content/avaliacao-infantil";
import AvaliacaoInfantilPage from "./page";

function OpenState() {
  const { isOpen, options } = useLead();
  return <div data-testid="open-state">{JSON.stringify({ isOpen, options })}</div>;
}

function renderPage() {
  return render(
    <LeadProvider>
      <AvaliacaoInfantilPage />
      <OpenState />
    </LeadProvider>
  );
}

function openState() {
  return JSON.parse(screen.getByTestId("open-state").textContent!);
}

describe("LP infantil — T05: composição (INF-02, INF-03, INF-06)", () => {
  it("tem um único h1 com o título infantil", () => {
    renderPage();
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Avaliação Neuropsicológica Infantil em Curitiba");
  });

  it("os h2 são exatamente os 8 títulos da spec, nesta ordem", () => {
    renderPage();
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual([
      "Você está aqui?",
      "O que a avaliação investiga",
      "Uma avaliação pensada para a criança",
      "O que a família e a escola recebem",
      "Como funciona o processo",
      "Andrielly Oliveira",
      "Dúvidas frequentes",
      "O momento de começar importa",
    ]);
  });

  it("tem cabeçalho, rodapé, botão flutuante e a credencial", () => {
    renderPage();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contato via WhatsApp" })).toBeInTheDocument();
    expect(document.body.textContent).toContain("CRP 08/35504");
  });
});

describe("LP infantil — T06: guarda ética no texto renderizado (INF-05)", () => {
  it("não contém termos vedados nem fala com adulto", () => {
    renderPage();
    const texto = (document.body.textContent ?? "").toLowerCase();
    for (const termo of ["adulto", "garant", "a melhor", "especialista", "padrão ouro", "r$", "preço"]) {
      expect(texto).not.toContain(termo);
    }
  });
});

describe("LP infantil — T07: CTAs levam a origem infantil (INF-07, INF-08)", () => {
  it("cada CTA de conversão (por href, exceto o flutuante) abre o modal com origem 'LP Avaliação Infantil'", async () => {
    const user = userEvent.setup();
    renderPage();
    const ctas = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("https://wa.me/"))
      .filter((a) => a.getAttribute("aria-label") !== "Contato via WhatsApp");

    // cabeçalho, Hero e CTA final
    expect(ctas).toHaveLength(3);
    for (const cta of ctas) {
      await user.click(cta);
      expect(openState().isOpen).toBe(true);
      expect(openState().options.origem).toBe("LP Avaliação Infantil");
      expect(openState().options.conversionLabel).toBeUndefined();
    }
    expect(screen.getAllByRole("link", { name: hero.ctaLabel })).toHaveLength(2);
  });

  it("o botão flutuante abre o modal com origem 'LP Avaliação Infantil - Flutuante'", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("link", { name: "Contato via WhatsApp" }));
    expect(openState().options.origem).toBe("LP Avaliação Infantil - Flutuante");
  });
});
