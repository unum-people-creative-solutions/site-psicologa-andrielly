import { describe, it, expect, beforeAll } from "vitest";
import nextConfig from "../../next.config.mjs";

/**
 * next.config.mjs declares its redirect source in Next.js's path-to-regexp
 * dialect: `/:path(<custom-regex>)`. We extract the custom regex verbatim
 * and test it directly — this exercises the real config, not a copy of it.
 */
function extractRedirectRegex(source: string): RegExp {
  const match = source.match(/^\/:path\((.+)\)$/);
  if (!match) {
    throw new Error(`Unexpected redirect source shape: ${source}`);
  }
  return new RegExp(`^${match[1]}$`);
}

describe("next.config.mjs redirect catch-all", () => {
  let redirectRegex: RegExp;
  let destination: string;

  beforeAll(async () => {
    if (!nextConfig.redirects) {
      throw new Error("next.config.mjs no longer declares a redirects() function");
    }
    const redirects = await nextConfig.redirects();
    redirectRegex = extractRedirectRegex(redirects[0].source);
    destination = redirects[0].destination;
  });

  it("still redirects orphan paths to the home page", () => {
    expect(destination).toBe("/");
  });

  it("does not capture /avaliacao-neuropsicologica", () => {
    expect(redirectRegex.test("avaliacao-neuropsicologica")).toBe(false);
  });

  it("does not capture /politica-de-privacidade", () => {
    expect(redirectRegex.test("politica-de-privacidade")).toBe(false);
  });

  it("still captures an orphan path", () => {
    expect(redirectRegex.test("pagina-inexistente")).toBe(true);
  });
});
