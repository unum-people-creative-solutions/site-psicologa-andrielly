# Integração de Leads e CRM

Este documento descreve o fluxo de captura de leads, integração com o CRM e rastreamento de conversões do Google Ads.

## 1. Variáveis de Ambiente

Para que a integração funcione, o arquivo `.env.local` na raiz do projeto deve conter as seguintes chaves:

```env
NEXT_PUBLIC_API_GATEWAY_URL=https://seu-api-gateway.com
NEXT_PUBLIC_API_KEY=sua_chave_de_api_aqui
```

## 2. Fluxo de Captura

O sistema utiliza um **Modal de Pré-Agendamento** que intercepta todos os cliques nos botões de WhatsApp do site.

1.  **Gatilho**: O usuário clica em qualquer botão de contato/WhatsApp.
2.  **Captura**: O `LeadModal` é exibido solicitando:
    *   Nome Completo
    *   E-mail
    *   Telefone (WhatsApp)
3.  **Processamento**:
    *   Envia os dados para o endpoint `${NEXT_PUBLIC_API_GATEWAY_URL}/ingest` via POST.
    *   Dispara o evento `gtag_report_conversion` para o Google Ads.
    *   Redireciona o usuário para o link final do WhatsApp.

## 3. Rastreamento de Origem

A origem do lead é capturada automaticamente no momento em que o modal é carregado, seguindo esta ordem de prioridade:

1.  **Parâmetros de URL (Ads/Marketing)**:
    *   `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`
    *   `gclid` (Google Ads Click ID)
    *   `fbclid` (Facebook Click ID)
    *   `msclkid` (Microsoft Ads ID)
2.  **Referrer**: Se não houver parâmetros, identifica o site de origem (ex: `Referrer: google.com`).
3.  **Direto/Orgânico**: Valor padrão caso nenhuma das opções acima seja identificada.

## 4. Estrutura do Objeto (Payload CRM)

A chamada para o CRM segue exatamente este padrão:

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999998888",
  "origem": "Source: google | Medium: cpc | Campaign: psicologia_infantil | GCLID: Cj0KCQ...",
  "metadados": {
    "url_conversao": "https://wa.me/5541...",
    "data_hora": "2024-04-27T15:30:00.000Z"
  }
}
```

## 5. Arquivos Relacionados

*   `src/lib/crm.ts`: Lógica de comunicação com a API.
*   `src/context/LeadContext.tsx`: Gerenciamento de estado global do modal.
*   `src/components/LeadModal.tsx`: Interface visual e lógica de captura de UTMs/GCLID.
*   `src/app/layout.tsx`: Configuração do `LeadProvider` e scripts do Google Ads.
