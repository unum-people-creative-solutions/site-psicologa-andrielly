"use client";

import { motion } from "framer-motion";
import { MessageSquare, Heart, ShieldCheck } from "lucide-react";

const principles = [
  {
    title: "Escuta Analítica",
    text: "Um olhar que vai além do sintoma, buscando as raízes do inconsciente e os padrões que moldam sua história.",
    icon: MessageSquare,
  },
  {
    title: "Vínculo Terapêutico",
    text: "A relação entre analista e sujeito é a base para a transformação. Um vínculo construído com amor e ética.",
    icon: Heart,
  },
  {
    title: "Ambiente Ético",
    text: "Sigilo absoluto e respeito ao tempo individual. Aqui, sua singularidade é a prioridade máxima.",
    icon: ShieldCheck,
  },
];

export default function Methodology() {
  return (
    <section id="metodologia" className="py-24 bg-brand-navy text-brand-offwhite overflow-hidden relative">
      {/* Decorative texture or shape */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              A Psicanálise como caminho para a <span className="italic text-brand-nude">liberdade emocional</span>.
            </h2>
            <p className="text-brand-offwhite/70 text-lg mb-12 leading-relaxed">
              Diferente de abordagens focadas apenas em comportamentos imediatos, a psicanálise propõe uma investigação profunda da alma. É através da livre associação e do acolhimento que construímos pontes para uma vida mais autêntica.
            </p>
            <div className="space-y-8">
              {principles.map((item, index) => (
                <div key={item.title} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-offwhite/10 rounded-full flex items-center justify-center text-brand-gold">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif mb-2">{item.title}</h4>
                    <p className="text-brand-offwhite/60 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-brand-offwhite/5 border border-brand-offwhite/10 p-12 rounded-[40px] backdrop-blur-sm"
          >
            <blockquote className="text-2xl font-serif italic mb-8 leading-relaxed text-brand-nude">
              "Olhar para as próprias raízes não é prender-se ao passado, mas encontrar as sementes para florescer no presente."
            </blockquote>
            <p className="text-brand-offwhite/80 font-medium">— Andrielly Oliveira</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
