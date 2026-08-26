import { sobre } from "@/content/avaliacao";

export function AboutProfessional() {
  return (
    <section className="py-24 bg-brand-creme/30">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <h2 className="text-4xl font-serif text-brand-navy mb-2">{sobre.nome}</h2>
        <p className="text-brand-gold font-medium uppercase tracking-widest text-sm mb-8">
          {sobre.credencial}
        </p>

        <div className="space-y-6 text-brand-navy/80 leading-relaxed text-lg">
          {sobre.bio.map((paragrafo) => (
            <p key={paragrafo}>{paragrafo}</p>
          ))}
        </div>

        <p className="mt-10 text-brand-navy/60 text-sm font-bold uppercase tracking-wider border-t border-brand-nude/30 pt-6">
          {sobre.localizacao}
        </p>
      </div>
    </section>
  );
}
