import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { EvaluatedConditions } from "./EvaluatedConditions";

describe("EvaluatedConditions — lp-avaliacao-infantil T03 (INF-03, INF-04)", () => {
  const items = [
    { nome: "Condição 1", descricao: "Descrição 1." },
    { nome: "Condição 2", descricao: "Descrição 2." },
    { nome: "Condição 3", descricao: "Descrição 3." },
    { nome: "Condição 4", descricao: "Descrição 4." },
  ];

  it("renderiza o título como h2, um item de lista por condição (nome + descrição) e a nota", () => {
    render(<EvaluatedConditions title="O que investiga" items={items} nota="Nota final." />);

    expect(screen.getByRole("heading", { level: 2, name: "O que investiga" })).toBeInTheDocument();

    const lis = screen.getAllByRole("listitem");
    expect(lis).toHaveLength(4);
    items.forEach((item, i) => {
      expect(within(lis[i]).getByText(item.nome)).toBeInTheDocument();
      expect(within(lis[i]).getByText(item.descricao)).toBeInTheDocument();
    });

    expect(screen.getByText("Nota final.")).toBeInTheDocument();
  });
});
