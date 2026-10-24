import { describe, it, expect } from "vitest";
import {
  metadados,
  hero,
  gatilhos,
  condicoes,
  participacao,
  entregavel,
  ctaFinal,
} from "./avaliacao-infantil";
import { faqInfantil } from "./avaliacao-infantil-faq";

/**
 * Trava o literal do Apêndice A da spec lp-avaliacao-infantil (texto aprovado,
 * Art. 20). Qualquer mudança de texto precisa passar por nova aprovação e por
 * este teste. Valores copiados da spec, não do código.
 */
describe("Conteúdo da LP infantil — literal do Apêndice A (INF-04, INF-14)", () => {
  it("metadados, hero e CTA final", () => {
    expect(metadados).toEqual({
      title: "Avaliação Neuropsicológica Infantil em Curitiba",
      description:
        "Avaliação neuropsicológica para crianças e adolescentes: TDAH, TEA, dislexia e dificuldades escolares. Andrielly Oliveira, psicóloga (CRP 08/35504), Curitiba.",
    });
    expect(hero).toEqual({
      title: "Avaliação Neuropsicológica Infantil em Curitiba",
      subtitle:
        "Para crianças e adolescentes com dificuldades de atenção, aprendizagem ou desenvolvimento — um processo com começo, meio e fim, que termina em orientações claras para a família e a escola.",
      credencial: "Andrielly Oliveira, psicóloga, CRP 08/35504",
      ctaLabel: "Entenda se a avaliação é indicada para o seu filho",
    });
    expect(ctaFinal).toEqual({
      title: "O momento de começar importa",
      body: "Do primeiro encontro à devolutiva são de 2 a 3 meses e meio. Se a avaliação é para atender a um pedido da escola neste semestre, quanto antes o processo começar, mais tranquilo é o prazo.",
      ctaLabel: "Entenda se a avaliação é indicada para o seu filho",
    });
  });

  it("gatilhos, condições, participação e entregável", () => {
    expect(gatilhos).toEqual([
      "A escola pediu um relatório ou uma avaliação.",
      "O pediatra, neuropediatra ou psiquiatra encaminhou para investigação.",
      "Seu filho tem dificuldade para ler, escrever ou fazer contas, mesmo se esforçando.",
      "A desatenção ou a agitação estão atrapalhando a escola ou a rotina em casa.",
      "Você percebe diferenças na fala, na interação ou no comportamento e quer entender melhor antes de decidir os próximos passos.",
    ]);
    expect(condicoes).toEqual({
      title: "O que a avaliação investiga",
      items: [
        {
          nome: "TDAH",
          descricao: "Atenção, impulsividade e funções executivas.",
        },
        {
          nome: "Sinais de TEA",
          descricao:
            "Comunicação, interação social e padrões de comportamento.",
        },
        {
          nome: "Dislexia e discalculia",
          descricao: "Leitura, escrita e matemática.",
        },
        {
          nome: "Altas habilidades",
          descricao: "Potencialidades e perfil cognitivo.",
        },
      ],
      nota: "O protocolo é definido na anamnese, de acordo com a queixa e a idade.",
    });
    expect(participacao).toEqual({
      title: "Uma avaliação pensada para a criança",
      body: "A anamnese é feita com os responsáveis, que trazem a história do desenvolvimento e a queixa principal. As sessões de testagem são semanais, de 50 minutos, espaçadas para evitar fadiga. Na devolutiva, os resultados são explicados aos responsáveis, com o plano de ação construído junto.",
    });
    expect(entregavel).toEqual({
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
    });
  });

  it("FAQ", () => {
    expect(faqInfantil).toEqual([
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
          "Não é obrigatório. Se você já tiver um encaminhamento do pediatra, neuropediatra ou psiquiatra, ele ajuda a direcionar o protocolo, mas a avaliação pode começar direto pela anamnese.",
      },
      {
        pergunta: "Os resultados ficam em sigilo?",
        resposta:
          "Sim. Todo o processo segue o sigilo profissional da Psicologia e a Lei Geral de Proteção de Dados (LGPD). Os resultados são discutidos com os responsáveis pela criança ou pelo adolescente.",
      },
      {
        pergunta: "E se a avaliação não indicar nenhum diagnóstico específico?",
        resposta:
          "Também é um resultado válido. O laudo registra o que foi encontrado — inclusive quando não há indicação de um quadro específico — e as recomendações são construídas a partir disso, não apenas a partir de um diagnóstico.",
      },
      {
        pergunta: "O médico pediu o WISC. Você aplica?",
        resposta:
          "Sim. Para crianças e adolescentes, utilizo as Escalas Wechsler (WISC), além de instrumentos de memória e atenção como o RAVLT e o TAVIS, entre outros — o protocolo exato é definido na anamnese, de acordo com a queixa e a idade.",
      },
    ]);
  });
});
