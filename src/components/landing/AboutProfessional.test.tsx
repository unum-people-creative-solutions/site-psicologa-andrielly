import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { sobre } from "@/content/avaliacao";
import { AboutProfessional } from "./AboutProfessional";

describe("AboutProfessional — TASK-SEC-012: renderiza dados de 'sobre'", () => {
  it("renderiza nome, credencial, todos os parágrafos da bio e a localização", () => {
    render(<AboutProfessional />);

    expect(screen.getByText(sobre.nome)).toBeInTheDocument();
    expect(screen.getByText(sobre.credencial)).toBeInTheDocument();

    sobre.bio.forEach((paragrafo) => {
      expect(screen.getByText(paragrafo)).toBeInTheDocument();
    });

    expect(screen.getByText(sobre.localizacao)).toBeInTheDocument();
  });
});
