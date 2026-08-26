import { sobre } from "@/content/avaliacao";

export function LandingFooter() {
  return (
    <footer className="py-12 bg-brand-offwhite border-t border-brand-creme">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center gap-4 text-center">
        <p className="text-brand-navy font-serif text-lg">{sobre.nome}</p>
        <p className="text-brand-olive text-xs font-bold uppercase tracking-wider">
          {sobre.credencial}
        </p>
        <p className="text-brand-navy/60 text-sm">{sobre.enderecoCompleto}</p>
        <a
          href="/politica-de-privacidade"
          className="text-brand-navy/50 text-xs underline hover:text-brand-gold transition-colors"
        >
          Política de Privacidade
        </a>
        <p className="text-brand-navy/30 text-[10px] uppercase tracking-widest font-bold mt-4">
          Desenvolvido por Unum People Creative Solutions
        </p>
      </div>
    </footer>
  );
}
