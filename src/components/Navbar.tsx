"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Sobre", href: "#sobre" },
  { name: "Especialidades", href: "#especialidades" },
  { name: "Metodologia", href: "#metodologia" },
  { name: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed w-full transition-all duration-300 h-24 flex items-center z-[60] ${
          scrolled || isOpen ? "bg-brand-offwhite/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
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

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-brand-navy hover:text-brand-gold transition-colors font-medium text-sm tracking-wide uppercase"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/5541984873009?text=Olá,%20Dra.%20Andrielly!%20Gostaria%20de%20agendar%20uma%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-navy text-brand-offwhite px-6 py-2 rounded-full hover:bg-brand-olive transition-all duration-300 text-sm font-semibold tracking-wider"
            >
              AGENDAR
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-brand-navy"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Backdrop - cobre todo o site abaixo do menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[40] md:hidden"
            />
            
            {/* Menu Content - abaixo do Header (z-60), acima do Backdrop (z-40) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-0 w-full bg-brand-offwhite shadow-2xl md:hidden z-[50] border-t border-brand-creme"
            >
              <div className="flex flex-col p-8 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-brand-navy text-xl font-medium tracking-wide flex items-center justify-between group"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                    <div className="w-2 h-2 rounded-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
                <div className="pt-4">
                  <a
                    href="https://wa.me/5541984873009?text=Olá,%20Dra.%20Andrielly!%20Gostaria%20de%20agendar%20uma%20consulta."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-navy text-brand-offwhite text-center block py-4 rounded-full font-bold shadow-lg shadow-brand-navy/10"
                    onClick={() => setIsOpen(false)}
                  >
                    AGENDAR CONSULTA
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
