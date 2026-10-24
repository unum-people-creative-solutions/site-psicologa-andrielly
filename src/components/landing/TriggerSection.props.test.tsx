import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { gatilhos } from "@/content/avaliacao";
import { TriggerSection } from "./TriggerSection";

describe("TriggerSection — props (lp-avaliacao-infantil T01, INF-04)", () => {
  it("lista os gatilhos das props e não os padrões", () => {
    const itens = ["Gatilho A", "Gatilho B"];
    render(<TriggerSection gatilhos={itens} />);

    const lis = screen.getAllByRole("listitem");
    expect(lis.map((li) => li.textContent)).toEqual(itens);
    expect(screen.queryByText(gatilhos[0])).not.toBeInTheDocument();
  });
});
