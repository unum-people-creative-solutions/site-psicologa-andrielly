"use client";

import { cn } from "@/lib/utils";
import { useLead } from "@/context/LeadContext";

const WHATSAPP_HREF =
  "https://wa.me/5541984873009?text=Olá,%20Andrielly!%20Gostaria%20de%20saber%20mais%20sobre%20a%20avaliação.";

interface LeadCtaProps {
  label: string;
  variant: "primary" | "secondary";
  origem?: string;
  conversionLabel?: string;
  className?: string;
}

const VARIANT_CLASSES: Record<LeadCtaProps["variant"], string> = {
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

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        openLeadModal(WHATSAPP_HREF, { origem, conversionLabel });
      }}
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
