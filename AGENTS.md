# Site Psicóloga Andrielly Oliveira - Guia do Agente

Este arquivo contém as diretrizes fundamentais para o desenvolvimento e manutenção do site institucional da Psicóloga Andrielly Oliveira. **Agente: Leia este arquivo sempre que iniciar uma sessão ou após comandos de compressão de contexto.**

## 🎯 Contexto do Projeto
Site institucional de alto padrão com foco em autoridade e acolhimento clínico. Público-alvo de alto nível, exigindo uma UX fluida e estética refinada.

## 🏗️ Arquitetura e Componentes
- **Framework**: Next.js 14+ (App Router).
- **Animações**: Framer Motion para micro-interações e transições suaves.
- **Identidade Visual**:
  - `Navy` (#1A2B3C) e `Gold` (#C5A059) para autoridade e sofisticação.
  - Tipografia: *Playfair Display* (Serifada) e *Inter* (Sans-serif).

## 🛠️ Padrões de Desenvolvimento & Segurança
- **UX Premium**: Manter efeitos de *glassmorphism* (backdrop blur) e animações que não comprometam a acessibilidade.
- **Performance**: Otimização rigorosa de imagens (Next.js `Image`) para manter o carregamento rápido apesar das animações.
- **Responsividade**: Menu mobile com trava de rolagem é obrigatório.

### 🛡️ Protocolo de Engenharia Defensiva
- **Integridade da Marca**: Jamais alterar a paleta de cores ou tipografia sem validação do design.
- **Framer Motion**: Utilizar `AnimatePresence` para garantir transições suaves entre estados de componentes.

## 🧠 Persistência de Contexto (Context Anchor)
- **Recuperação**: Execute `cat AGENTS.md` para se reorientar.
- **Estrutura**: Consulte o README.md para o mapeamento de pastas do projeto.

## 📝 Comandos Úteis
- `npm run dev`: Ambiente de desenvolvimento.
- `npm run build`: Build de produção.
