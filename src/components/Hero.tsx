"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-offwhite">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-creme/50 -skew-x-12 translate-x-1/2 z-0" />

      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-brand-nude/20 text-brand-olive text-xs font-bold tracking-widest uppercase mb-6">
            Psicanálise & Neuropsicologia
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-navy leading-tight mb-6">
            Acolhendo o <br />
            <span className="italic text-brand-gold">singular</span> em cada jornada.
          </h1>
          <p className="text-lg text-brand-navy/80 mb-8 max-w-lg leading-relaxed">
            Especialista em atendimento infantil, adolescente e adulto. Um espaço seguro para transformar o sofrimento em autoconhecimento e desenvolvimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contato"
              className="bg-brand-navy text-brand-offwhite px-8 py-4 rounded-full text-center font-semibold hover:bg-brand-olive transition-all shadow-lg hover:shadow-xl"
            >
              Agendar Consulta
            </a>
            <a
              href="#sobre"
              className="border border-brand-navy text-brand-navy px-8 py-4 rounded-full text-center font-semibold hover:bg-brand-creme transition-all"
            >
              Conheça meu trabalho
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[500px] md:h-[700px] w-full"
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
            <Image
              src="/images/psiandriellyoliveira-20250319_153010.jpg"
              alt="Dra. Andrielly Oliveira"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden lg:block border border-brand-creme">
            <p className="text-brand-navy font-serif italic text-xl">"A cura pela fala."</p>
            <p className="text-brand-olive text-sm font-bold mt-1 uppercase tracking-tighter">— Psicanálise</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
