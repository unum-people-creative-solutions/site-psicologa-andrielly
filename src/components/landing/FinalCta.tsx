import { ctaFinal, sobre } from "@/content/avaliacao";
import { LeadCta } from "./LeadCta";

export function FinalCta() {
  return (
    <section className="py-24 bg-brand-navy">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl text-center">
        <h2 className="text-4xl font-serif text-brand-offwhite mb-6">{ctaFinal.title}</h2>
        <p className="text-lg text-brand-offwhite/80 mb-10 leading-relaxed">{ctaFinal.body}</p>
        <LeadCta label={ctaFinal.ctaLabel} variant="primary" origem="LP Avaliação" />
        <p className="mt-10 text-sm text-brand-offwhite/60">{sobre.enderecoCompleto}</p>
      </div>
    </section>
  );
}
