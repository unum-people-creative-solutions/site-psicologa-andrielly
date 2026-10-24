import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faq } from "@/content/avaliacao-faq";
import { Faq } from "./Faq";

describe("Faq — props (lp-avaliacao-infantil T01, INF-04)", () => {
  const items = [
    { pergunta: "Pergunta 1?", resposta: "Resposta 1." },
    { pergunta: "Pergunta 2?", resposta: "Resposta 2." },
  ];

  it("lista as perguntas das props, na ordem, e não as padrões", () => {
    render(<Faq items={items} />);

    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual(
      items.map((i) => expect.stringContaining(i.pergunta))
    );
    expect(screen.queryByText(faq[0].pergunta)).not.toBeInTheDocument();
  });

  it("abre a resposta da prop pelo teclado", async () => {
    const user = userEvent.setup();
    render(<Faq items={items} />);

    const btn = screen.getByRole("button", { name: /Pergunta 1\?/ });
    btn.focus();
    await user.keyboard("{Enter}");

    expect(btn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Resposta 1.")).toBeVisible();
  });
});
