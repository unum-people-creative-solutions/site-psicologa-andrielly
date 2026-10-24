import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadProvider, useLead } from "@/context/LeadContext";
import { ctaFinal } from "@/content/avaliacao";
import { FinalCta } from "./FinalCta";

function OpenState() {
  const { options } = useLead();
  return <div data-testid="open-state">{JSON.stringify(options)}</div>;
}

describe("FinalCta — props (lp-avaliacao-infantil T01/T02, INF-04/INF-07/INF-10)", () => {
  it("mostra título, corpo e botão das props e repassa origem e conversionLabel", async () => {
    const user = userEvent.setup();
    render(
      <LeadProvider>
        <FinalCta
          title="Título final"
          body="Corpo final"
          ctaLabel="Botão final"
          origem="LP Avaliação Infantil"
          conversionLabel="AW-TESTE/abc"
        />
        <OpenState />
      </LeadProvider>
    );

    expect(screen.getByRole("heading", { level: 2, name: "Título final" })).toBeInTheDocument();
    expect(screen.getByText("Corpo final")).toBeInTheDocument();
    expect(screen.queryByText(ctaFinal.title)).not.toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Botão final" }));
    const options = JSON.parse(screen.getByTestId("open-state").textContent!);
    expect(options.origem).toBe("LP Avaliação Infantil");
    expect(options.conversionLabel).toBe("AW-TESTE/abc");
  });

  it("sem props, mantém origem 'LP Avaliação' e conversionLabel indefinido", async () => {
    const user = userEvent.setup();
    render(
      <LeadProvider>
        <FinalCta />
        <OpenState />
      </LeadProvider>
    );

    await user.click(screen.getByRole("link", { name: ctaFinal.ctaLabel }));
    const options = JSON.parse(screen.getByTestId("open-state").textContent!);
    expect(options.origem).toBe("LP Avaliação");
    expect(options.conversionLabel).toBeUndefined();
  });
});
