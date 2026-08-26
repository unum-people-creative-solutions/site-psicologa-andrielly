import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Andrielly Oliveira",
  description:
    "Como Andrielly Oliveira, psicóloga (CRP 08/35504), coleta, usa e protege os dados de contato enviados por este site.",
  alternates: {
    canonical: "/politica-de-privacidade",
  },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="container mx-auto px-6 md:px-12 py-24 max-w-3xl">
      <h1 className="text-4xl font-serif text-brand-navy mb-10">
        Política de Privacidade
      </h1>

      <div className="space-y-10 text-brand-navy/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-serif text-brand-navy mb-3">
            Quais dados coletamos
          </h2>
          <p>
            Ao preencher o formulário de contato deste site, coletamos seu
            nome, WhatsApp e, opcionalmente, seu e-mail. Esses são os únicos
            dados pessoais que solicitamos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-brand-navy mb-3">
            Para que usamos esses dados
          </h2>
          <p>
            Usamos seu nome, WhatsApp e e-mail exclusivamente para retornar
            seu contato sobre atendimento psicológico — agendamento de
            consulta ou avaliação, ou esclarecimento de dúvidas sobre os
            serviços oferecidos. Não usamos seus dados para nenhuma outra
            finalidade, e não os compartilhamos com terceiros para fins de
            publicidade.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-brand-navy mb-3">
            Base legal
          </h2>
          <p>
            Tratamos seus dados com base no seu consentimento, dado
            expressamente ao marcar a opção de concordância no momento do
            envio do formulário, conforme a Lei Geral de Proteção de Dados
            (LGPD — Lei nº 13.709/2018).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-brand-navy mb-3">
            Por quanto tempo retemos seus dados
          </h2>
          <p>
            Mantemos seus dados apenas pelo tempo necessário para a
            finalidade descrita acima. Se você não seguir com o atendimento,
            pode solicitar a exclusão a qualquer momento; caso contrário, os
            dados são retidos enquanto durar essa finalidade e excluídos ou
            anonimizados quando deixarem de ser necessários.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-brand-navy mb-3">
            Como solicitar a exclusão dos seus dados
          </h2>
          <p>
            Para solicitar a exclusão, correção ou informações sobre os
            dados que temos sobre você, entre em contato pelo WhatsApp{" "}
            <a
              href="https://wa.me/5541984873009"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-navy underline hover:text-brand-gold transition-colors"
            >
              (41) 9 8487-3009
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-brand-navy mb-3">
            Responsável pelo tratamento
          </h2>
          <p>
            Andrielly Oliveira, psicóloga, CRP 08/35504. Av. Cândido de
            Abreu, 526 - Torre B, 6º andar sala 604 - Centro Cívico,
            Curitiba - PR.
          </p>
        </section>
      </div>
    </main>
  );
}
