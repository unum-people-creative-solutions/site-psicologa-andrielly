
## 📚 Documentação Oficial (Arquitetura e TDDs)

**Nota Importante:** A documentação técnica detalhada, as regras de IA (Harness), os Technical Design Documents (TDDs) e o log de estado contínuo deste projeto **não ficam armazenados neste repositório**. 

Para obter o contexto arquitetural completo e consultar o *Single Source of Truth* do ecossistema, acesse o repositório centralizado de documentação:
👉 **[unum-people-docs](https://github.com/unum-people-creative-solutions/unum-people-docs.git)**

# Site Institucional - Psicóloga Andrielly Oliveira

Este é o site institucional da **Psicóloga Andrielly Oliveira**, especialista em atendimento infantil, neuropsicologia e avaliação psicológica. O projeto foi concebido para transmitir exclusividade, autoridade técnica e acolhimento, focado em um público de alto padrão.

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
│   ├── components/  # Seções (Hero, About, Specialties, Methodology, Contact, etc.)
│   ├── lib/         # Utilitários (Tailwind Merge, etc.)
│   └── styles/      # CSS Global e configurações de tema
```

## 🛠️ Instalação e Execução

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Ambiente de Desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Build para Produção:**
   ```bash
   npm run build
   ```

---
**Desenvolvido por:** [Unum People Creative Solutions](https://unumpeople.com.br)
