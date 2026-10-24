import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadProvider, useLead } from "@/context/LeadContext";
import AvaliacaoInfantilPage from "./page";

// Simula o rótulo já criado no Ads (spec A4): preencher a constante tem de
// bastar para todos os CTAs da página repassarem o rótulo.
vi.mock("@/content/avaliacao-infantil", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/content/avaliacao-infantil")>()),
  conversionLabel: "AW-TESTE/abc",
}));

function OpenState() {
  const { options } = useLead();
  return <div data-testid="open-state">{JSON.stringify(options)}</div>;
}

describe("LP infantil — conversionLabel preenchido chega a todos os CTAs (INF-10)", () => {
  it("cabeçalho, Hero, CTA final e botão flutuante repassam o rótulo", async () => {
    const user = userEvent.setup();
    render(
      <LeadProvider>
        <AvaliacaoInfantilPage />
        <OpenState />
      </LeadProvider>
    );

    const links = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("https://wa.me/"));
    expect(links).toHaveLength(4);
    for (const link of links) {
      await user.click(link);
      const options = JSON.parse(screen.getByTestId("open-state").textContent!);
      expect(options.conversionLabel).toBe("AW-TESTE/abc");
    }
  });
});
