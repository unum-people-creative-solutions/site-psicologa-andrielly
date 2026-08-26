import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LeadProvider } from "@/context/LeadContext";
import { hero } from "@/content/avaliacao";
import { Hero } from "./Hero";

describe("Hero — TASK-SEC-006", () => {
  it("renderiza hero.title como <h1>", () => {
    render(
      <LeadProvider>
        <Hero />
      </LeadProvider>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: hero.title })
    ).toBeInTheDocument();
  });

  it("renderiza hero.subtitle", () => {
    render(
      <LeadProvider>
        <Hero />
      </LeadProvider>
    );

    expect(screen.getByText(hero.subtitle)).toBeInTheDocument();
  });

  it("renderiza hero.credencial visível acima da dobra", () => {
    render(
      <LeadProvider>
        <Hero />
      </LeadProvider>
    );

    expect(screen.getByText(hero.credencial)).toBeInTheDocument();
  });

  it("renderiza o CTA com hero.ctaLabel como link", () => {
    render(
      <LeadProvider>
        <Hero />
      </LeadProvider>
    );

    expect(
      screen.getByRole("link", { name: new RegExp(hero.ctaLabel, "i") })
    ).toBeInTheDocument();
  });
});
