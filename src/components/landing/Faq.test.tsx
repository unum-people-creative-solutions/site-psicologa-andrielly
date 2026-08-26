import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faq } from "@/content/avaliacao-faq";
import { Faq } from "./Faq";

describe("Faq — TASK-SEC-013: accordion acessível por teclado", () => {
  it("tem um heading identificando a seção", () => {
    render(<Faq />);
    expect(screen.getByRole("heading", { name: /dúvidas frequentes/i })).toBeInTheDocument();
  });

  it("renderiza a pergunta de cada item do FAQ", () => {
    render(<Faq />);

    faq.forEach((item) => {
      expect(screen.getByText(item.pergunta)).toBeInTheDocument();
    });
  });

  it("T07: abre e fecha com Enter, refletindo aria-expanded", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const trigger = screen.getAllByRole("button")[0];
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    trigger.focus();
    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(faq[0].resposta)).toBeVisible();

    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("T07b: abre e fecha com Space também (a AC nomeia Enter/Space)", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const trigger = screen.getAllByRole("button")[1];
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    trigger.focus();
    await user.keyboard(" ");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(faq[1].resposta)).toBeVisible();

    await user.keyboard(" ");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
