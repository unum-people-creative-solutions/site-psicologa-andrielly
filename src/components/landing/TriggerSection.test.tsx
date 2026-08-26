import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { gatilhos } from "@/content/avaliacao";
import { TriggerSection } from "./TriggerSection";

describe("TriggerSection — TASK-SEC-007", () => {
  it("renderiza um <h2> como título da seção", () => {
    render(<TriggerSection />);

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renderiza todos os itens de gatilhos", () => {
    render(<TriggerSection />);

    gatilhos.forEach((gatilho) => {
      expect(screen.getByText(gatilho)).toBeInTheDocument();
    });
  });
});
