"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Send } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Contact() {
  return (
    <section id="contato" className="py-24 bg-brand-offwhite">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif text-brand-navy mb-8">Vamos Conversar?</h2>
            <p className="text-brand-navy/70 text-lg mb-12 leading-relaxed">
              Dê o primeiro passo em direção ao seu bem-estar ou ao desenvolvimento do seu filho. Agende uma primeira conversa ou tire suas dúvidas através dos canais abaixo.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-center group">
                <div className="w-12 h-12 bg-brand-creme rounded-full flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-all">
                  <WhatsAppIcon size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-olive mb-1">WhatsApp</p>
                  <a href="https://wa.me/5541984873009?text=Olá,%20Dra.%20Andrielly!%20Gostaria%20de%20agendar%20uma%20consulta." target="_blank" className="text-xl font-medium text-brand-navy hover:text-brand-gold transition-colors">
                    (41) 9 8487-3009
                  </a>
                </div>
              </div>

              <div className="flex gap-6 items-center group">
                <div className="w-12 h-12 bg-brand-creme rounded-full flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-olive mb-1">Localização</p>
                  <a 
                    href="https://www.google.com/maps/place/Psic%C3%B3loga+Andrielly+Oliveira/@-25.4199727,-49.2684984,17z/data=!3m1!4b1!4m6!3m5!1s0x469698ab96a1897d:0x902416a458c790b!8m2!3d-25.4199727!4d-49.2684984!16s%2Fg%2F11x1zdwbl1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-brand-navy hover:text-brand-gold transition-colors leading-tight block"
                  >
                    Av. Cândido de Abreu, 526 - Torre B<br />
                    6º andar sala 604 - Centro Cívico<br />
                    Curitiba - PR
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-[32px] overflow-hidden shadow-xl border border-brand-creme"
          >
            <Image
              src="/images/psiandriellyoliveira-20241201_185536-q.jpg"
              alt="Consultório Andrielly Oliveira"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-navy/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
