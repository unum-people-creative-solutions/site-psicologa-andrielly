"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Phone, Mail, User } from "lucide-react";
import { useLead } from "@/context/LeadContext";
import { sendToCRM } from "@/lib/crm";
import { TextField } from "./ui/TextField";
import { PhoneField } from "./ui/PhoneField";

export default function LeadModal() {
  const { isOpen, pendingUrl, closeLeadModal } = useLead();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validação básica de telefone (mínimo de 11 dígitos: DDD + 9 dígitos)
    const phoneDigits = formData.telefone.replace(/\D/g, "");
    if (phoneDigits.length < 11) {
      setError("Por favor, preencha o WhatsApp com DDD e 9 dígitos.");
      return;
    }

    setLoading(true);

    // Função de fallback para garantir o redirecionamento
    const redirectToWhatsApp = () => {
      window.location.href = pendingUrl;
      closeLeadModal();
      setLoading(false);
    };

    try {
      // 1. Tentar enviar para o CRM (Não bloqueante para o usuário)
      try {
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
      } catch (crmError) {
        console.error("Erro silencioso no CRM:", crmError);
        // Prosseguimos mesmo se o CRM falhar
      }

      // 2. Disparar Google Ads Conversion
      if (typeof (window as any).gtag_report_conversion === "function") {
        // A função gtag_report_conversion do Google Ads já lida com o redirecionamento via callback
        (window as any).gtag_report_conversion(pendingUrl, {
          email: formData.email,
          phone: formData.telefone
        });
        
        // Timer de segurança: Se o gtag não redirecionar em 2 segundos, forçamos o redirecionamento
        setTimeout(redirectToWhatsApp, 2000);
      } else {
        redirectToWhatsApp();
      }
    } catch (error) {
      console.error("Erro crítico no processamento do lead:", error);
      // Em caso de qualquer erro catastrófico, garante que o paciente chegue ao WhatsApp
      redirectToWhatsApp();
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
              <TextField
                required
                icon={User}
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={(e) => {
                  setFormData({ ...formData, nome: e.target.value });
                  if (error) setError(null);
                }}
              />

              <TextField
                required
                type="email"
                icon={Mail}
                placeholder="Seu melhor e-mail"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (error) setError(null);
                }}
              />

              <PhoneField
                required
                icon={Phone}
                value={formData.telefone}
                onChange={(value) => {
                  setFormData({ ...formData, telefone: value });
                  if (error) setError(null);
                }}
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs font-medium bg-red-50 p-3 rounded-xl border border-red-100"
                >
                  {error}
                </motion.p>
              )}

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
