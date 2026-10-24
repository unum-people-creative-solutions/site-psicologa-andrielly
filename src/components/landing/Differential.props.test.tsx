import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { diferencial } from "@/content/avaliacao";
import { Differential } from "./Differential";

describe("Differential — props (lp-avaliacao-infantil T01, INF-04)", () => {
  it("mostra título e corpo das props e não os padrões", () => {
    render(<Differential title="Título X" body="Corpo X" />);

    expect(screen.getByRole("heading", { level: 2, name: "Título X" })).toBeInTheDocument();
    expect(screen.getByText("Corpo X")).toBeInTheDocument();
    expect(screen.queryByText(diferencial.title)).not.toBeInTheDocument();
  });
});
