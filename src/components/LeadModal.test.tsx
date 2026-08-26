import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadProvider, useLead } from "@/context/LeadContext";
import { sendToCRM } from "@/lib/crm";
import LeadModal from "./LeadModal";

vi.mock("@/lib/crm", () => ({
  sendToCRM: vi.fn().mockResolvedValue({}),
}));

/**
 * Harness que expõe openLeadModal via botões de teste, para simular os
 * call-sites reais (Navbar, Contact, WhatsAppButton, page.tsx) sem
 * modificá-los. Um botão chama com 1 argumento (LEAD-1), outro com 2
 * (LEAD-2), reproduzindo os dois padrões de chamada do contrato.
 */
function Harness({ url, origem }: { url: string; origem?: string }) {
  const { openLeadModal } = useLead();
  return (
    <button
      onClick={() => (origem === undefined ? openLeadModal(url) : openLeadModal(url, { origem }))}
    >
      abrir modal
    </button>
  );
}

async function preencherEEnviar(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText(/nome completo/i), "Maria Silva");
  await user.type(screen.getByPlaceholderText(/e-mail/i), "maria@example.com");
  await user.type(screen.getByPlaceholderText(/whatsapp/i), "11987654321");
  await user.click(screen.getByRole("button", { name: /falar com a psicóloga/i }));
}

describe("LeadModal — precedência de origem (LEAD-1, LEAD-2)", () => {
  beforeEach(() => {
    vi.mocked(sendToCRM).mockClear();
  });

  it("T01: openLeadModal(url) sem options usa a derivação por tracking (gclid -> Google Ads)", async () => {
    window.history.pushState({}, "", "/?gclid=abc123");
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await preencherEEnviar(user);

    expect(sendToCRM).toHaveBeenCalledTimes(1);
    expect(vi.mocked(sendToCRM).mock.calls[0][0].origem).toBe("Google Ads");
  });

  it("T02: openLeadModal(url, { origem }) faz origem explícita vencer a derivação por tracking", async () => {
    window.history.pushState({}, "", "/?gclid=abc123");
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" origem="LP Avaliação" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await preencherEEnviar(user);

    expect(sendToCRM).toHaveBeenCalledTimes(1);
    expect(vi.mocked(sendToCRM).mock.calls[0][0].origem).toBe("LP Avaliação");
  });
});
