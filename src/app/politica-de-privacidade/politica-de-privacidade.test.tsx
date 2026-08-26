import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import PoliticaDePrivacidadePage from "./page";

/**
 * Localiza a <section> pelo heading que a identifica e escopa as
 * asserções a ela — em vez de varrer o texto da página inteira. Isso
 * evita falso-negativo por termo recorrente em outra seção (ex.:
 * "exclusão" aparece tanto na seção de retenção quanto na de exclusão)
 * e faz a asserção falhar de verdade se a seção inteira for removida,
 * porque getByRole("heading", ...) lança antes de qualquer match de texto.
 */
function sectionByHeading(name: RegExp) {
  const heading = screen.getByRole("heading", { level: 2, name });
  const section = heading.closest("section");
  if (!section) {
    throw new Error(`Heading "${name}" não está dentro de um <section>`);
  }
  return within(section as HTMLElement);
}

describe("Página de Política de Privacidade", () => {
  it("tem um heading principal", () => {
    render(<PoliticaDePrivacidadePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("declara quais dados são coletados", () => {
    render(<PoliticaDePrivacidadePage />);
    const section = sectionByHeading(/quais dados coletamos/i);
    expect(section.getByText(/nome/i)).toBeInTheDocument();
    expect(section.getByText(/whatsapp/i)).toBeInTheDocument();
    expect(section.getByText(/e-mail/i)).toBeInTheDocument();
  });

  it("declara a finalidade do tratamento", () => {
    render(<PoliticaDePrivacidadePage />);
    const section = sectionByHeading(/para que usamos esses dados/i);
    expect(section.getByText(/atendimento psicológico/i)).toBeInTheDocument();
  });

  it("declara a base legal como consentimento", () => {
    render(<PoliticaDePrivacidadePage />);
    const section = sectionByHeading(/base legal/i);
    expect(section.getByText(/consentimento/i)).toBeInTheDocument();
  });

  it("declara o critério de retenção", () => {
    render(<PoliticaDePrivacidadePage />);
    const section = sectionByHeading(/por quanto tempo retemos/i);
    expect(section.getByText(/finalidade/i)).toBeInTheDocument();
  });

  it("oferece um canal acionável para solicitar exclusão", () => {
    render(<PoliticaDePrivacidadePage />);
    const section = sectionByHeading(/como solicitar a exclusão/i);
    const link = section.getByRole("link", { name: /8487-3009/ });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/5541984873009")
    );
  });
});
