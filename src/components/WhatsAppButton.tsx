"use client";

import { motion } from "framer-motion";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/5541984873009?text=Olá,%20Dra.%20Andrielly!%20Gostaria%20de%20agendar%20uma%20consulta."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 bg-brand-navy text-brand-offwhite p-4 rounded-full shadow-2xl flex items-center justify-center border-4 border-brand-creme group transition-colors hover:bg-brand-olive"
      aria-label="Contato via WhatsApp"
    >
      <WhatsAppIcon size={36} className="text-brand-gold" />
      
      {/* Tooltip personalizado com identidade visual */}
      <span className="absolute right-full mr-4 bg-brand-navy text-brand-offwhite px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-brand-gold/30">
        Agendar Consulta
      </span>
    </motion.a>
  );
}
