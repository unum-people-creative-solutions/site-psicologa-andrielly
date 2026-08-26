import { entregavel } from "@/content/avaliacao";

export function Deliverable() {
  return (
    <section id="entregavel" className="py-24 bg-brand-offwhite">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif text-brand-navy mb-4">
            {entregavel.title}
          </h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {entregavel.items.map((item) => (
            <div
              key={item.title}
              className="bg-white p-8 rounded-2xl shadow-sm border border-brand-creme"
            >
              <h3 className="text-xl font-serif text-brand-navy mb-4">
                {item.title}
              </h3>
              <p className="text-brand-navy/70 text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
