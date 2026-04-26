"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-brand-creme/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-3xl overflow-hidden shadow-xl"
          >
            <Image
              src="/images/psiandriellyoliveira-IMG_20240321_141436_878.jpg"
              alt="Andrielly Oliveira no consultório"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif text-brand-navy mb-6">Andrielly Oliveira</h2>
            <p className="text-brand-gold font-medium uppercase tracking-widest text-sm mb-8">Psicóloga Clínica • CRP 08/35504</p>            
            <div className="space-y-6 text-brand-navy/80 leading-relaxed text-lg">
              <p>
                Sou psicóloga formada pela PUC-PR, com foco clínico fundamentado na psicanálise. Meu trabalho é pautado pelo acolhimento da singularidade de cada sujeito, criando um espaço onde a fala e a escuta transformam o sofrimento em novas possibilidades.
              </p>
              <p>
                Acredito que a cura acontece através do amor e da palavra. Por isso, meu consultório é um ambiente de total segurança e ausência de julgamentos, permitindo que crianças, adolescentes e adultos encontrem suas próprias ferramentas para lidar com as raízes de suas emoções.
              </p>
              <p>
                Além da prática clínica, dedico-me ao estudo contínuo da neuropsicologia, integrando o conhecimento técnico à sensibilidade analítica para oferecer avaliações precisas e um cuidado integral.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-brand-nude/30 pt-10">
              <div>
                <p className="text-2xl font-serif text-brand-navy">Centro Cívico - Curitiba</p>
                <p className="text-brand-olive text-xs font-bold uppercase tracking-wider">Localização</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
