import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { LeadProvider } from "@/context/LeadContext";
import LeadModal from "@/components/LeadModal";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://psiandriellyoliveira.com.br"),
  title: "Andrielly Oliveira | Psicóloga & Neuropsicóloga em Curitiba",
  description: "Psicóloga clínica Andrielly Oliveira (CRP 08/35504). Especialista em atendimento infantil, adolescente e adulto. Avaliação neuropsicológica e psicanálise no Centro Cívico, Curitiba.",
  alternates: {
    canonical: "/",
  },
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
        {/* Google Ads Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17122840229"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17122840229');

            window.gtag_report_conversion = function(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-17122840229/0k8KCMO2jtQaEKWd5-Q_',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
        <LeadProvider>
          {children}
          <LeadModal />
        </LeadProvider>
      </body>
    </html>
  );
}
