import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PoliticaDePrivacidadePage from "./page";

describe("Página de Política de Privacidade", () => {
  it("tem um heading principal", () => {
    render(<PoliticaDePrivacidadePage />);
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toBeInTheDocument();
  });

  it("declara o dado coletado, a finalidade, a base legal, a retenção e o canal de exclusão", () => {
    render(<PoliticaDePrivacidadePage />);
    const text = document.body.textContent ?? "";

    // Dado coletado
    expect(text).toMatch(/nome/i);
    expect(text).toMatch(/whatsapp|telefone/i);
    expect(text).toMatch(/e-mail/i);

    // Finalidade
    expect(text).toMatch(/atendimento psicológico/i);

    // Base legal
    expect(text).toMatch(/consentimento/i);

    // Retenção
    expect(text).toMatch(/retenção|retemos|armazenamos/i);

    // Canal de exclusão
    expect(text).toMatch(/exclusão|excluir/i);
  });
});
