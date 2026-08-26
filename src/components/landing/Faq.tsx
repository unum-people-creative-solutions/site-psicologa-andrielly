"use client";

import { useState } from "react";
import { faq } from "@/content/avaliacao-faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-brand-offwhite">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <h2 className="text-4xl font-serif text-brand-navy text-center mb-16">
          Dúvidas frequentes
        </h2>
        <div className="divide-y divide-brand-nude/30 border-t border-b border-brand-nude/30">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.pergunta}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left py-6 flex justify-between items-center gap-4 text-brand-navy font-serif text-lg"
                >
                  {item.pergunta}
                </button>
                {isOpen && (
                  <p className="pb-6 text-brand-navy/70 leading-relaxed">{item.resposta}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
