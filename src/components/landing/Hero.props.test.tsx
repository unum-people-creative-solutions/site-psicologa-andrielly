import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadProvider, useLead } from "@/context/LeadContext";
import { hero } from "@/content/avaliacao";
import { Hero } from "./Hero";

function OpenState() {
  const { options } = useLead();
  return <div data-testid="open-state">{JSON.stringify(options)}</div>;
}

const props = {
  title: "Título de teste",
  subtitle: "Subtítulo de teste",
  ctaLabel: "Botão de teste",
  credencial: "Credencial de teste",
};

describe("Hero — props (lp-avaliacao-infantil T01/T02, INF-04/INF-07/INF-10)", () => {
  it("mostra o texto das props e não o texto padrão", () => {
    render(
      <LeadProvider>
        <Hero {...props} />
      </LeadProvider>
    );

    expect(screen.getByRole("heading", { level: 1, name: props.title })).toBeInTheDocument();
    expect(screen.getByText(props.subtitle)).toBeInTheDocument();
    expect(screen.getByText(props.credencial)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: props.ctaLabel })).toBeInTheDocument();
    expect(screen.queryByText(hero.title)).not.toBeInTheDocument();
  });

  it("repassa origem e conversionLabel ao CTA", async () => {
    const user = userEvent.setup();
    render(
      <LeadProvider>
        <Hero {...props} origem="LP Avaliação Infantil" conversionLabel="AW-TESTE/abc" />
        <OpenState />
      </LeadProvider>
    );

    await user.click(screen.getByRole("link", { name: props.ctaLabel }));

    const options = JSON.parse(screen.getByTestId("open-state").textContent!);
    expect(options.origem).toBe("LP Avaliação Infantil");
    expect(options.conversionLabel).toBe("AW-TESTE/abc");
  });

  it("sem props, o CTA mantém a origem 'LP Avaliação' e conversionLabel indefinido", async () => {
    const user = userEvent.setup();
    render(
      <LeadProvider>
        <Hero />
        <OpenState />
      </LeadProvider>
    );

    await user.click(screen.getByRole("link", { name: hero.ctaLabel }));

    const options = JSON.parse(screen.getByTestId("open-state").textContent!);
    expect(options.origem).toBe("LP Avaliação");
    expect(options.conversionLabel).toBeUndefined();
  });
});
