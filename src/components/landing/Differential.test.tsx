import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { diferencial } from "@/content/avaliacao";
import { Differential } from "./Differential";

describe("Differential — TASK-SEC-008", () => {
  it("renderiza diferencial.title como heading", () => {
    render(<Differential />);

    expect(
      screen.getByRole("heading", { name: diferencial.title })
    ).toBeInTheDocument();
  });

  it("renderiza diferencial.body", () => {
    render(<Differential />);

    expect(screen.getByText(diferencial.body)).toBeInTheDocument();
  });
});
