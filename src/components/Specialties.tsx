"use client";

import { motion } from "framer-motion";
import { Brain, Baby, User, Users } from "lucide-react";

const specialties = [
  {
    title: "Atendimento Infantil",
    description: "Espaço lúdico onde o brincar é a ferramenta principal para a criança expressar suas emoções e superar dificuldades.",
    icon: Baby,
  },
  {
    title: "Adolescentes",
    description: "Acompanhamento focado nas transições e desafios da juventude, proporcionando escuta e suporte emocional.",
    icon: Users,
  },
  {
    title: "Adultos",
    description: "Processo de autoconhecimento e regulação emocional para enfrentar os desafios da vida adulta com equilíbrio.",
    icon: User,
  },
  {
    title: "Neuropsicologia",
    description: "Avaliação psicológica e neuropsicológica detalhada para compreensão de processos cognitivos e comportamentais.",
    icon: Brain,
  },
];

export default function Specialties() {
  return (
    <section id="especialidades" className="py-24 bg-brand-offwhite">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif text-brand-navy mb-4">Especialidades Clínicas</h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto mb-6" />
          <p className="text-brand-navy/70 leading-relaxed">
            Ofereço um olhar atento e especializado para cada etapa do desenvolvimento humano, integrando a psicanálise e a neuropsicologia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-brand-creme group"
            >
              <div className="w-14 h-14 bg-brand-creme rounded-xl flex items-center justify-center text-brand-navy mb-6 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-serif text-brand-navy mb-4">{item.title}</h3>
              <p className="text-brand-navy/60 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
