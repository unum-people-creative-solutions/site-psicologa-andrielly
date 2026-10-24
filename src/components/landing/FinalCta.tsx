import { ctaFinal, sobre } from "@/content/avaliacao";
import { LeadCta } from "./LeadCta";

interface FinalCtaProps {
  title?: string;
  body?: string;
  ctaLabel?: string;
  origem?: string;
  conversionLabel?: string;
}

export function FinalCta({
  title = ctaFinal.title,
  body = ctaFinal.body,
  ctaLabel = ctaFinal.ctaLabel,
  origem = "LP Avaliação",
  conversionLabel,
}: FinalCtaProps = {}) {
  return (
    <section className="py-24 bg-brand-navy">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl text-center">
        <h2 className="text-4xl font-serif text-brand-offwhite mb-6">{title}</h2>
        <p className="text-lg text-brand-offwhite/80 mb-10 leading-relaxed">{body}</p>
        <LeadCta
          label={ctaLabel}
          variant="primary"
          origem={origem}
          conversionLabel={conversionLabel}
        />
        <p className="mt-10 text-sm text-brand-offwhite/60">{sobre.enderecoCompleto}</p>
      </div>
    </section>
  );
}
