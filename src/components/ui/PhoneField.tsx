"use client";

import { LucideIcon } from "lucide-react";
import InputMask from "react-input-mask";
import { cn } from "@/lib/utils";

interface PhoneFieldProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  icon?: LucideIcon;
}

export function PhoneField({ 
  value, 
  onChange, 
  required, 
  placeholder = "WhatsApp (com DDD)", 
  className, 
  containerClassName,
  icon: Icon 
}: PhoneFieldProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      {Icon && (
        <Icon 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" 
          size={18} 
        />
      )}
      <InputMask
        mask="(99) 99999-9999"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maskChar=""
      >
        {((inputProps: any) => (
          <input
            {...inputProps}
            type="tel"
            required={required}
            placeholder={placeholder}
            className={cn(
              "w-full bg-white border border-brand-creme rounded-2xl py-4 pr-4 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all placeholder:text-brand-navy/40",
              Icon ? "pl-12" : "pl-4",
              className
            )}
          />
        )) as any}
      </InputMask>
    </div>
  );
}
