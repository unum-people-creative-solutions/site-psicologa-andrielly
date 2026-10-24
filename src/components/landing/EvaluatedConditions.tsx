interface EvaluatedConditionsProps {
  title: string;
  items: { nome: string; descricao: string }[];
  nota: string;
}

export function EvaluatedConditions({ title, items, nota }: EvaluatedConditionsProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-serif text-brand-navy mb-4">{title}</h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto" />
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {items.map((item) => (
            <li
              key={item.nome}
              className="bg-brand-offwhite p-6 rounded-2xl border border-brand-nude/30"
            >
              <h3 className="text-xl font-serif text-brand-navy mb-2">{item.nome}</h3>
              <p className="text-brand-navy/70 text-sm leading-relaxed">{item.descricao}</p>
            </li>
          ))}
        </ul>

        <p className="text-center text-brand-navy/70 mt-10 max-w-2xl mx-auto">{nota}</p>
      </div>
    </section>
  );
}
