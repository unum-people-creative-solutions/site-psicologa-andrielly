import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { tiposAvaliacao } from "@/content/avaliacao";
import { EvaluationTypes } from "./EvaluationTypes";

describe("EvaluationTypes — TASK-SEC-011: qual avaliação é a sua", () => {
  it("renderiza o título da seção como heading", () => {
    render(<EvaluationTypes />);

    expect(
      screen.getByRole("heading", { name: tiposAvaliacao.title })
    ).toBeInTheDocument();
  });

  it("renderiza título e corpo da avaliação neuropsicológica e da psicológica", () => {
    render(<EvaluationTypes />);

    expect(
      screen.getByText(tiposAvaliacao.neuropsicologica.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(tiposAvaliacao.neuropsicologica.body)
    ).toBeInTheDocument();
    expect(
      screen.getByText(tiposAvaliacao.psicologica.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(tiposAvaliacao.psicologica.body)
    ).toBeInTheDocument();
  });

  it("renderiza a nota de fechamento", () => {
    render(<EvaluationTypes />);

    expect(screen.getByText(tiposAvaliacao.nota)).toBeInTheDocument();
  });
});
