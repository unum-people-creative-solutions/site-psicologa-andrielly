"use client";

import { cn } from "@/lib/utils";
import { useLead } from "@/context/LeadContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const WHATSAPP_HREF =
  "https://wa.me/5541984873009?text=Olá,%20Andrielly!%20Gostaria%20de%20saber%20mais%20sobre%20a%20avaliação.";

interface LeadCtaProps {
  label: string;
  variant: "primary" | "secondary" | "floating";
  origem?: string;
  conversionLabel?: string;
  className?: string;
}

const VARIANT_CLASSES: Record<"primary" | "secondary", string> = {
  primary:
    "bg-brand-navy text-brand-offwhite hover:bg-brand-olive shadow-lg hover:shadow-xl",
  secondary:
    "border border-brand-navy text-brand-navy hover:bg-brand-creme",
};

export function LeadCta({
  label,
  variant,
  origem = "LP Avaliação",
  conversionLabel,
  className,
}: LeadCtaProps) {
  const { openLeadModal } = useLead();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openLeadModal(WHATSAPP_HREF, { origem, conversionLabel });
  };

  // O botão flutuante existe hoje também em src/components/WhatsAppButton.tsx
  // (usado pela home), mas aquele depende de framer-motion — reusá-lo na LP
  // puxa ~42 KB gzip extra no bundle sem necessidade, estourando o
  // orçamento de performance (TDD §10). Esta variante entrega o mesmo
  // resultado visual (hover/tap scale) só com CSS, sem dependência nova.
  if (variant === "floating") {
    return (
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onClick={handleClick}
        className={cn(
          "fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-brand-navy text-brand-gold shadow-2xl border-4 border-brand-creme transition-all hover:bg-brand-olive hover:scale-110 active:scale-95",
          className
        )}
      >
        <WhatsAppIcon size={28} />
      </a>
    );
  }

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "inline-block px-8 py-4 rounded-full text-center font-semibold transition-all",
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {label}
    </a>
  );
}
