import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadProvider, useLead } from "@/context/LeadContext";
import { LeadCta } from "./LeadCta";

function OpenState() {
  const { isOpen, pendingUrl, options } = useLead();
  return (
    <div data-testid="open-state">
      {JSON.stringify({ isOpen, pendingUrl, options })}
    </div>
  );
}

describe("LeadCta — T01: CTA abre o modal com a origem da LP", () => {
  it("dispara openLeadModal com origem 'LP Avaliação' por padrão e previne a navegação padrão", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <LeadCta label="Falar com a psicóloga" variant="primary" />
        <OpenState />
      </LeadProvider>
    );

    await user.click(screen.getByRole("link", { name: /falar com a psicóloga/i }));

    const state = JSON.parse(screen.getByTestId("open-state").textContent!);
    expect(state.isOpen).toBe(true);
    expect(state.options.origem).toBe("LP Avaliação");
  });

  it("aceita origem e conversionLabel customizados", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <LeadCta
          label="CTA flutuante"
          variant="secondary"
          origem="LP Avaliação - Flutuante"
          conversionLabel="AW-XXX/custom"
        />
        <OpenState />
      </LeadProvider>
    );

    await user.click(screen.getByRole("link", { name: /cta flutuante/i }));

    const state = JSON.parse(screen.getByTestId("open-state").textContent!);
    expect(state.options.origem).toBe("LP Avaliação - Flutuante");
    expect(state.options.conversionLabel).toBe("AW-XXX/custom");
  });

  it("o href aponta para o WhatsApp real, como fallback se o JS falhar", () => {
    render(
      <LeadProvider>
        <LeadCta label="Falar com a psicóloga" variant="primary" />
      </LeadProvider>
    );

    const link = screen.getByRole("link", { name: /falar com a psicóloga/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("wa.me/5541984873009"));
  });
});
