import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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

describe("LeadModal — e-mail opcional (LEAD-4)", () => {
  beforeEach(() => {
    vi.mocked(sendToCRM).mockClear();
  });

  it("T06: submit com e-mail vazio e demais campos válidos envia ao CRM com email vazio", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await preencherCamposValidos(user, { email: "" });
    await marcarConsentimento(user);
    await enviar(user);

    expect(sendToCRM).toHaveBeenCalledTimes(1);
    expect(vi.mocked(sendToCRM).mock.calls[0][0].email).toBe("");
  });

  it("T07: telefone com menos de 11 dígitos continua bloqueando o envio", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await user.type(screen.getByPlaceholderText(/nome completo/i), "Maria Silva");
    await user.type(screen.getByPlaceholderText(/whatsapp/i), "1198765");
    await marcarConsentimento(user);
    await enviar(user);

    expect(sendToCRM).not.toHaveBeenCalled();
    expect(screen.getByText(/DDD e 9 dígitos/i)).toBeInTheDocument();
  });
});

describe("LeadModal — copy variável (LEAD-5)", () => {
  it("T08: sem options, exibe os textos padrão", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));

    expect(screen.getByRole("heading", { name: "Iniciar Atendimento" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /FALAR COM A PSICÓLOGA/i })).toBeInTheDocument();
  });

  it("T08: com options.title/options.submitLabel, exibe os valores customizados", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness
          url="https://wa.me/5511999999999"
          options={{ title: "Agende sua Avaliação", submitLabel: "QUERO AGENDAR" }}
        />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));

    expect(screen.getByRole("heading", { name: "Agende sua Avaliação" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /QUERO AGENDAR/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Iniciar Atendimento" })).not.toBeInTheDocument();
  });
});

describe("LeadModal — rótulo de conversão do Google Ads (LEAD-6, LEAD-7)", () => {
  beforeEach(() => {
    vi.mocked(sendToCRM).mockClear();
  });

  afterEach(() => {
    delete (window as any).gtag_report_conversion;
  });

  it("T09: sem options.conversionLabel, repassa undefined como terceiro argumento do gtag", async () => {
    const gtagMock = vi.fn();
    (window as any).gtag_report_conversion = gtagMock;
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await preencherEEnviar(user);

    expect(gtagMock).toHaveBeenCalledTimes(1);
    expect(gtagMock.mock.calls[0][2]).toBeUndefined();
  });

  it("T09: com options.conversionLabel, repassa o rótulo customizado como terceiro argumento do gtag", async () => {
    const gtagMock = vi.fn();
    (window as any).gtag_report_conversion = gtagMock;
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness
          url="https://wa.me/5511999999999"
          options={{ conversionLabel: "AW-XXX/custom-label" }}
        />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await preencherEEnviar(user);

    expect(gtagMock).toHaveBeenCalledTimes(1);
    expect(gtagMock.mock.calls[0][2]).toBe("AW-XXX/custom-label");
  });

  it("T-LEAD-7: gtag_report_conversion indefinido não bloqueia o redirecionamento ao WhatsApp", async () => {
    delete (window as any).gtag_report_conversion;

    const originalLocation = window.location;
    Object.defineProperty(window, "location", {
      value: { href: "" },
      writable: true,
      configurable: true,
    });

    try {
      const user = userEvent.setup();
      const pendingUrl = "https://wa.me/5511999999999";

      render(
        <LeadProvider>
          <Harness url={pendingUrl} />
          <LeadModal />
        </LeadProvider>
      );

      await user.click(screen.getByRole("button", { name: /abrir modal/i }));
      await preencherEEnviar(user);

      expect(window.location.href).toBe(pendingUrl);
    } finally {
      Object.defineProperty(window, "location", {
        value: originalLocation,
        writable: true,
        configurable: true,
      });
    }
  });
});

describe("LeadModal — sem dado pessoal em storage do navegador (T10)", () => {
  beforeEach(() => {
    vi.mocked(sendToCRM).mockClear();
    localStorage.clear();
    sessionStorage.clear();
  });

  it("T10: nome, e-mail e telefone não aparecem em localStorage nem sessionStorage após o submit", async () => {
    const user = userEvent.setup();
    const nome = "Maria Silva";
    const email = "maria@example.com";
    const telefoneDigits = "11987654321";

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await preencherEEnviar(user);

    const allStorageValues = [
      ...Array.from({ length: localStorage.length }, (_, i) => localStorage.getItem(localStorage.key(i)!)),
      ...Array.from({ length: sessionStorage.length }, (_, i) => sessionStorage.getItem(sessionStorage.key(i)!)),
    ].join(" ");

    expect(allStorageValues).not.toContain(nome);
    expect(allStorageValues).not.toContain(email);
    expect(allStorageValues).not.toContain(telefoneDigits);
  });
});

