import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Andrielly Oliveira | Psicóloga & Neuropsicóloga em Curitiba",
  description: "Psicóloga clínica Andrielly Oliveira (CRP 08/35504). Especialista em atendimento infantil, adolescente e adulto. Avaliação neuropsicológica e psicanálise no Centro Cívico, Curitiba.",
  keywords: ["Psicóloga Curitiba", "Neuropsicóloga Curitiba", "Atendimento Infantil", "Psicoterapia Adolescente", "Psicanálise Curitiba", "Avaliação Psicológica", "Centro Cívico Curitiba"],
  authors: [{ name: "Andrielly Oliveira" }],
  openGraph: {
    title: "Andrielly Oliveira | Psicóloga & Neuropsicóloga em Curitiba",
    description: "Atendimento especializado com foco na singularidade do sujeito. Psicanálise e Neuropsicologia.",
    url: "https://psiandriellyoliveira.com.br",
    siteName: "Andrielly Oliveira Psicologia",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/psiandriellyoliveira-20250319_153010.jpg",
        width: 1200,
        height: 630,
        alt: "Andrielly Oliveira - Psicóloga Clínica",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
