import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadProvider } from "@/context/LeadContext";
import { sendToCRM } from "@/lib/crm";
import { LeadCta } from "@/components/landing/LeadCta";
import { origem, origemFlutuante } from "@/content/avaliacao-infantil";
import LeadModal from "./LeadModal";

vi.mock("@/lib/crm", () => ({
  sendToCRM: vi.fn().mockResolvedValue({}),
}));

async function preencherEEnviar(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText(/nome completo/i), "Maria Silva");
  await user.type(screen.getByPlaceholderText(/e-mail/i), "maria@example.com");
  await user.type(screen.getByPlaceholderText(/whatsapp/i), "11987654321");
  await user.click(screen.getByRole("checkbox", { name: /autorizo/i }));
  await user.click(screen.getByRole("button", { name: /falar com a psicóloga/i }));
}

describe("LeadModal — LP infantil, T08 (INF-09): conversões aprimoradas desligadas", () => {
  beforeEach(() => {
    vi.mocked(sendToCRM).mockClear();
  });

  afterEach(() => {
    delete (window as any).gtag_report_conversion;
  });

  it.each([origem, origemFlutuante])(
    "lead com origem '%s' vai ao CRM com essa origem e o gtag recebe userData undefined",
    async (origemDaPagina) => {
      const gtagMock = vi.fn();
      (window as any).gtag_report_conversion = gtagMock;
      const user = userEvent.setup();

      render(
        <LeadProvider>
          <LeadCta label="Abrir" variant="primary" origem={origemDaPagina} />
          <LeadModal />
        </LeadProvider>
      );

      await user.click(screen.getByRole("link", { name: "Abrir" }));
      await preencherEEnviar(user);

      expect(vi.mocked(sendToCRM).mock.calls[0][0].origem).toBe(origemDaPagina);
      expect(gtagMock).toHaveBeenCalledTimes(1);
      expect(gtagMock.mock.calls[0][1]).toBeUndefined();
    }
  );
});
