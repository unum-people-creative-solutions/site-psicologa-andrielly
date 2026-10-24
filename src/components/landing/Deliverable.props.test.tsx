import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { entregavel } from "@/content/avaliacao";
import { Deliverable } from "./Deliverable";

describe("Deliverable — props (lp-avaliacao-infantil T01, INF-04)", () => {
  it("mostra título e itens das props e não os padrões", () => {
    const items = [
      { title: "Item 1", body: "Corpo 1" },
      { title: "Item 2", body: "Corpo 2" },
    ];
    render(<Deliverable title="Entregável X" items={items} />);

    expect(screen.getByRole("heading", { level: 2, name: "Entregável X" })).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)
    ).toEqual(["Item 1", "Item 2"]);
    expect(screen.getByText("Corpo 2")).toBeInTheDocument();
    expect(screen.queryByText(entregavel.title)).not.toBeInTheDocument();
  });
});
