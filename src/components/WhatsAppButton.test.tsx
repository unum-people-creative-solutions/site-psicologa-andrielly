import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadProvider, useLead } from "@/context/LeadContext";
import WhatsAppButton from "./WhatsAppButton";

function OpenState() {
  const { isOpen, options } = useLead();
  return <div data-testid="open-state">{JSON.stringify({ isOpen, options })}</div>;
}

describe("WhatsAppButton — origem opcional (SEC-8)", () => {
  it("uso na home, sem origem, não define options.origem (LEAD-1 — retrocompatível)", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <WhatsAppButton />
        <OpenState />
      </LeadProvider>
    );

    await user.click(screen.getByRole("link", { name: /contato via whatsapp/i }));

    const state = JSON.parse(screen.getByTestId("open-state").textContent!);
    expect(state.isOpen).toBe(true);
    expect(state.options).toEqual({});
  });

  it("uso na LP, com origem, propaga 'LP Avaliação - Flutuante' ao contexto", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <WhatsAppButton origem="LP Avaliação - Flutuante" />
        <OpenState />
      </LeadProvider>
    );

    await user.click(screen.getByRole("link", { name: /contato via whatsapp/i }));

    const state = JSON.parse(screen.getByTestId("open-state").textContent!);
    expect(state.options.origem).toBe("LP Avaliação - Flutuante");
  });
});
