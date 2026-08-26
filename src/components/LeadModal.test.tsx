import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
  label = "abrir modal",
}: {
  url: string;
  origem?: string;
  options?: LeadModalOptions;
  label?: string;
}) {
  const { openLeadModal } = useLead();
  const opts = options ?? (origem === undefined ? undefined : { origem });
  return (
    <button onClick={() => (opts === undefined ? openLeadModal(url) : openLeadModal(url, opts))}>
      {label}
    </button>
  );
}

function CloseHarness() {
  const { closeLeadModal } = useLead();
  return <button onClick={closeLeadModal}>fechar modal (harness de teste)</button>;
}

/** Expõe o `options` cru do contexto para inspeção — o LeadModal em si
 * retorna null quando fechado, então não dá para observar `options` via
 * UI nesse estado. */
function OptionsInspector() {
  const { options } = useLead();
  return <pre data-testid="options-inspector">{JSON.stringify(options)}</pre>;
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
    const payload = vi.mocked(sendToCRM).mock.calls[0][0];
    expect(payload.origem).toBe("Google Ads");
    // LEAD-1 exige que a chamada de 1 argumento produza o payload de
    // hoje por inteiro — não só o campo origem.
    expect(payload.nome).toBe("Maria Silva");
    expect(payload.telefone).toBe("(11) 98765-4321");
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

  it("T01b: fbclid presente deriva origem 'Social Ads'", async () => {
    window.history.pushState({}, "", "/?fbclid=xyz789");
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await preencherEEnviar(user);

    expect(vi.mocked(sendToCRM).mock.calls[0][0].origem).toBe("Social Ads");
  });

  it("T01c: utm_source=instagram deriva origem 'Social Ads'", async () => {
    window.history.pushState({}, "", "/?utm_source=instagram");
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await preencherEEnviar(user);

    expect(vi.mocked(sendToCRM).mock.calls[0][0].origem).toBe("Social Ads");
  });

  it("T01d: utm_source genérico (não facebook/instagram) usa o próprio valor como origem", async () => {
    window.history.pushState({}, "", "/?utm_source=newsletter");
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await preencherEEnviar(user);

    expect(vi.mocked(sendToCRM).mock.calls[0][0].origem).toBe("newsletter");
  });

  it("T01e: sem nenhum parâmetro de tracking, origem cai para 'Orgânico'", async () => {
    window.history.pushState({}, "", "/");
    sessionStorage.clear();
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    await preencherEEnviar(user);

    expect(vi.mocked(sendToCRM).mock.calls[0][0].origem).toBe("Orgânico");
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
    expect(
      screen.getByText(
        "Preencha brevemente para que a psicóloga Andrielly possa te dar um retorno personalizado."
      )
    ).toBeInTheDocument();
  });

  it("T08: com options.title/options.submitLabel/options.description, exibe os valores customizados", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness
          url="https://wa.me/5511999999999"
          options={{
            title: "Agende sua Avaliação",
            submitLabel: "QUERO AGENDAR",
            description: "Descrição customizada da LP",
          }}
        />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));

    expect(screen.getByRole("heading", { name: "Agende sua Avaliação" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /QUERO AGENDAR/i })).toBeInTheDocument();
    expect(screen.getByText("Descrição customizada da LP")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Iniciar Atendimento" })).not.toBeInTheDocument();
  });

  it("T08b: options não vazam entre aberturas — fechar e reabrir sem options volta aos defaults", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness
          url="https://wa.me/5511999999999"
          options={{ title: "Agende sua Avaliação" }}
          label="abrir com options"
        />
        <Harness url="https://wa.me/5511999999999" label="abrir sem options" />
        <CloseHarness />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: "abrir com options" }));
    expect(screen.getByRole("heading", { name: "Agende sua Avaliação" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /fechar modal \(harness/i }));
    await user.click(screen.getByRole("button", { name: "abrir sem options" }));

    // Se `options` não fosse resetado em closeLeadModal, o título customizado
    // da abertura anterior vazaria para esta segunda abertura sem options.
    expect(screen.getByRole("heading", { name: "Iniciar Atendimento" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Agende sua Avaliação" })).not.toBeInTheDocument();
  });

  it("T08c: closeLeadModal reseta options no próprio contexto, não só por sobrescrita da próxima abertura", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness
          url="https://wa.me/5511999999999"
          options={{ title: "Agende sua Avaliação" }}
          label="abrir com options"
        />
        <CloseHarness />
        <OptionsInspector />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: "abrir com options" }));
    expect(screen.getByTestId("options-inspector")).toHaveTextContent(
      JSON.stringify({ title: "Agende sua Avaliação" })
    );

    await user.click(screen.getByRole("button", { name: /fechar modal \(harness/i }));

    // Inspeciona o estado do contexto diretamente — sem passar por outra
    // chamada a openLeadModal, que sobrescreveria options de qualquer jeito
    // e mascararia a ausência do reset em closeLeadModal.
    expect(screen.getByTestId("options-inspector")).toHaveTextContent("{}");
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

describe("LeadModal — garantias de LEAD-7 (o paciente sempre chega ao WhatsApp)", () => {
  beforeEach(() => {
    vi.mocked(sendToCRM).mockClear();
    vi.mocked(sendToCRM).mockResolvedValue({});
  });

  afterEach(() => {
    vi.useRealTimers();
    delete (window as any).gtag_report_conversion;
  });

  it("falha silenciosa no envio ao CRM não impede o redirecionamento, não expõe erro, e ainda dispara a conversão do Ads", async () => {
    vi.mocked(sendToCRM).mockRejectedValueOnce(new Error("CRM indisponível"));
    const gtagMock = vi.fn();
    (window as any).gtag_report_conversion = gtagMock;

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

      // A falha do CRM é isolada: a etapa seguinte (conversão do Ads) roda
      // normalmente. Se o catch interno do CRM sumir, a etapa 2 inteira é
      // pulada e o redirecionamento passa a depender só do catch externo —
      // que existe, mas sem disparar a conversão. Esta asserção prova a
      // diferença: a conversão precisa ter sido chamada mesmo com CRM
      // falhando, não só o redirecionamento.
      expect(gtagMock).toHaveBeenCalledTimes(1);
      expect(screen.queryByText(/erro/i)).not.toBeInTheDocument();
    } finally {
      Object.defineProperty(window, "location", {
        value: originalLocation,
        writable: true,
        configurable: true,
      });
    }
  });

  it("o timer de segurança de 2s redireciona mesmo se o callback do gtag nunca disparar", async () => {
    const pendingUrl = "https://wa.me/5511999999999";
    const gtagMock = vi.fn(); // stub que nunca invoca seu event_callback interno
    (window as any).gtag_report_conversion = gtagMock;

    const originalLocation = window.location;
    Object.defineProperty(window, "location", {
      value: { href: "" },
      writable: true,
      configurable: true,
    });

    try {
      const user = userEvent.setup();

      const { container } = render(
        <LeadProvider>
          <Harness url={pendingUrl} />
          <LeadModal />
        </LeadProvider>
      );

      await user.click(screen.getByRole("button", { name: /abrir modal/i }));
      await preencherCamposValidos(user);
      await marcarConsentimento(user);

      vi.useFakeTimers();

      const form = container.querySelector("form");
      if (!form) throw new Error("Formulário não encontrado");
      fireEvent.submit(form);

      // Deixa o `await sendToCRM(...)` (microtask) resolver e o setTimeout
      // ser efetivamente agendado, já sob fake timers.
      await vi.advanceTimersByTimeAsync(0);

      expect(gtagMock).toHaveBeenCalledTimes(1);
      expect(window.location.href).toBe(""); // ainda não redirecionou

      await vi.advanceTimersByTimeAsync(2000);

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


describe("LeadModal — todo campo tem <label> associado", () => {
  it("nome, e-mail e telefone são localizáveis por getByRole com accessible name — não só por placeholder", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <Harness url="https://wa.me/5511999999999" />
        <LeadModal />
      </LeadProvider>
    );

    await user.click(screen.getByRole("button", { name: /abrir modal/i }));

    // getByRole com `name` só resolve se houver um <label htmlFor> (ou
    // aria-label/aria-labelledby) associado ao input — placeholder sozinho
    // não produz accessible name suficiente para esta query.
    expect(
      screen.getByRole("textbox", { name: /seu nome completo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /seu e-mail \(opcional\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /seu whatsapp, com ddd/i })
    ).toBeInTheDocument();
  });
});
