import { processo, processoResumo } from "@/content/avaliacao";

export function Process() {
  return (
    <section id="processo" className="py-24 bg-brand-creme">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif text-brand-navy mb-6">
            Como funciona o processo
          </h2>
          <p className="text-lg font-serif text-brand-navy">
            {processoResumo.encontros}
          </p>
          <p className="text-lg font-serif text-brand-navy">
            {processoResumo.duracaoTotal}
          </p>
        </div>

        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processo.map((etapa) => (
            <li
              key={etapa.passo}
              className="bg-white p-8 rounded-2xl shadow-sm border border-brand-nude/30"
            >
              <span className="text-4xl font-serif text-brand-navy/50 mb-4 block">
                {String(etapa.passo).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-serif text-brand-navy mb-2">
                {etapa.titulo}
              </h3>
              <p className="text-brand-olive text-xs font-bold uppercase tracking-wider mb-4">
                {etapa.duracao}
              </p>
              <p className="text-brand-navy/70 text-sm leading-relaxed">
                {etapa.descricao}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
