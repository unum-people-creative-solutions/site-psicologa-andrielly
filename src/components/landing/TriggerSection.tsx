import { gatilhos } from "@/content/avaliacao";

export function TriggerSection() {
  return (
    <section className="py-24 bg-brand-creme">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-serif text-brand-navy mb-4">
            Você está aqui?
          </h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto" />
        </div>

        <ul className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {gatilhos.map((gatilho) => (
            <li
              key={gatilho}
              className="bg-white p-6 rounded-2xl shadow-sm border border-brand-nude/30 text-brand-navy/80 leading-relaxed"
            >
              {gatilho}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
