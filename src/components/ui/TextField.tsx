"use client";

import { LucideIcon } from "lucide-react";
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  containerClassName?: string;
}

export function TextField({ icon: Icon, className, containerClassName, ...props }: TextFieldProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      {Icon && (
        <Icon 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" 
          size={18} 
        />
      )}
      <input
        className={cn(
          "w-full bg-white border border-brand-creme rounded-2xl py-4 pr-4 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all placeholder:text-brand-navy/40",
          Icon ? "pl-12" : "pl-4",
          className
        )}
        {...props}
      />
    </div>
  );
}
