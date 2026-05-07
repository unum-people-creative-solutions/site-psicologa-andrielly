"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Specialties from "@/components/Specialties";
import Methodology from "@/components/Methodology";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { useLead } from "@/context/LeadContext";

export default function Home() {
  const { openLeadModal } = useLead();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Psychologist",
    "name": "Andrielly Oliveira - Psicóloga",
    "image": "https://psiandriellyoliveira.com.br/images/psiandriellyoliveira-20250319_153010.jpg",
    "description": "Atendimento especializado para crianças, adolescentes e adultos em Curitiba. Psicanálise e Neuropsicologia.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Cândido de Abreu, 526 - Torre B 6º andar sala 604",
      "addressLocality": "Curitiba",
      "addressRegion": "PR",
      "postalCode": "80530-905",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -25.4199727,
      "longitude": -49.2684984
    },
    "url": "https://psiandriellyoliveira.com.br",
    "telephone": "+5541984873009",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      }
    ]
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <About />
      <Specialties />
      <Methodology />
      <Contact />
      <WhatsAppButton />
      
      {/* Footer */}
      <footer className="py-16 bg-brand-offwhite border-t border-brand-creme">
        <div className="container mx-auto px-6 md:px-12 flex flex-col gap-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <Link href="/" className="relative h-12 w-48 transition-opacity hover:opacity-80">
              <Image
                src="/images/logo-horizontal-verde-768x169.png"
                alt="Logo Andrielly Oliveira"
                fill
                className="object-contain"
              />
            </Link>
            
            <p className="text-brand-navy/40 text-sm text-center md:text-left font-medium">
              © {new Date().getFullYear()} Andrielly Oliveira. <br className="sm:hidden" /> Todos os direitos reservados.
            </p>

            <div className="flex gap-6 items-center">
              <a 
                href="https://www.instagram.com/psi.andriellyoliveira" 
                target="_blank" 
                className="text-brand-navy/60 hover:text-brand-gold transition-all flex items-center gap-2 text-sm font-medium group"
              >
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Instagram</span>
              </a>
              <a 
                href="https://wa.me/5541984873009?text=Olá,%20Dra.%20Andrielly!%20Gostaria%20de%20agendar%20uma%20consulta." 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openLeadModal(e.currentTarget.href);
                }}
                className="text-brand-navy/60 hover:text-brand-gold transition-all flex items-center gap-2 text-sm font-medium group"
              >
                <WhatsAppIcon size={20} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center border-t border-brand-creme pt-10">
            <a 
              href="https://unumpeople.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col md:flex-row items-center gap-3 md:gap-4 transition-all group"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-navy/20 group-hover:text-brand-navy/60 transition-colors">Desenvolvido por</span>
              <div className="flex items-center gap-2.5">
                <div className="relative h-5 w-5 grayscale brightness-[1.4] opacity-20 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-500">
                  <Image
                    src="/images/logo_unum.png"
                    alt="Logo Unum People"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-bold text-brand-navy/30 group-hover:text-brand-navy transition-colors tracking-tight">
                  Unum People <span className="font-medium opacity-40 group-hover:opacity-100">Creative Solutions</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
