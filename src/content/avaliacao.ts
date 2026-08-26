/**
 * Conteúdo textual da LP de avaliação neuropsicológica/psicológica.
 *
 * Toda frase aqui já passou pelo crivo do Art. 20 do Código de Ética
 * (sem promessa de resultado, sem preço, sem superlativo, sem título não
 * possuído) e pelas decisões do Discovery: números reais do processo, sem
 * seção de instrumentos (só no FAQ), sem escala de classificação fora do
 * FAQ. Novo texto entra aqui — nunca hardcoded dentro de um componente.
 */

export const hero = {
  title: "Avaliação Neuropsicológica e Psicológica em Curitiba",
  subtitle:
    "Um processo com começo, meio e fim definidos, que termina em recomendações claras para escola, casa e acompanhamento — para crianças, adolescentes e adultos.",
  credencial: "Andrielly Oliveira, psicóloga, CRP 08/35504",
  ctaLabel: "Entenda se a avaliação é indicada para o seu caso",
};

export const gatilhos: string[] = [
  "A escola pediu um relatório ou avaliação psicológica.",
  "Um médico ou psiquiatra encaminhou para investigação.",
  "Você desconfia de TDAH, TEA ou uma dificuldade de aprendizagem.",
  "Você quer entender melhor o desenvolvimento do seu filho antes de decidir os próximos passos.",
  "Você é adulto e busca autoconhecimento ou um laudo para uma finalidade específica.",
];

export const diferencial = {
  title: "O laudo é o começo do plano, não o fim do processo",
  body:
    "O medo mais comum não é o diagnóstico em si — é pagar, esperar semanas e receber um documento técnico sem saber o que fazer na segunda-feira. Aqui, o mapeamento cognitivo com precisão técnica é seguido de recomendações práticas e personalizadas: orientações claras sobre os próximos passos, seja para adaptação escolar, psicoterapia ou desenvolvimento profissional.",
};

export const entregavel = {
  title: "O que você recebe ao final",
  items: [
    {
      title: "Anamnese registrada",
      body: "Sua história e a queixa principal, documentadas e usadas para direcionar todo o protocolo.",
    },
    {
      title: "Mapeamento cognitivo e emocional",
      body: "Os resultados da testagem, analisados em conjunto — não isolados uns dos outros.",
    },
    {
      title: "Recomendações práticas",
      body: "Orientações específicas para escola, casa e acompanhamento — o que fazer, não só o que foi encontrado.",
    },
    {
      title: "Encaminhamentos, quando necessários",
      body: "Indicação de outros profissionais ou serviços, se o caso pedir.",
    },
  ],
};

export interface EtapaProcesso {
  passo: number;
  titulo: string;
  duracao: string;
  descricao: string;
}

export const processo: EtapaProcesso[] = [
  {
    passo: 1,
    titulo: "Anamnese",
    duracao: "1 encontro, 60 a 90 minutos",
    descricao:
      "Entrevista clínica para mapear sua história (ou a do seu filho), entender a queixa principal e definir quais testes serão necessários.",
  },
  {
    passo: 2,
    titulo: "Testagem",
    duracao: "6 a 10 encontros semanais, 50 minutos cada",
    descricao:
      "Sessões de aplicação dos testes cognitivos, de memória, atenção e personalidade, espaçadas semanalmente para evitar fadiga.",
  },
  {
    passo: 3,
    titulo: "Análise e redação do laudo",
    duracao: "10 a 15 dias, após o último encontro",
    descricao:
      "Sem sessões nesta etapa — é quando os dados são cruzados, corrigidos e o laudo é redigido, com foco nas recomendações.",
  },
  {
    passo: 4,
    titulo: "Devolutiva",
    duracao: "1 encontro, 60 minutos",
    descricao:
      "Entrega do laudo com explicação detalhada dos resultados e construção conjunta do plano de ação.",
  },
];

export const processoResumo = {
  encontros: "De 8 a 12 encontros semanais.",
  duracaoTotal:
    "Do primeiro encontro à devolutiva, de 2 a 3 meses e meio.",
};

export const tiposAvaliacao = {
  title: "Qual avaliação é a sua",
  neuropsicologica: {
    title: "Avaliação Neuropsicológica",
    body:
      "Um mapeamento do funcionamento cognitivo — atenção, memória, funções executivas e inteligência — para identificar pontos fortes e áreas de dificuldade. Indicada quando a queixa envolve aprendizagem, atenção, memória ou suspeita de TDAH e TEA.",
  },
  psicologica: {
    title: "Avaliação Psicológica",
    body:
      "Uma investigação da estrutura emocional, dos traços de personalidade e da dinâmica afetiva, voltada a compreender sofrimentos emocionais e padrões de comportamento. Indicada quando a queixa é mais emocional ou comportamental do que cognitiva.",
  },
  nota:
    "Na dúvida sobre qual se aplica ao seu caso, a anamnese inicial ajuda a definir o protocolo certo.",
};

export const sobre = {
  nome: "Andrielly Oliveira",
  credencial: "Psicóloga Clínica • CRP 08/35504",
  bio: [
    "Sou psicóloga formada pela PUC-PR, com atuação clínica fundamentada na psicanálise e dedicação ao estudo contínuo da neuropsicologia.",
    "Meu trabalho é pautado pelo acolhimento da singularidade de cada pessoa, integrando o rigor técnico dos instrumentos de avaliação a uma escuta clínica atenta.",
    "Atendo no Centro Cívico, em Curitiba, com o objetivo de que cada avaliação termine em orientações que a família consegue aplicar.",
  ],
  localizacao: "Centro Cívico - Curitiba",
};

export const ctaFinal = {
  title: "O momento de começar importa",
  body:
    "Do primeiro encontro à devolutiva são de 2 a 3 meses e meio. Se a avaliação é para atender a um pedido da escola neste semestre, quanto antes o processo começar, mais tranquilo é o prazo.",
  ctaLabel: "Entenda se a avaliação é indicada para o seu caso",
};
