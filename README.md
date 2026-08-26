
## 📚 Documentação Oficial (Arquitetura e TDDs)

**Nota Importante:** A documentação técnica detalhada, as regras de IA (Harness), os Technical Design Documents (TDDs) e o log de estado contínuo deste projeto **não ficam armazenados neste repositório**. 

Para obter o contexto arquitetural completo e consultar o *Single Source of Truth* do ecossistema, acesse o repositório centralizado de documentação:
👉 **[unum-people-docs](https://github.com/unum-people-creative-solutions/unum-people-docs.git)**

# Site Institucional - Psicóloga Andrielly Oliveira

Este é o site institucional da **Psicóloga Andrielly Oliveira** (CRP 08/35504), com atuação clínica em atendimento infantil, neuropsicologia e avaliação psicológica. O projeto foi concebido para transmitir exclusividade, autoridade técnica e acolhimento, focado em um público de alto padrão.

## 🚀 Tecnologias

- **Next.js 14+** (App Router)
- **Tailwind CSS** (Estilização)
- **Framer Motion** (Animações e Micro-interações)
- **Lucide React & React Icons** (Iconografia)
- **TypeScript**

## 🎨 Identidade Visual & UX (Premium)

- **Paleta de Cores:** 
  - `Navy` (#1A2B3C): Autoridade e segurança clínica.
  - `Gold` (#C5A059): Sofisticação e detalhismo.
  - `Off-white` (#FDFCFB): Leveza e clareza visual.
  - `Olive` (#3D4430): Conexão com a natureza e acolhimento.
- **Tipografia:** 
  - *Playfair Display* (Serifada): Elegância e autoridade para títulos.
  - *Inter* (Sans-serif): Alta legibilidade para textos de apoio.
- **Destaques de UX:** 
  - Menu mobile com trava de rolagem e efeito de desfoque (backdrop blur).
  - Botão flutuante de WhatsApp personalizado com a identidade visual do site.
  - Integração direta com Google Maps para localização exata no Centro Cívico.

## 📁 Estrutura do Projeto

```text
/
├── public/
│   └── images/      # Ativos visuais (Logos, fotos da psicóloga e da Unum)
├── src/
│   ├── app/         # Rotas, metadados e layout principal
│   │   ├── avaliacao-neuropsicologica/  # Landing page de conversão (tráfego pago)
│   │   └── politica-de-privacidade/     # Exigida pela LGPD para o formulário de lead
│   ├── components/  # Seções da home (Hero, About, Specialties, Methodology, Contact, etc.)
│   ├── context/     # LeadContext — estado do modal de captação e tracking
│   ├── lib/         # Utilitários (CRM, Tailwind Merge, etc.)
│   └── styles/      # CSS Global e configurações de tema
```

A home (`/`) e a landing page de avaliação (`/avaliacao-neuropsicologica`) seguem convenções de renderização diferentes por design — ver [ADR-0002](https://github.com/unum-people-creative-solutions/unum-people-docs/blob/main/decisions/ADR-0002-landing-pages-rsc-first.md) em `unum-people-docs`: a home é `"use client"` na raiz, a LP é Server Components por padrão com ilhas client mínimas, porque tráfego pago em página de saúde mental não tem remarketing — a conversão precisa acontecer na primeira visita.

### Captura de lead (`LeadContext` / `LeadModal`)

`openLeadModal(url)` continua funcionando como sempre (usado pelos 5 pontos de conversão da home). Um segundo argumento opcional permite customizar o modal sem duplicá-lo:

```ts
openLeadModal(url, {
  origem: "LP Avaliação",        // vence a origem derivada de gclid/utm_source
  conversionLabel: "AW-XXX/...", // rótulo de conversão do Google Ads desta origem
  title: "Agende sua Avaliação",
  description: "...",
  submitLabel: "QUERO AGENDAR",
});
```

O envio exige um checkbox de consentimento LGPD marcado (vale para os dois formulários, home e LP, porque o `LeadModal` é compartilhado) e o e-mail é opcional — só nome e WhatsApp são obrigatórios.

## 🛠️ Instalação e Execução

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Ambiente de Desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Testes:**
   ```bash
   npm test          # roda uma vez
   npm run test:watch  # modo watch
   ```

4. **Build para Produção:**
   ```bash
   npm run build
   ```

---
**Desenvolvido por:** [Unum People Creative Solutions](https://unumpeople.com.br)
