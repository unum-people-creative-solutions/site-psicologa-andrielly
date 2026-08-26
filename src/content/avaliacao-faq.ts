/**
 * FAQ da LP de avaliação. Fonte única — alimenta o accordion visível E o
 * JSON-LD FAQPage (feature seo-and-launch), então nunca diverge dos dois.
 *
 * Nenhuma resposta menciona preço ou faixa de preço (Art. 20 — preço como
 * propaganda é vedado). Os instrumentos entram só aqui, nunca em seção
 * própria — decisão do Discovery §09: a maioria do público não busca por
 * sigla, e quem busca ("o médico pediu o WISC") encontra a resposta certa
 * no lugar certo, sem transformar a página inteira em vitrine técnica.
 */

export interface FaqItem {
  pergunta: string;
  resposta: string;
}

export const faq: FaqItem[] = [
  {
    pergunta: "Quanto custa a avaliação?",
    resposta:
      "O valor depende do protocolo definido na anamnese — ele varia conforme o caso. É conversado diretamente com você antes do início do processo.",
  },
  {
    pergunta: "Quanto tempo leva, do início à devolutiva?",
    resposta:
      "De 8 a 12 encontros semanais. Do primeiro encontro à devolutiva, de 2 a 3 meses e meio. A anamnese é 1 encontro de 60 a 90 minutos, a testagem são 6 a 10 encontros semanais de 50 minutos, e depois do último encontro de testagem o laudo leva de 10 a 15 dias para ficar pronto.",
  },
  {
    pergunta: "A escola aceita esse laudo?",
    resposta:
      "Sim. O laudo segue os padrões técnicos da profissão e é aceito por escolas, médicos e demais serviços que solicitam avaliação psicológica ou neuropsicológica.",
  },
  {
    pergunta: "Preciso de um encaminhamento médico para começar?",
    resposta:
      "Não é obrigatório. Se você já tiver um encaminhamento de um médico ou psiquiatra, ele ajuda a direcionar o protocolo, mas a avaliação pode começar direto pela anamnese.",
  },
  {
    pergunta: "Meus dados e os resultados ficam em sigilo?",
    resposta:
      "Sim. Todo o processo segue o sigilo profissional da Psicologia e a Lei Geral de Proteção de Dados (LGPD). Os resultados são discutidos só com você (ou com os responsáveis, no caso de crianças e adolescentes).",
  },
  {
    pergunta: "E se a avaliação não indicar nenhum diagnóstico específico?",
    resposta:
      "Também é um resultado válido. O laudo registra o que foi encontrado — inclusive quando não há indicação de um quadro específico — e as recomendações são construídas a partir disso, não apenas a partir de um diagnóstico.",
  },
  {
    pergunta: "O médico pediu para eu fazer o WISC. Você aplica?",
    resposta:
      "Sim. Utilizo instrumentos como as Escalas Wechsler (WISC para crianças e adolescentes, WAIS para adultos), o RAVLT para memória e o TAVIS para atenção, entre outros — o protocolo exato é definido na anamnese, de acordo com a queixa e a idade.",
  },
];
