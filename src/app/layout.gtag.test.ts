import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "fs";
import path from "path";

/**
 * gtag_report_conversion vive como string JS crua dentro de um <Script>
 * inline em layout.tsx — não é um módulo importável, então tsc --noEmit
 * não prova nada sobre o comportamento em runtime. Extraímos o corpo do
 * template literal do próprio arquivo fonte e o executamos de verdade no
 * ambiente jsdom do teste (window já existe), para exercitar o código
 * real, não uma cópia reescrita à mão que poderia divergir do arquivo.
 */
function extractInlineScript(): string {
  const source = readFileSync(path.resolve(__dirname, "layout.tsx"), "utf-8");
  const match = source.match(
    /<Script id="google-ads-tag"[^>]*>\s*\{`([\s\S]*?)`\}\s*<\/Script>/
  );
  if (!match) {
    throw new Error(
      'Bloco <Script id="google-ads-tag"> não encontrado em layout.tsx — o teste presume esse formato exato.'
    );
  }
  return match[1];
}

function lastConversionEvent(): any {
  const dataLayer = (window as any).dataLayer as any[];
  const call = [...dataLayer]
    .reverse()
    .find((entry) => entry[0] === "event" && entry[1] === "conversion");
  if (!call) {
    throw new Error("Nenhum evento de conversão foi empilhado em dataLayer.");
  }
  return call[2];
}

describe("gtag_report_conversion — script inline de layout.tsx (LEAD-6)", () => {
  beforeEach(() => {
    delete (window as any).gtag_report_conversion;
    (window as any).dataLayer = [];
    // eslint-disable-next-line no-eval -- execução deliberada do script real extraído do arquivo fonte
    (0, eval)(extractInlineScript());
  });

  it("usa o rótulo de conversão default quando sendTo não é informado (chamada de 2 argumentos)", () => {
    (window as any).gtag_report_conversion("https://wa.me/5541984873009", undefined);

    expect(lastConversionEvent().send_to).toBe(
      "AW-17122840229/0k8KCMO2jtQaEKWd5-Q_"
    );
  });

  it("usa o rótulo informado quando sendTo é passado como terceiro argumento", () => {
    (window as any).gtag_report_conversion(
      "https://wa.me/5541984873009",
      undefined,
      "AW-XXX/custom-label"
    );

    expect(lastConversionEvent().send_to).toBe("AW-XXX/custom-label");
  });

  it("continua incluindo user_data quando userData é informado", () => {
    (window as any).gtag_report_conversion("https://wa.me/5541984873009", {
      email: "maria@example.com",
      phone: "41999998888",
    });

    expect(lastConversionEvent().user_data).toEqual({
      email: "maria@example.com",
      phone_number: "41999998888",
    });
  });
});
