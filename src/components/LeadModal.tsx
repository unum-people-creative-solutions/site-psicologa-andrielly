"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Phone, Mail, User } from "lucide-react";
import { useLead } from "@/context/LeadContext";
import { sendToCRM } from "@/lib/crm";

export default function LeadModal() {
  const { isOpen, pendingUrl, closeLeadModal } = useLead();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  const [origem, setOrigem] = useState("Direto / Orgânico");
  const [tracking, setTracking] = useState<{
    gclid: string | null;
    fbclid: string | null;
    msclkid: string | null;
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
  }>({
    gclid: null,
    fbclid: null,
    msclkid: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get("utm_source");
      const utmMedium = params.get("utm_medium");
      const utmCampaign = params.get("utm_campaign");
      const utmContent = params.get("utm_content");
      const gclid = params.get("gclid");
      const fbclid = params.get("fbclid");
      const msclkid = params.get("msclkid");

      setTracking({
        gclid,
        fbclid,
        msclkid,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      });

      if (utmSource || utmCampaign || gclid || fbclid || msclkid) {
        const parts = [
          utmSource && `Source: ${utmSource}`,
          utmMedium && `Medium: ${utmMedium}`,
          utmCampaign && `Campaign: ${utmCampaign}`,
          utmContent && `Content: ${utmContent}`,
          gclid && `GCLID: ${gclid}`,
          fbclid && `FBCLID: ${fbclid}`,
          msclkid && `MSCLKID: ${msclkid}`
        ].filter(Boolean);
        setOrigem(parts.join(" | "));
      } else if (document.referrer) {
        try {
          const refUrl = new URL(document.referrer);
          if (refUrl.hostname !== window.location.hostname) {
            setOrigem(`Referrer: ${refUrl.hostname}`);
          }
        } catch (e) {
          setOrigem(`Referrer: ${document.referrer}`);
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Enviar para o CRM
      await sendToCRM({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        origem: origem,
        ...tracking,
        metadados: {
          url_conversao: pendingUrl,
          data_hora: new Date().toISOString(),
        },
      });

      // 2. Disparar Google Ads Conversion e Redirecionar
      if (typeof (window as any).gtag_report_conversion === "function") {
        (window as any).gtag_report_conversion(pendingUrl);
      } else {
        window.location.href = pendingUrl;
      }
      
      closeLeadModal();
    } catch (error) {
      console.error("Erro ao processar lead:", error);
      // Mesmo com erro no CRM, tentamos seguir para o WhatsApp para não perder o paciente
      window.location.href = pendingUrl;
      closeLeadModal();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLeadModal}
          className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-brand-offwhite rounded-[32px] shadow-2xl overflow-hidden border border-brand-creme"
        >
          <button
            onClick={closeLeadModal}
            className="absolute top-6 right-6 text-brand-navy/40 hover:text-brand-navy transition-colors"
          >
            <X size={24} />
          </button>

          <div className="p-8 md:p-10">
            <div className="mb-8">
              <h3 className="text-2xl font-serif text-brand-navy mb-2">Iniciar Atendimento</h3>
              <p className="text-brand-navy/60 text-sm">
                Preencha brevemente para que a Dra. Andrielly possa te dar um retorno personalizado.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" size={18} />
                <input
                  required
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full bg-white border border-brand-creme rounded-2xl py-4 pl-12 pr-4 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" size={18} />
                <input
                  required
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="w-full bg-white border border-brand-creme rounded-2xl py-4 pl-12 pr-4 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" size={18} />
                <input
                  required
                  type="tel"
                  placeholder="WhatsApp (com DDD)"
                  className="w-full bg-white border border-brand-creme rounded-2xl py-4 pl-12 pr-4 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-brand-navy text-brand-offwhite rounded-2xl py-4 font-bold shadow-lg shadow-brand-navy/20 hover:bg-brand-olive transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    FALAR COM A DOUTORA
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </button>
              
              <p className="text-[10px] text-center text-brand-navy/40 uppercase tracking-widest font-medium">
                Sua privacidade é nossa prioridade.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
