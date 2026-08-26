import { tiposAvaliacao } from "@/content/avaliacao";

export function EvaluationTypes() {
  return (
    <section id="tipos-avaliacao" className="py-24 bg-brand-navy text-brand-offwhite">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-serif text-center mb-16">
          {tiposAvaliacao.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-brand-offwhite/5 border border-brand-offwhite/10 p-10 rounded-[32px]">
            <h3 className="text-2xl font-serif text-brand-nude mb-4">
              {tiposAvaliacao.neuropsicologica.title}
            </h3>
            <p className="text-brand-offwhite/70 leading-relaxed">
              {tiposAvaliacao.neuropsicologica.body}
            </p>
          </div>

          <div className="bg-brand-offwhite/5 border border-brand-offwhite/10 p-10 rounded-[32px]">
            <h3 className="text-2xl font-serif text-brand-nude mb-4">
              {tiposAvaliacao.psicologica.title}
            </h3>
            <p className="text-brand-offwhite/70 leading-relaxed">
              {tiposAvaliacao.psicologica.body}
            </p>
          </div>
        </div>

        <p className="text-center text-brand-offwhite/60 italic max-w-2xl mx-auto">
          {tiposAvaliacao.nota}
        </p>
      </div>
    </section>
  );
}
