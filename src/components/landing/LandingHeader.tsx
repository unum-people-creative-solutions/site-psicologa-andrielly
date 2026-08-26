"use client";

import Image from "next/image";
import Link from "next/link";
import { headerCtaLabel } from "@/content/avaliacao";
import { LeadCta } from "./LeadCta";

export function LandingHeader() {
  return (
    <header className="fixed w-full bg-brand-offwhite/90 backdrop-blur-md shadow-sm z-[60] h-24 flex items-center">
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center w-full">
        <Link href="/" className="relative h-12 w-48 transition-opacity hover:opacity-80">
          <Image
            src="/images/logo-horizontal-verde-768x169.png"
            alt="Logo Andrielly Oliveira"
            fill
            className="object-contain"
            priority
          />
        </Link>

        <LeadCta
          label={headerCtaLabel}
          variant="primary"
          className="px-6 py-2 text-sm"
        />
      </div>
    </header>
  );
}
