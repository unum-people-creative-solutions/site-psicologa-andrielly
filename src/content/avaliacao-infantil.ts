/**
 * Conteúdo textual da LP de avaliação neuropsicológica infantil.
 *
 * Literal do Apêndice A de spec/features/site-psicologa-andrielly/
 * lp-avaliacao-infantil/spec.md (unum-people-docs), aprovado antes da
 * execução. Mesmo crivo do Art. 20 da LP de avaliação: sem promessa de
 * resultado, sem preço, sem superlativo, sem título não possuído. Novo texto
 * entra aqui — nunca hardcoded dentro de um componente.
 */

export const metadados = {
  title: "Avaliação Neuropsicológica Infantil em Curitiba",
  description:
    "Avaliação neuropsicológica para crianças e adolescentes: TDAH, TEA, dislexia e dificuldades escolares. Andrielly Oliveira, psicóloga (CRP 08/35504), Curitiba.",
};

export const hero = {
  title: "Avaliação Neuropsicológica Infantil em Curitiba",
  subtitle:
    "Para crianças e adolescentes com dificuldades de atenção, aprendizagem ou desenvolvimento — um processo com começo, meio e fim, que termina em orientações claras para a família e a escola.",
  credencial: "Andrielly Oliveira, psicóloga, CRP 08/35504",
  ctaLabel: "Entenda se a avaliação é indicada para o seu filho",
};

export const gatilhos: string[] = [
  "A escola pediu um relatório ou uma avaliação.",
  "O pediatra, neuropediatra ou psiquiatra encaminhou para investigação.",
  "Seu filho tem dificuldade para ler, escrever ou fazer contas, mesmo se esforçando.",
  "A desatenção ou a agitação estão atrapalhando a escola ou a rotina em casa.",
  "Você percebe diferenças na fala, na interação ou no comportamento e quer entender melhor antes de decidir os próximos passos.",
];

export const condicoes = {
  title: "O que a avaliação investiga",
  items: [
    { nome: "TDAH", descricao: "Atenção, impulsividade e funções executivas." },
    { nome: "Sinais de TEA", descricao: "Comunicação, interação social e padrões de comportamento." },
    { nome: "Dislexia e discalculia", descricao: "Leitura, escrita e matemática." },
    { nome: "Altas habilidades", descricao: "Potencialidades e perfil cognitivo." },
  ],
  nota: "O protocolo é definido na anamnese, de acordo com a queixa e a idade.",
};

export const participacao = {
  title: "Uma avaliação pensada para a criança",
  body:
    "A anamnese é feita com os responsáveis, que trazem a história do desenvolvimento e a queixa principal. As sessões de testagem são semanais, de 50 minutos, espaçadas para evitar fadiga. Na devolutiva, os resultados são explicados aos responsáveis, com o plano de ação construído junto.",
};

export const entregavel = {
  title: "O que a família e a escola recebem",
  items: [
    {
      title: "Laudo neuropsicológico",
      body: "Os resultados da testagem, analisados em conjunto, em um documento técnico.",
    },
    {
      title: "Orientações para a escola",
      body: "Recomendações práticas de adaptação e acompanhamento em sala de aula.",
    },
    {
      title: "Orientações para casa",
      body: "O que a família pode fazer no dia a dia, a partir do que foi encontrado.",
    },
    {
      title: "Encaminhamentos, quando necessários",
      body: "Indicação de outros profissionais, como fonoaudiólogo, psicopedagogo ou terapeuta ocupacional, se o caso pedir.",
    },
  ],
};

export const ctaFinal = {
  title: "O momento de começar importa",
  body:
    "Do primeiro encontro à devolutiva são de 2 a 3 meses e meio. Se a avaliação é para atender a um pedido da escola neste semestre, quanto antes o processo começar, mais tranquilo é o prazo.",
  ctaLabel: "Entenda se a avaliação é indicada para o seu filho",
};

// Começa com "LP Avaliação" de propósito: o LeadModal desliga as conversões
// aprimoradas para essas origens (decisão D-C, saúde é categoria sensível).
export const origem = "LP Avaliação Infantil";
export const origemFlutuante = "LP Avaliação Infantil - Flutuante";

// Rótulo da ação de conversão própria desta página no Google Ads. Fica
// indefinido até a ação ser criada no painel; enquanto isso o envio usa o
// rótulo padrão do layout (spec A4).
export const conversionLabel: string | undefined = undefined;
