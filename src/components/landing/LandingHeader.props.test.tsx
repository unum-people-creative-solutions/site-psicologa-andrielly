import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadProvider, useLead } from "@/context/LeadContext";
import { headerCtaLabel } from "@/content/avaliacao";
import { LandingHeader } from "./LandingHeader";

function OpenState() {
  const { options } = useLead();
  return <div data-testid="open-state">{JSON.stringify(options)}</div>;
}

describe("LandingHeader — props (lp-avaliacao-infantil T02, INF-07/INF-10)", () => {
  it("repassa origem e conversionLabel ao CTA do cabeçalho", async () => {
    const user = userEvent.setup();
    render(
      <LeadProvider>
        <LandingHeader origem="LP Avaliação Infantil" conversionLabel="AW-TESTE/abc" />
        <OpenState />
      </LeadProvider>
    );

    await user.click(screen.getByRole("link", { name: headerCtaLabel }));
    const options = JSON.parse(screen.getByTestId("open-state").textContent!);
    expect(options.origem).toBe("LP Avaliação Infantil");
    expect(options.conversionLabel).toBe("AW-TESTE/abc");
  });

  it("sem props, mantém origem 'LP Avaliação' e conversionLabel indefinido", async () => {
    const user = userEvent.setup();
    render(
      <LeadProvider>
        <LandingHeader />
        <OpenState />
      </LeadProvider>
    );

    await user.click(screen.getByRole("link", { name: headerCtaLabel }));
    const options = JSON.parse(screen.getByTestId("open-state").textContent!);
    expect(options.origem).toBe("LP Avaliação");
    expect(options.conversionLabel).toBeUndefined();
  });
});
