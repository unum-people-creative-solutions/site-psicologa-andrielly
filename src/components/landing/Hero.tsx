import Image from "next/image";
import { hero } from "@/content/avaliacao";
import { LeadCta } from "./LeadCta";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  credencial?: string;
  origem?: string;
  conversionLabel?: string;
}

export function Hero({
  title = hero.title,
  subtitle = hero.subtitle,
  ctaLabel = hero.ctaLabel,
  credencial = hero.credencial,
  origem,
  conversionLabel,
}: HeroProps = {}) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-offwhite overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-navy leading-tight mb-6">
            {title}
          </h1>
          <p className="text-lg text-brand-navy/80 mb-6 max-w-lg leading-relaxed">
            {subtitle}
          </p>
          <LeadCta
            label={ctaLabel}
            variant="primary"
            origem={origem}
            conversionLabel={conversionLabel}
          />
          <p className="mt-4 text-sm text-brand-navy/70">{credencial}</p>
        </div>

        <div className="relative h-[400px] md:h-[560px] w-full rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
          <Image
            src="/images/andry_aval.png"
            alt="Andrielly Oliveira, psicóloga"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
