# Guia de Integração: Ingestão de Leads

Este guia descreve como integrar Landing Pages (LPs) externas com o CRM Unum People para captura automática de leads e rastreamento de conversões do Google Ads.

## 1. Endpoint de Ingestão

- **URL:** `https://api.unumpeople.com.br/ingest`
- **Método:** `POST`
- **Autenticação:** Header `X-API-Key`

## 2. Configuração do Cabeçalho (Headers)

Todas as requisições devem incluir os seguintes cabeçalhos:

| Header | Valor | Descrição |
| :--- | :--- | :--- |
| `Content-Type` | `application/json` | Formato dos dados enviados. |
| `X-API-Key` | `SUA_API_KEY` | Chave única fornecida pelo painel administrativo do CRM. |

## 3. Estrutura do Payload (JSON)

Os seguintes campos podem ser enviados no corpo da requisição:

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `nome` | String | Sim | Nome completo do lead. |
| `telefone` | String | Sim | Telefone de contato (preferencialmente com DDD). |
| `email` | String | Não | Endereço de e-mail. |
| `origem` | String | Não | Identificador da LP (Ex: "LP Black Friday"). |
| `gclid` | String | Não | Identificador de clique do Google Ads (essencial para conversão). |
| `utm_source` | String | Não | Origem do tráfego (Ex: "google", "facebook"). |
| `utm_medium` | String | Não | Meio do tráfego (Ex: "cpc", "organic"). |
| `utm_campaign` | String | Não | Nome da campanha. |

### Exemplo de JSON:

```json
{
  "nome": "João Silva",
  "telefone": "11999998888",
  "email": "joao@exemplo.com",
  "origem": "Landing Page Principal",
  "gclid": "CjwKCAjw-8vPBhBbEiwAoA39Wja...",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "vendas_maio_2026"
}
```

## 4. Captura do GCLID (Importante)

Para que o CRM consiga reportar conversões ao Google Ads, é necessário capturar o parâmetro `gclid` da URL quando o usuário chega na Landing Page e enviá-lo junto com os dados do formulário.

### Exemplo de código JavaScript para capturar GCLID:

```javascript
// Função para obter parâmetros da URL
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Ao enviar o formulário
const leadData = {
    nome: document.getElementById('nome').value,
    telefone: document.getElementById('telefone').value,
    email: document.getElementById('email').value,
    gclid: getUrlParam('gclid'), // Captura automática da URL
    utm_source: getUrlParam('utm_source'),
    utm_medium: getUrlParam('utm_medium'),
    utm_campaign: getUrlParam('utm_campaign'),
    origem: window.location.hostname
};
```

## 5. Exemplo de Implementação (Fetch API)

```javascript
fetch('https://api.unumpeople.com.br/ingest', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'SUA_API_KEY_AQUI'
    },
    body: JSON.stringify(leadData)
})
.then(response => {
    if (response.ok) {
        console.log('Lead enviado com sucesso!');
    } else {
        console.error('Erro ao enviar lead.');
    }
})
.catch(error => console.error('Erro na requisição:', error));
```

## 6. Respostas da API

- **201 Created:** Lead processado e salvo com sucesso.
- **401 Unauthorized:** Chave de API ausente ou inválida.
- **400 Bad Request:** Dados obrigatórios faltando ou JSON malformado.
- **500 Internal Server Error:** Falha interna no processamento.
