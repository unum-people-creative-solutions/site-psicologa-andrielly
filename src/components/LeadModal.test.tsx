import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadProvider, useLead, LeadModalOptions } from "@/context/LeadContext";
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
 *
 * `options` (aditivo, Fase 2/LEAD-5) permite passar quaisquer
 * LeadModalOptions (ex.: title/submitLabel) sem alterar o comportamento
 * de `origem`, usado pelos testes T01/T02 já existentes.
 */
function Harness({
  url,
  origem,
  options,
}: {
  url: string;
  origem?: string;
  options?: LeadModalOptions;
}) {
  const { openLeadModal } = useLead();
  const opts = options ?? (origem === undefined ? undefined : { origem });
  return (
    <button onClick={() => (opts === undefined ? openLeadModal(url) : openLeadModal(url, opts))}>
      abrir modal
    </button>
  );
}

async function preencherCamposValidos(
  user: ReturnType<typeof userEvent.setup>,
  { email = "maria@example.com" }: { email?: string } = {}
) {
  await user.type(screen.getByPlaceholderText(/nome completo/i), "Maria Silva");
  if (email) {
    await user.type(screen.getByPlaceholderText(/e-mail/i), email);
  }
  await user.type(screen.getByPlaceholderText(/whatsapp/i), "11987654321");
}

async function marcarConsentimento(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("checkbox", { name: /autorizo/i }));
}

async function enviar(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /falar com a psicóloga/i }));
}

async function preencherEEnviar(user: ReturnType<typeof userEvent.setup>) {
  await preencherCamposValidos(user);
  await marcarConsentimento(user);
  await enviar(user);
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

describe("LeadModal — consentimento LGPD (LEAD-3)", () => {
  beforeEach(() => {
    vi.mocked(sendToCRM).mockClear();
  });

  it("T03: submit com consentimento desmarcado não envia ao CRM e exibe erro em texto", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await preencherCamposValidos(user);
    await enviar(user);

    expect(sendToCRM).not.toHaveBeenCalled();
    expect(screen.getByText(/aceitar o uso dos seus dados/i)).toBeInTheDocument();
  });

  it("T04: submit com consentimento marcado envia ao CRM", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await preencherCamposValidos(user);
    await marcarConsentimento(user);
    await enviar(user);

    expect(sendToCRM).toHaveBeenCalledTimes(1);
  });

  it("T05: o rótulo do consentimento contém link para a política de privacidade", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/politica-de-privacidade");
  });
});

