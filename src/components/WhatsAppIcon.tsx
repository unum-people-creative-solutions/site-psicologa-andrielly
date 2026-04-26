"use client";

import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface WhatsAppIconProps {
  size?: number;
  className?: string;
}

export default function WhatsAppIcon({ size = 24, className }: WhatsAppIconProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <FaWhatsapp size={size} />
    </div>
  );
}
