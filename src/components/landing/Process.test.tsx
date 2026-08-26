import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { processo, processoResumo } from "@/content/avaliacao";
import { Process } from "./Process";

describe("Process — TASK-SEC-010 / T03: números reais do processo chegam à página", () => {
  it("renderiza título, duração e descrição de todas as etapas do processo", () => {
    render(<Process />);

    processo.forEach((etapa) => {
      expect(screen.getByText(etapa.titulo)).toBeInTheDocument();
      expect(screen.getByText(etapa.duracao)).toBeInTheDocument();
      expect(screen.getByText(etapa.descricao)).toBeInTheDocument();
    });
  });

  it("renderiza o resumo de encontros e a duração total do processo, verbatim", () => {
    render(<Process />);

    expect(screen.getByText(processoResumo.encontros)).toBeInTheDocument();
    expect(screen.getByText(processoResumo.duracaoTotal)).toBeInTheDocument();
  });
});
