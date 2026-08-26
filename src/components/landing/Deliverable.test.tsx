import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { entregavel } from "@/content/avaliacao";
import { Deliverable } from "./Deliverable";

describe("Deliverable — TASK-SEC-009: o que a paciente recebe ao final", () => {
  it("renderiza o título da seção como heading", () => {
    render(<Deliverable />);

    expect(
      screen.getByRole("heading", { name: entregavel.title })
    ).toBeInTheDocument();
  });

  it("renderiza título e corpo de todos os itens do entregável", () => {
    render(<Deliverable />);

    entregavel.items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.body)).toBeInTheDocument();
    });
  });
});
