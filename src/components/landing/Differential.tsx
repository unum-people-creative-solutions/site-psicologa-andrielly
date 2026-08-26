import { diferencial } from "@/content/avaliacao";

export function Differential() {
  return (
    <section className="py-24 bg-brand-offwhite">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
        <h2 className="text-4xl font-serif text-brand-navy mb-6">
          {diferencial.title}
        </h2>
        <div className="w-20 h-1 bg-brand-gold mx-auto mb-8" />
        <p className="text-lg text-brand-navy/80 leading-relaxed">
          {diferencial.body}
        </p>
      </div>
    </section>
  );
}
