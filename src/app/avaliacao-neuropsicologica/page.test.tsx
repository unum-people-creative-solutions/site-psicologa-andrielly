import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadProvider, useLead } from "@/context/LeadContext";
import { faq } from "@/content/avaliacao-faq";
import {
  hero,
  diferencial,
  entregavel,
  tiposAvaliacao,
  sobre,
  ctaFinal,
} from "@/content/avaliacao";
import AvaliacaoNeuropsicologicaPage from "./page";

/**
 * page.tsx é Server Component (sem "use client"), mas precisa do
 * LeadProvider (client) em volta para renderizar em teste — no app real
 * isso vem do layout.tsx raiz. Reproduz a mesma composição aqui.
 */
function renderPage() {
  return render(
    <LeadProvider>
      <AvaliacaoNeuropsicologicaPage />
    </LeadProvider>
  );
}

function OpenState() {
  const { isOpen, options } = useLead();
  return <div data-testid="open-state">{JSON.stringify({ isOpen, options })}</div>;
}

/**
 * document.body.textContent inclui o conteúdo de <script> — inclusive o
 * JSON-LD (feature seo-and-launch), que legitimamente espelha o FAQ
 * (siglas de instrumento inclusas). As guardas de conformidade abaixo
 * checam prosa visível, não payload de dado estruturado — por isso
 * excluem <script> antes de escanear.
 */
function visibleBodyText(): string {
  const clone = document.body.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("script").forEach((s) => s.remove());
  return clone.textContent ?? "";
}

describe("Página de avaliação — T01: CTA abre o modal com a origem da LP", () => {
  it("TODO CTA da página (não só o primeiro) dispara openLeadModal com origem 'LP Avaliação'", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <AvaliacaoNeuropsicologicaPage />
        <OpenState />
      </LeadProvider>
    );

    // Por href, não por rótulo — uma consulta por texto do label deixaria
    // passar um CTA novo com rótulo diferente e origem errada. O botão
    // flutuante também aponta para wa.me mas tem seu próprio teste (usa
    // "LP Avaliação - Flutuante"), então é excluído por aria-label.
    const ctas = screen
      .getAllByRole("link")
      .filter(
        (l) =>
          (l.getAttribute("href") ?? "").startsWith("https://wa.me/") &&
          l.getAttribute("aria-label") !== "Contato via WhatsApp"
      );
    // Cabeçalho + Hero + CTA final — se um novo CTA for adicionado sem
    // origem, este número precisa mudar deliberadamente, não por acidente.
    expect(ctas.length).toBe(3);

    for (const cta of ctas) {
      await user.click(cta);
      const state = JSON.parse(screen.getByTestId("open-state").textContent!);
      expect(state.isOpen).toBe(true);
      expect(state.options.origem).toBe("LP Avaliação");
    }
  });

  it("o botão flutuante de WhatsApp usa a origem 'LP Avaliação - Flutuante'", async () => {
    const user = userEvent.setup();

    render(
      <LeadProvider>
        <AvaliacaoNeuropsicologicaPage />
        <OpenState />
      </LeadProvider>
    );

    await user.click(screen.getByRole("link", { name: /contato via whatsapp/i }));

    const state = JSON.parse(screen.getByTestId("open-state").textContent!);
    expect(state.isOpen).toBe(true);
    expect(state.options.origem).toBe("LP Avaliação - Flutuante");
  });
});

describe("Página de avaliação — estrutura: as 9 seções, na ordem do blueprint", () => {
  it("renderiza as 9 seções, cada uma identificável por um trecho de conteúdo próprio, na ordem certa", () => {
    renderPage();

    const marcadores = [
      hero.title,
      "Você está aqui?",
      diferencial.title,
      entregavel.title,
      "Como funciona o processo",
      tiposAvaliacao.title,
      sobre.nome,
      "Dúvidas frequentes",
      ctaFinal.title,
    ];

    const secoes = Array.from(document.querySelectorAll("main > section"));
    expect(secoes).toHaveLength(9);

    secoes.forEach((secao, index) => {
      expect(secao.textContent ?? "").toContain(marcadores[index]);
    });
  });
});

describe("Página de avaliação — T04: instrumentos só aparecem no FAQ", () => {
  it("nenhuma sigla de instrumento aparece fora da seção do FAQ", () => {
    renderPage();

    // A pergunta do FAQ que menciona "WISC" fica sempre visível (só a
    // resposta é condicional) — por isso a checagem certa é "fora da
    // seção do FAQ", não "com o accordion fechado".
    const perguntaWisc = screen.getByText(/o médico pediu para eu fazer o wisc/i);
    const faqSection = perguntaWisc.closest("section");
    if (!faqSection) throw new Error("Seção do FAQ não encontrada (nenhum <section> ancestral)");

    const textoDaSecaoFaq = faqSection.textContent ?? "";
    const textoForaDoFaq = visibleBodyText().replace(textoDaSecaoFaq, "");

    expect(textoForaDoFaq).not.toMatch(/WISC|WAIS|RAVLT|TAVIS|HTP/);
  });

  it("abrindo a pergunta do WISC, a resposta correspondente aparece", async () => {
    const user = userEvent.setup();
    renderPage();
    const itemWisc = faq.find((f) => /WISC/.test(f.pergunta));
    if (!itemWisc) throw new Error("Item de FAQ do WISC não encontrado em avaliacao-faq.ts");

    const pergunta = screen.getByText(itemWisc.pergunta);
    await user.click(pergunta);

    expect(screen.getByText(itemWisc.resposta)).toBeInTheDocument();
  });
});

describe("Página de avaliação — T05: guarda de conformidade ética", () => {
  it("não contém termos vedados pelo Art. 20 em nenhum lugar da página renderizada", () => {
    renderPage();
    const bodyText = visibleBodyText().toLowerCase();

    expect(bodyText).not.toMatch(/garant/);
    expect(bodyText).not.toMatch(/padrão ouro/);
    expect(bodyText).not.toMatch(/excelência internacional/);
    expect(bodyText).not.toMatch(/a melhor/);
    expect(bodyText).not.toMatch(/gratuit/);
    expect(bodyText).not.toMatch(/dra\./);
    expect(bodyText).not.toMatch(/especialista/);
    // Rewrites específicos do Discovery §08 — formulações que já foram
    // identificadas como previsão taxativa de resultado.
    expect(bodyText).not.toMatch(/assegura a precisão/);
    expect(bodyText).not.toMatch(/transforma(m)? a vida/);
  });
});

describe("Página de avaliação — T06: credencial visível", () => {
  it("declara 'psicóloga' e 'CRP 08/35504'", () => {
    renderPage();
    const bodyText = visibleBodyText();

    expect(bodyText).toMatch(/psicóloga/i);
    expect(bodyText).toMatch(/CRP 08\/35504/);
  });
});

describe("Página de avaliação — T08: escala de classificação fora do FAQ", () => {
  it("não contém 'muito inferior' nem 'média inferior' com o FAQ fechado", () => {
    renderPage();
    const bodyText = visibleBodyText().toLowerCase();

    expect(bodyText).not.toMatch(/muito inferior/);
    expect(bodyText).not.toMatch(/média inferior/);
  });
});

describe("Página de avaliação — estrutura", () => {
  it("tem exatamente um <h1>", () => {
    renderPage();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
